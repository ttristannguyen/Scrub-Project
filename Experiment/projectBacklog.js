// This file aims at providing the functionality to add a task in the project backlog page,
// This is done by the following steps: 
// Step 1: User clicks on Add a task button DONE
// Step 2: This takes the user to a new page called "taskCreation.html" DONE
// Step 3: This page includes a form-style data input DONE
// Step 4: user enters their details about the task DONE
// Step 5: The user presses done when they have entered all the required fields DONE
// Step 6: The details are then added to local storage object under the KEY "ProjectBacklogItems --> PBIS" DONE
// Step 7: The user is returned to the main Project backlog page, where they can now see a dynammically made div of the project backlog item
// Step 8: The project backlog item shows the summarised information of priority, story points and tag DONE
// Step 9: When the project backlog div item is created dynamically, a button is also dynamically created at the bottom right hand corner, this 
//          button can allow a user to see the detailed view of the  task DONE
// step 10: When viewing the detailed view of the task, the details are not editable, however, a user should be able to "edit task details" 
// Step 11: This "edit task details" button takes a user to a pre-filled - editable - form, allowing them to edit any detail in the form that they want. 

//let projectBacklogItemsArray = []; //This will store multiple instances of the PBI objects
const Progress = {
    notStarted: "Not Started",
    inProgress: "In Progress",
    complete: "Complete"
}

function onTaskCreationLoad()
{
    // localStorage.setItem('currentTaskID',JSON.stringify(0))
    if (localStorage.getItem('projectBacklogItemArray') )
{
    console.log("TEST")
}
else
{
    localStorage.setItem('projectBacklogItemArray',JSON.stringify([]));
}

}

let projectBacklogItem = class {
    constructor(taskName, taskDescription, taskTag,taskType, taskStoryPoint, taskPriority,taskTeamMember,taskStatus)
    {
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.taskTag = taskTag;
        this.taskType = taskType;
        this.taskStoryPoint = taskStoryPoint;
        this.taskPriority = taskPriority;
        this.taskTeamMember = taskTeamMember;
        this.taskStatus = taskStatus
    }

}

function taskCreationOnClick()
{
    taskName = document.getElementById("taskName").value 
    taskDescription = document.getElementById("taskDescription").value 
    taskTag = document.getElementById("taskTag").value
    taskType = document.getElementById("taskType").value 
    console.log(taskType)
    taskStoryPoint = document.getElementById("taskStoryPoint").value 
    var tagName = document.getElementsByTagName("input")
    taskStatus = 0; // 0 = To Do, 1 = In Progress, 2 = Done
    for (var i = 0 ; i < tagName.length ; i++){
        if (tagName[i].type == 'radio' && tagName[i].checked){ var taskPriority = tagName[i].value}
    }
    console.log(taskName)
    console.log(taskDescription)
    if (taskName == null || taskDescription == null || taskPriority == null || taskStoryPoint == "" || taskStoryPoint <= 0){
        errorMessageLocation = document.getElementById('errorMessage')
        errorMessageLocation.innerHTML = "Please Fill Out the Task Name ,Story Points, Description and Priority"
        return
    }
    taskTeamMember = "notAssigned"


    let productBackLogItemObj = new projectBacklogItem(taskName,taskDescription,taskTag,taskType,taskStoryPoint,taskPriority,taskTeamMember,taskStatus);
    projectBacklogItemsParsed = JSON.parse(localStorage.getItem('projectBacklogItemArray'))
    console.log(productBackLogItemObj)
    projectBacklogItemsParsed.push(productBackLogItemObj)
    localStorage.setItem('projectBacklogItemArray',JSON.stringify(projectBacklogItemsParsed));
    window.location = 'projectBacklog.html'
}

function taskCreationBackOnClick()
{
    window.location = 'projectBacklog.html'
}


function onProjectBacklogLoad()
{
    //Run through entirety of local storage. Parse the elements back into objects 
    //for each object, print the summarised info into a dynamically created div element
    let filterBy = document.getElementById("filterBy").value;
    var elements = 0
    console.log(filterBy)
    array = JSON.parse(localStorage.getItem('projectBacklogItemArray'));
    let htmlElements = "";
    for (let i = 0; i < array.length; i++) {
        let taskName = array[i].taskName; //this is the name of the task from the new object
        let priority = array[i].taskPriority; //Gets the priority for dynamic entering
        let taskTag = array[i].taskTag
        switch(taskTag){
            case("UI"):
            grad = "background-color: #232323;"
            break
            case("Core"):
            grad = "background-image: linear-gradient(to right, white, #89CFF0);"
            break
            case("Testing"):
            grad = "background-image: linear-gradient(to right, white, pink);"
            break
        }


        console.log(priority)
        let storyPoints = array[i].taskStoryPoint;
        if (array[i].taskTag == filterBy){
            elements += 1
            //style = ' ${grad} position: relative; top: 90%' id="${i}" 
            htmlElements += `<div class = 'mdl-cell mdl-cell--3-col graybox pbiBox' onclick = createDetailedView(${i}) style = ' ${grad} position: relative; top: 90%' id="${i}"><p id = 'taskText'>${taskName}<br>Priority: ${priority}<br>Story Points:${storyPoints} Task Tag: ${taskTag}</p></div>` +
            // "<button class = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent mdl-color--green-400' + onclick = 'createDetailedView()' id = 'detailViewBtn'> See/Edit Details </button>" + 
            `<button class = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent mdl-color--red-400' + onclick = 'deletePBI(${i})' id = 'deleteBtn'> Delete </button>`;
        }
        if (filterBy == "All"){
            elements = array.length
            htmlElements += `<div class = 'mdl-cell mdl-cell--3-col graybox pbiBox' onclick = createDetailedView(${i}) style = ' ${grad} position: relative; top: 90%' id="${i}"><p id = 'taskText'>${taskName}<br>Priority: ${priority}<br>Story Points:${storyPoints}<br> Task Tag: ${taskTag}</p></div>` +
            // "<button class = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent mdl-color--green-400' + onclick = 'createDetailedView()' id = 'detailViewBtn'> See/Edit Details </button>" + 
            `<button class = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent mdl-color--red-400' + onclick = deletePBI(${i}) id = 'deleteBtn'> Delete </button>`;
        }
    }
    let taskPlacement = document.getElementById("taskPlacement");
    taskPlacement.innerHTML = htmlElements;

    
//Change test

}

