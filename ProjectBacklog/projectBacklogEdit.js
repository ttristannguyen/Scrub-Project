let taskIndex = localStorage.getTask(TASK_KEY);
let task = PBIList.getTask(taskIndex);


let taskName = document.getElementById("taskName").value;
let taskDescription = document.getElementById("taskDescription").value;
let taskType = document.getElementById("taskType").value;
let taskStoryPoint = document.getElementById("taskType").value;
let taskPriority = document.getElementById("taskPriority").value;
taskName = task.taskName
taskDescription = task.taskDescription
taskType = task.taskType
taskStoryPoint = task.taskStoryPoint
taskPriority = task.taskPriority


function saveOnClick() {

    let taskName = document.getElementById("taskName").value;
    let taskDescription = document.getElementById("taskDescription").value;
    let taskType = document.getElementById("taskType").value;
    let taskStoryPoint = document.getElementById("taskType").value;
    let taskPriority = document.getElementById("taskPriority").value;
    if (confirm(`Confirm to UPDATE this task information?`)) {
        task.taskName = taskName 
        task.taskDescription = taskDescription
        task.taskType = taskType
        task.taskStoryPoint = taskStoryPoint
        task.taskPriority = taskPriority

        updateLSData(PBILIST_KEY, PBIList);
    }

    window.location.href = `projectBacklogDetails.html`;


}
