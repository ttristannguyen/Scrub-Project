function loadPB() {
    return JSON.parse(localStorage.getItem('projectBacklogItemArray'))
}

function loadSB() {
    let sprintID = JSON.parse(localStorage.getItem("currentSprintId"))
    let currentSprint = JSON.parse(localStorage.getItem("sprintBacklogArray"))[sprintID];
    return currentSprint.sprintTaskList
}

function assignTasks() {
    let productBacklog = loadPB();
    let sprintBacklog = loadSB();
    let checkBoxes = document.getElementsByName("pBCheckbox");
     let memberSelected = document.getElementById("selectedMember").value;
     if (!memberSelected) return


    // Shifting PBIs
    let removedItems = [];
    for(i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            productBacklog[i].taskTeamMember = memberSelected; // Assigning team member
            sprintBacklog.push(productBacklog[i]);
            removedItems.push(productBacklog[i].taskName);
        }
    }
    

    // Removing Items from pBList
    for(i = 0; i < productBacklog.length; i++) {
        if (removedItems.includes(productBacklog[i].taskName)) {
           // productBacklog[i].taskTeamMember = "notAssigned"
            item = productBacklog.splice(i, 1);
            
            i--;
        }
    }

    localStorage.setItem('projectBacklogItemArray', JSON.stringify(productBacklog));
    
    // Updating sprintList data
    let sprintID = JSON.parse(localStorage.getItem("currentSprintId"))
    let sprintBacklogArray = JSON.parse(localStorage.getItem("sprintBacklogArray"));
    sprintBacklogArray[sprintID].sprintTaskList = sprintBacklog
    localStorage.setItem('sprintBacklogArray', JSON.stringify(sprintBacklogArray))
    let currentSprintName = sprintBacklogArray[sprintID].sprintName

    tmArray = JSON.parse(localStorage.getItem('teamMemberArray'));
    for(i = 0; i < tmArray.length; i++) {
        if (tmArray[i].teamMemberFirstName == memberSelected)
        {
            tmArray[i].teamMemberSprintInvolvement = currentSprintName
        }
    }
    localStorage.setItem('teamMemberArray',JSON.stringify(tmArray));
    loadBacklogs();
}

function unassignTasks() {
    let productBacklog = loadPB();
    let sprintBacklog = loadSB();
    let checkBoxes = document.getElementsByName("sBCheckbox");

    // Shifting PBIs
    let removedItems = [];
    for(i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            // sprintBacklog[i].tm = null; // Unassign Task
            productBacklog.push(sprintBacklog[i]);
            removedItems.push(sprintBacklog[i].taskName);
        }
    }

    // Removing Items from pBList
    for(i = 0; i < sprintBacklog.length; i++) {
        if (removedItems.includes(sprintBacklog[i].taskName)) {
            item = sprintBacklog.splice(i, 1);
            // console.log(`Removed Item: ${item.taskName}`)
            i--;
        }
    }

    localStorage.setItem('projectBacklogItemArray', JSON.stringify(productBacklog));
    
    // Updating sprintList data
    let sprintID = JSON.parse(localStorage.getItem("currentSprintId"))
    let sprintBacklogArray = JSON.parse(localStorage.getItem("sprintBacklogArray"));
    sprintBacklogArray[sprintID].sprintTaskList = sprintBacklog
    localStorage.setItem('sprintBacklogArray', JSON.stringify(sprintBacklogArray))

    loadBacklogs()
}

function loadBacklogs() {
    let htmlElements = "";
    let teamMemberArray = JSON.parse(localStorage.getItem('teamMemberArray'));
    
    displayPB(loadPB())  
    displaySB(loadSB())

    for (let i = 0; i<teamMemberArray.length; i++)
    {
       let tmName = teamMemberArray[i].teamMemberFirstName;
       htmlElements +=  `<option value=${tmName}>${tmName}</option>`

    }
    document.getElementById('selectedMember').innerHTML = htmlElements;
}

function displayPB(productBacklog) {
    let output = '';

    for (let i = 0; i < productBacklog.length; i++) {
        idString = `pBtask${i}`;
        output += `
            <tr>
                <td class="mdl-data-table__cell--non-numeric" id="'${idString}'" onclick="showDialog('${idString}')">${productBacklog[i].taskName}</td>
                <td>
                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="pBList${i}">
                    <input type="checkbox" id="pBList${i}" class="mdl-checkbox__input" name="pBCheckbox">
                </label>
            </td>
            </tr>
        `
    }

    // Assigning html
    let productBacklogTableBody = document.getElementById("productBacklogList");
    productBacklogTableBody.innerHTML = output;
}

function displaySB(sprintBacklog) {
    let output = '';

    for (let i = 0; i < sprintBacklog.length; i++) {
        idString = `sBtask${i}`;
        output += `
            <tr>
                <td class="mdl-data-table__cell--non-numeric" id = "${idString}" onclick="showDialog('${idString}')">${sprintBacklog[i].taskName + ' (' + sprintBacklog[i].taskTeamMember + ')'}</td>
                <td>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="sBList${i}">
                        <input type="checkbox" id="sBList${i}" class="mdl-checkbox__input" name="sBCheckbox">
                    </label>
                </td>
            </tr>
        `
    }

    // Assigning html
    let sprintBacklogTableBody = document.getElementById("sprintBacklogList");
    sprintBacklogTableBody.innerHTML = output;
}

function showDialog(taskID) {
    let backlog;
    if (taskID.slice(0,2) == "pB") {
        backlog = loadPB()
    }
    else {
        backlog = loadSB()
    }

    let taskNumber = taskID.slice(6, taskID.length)
    let task = backlog[taskNumber]
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
    modal.showModal();
}

function priorityColour(priority) {
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
    modal = document.getElementById("modal");
    modal.close();
}

function startSprint() {
    //
    // Function obtains currently viewed sprint, saves sprint and redirects to kanban view
    //
    // Parameters: None
    // Returns: None
    //
    
    // Retreiving Current Sprint ID
    let currentSprintId = JSON.parse(localStorage.getItem("currentSprintId"));
    let sprintList = JSON.parse(localStorage.getItem("sprintBacklogArray"));
    let sprint = sprintList[currentSprintId];
    
    localStorage.setItem("activeSprint", JSON.stringify(sprint))
    window.location.assign("../Kanban/kanban.html")
}