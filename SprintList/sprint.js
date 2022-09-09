//This will show the sprints in a dynamic manner by retrieving created sprints from local storage. 
// 
function addSprintOnClick()
{
    window.location.replace('sprintCreation.html');
}
function onSprintCreationLoad()
{
    if (localStorage.getItem('sprintBacklogArray') )
{
    console.log("TEST")
}
else
{
    localStorage.setItem('sprintBacklogArray',JSON.stringify([]));
}
}

let sprintObjectObj = class {
    constructor(sprintName, sprintStartDate, sprintEndDate, sprintInProgress, sprintTaskList)
    {
        this.sprintName = sprintName;
        this.sprintStartDate = sprintStartDate;
        this.sprintEndDate = sprintEndDate;
        this.sprintInProgress = sprintInProgress;
        this.sprintTaskList = sprintTaskList;
    }

}

function sprintCreationDoneBtnOnClick()
{
    sprintName = document.getElementById("sprintName").value 
    sprintStartDate = document.getElementById("sprintStartDate").value 
    sprintEndDate = document.getElementById("sprintEndDate").value 
    sprintInProgress = 0
    sprintTaskList = [];

    let sprintObject = new sprintObjectObj(sprintName,sprintStartDate,sprintEndDate,sprintInProgress,sprintTaskList);
    sprintItemsParsed = JSON.parse(localStorage.getItem('sprintBacklogArray'));
    sprintItemsParsed.push(sprintObject)
    localStorage.setItem('sprintBacklogArray',JSON.stringify(sprintItemsParsed));

}

function sprintCreationBackOnClick()
{
    window.location = 'sprintList.html'
}

function onSprintListLoad()
{
    //Run through entirety of local storage. Parse the elements back into objects 
    //for each object, print the summarised info into a dynamically created div element 
    array = JSON.parse(localStorage.getItem('sprintBacklogArray'));
    let htmlElements = "";
    for (let i = 0; i < array.length; i++) {
        let sprintName = array[i].sprintName; //this is the name of the task from the new object
        let sprintStartDate = array[i].sprintStartDate; //Gets the priority for dynamic entering
        let sprintEndDate = array[i].sprintEndDate;
        let sprintInProgress = array[i].sprintInProgress;
       htmlElements += ' <div class = "mdl-cell mdl-cell--3-col graybox" style = "position: relative; top: 90%"' + 'id=' + '"' + i + '"' + '>' + "<p id = 'taskTextSprint'>" + sprintName + '<br>' + "Sprint Start Date: " + sprintStartDate + '<br>' + "Sprint End Date: " + sprintEndDate + '<br>' + "Sprint Progression: " + sprintInProgress + "<br>" + "<\p>" + '</div>';
    }
    let sprintPlacement = document.getElementById("sprintPlacement");
    sprintPlacement.innerHTML = htmlElements;

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
                manageSprintView()  // @ Stefan this is where u come in
                localStorage.setItem('currentSprintId',JSON.stringify(button.id))
            };
            let id = j.toString();
            let container = document.getElementById(id);
            container.appendChild(button);
    }

}

function manageSprintView()
{
    window.location.replace('manageMySprint.html');
}