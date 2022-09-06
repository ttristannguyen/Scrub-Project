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
    // let memberSelected = document.getElementById("selectedMember").value;
    // if (!memberSelected) return


    // Shifting PBIs
    let removedItems = [];
    for(i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            // productBacklog[i].tm = memberSelected; // Assigning team member
            sprintBacklog.push(productBacklog[i]);
            removedItems.push(productBacklog[i].taskName);
        }
    }
    
    let item;
    // Removing Items from pBList
    for(i = 0; i < productBacklog.length; i++) {
        if (removedItems.includes(productBacklog[i].taskName)) {
            item = productBacklog.splice(i, 1);
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

    let item;
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
    displayPB(loadPB())  
    displaySB(loadSB())
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
                <td class="mdl-data-table__cell--non-numeric" id = "${idString}" onclick="showDialog('${idString}')">${sprintBacklog[i].taskName}</td>
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
        <p>Assignee: ${null}</p>
        <p>Story Points: ${task.taskStoryPoint}</p>
    `;
    modal.showModal();
}

function priorityColour(priority) {
    if(priority == "High Priority") {
        return "red"
    }
    else if(priority == "Medium Priority") {
        return "orange"
    }
    else {
        return "green"
    }
}

function closeDialog() {
    modal = document.getElementById("modal");
    modal.close();
}