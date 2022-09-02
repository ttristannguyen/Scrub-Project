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
    window.location = 'projectBacklog.html'
}


function onProjectBacklogLoad()
{
    //Run through entirety of local storage. Parse the elements back into objects 
    //for each object, print the summarised info into a dynamically created div element 
    array = JSON.parse(localStorage.getItem('projectBacklogItemArray'));
    let htmlElements = "";
    for (let i = 0; i < array.length; i++) {
        if (i !== null){
            let taskName = array[i].taskName; //this is the name of the task from the new object
            let priority = array[i].taskPriority; //Gets the priority for dynamic entering
            let storyPoints = array[i].taskStoryPoint;
            htmlElements += ' <div class = "mdl-cell mdl-cell--3-col graybox" style = "position: relative; top: 90%"' + 'id=' + '"' + i + '"' + '>' + "<p id = 'taskText'>" + taskName + '<br>' + "Priority: " + priority + '<br>' +"Story Points: " + storyPoints + "<br>" + "<\p>" + '</div>';
        }
    }
    let taskPlacement = document.getElementById("taskPlacement");
    taskPlacement.innerHTML = htmlElements;

    for (let j = 0; j<array.length; j++)
    {
            let button = document.createElement('button');
            button.type = 'button';
            button.innerHTML = 'See/edit details';
            button.className = 'btn-styled';
            button.id = "" + j + "";
            button.onclick = function() {
                //I want to be able to click on the button, be taken to a 'detailed view' page, where i can possibly make a change to the task. 
                //This will edit the task in local storage.
                createDetailedView()
                localStorage.setItem('currentTaskId',JSON.stringify(button.id))
            };
            
            let button2 = document.createElement('button');
            button2.type = 'button';
            button2.innerHTML = 'Delete';
            button2.className = 'btn-styled_del';
            button2.id = "" + j + "";
            button2.onclick = function() {
                deletePBI()
                localStorage.setItem('currentTaskId',JSON.stringify(button2.id))
            };

            let id = j.toString();
            let container = document.getElementById(id);
            container.appendChild(button);
            container.appendChild(button2);


    }

}

function addTaskOnClick()
{
    window.location.href = 'taskCreation.html'   
}

function deletePBI()
{
    array = JSON.parse(localStorage.getItem('projectBacklogItemArray'));
    taskIDString = JSON.parse(localStorage.getItem('currentTaskId'));
    elementNum = parseInt(taskIDString);
    delete array[elementNum];
    array = array.filter(n => n) 
    localStorage.setItem('projectBacklogItemArray',JSON.stringify(array));
    location.reload();  
    
}
function createDetailedView()
{
    window.location.href = "taskDetailsEdit.html"
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
    document.getElementById('taskName').setAttribute('value',currentTask.taskName);
    document.getElementById('taskDescription').setAttribute('value',currentTask.taskDescription);
    document.getElementById('taskType').setAttribute('value',currentTask.taskType);
    document.getElementById('taskStoryPoint').setAttribute('value',currentTask.taskStoryPoint);
    document.getElementById('priority').setAttribute('value',currentTask.taskPriority);

    

}

function saveEditedDetails()
{
    taskName = document.getElementById("taskName").value 
    taskDescription = document.getElementById("taskDescription").value 
    taskType = document.getElementById("taskType").value 
    taskStoryPoint = document.getElementById("taskStoryPoint").value 
    taskPriority = document.getElementById("priority").value 
    let productBackLogItemObj = new projectBacklogItem(taskName,taskDescription,taskType,taskStoryPoint,taskPriority);
    array = JSON.parse(localStorage.getItem('projectBacklogItemArray'))
    taskIDString = JSON.parse(localStorage.getItem('currentTaskId'));
    elementNum = parseInt(taskIDString);    
    array[elementNum] = productBackLogItemObj; //FIND AND REPLACE
    //Need to re-set back into local storage
    localStorage.setItem('projectBacklogItemArray',JSON.stringify(array));
    console.log("TEST 1")

}

function editDetailBackOnClick()
{
    console.log("TEST 2");
    window.location.replace('projectBacklog.html')
}