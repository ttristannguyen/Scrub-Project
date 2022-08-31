//This file aims at providing the functionality to add a task in the project backlog page,
//*This is done by the following steps: 
// Step 1: User clicks on Add a task button
// Step 2: This takes the user to a new page called "createYourTask.html"
// Step 3: This page includes a form-style data input
// Step 4: user enters their details about the task
// Step 5: The user presses done when they have entered all the required fields
// Step 6: The details are then added to local storage object under the KEY "ProjectBacklogItems --> PBIS"
// Step 7: The user is returned to the main Project backlog page, where they can now see a dynammically made div of the project backlog item
// Step 8: The project backlog item shows the summarised information of priority, story points and tag
// Step 9: When the project backlog div item is created dynamically, a button is also dynamically created at the bottom right hand corner, this 
//          button can allow a user to see the detailed view of the  task
// step 10: When viewing the detailed view of the task, the details are not editable, however, a user should be able to "edit task details" 
// Step 11: This "edit task details" button takes a user to a pre-filled - editable - form, allowing them to edit any detail in the form that they want. 

//let projectBacklogItemsArray = []; //This will store multiple instances of the PBI objects
function onTaskCreationLoad()
{
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
    constructor(taskName, taskDescription, taskType, taskStoryPoint, taskPriority)
    {
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.taskType = taskType;
        this.taskStoryPoint = taskStoryPoint;
        this.taskPriority = taskPriority;
    }

}

function taskCreationOnClick()
{
    taskName = document.getElementById("taskName").value 
    taskDescription = document.getElementById("taskDescription").value 
    taskType = document.getElementById("taskType").value 
    taskStoryPoint = document.getElementById("taskStoryPoint").value 
    taskPriority = document.getElementById("priority").value 

    let productBackLogItemObj = new projectBacklogItem(taskName,taskDescription,taskType,taskStoryPoint,taskPriority);
    projectBacklogItemsParsed = JSON.parse(localStorage.getItem('projectBacklogItemArray'))
    projectBacklogItemsParsed.push(productBackLogItemObj)
    localStorage.setItem('projectBacklogItemArray',JSON.stringify(projectBacklogItemsParsed));

}

function taskCreationBackOnClick()
{
    window.location.replace('projectBacklog.html')
}


function onProjectBacklogLoad()
{
    //Run through entirety of local storage. Parse the elements back into objects 
    //for each object, print the summarised info into a dynamically created div element 
    array = JSON.parse(localStorage.getItem('projectBacklogItemArray'));
    let htmlElements = "";
    for (let i = 0; i < array.length; i++) {
        let taskName = array[i].taskName; //this is the name of the task from the new object
        let priority = array[i].taskPriority; //Gets the priority for dynamic entering
        let storyPoints = array[i].taskStoryPoint;
       htmlElements += ' <div class = "mdl-cell mdl-cell--4-col graybox">'+taskName + ' , ' + priority + ' , ' + storyPoints + ' <button class="mdl-button mdl-js-button mdl-js-ripple-effect" <!-- onclick= "moreDetailsOnClick()" -> More details </button></div>';

    }
    let taskPlacement = document.getElementById("taskPlacement");
    taskPlacement.innerHTML = htmlElements;

}

function addTaskOnClick()
{
    window.location.href = 'taskCreation.html'   
}

// Below is the functions of PBI details
function backToPBOnClick()
{
    window.location.href = 'projectBacklog.html';
}

function moreDetailsOnClick()
{
    window.location.href = 'projectBacklogDetails.html';

}

function onProjectBacklogDetailsLoad(i)
{
    array = JSON.parse(localStorage.getItem('projectBacklogItemArray'));
    let htmlElements = "";
    // for (let i = 0; i < array.length; i++) {
    let taskName = array[i].taskName; 
    let taskType = array[i].taskType; 
    let taskDescriptions = array[i].taskDescription;
    let storyPoints = array[i].taskStoryPoint;
    let priority = array[i].taskPriority;htmlElements += '<div class="page-content" id = "taskDescriptions"><h1> Detailed Description of '+ taskName + '</h1> <h2>Task description:'+ taskDescription + '</h2> <h3></h3> <h2>Task type: '+ taskType + '</h2> <h3></h3> <h2>Story points associated: '+ storyPoints + '</h2> <h3></h3> <h2>Priority: ' + priority + '</h2> <h3></h3></div>';
    // }
    let taskDescription = document.getElementById("taskDescription");
    taskDescription.innerHTML = htmlElements;

}