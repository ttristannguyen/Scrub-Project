let taskIndex = localStorage.getItem(TASK_KEY);
let task = PBIList.getItem(taskIndex);

let taskName = document.getElementById("taskName").value;
let taskDescription = document.getElementById("taskDescription").value;
let taskType = document.getElementById("taskType").value;
let taskStoryPoint = document.getElementById("taskStoryPoint").value;
let taskPriority = document.getElementById("taskPriority").value;


function backToPBOnClick()
{
    window.location.href = 'projectBacklog.html';
}

function editTaskDetails()
{
    localStorage.setItem(TASK_KEY, task);
    
    window.location.href = 'projectBacklogEdit.html';
}


