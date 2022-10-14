function loadSprint() {
    //
    // Function loads sprint object from local storage
    //
    // Parameters: None
    // Returns: sprint Object
    //

    let sprint = JSON.parse(localStorage.getItem("activeSprint"))
    return sprint
}


function loadKanban() {
    //
    // Function used when kanban webpage loads, and assign active sprint
    // tasks to their respective columns
    //
    // Parameters: None
    // Returns: None
    //

    // Determines whether kanban is of completed or active sprint
    let sprint;
    if (JSON.parse(localStorage.getItem("currentSprintId")) == JSON.parse(localStorage.getItem("activeSprintID"))) {
        // Retrieving active sprint obj
        sprint = loadSprint();

        // Enabling Completion Button
        let button = document.querySelector(".completeButton button")
        button.disabled = false;
        button.classList.remove('mdl-button--disabled');

    }
    else {
        // Retrieving specified sprint obj
        let currentSprintID = JSON.parse(localStorage.getItem("currentSprintId"));
        sprint = JSON.parse(localStorage.getItem("sprintBacklogArray"))[currentSprintID];

        // Disabling Completion Button
        let button = document.querySelector(".completeButton button")
        button.disabled = true;
        button.classList.add('mdl-button--disabled');
    }

    // Changing Title of Webpage
    let title = document.getElementsByClassName("pageTitle")
    title[0].innerHTML = String(sprint.sprintName).toUpperCase()

    let taskList = sprint.sprintTaskList

    // Inner HTML variable initialisation
    let task;
    let toDoHtml = '';
    let inProgHtml = '';
    let doneHtml = '';
    let idString;
    // Iterating through all tasks and allocating location
    for(let i = 0; i < taskList.length; i++) {
        task = taskList[i];
        idString = `task${i}`
        // To Do Tasks
        if (task.taskStatus == 0) {
            toDoHtml += `
                <tr>
                    <td id="${idString}" onclick = "showDialog('${idString}')" class = "mdl-data-table__cell--non-numeric toDo">${task.taskName}</td>
                </tr>
            `
        }
        // In Progress Tasks
        else if (task.taskStatus == 1) {
            inProgHtml += `
                <tr>
                    <td id="${idString}" onclick = "showDialog('${idString}')" class = "mdl-data-table__cell--non-numeric inProgress">${task.taskName}`
                     
                    +`
                   
                    </td>
                </tr>
            `
        }
        // Done Tasks
        else if (task.taskStatus == 2) {
            doneHtml += `
                <tr>
                    <td id="${idString}" onclick = "showDialog('${idString}')" class = "mdl-data-table__cell--non-numeric done">${task.taskName}
                    
                   
                    </td>


                 
                </tr>
            `
        }
    }

    // Assigning Inner HTML
    let toDoList = document.getElementById("sprintBacklog");
    toDoList.innerHTML = toDoHtml;

    let inProgList = document.getElementById("sprintInProgress")
    inProgList.innerHTML = inProgHtml

    let doneList = document.getElementById("sprintDone")
    doneList.innerHTML = doneHtml
}
let taskNumber = 10;
function showDialog(taskID) {
    //
    // Function used to generate and show individual task detail
    // and enable time logging
    //
    // Parameters: taskID - ID of the task selected
    // Returns: None
    //
    let sprint;
    if (JSON.parse(localStorage.getItem("currentSprintId")) == JSON.parse(localStorage.getItem("activeSprintID"))) {
        // Retrieving active sprint obj
        sprint = loadSprint();
    }
    else {
        // Retrieving specified sprint obj
        let currentSprintID = JSON.parse(localStorage.getItem("currentSprintId"));
        sprint = JSON.parse(localStorage.getItem("sprintBacklogArray"))[currentSprintID]
    }


    let sprintList = sprint.sprintTaskList;
    taskNumber = taskID.slice(4, taskID.length) // Gets task number
    let task = sprintList[taskNumber]
    let modal = document.getElementById("modal");
    let taskName = document.getElementById("modalTaskName");
    let taskDesc = document.getElementById("modalTaskDesc");
    console.log(task)
    let pColour = priorityColour(task.taskPriority)

    // Generating HTML
    taskName.innerHTML = task.taskName;
    taskDesc.innerHTML = `
        <h5>Task Description</h3>
        <p>${task.taskDescription}</p>
        <p class = "taskDescPriority" style="background-color: ${pColour};">${task.taskPriority}</p>
        <p>Type: ${task.taskType}</p>
        <p>Assignee: ${task.taskTeamMember}</p>
        <p>Story Points: ${task.taskStoryPoint}</p>

    `;

    // Modifying Progression based on task status
    if (task.taskStatus == 0) {
        let beginButton = document.getElementById("progressTask")
        beginButton.innerHTML = `Begin Task`
        beginButton.onclick = function() {beginTask(taskNumber);};
    }
    else if(task.taskStatus == 1) {
        let beginButton = document.getElementById("progressTask")
        beginButton.innerHTML = `Finish Task`
        beginButton.onclick = function() {finishTask(taskNumber);};

    }
    modal.showModal();
}

