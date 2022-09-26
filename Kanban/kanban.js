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

    // Retrieving active sprint obj
    let sprint = loadSprint();
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
                    <td id="${idString}" onclick = "showDialog('${idString}')" class = "mdl-data-table__cell--non-numeric">${task.taskName}</td>
                </tr>
            `
        }
        // In Progress Tasks
        else if (task.taskStatus == 1) {
            inProgHtml += `
                <tr>
                    <td id="${idString}" onclick = "showDialog('${idString}')" class = "mdl-data-table__cell--non-numeric">${task.taskName}</td>
                </tr>
            `
        }
        // Done Tasks
        else if (task.taskStatus == 2) {
            doneHtml += `
                <tr>
                    <td id="${idString}" onclick = "showDialog('${idString}')" class = "mdl-data-table__cell--non-numeric">${task.taskName}</td>
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

function showDialog(taskID) {
    //
    // Function used to generate and show individual task detail
    // and enable time logging
    //
    // Parameters: taskID - ID of the task selected
    // Returns: None
    //
    

    let sprintList = loadSprint().sprintTaskList;
    let taskNumber = taskID.slice(4, taskID.length) // Gets task number
    let task = sprintList[taskNumber]
    let modal = document.getElementById("modal");
    let taskName = document.getElementById("modalTaskName");
    let taskDesc = document.getElementById("modalTaskDesc");
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