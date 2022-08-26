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
    localStorage.setItem('projectBacklogItem',JSON.stringify(productBackLogItemObj));
    window.location.href = 'projectBacklog.html'
}

function onProjectBacklogLoad()
{
    //Run through entirety of local storage. Parse the elements back into objects 
    //for each object, print the summarised info into a dynamically created div element 
    /*
        var div = document.createElement('div');
  
  // Set some attributes
  div.style.width = '200px';
  div.style.height = '200px';
  div.style.backgroundColor = 'red';
  
  // Append the div to the body
  document.body.appendChild(div);
    */


}