function addTaskOnClick()
{
    window.location.href = 'taskCreation.html'   
}

function deletePBI(index){
    
    if (confirm("Are you sure you want to delete the task ?")) {
        array = JSON.parse(localStorage.getItem('projectBacklogItemArray'));
        // taskIDString = JSON.parse(localStorage.getItem('currentTaskId'));
        
        // elementNum = parseInt(taskIDString);
        delete array[index];
        array = array.filter(n => n) 
        localStorage.setItem('projectBacklogItemArray',JSON.stringify(array));
        location.reload();  
        console.log("A")
    }
    
    
}
function createDetailedView(index)
{
    // console.log(index)
    window.location.href = "taskDetailsEdit.html"
    localStorage.setItem('currentTaskId',JSON.stringify(index))
    

}

function detailedViewContent()
{   

    //Get the local storage items 
    //Parse the local storage items
    //Get the item for the currently selected item (via button id?)
    taskIDString = JSON.parse(localStorage.getItem('currentTaskId')); //Gets the ID of the current button (position within the local storage array)
    array = JSON.parse(localStorage.getItem('projectBacklogItemArray')); //Gets the entire array
    elementNum = parseInt(taskIDString);
    
    currentTask = array[elementNum];
    console.log(currentTask)
    document.getElementById('taskName').setAttribute('value',currentTask.taskName);
    document.getElementById('taskDescription').value = currentTask.taskDescription
    switch (currentTask.taskTag){
        case "Ui":
            document.getElementById('taskTag').value = "UI";
            break;
        case "Testing":
            document.getElementById('taskTag').value = "Testing";
            break;
        case "Core":
            document.getElementById('taskTag').value = "Core";
            break;
        default:
            console.log("A")
            break;
    }

    switch (currentTask.taskType){
        case "Story":
            document.getElementById('taskType').value = "Story";
            break;
        case "Bug":
            document.getElementById('taskType').value = "Bug";
            break;
        default:
            console.log("A")
            break;
    }

    document.getElementById('taskStoryPoint').setAttribute('value',currentTask.taskStoryPoint);
    let inputTag = document.getElementsByTagName('input')
    for (var i = 0 ; i < inputTag.length ; i++) {
        if (inputTag[i].type == 'radio' && inputTag[i].value == currentTask.taskPriority){
            inputTag[i].checked = true
        }
    }
    // editDetailPriority.checked = true;
    

}

function saveEditedDetails()
{
    taskName = document.getElementById("taskName").value 
    taskDescription = document.getElementById("taskDescription").value 
    taskTag = document.getElementById("taskTag").value 
    taskType = document.getElementById("taskType").value 
    taskStoryPoint = document.getElementById("taskStoryPoint").value 
    taskPriorityTag = document.getElementsByTagName('input')
    taskTeamMember = "notAssigned"
    
    if (taskName == "" || taskDescription == "" || taskTag == "" || taskStoryPoint == "" || taskStoryPoint <= 0){
        console.log("taskName " + taskName )
        console.log("taskdesc " + taskDescription )
        console.log("taskTag " + taskTag)
        console.log("taskStoryPoint " + taskStoryPoint)
        return 
    }
    //Test
    for (var i = 0 ; i < taskPriorityTag.length ; i++) {
        if (taskPriorityTag[i].type == 'radio' && taskPriorityTag[i].checked){ var taskPriority = taskPriorityTag[i].value}
        
    }
    console.log(taskPriority)
    let productBackLogItemObj = new projectBacklogItem(taskName,taskDescription,taskTag,taskType,taskStoryPoint,taskPriority);
    array = JSON.parse(localStorage.getItem('projectBacklogItemArray'))
    taskIDString = JSON.parse(localStorage.getItem('currentTaskId'));
    elementNum = parseInt(taskIDString);    
    array[elementNum] = productBackLogItemObj; //FIND AND REPLACE
    //Need to re-set back into local storage
    localStorage.setItem('projectBacklogItemArray',JSON.stringify(array));
    console.log("TEST 1")
    window.location.replace('projectBacklog.html')

}

function editDetailBackOnClick()
{
    console.log("TEST 2");
    window.location.replace('projectBacklog.html')
}