function priorityColour(priority) {
    //
    // Function returns colour, given priority of task
    //
    // Parameters: priority - string stating priority
    // Returns: string - colour corresponding to priority
    //

    if(priority == "High Priority") {
        return "orange"
    }
    else if(priority == "Medium Priority") {
        return "yellow"
    }
    else if(priority == "Critical Priority")
    {
        return "red"
    }
    else {
        return "green"
    }
}

function closeDialog() {
    //
    // Function closes dialog window
    // 
    // Parameters: None
    // Returns: None
    //

    modal = document.getElementById("modal");
    modal.close();
}

function beginTask(taskNumber) {
    // 
    // Function progresses a task from "To Do" to "In Progress" and closes modal
    //
    // Parameters: taskNumber - integer representing task index in sprintTasklist
    // Returns: None
    //

    let sprint = loadSprint();
    let sprintTaskList = sprint.sprintTaskList;
    let task = sprintTaskList[taskNumber];
    task.taskStatus = 1;
    localStorage.setItem('activeSprint', JSON.stringify(sprint));
    loadKanban();
    closeDialog();
}

function finishTask(taskNumber) {
    // 
    // Function progresses a task from "In Progress" to "Done" and closes modal
    //
    // Parameters: taskNumber - integer representing task index in sprintTasklist
    // Returns: None
    //

    let sprint = loadSprint();
    let sprintTaskList = sprint.sprintTaskList;
    let task = sprintTaskList[taskNumber];
    task.taskStatus = 2;
    localStorage.setItem('activeSprint', JSON.stringify(sprint));
    loadKanban();
    closeDialog();    
}

function completeSprint() {
    // Function: Sets Sprint and it's tasks to a complete status and sends the user back to sprint list
    

    sprintID = JSON.parse(localStorage.getItem("currentSprintId"))
    sprintArray = JSON.parse(localStorage.getItem("sprintBacklogArray"))
    currSprint = sprintArray[sprintID]

    if (new Date() > new Date(currSprint.sprintEndDate)){
        if (window.confirm("Are you sure you want to complete the sprint?")) {

            currSprint.sprintInProgress = 2;
            for (task in currSprint.sprintTaskList) {
                task.taskStatus = 2;
                localStorage.setItem("activeSprint", null)
                localStorage.setItem("activeSprintID", "-1")
                console.log("TEST")
                localStorage.setItem("sprintBacklogArray", JSON.stringify(sprintArray))
                window.location = "../SprintList/sprintList.html"
            }
            window.location = "../SprintList/sprintList.html"
        }   
    }
    else {
        alert("You still have time in your sprint")
    }
    

    


    
}   

function burndownChartButton() {
    // Function: Moves the window to burndownChart.html
    window.location = "burndownChart.html";
}

//Shan added 30/09 

let teamMember = "";
function logTime(i)
{

    let currentSprintNum = JSON.parse(localStorage.getItem('currentSprintId'));
    array = JSON.parse(localStorage.getItem('sprintBacklogArray'));
    array = array[currentSprintNum]
    let arrayTaskList = array.sprintTaskList   
    let modal1 = document.getElementById("modal1");
    modal1.showModal();
    teamMember = arrayTaskList[i].taskTeamMember;
   
}    

function closeDialog1() {
    if (document.getElementById("datePicked").value == "" || document.getElementById("hoursLogged").value == "")
    {
        window.alert("Please enter a date and elapsed hours worked on the selected task");
        return
    }
    TMarray = JSON.parse(localStorage.getItem('teamMemberArray'));
    let sprintAcc = JSON.parse(localStorage.getItem('sprintBacklogArray'))
    for (let j = 0; j<TMarray.length; j++)
    {
        if(TMarray[j].teamMemberFirstName == teamMember)
        {
            TMarray[j].teamMemberAccumulatedHours.push([document.getElementById("datePicked").value, document.getElementById("hoursLogged").value ])
        }
    }
    let currentSprint = JSON.parse(localStorage.getItem('currentSprintId'));
    sprintAcc[currentSprint].sprintAccumulatedHours.push([document.getElementById("datePicked").value, document.getElementById("hoursLogged").value])
    localStorage.setItem('teamMemberArray',JSON.stringify(TMarray));
    localStorage.setItem('sprintBacklogArray',JSON.stringify(sprintAcc)); //Putting into sprint array.
    modal1 = document.getElementById("modal1");
    console.log(teamMember);
    modal1.close();
}

