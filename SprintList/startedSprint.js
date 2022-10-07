//This file is for the sprint currently in progress
//The idea is to have the capability of seeing the 'current sprint', logging time for the sprint tasks. 
//Logged time is done by selecting a date, and inputting the hours worked on the task. 
function onStartedSprintLoad()
{
    let currentSprintNum = JSON.parse(localStorage.getItem('currentSprintId'));
    //Run through entirety of local storage. Parse the elements back into objects 
    //for each object, print the summarised info into a dynamically created div element
    array = JSON.parse(localStorage.getItem('sprintBacklogArray'));
    array = array[currentSprintNum]
    let htmlElements = "";
    let arrayTaskList = array.sprintTaskList
    let name = array.sprintName;
    let sd = array.sprintStartDate;
    let ed = array.sprintEndDate;
    document.getElementById('title').innerText = name
    document.getElementById('sded').innerText = 'Starting: '  + sd + '\n' + '\n'+ 'Ending: ' + ed
    for (let i = 0; i<arrayTaskList.length; i++)
    {
        let taskName  = arrayTaskList[i].taskName
        let taskTeamMember = arrayTaskList[i].taskTeamMember

        htmlElements += `<div class = 'mdl-cell mdl-cell--3-col graybox pbiBox' onclick = createDetailedView(${i})><p id = 'taskText'>${taskName}<br> Assignee: ${taskTeamMember}</p></div>` +
            `<button class = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent mdl-color--orange-400' + onclick = 'logTime(${i})' id = 'logTime'> logTime </button>`;
    }
    let taskPlacement = document.getElementById("tasks");
    taskPlacement.innerHTML = htmlElements;
    document.getElementById("taskText").style.fontSize = "22px"

}
let teamMember = "";
function logTime(i)
{
    let currentSprintNum = JSON.parse(localStorage.getItem('currentSprintId'));
    array = JSON.parse(localStorage.getItem('sprintBacklogArray'));
    array = array[currentSprintNum]
    let arrayTaskList = array.sprintTaskList   
    let modal = document.getElementById("modal");
    modal.showModal();
    teamMember = arrayTaskList[i].taskTeamMember;
   
}    

function closeDialog() {
  
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
    modal = document.getElementById("modal");
    console.log(teamMember);
    modal.close();
}

