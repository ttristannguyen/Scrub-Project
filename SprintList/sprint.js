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
        onSprintListLoad()
    }
    else
    {
        localStorage.setItem('sprintBacklogArray',JSON.stringify([]));
    }
}

let sprintObjectObj = class {
    constructor(sprintName, sprintStartDate, sprintEndDate, sprintInProgress, sprintTaskList,sprintAccumulatedHours)
    {
        this.sprintName = sprintName;
        this.sprintStartDate = sprintStartDate;
        this.sprintEndDate = sprintEndDate;
        this.sprintInProgress = sprintInProgress;
        this.sprintTaskList = sprintTaskList;
        this.sprintAccumulatedHours = sprintAccumulatedHours;

    }

}

function sprintCreationDoneBtnOnClick()
{
    sprintName = document.getElementById("sprintName").value 
    sprintStartDate = document.getElementById("sprintStartDate").value 
    sprintEndDate = document.getElementById("sprintEndDate").value 
    sprintInProgress = 0
    sprintTaskList = [];
    sprintAccumulatedHours = [];//just for now
    //Checking if this is the first sprint!

    let sprintObject = new sprintObjectObj(sprintName,sprintStartDate,sprintEndDate,sprintInProgress,sprintTaskList,sprintAccumulatedHours);
    sprintItemsParsed = JSON.parse(localStorage.getItem('sprintBacklogArray'));
    if (sprintItemsParsed.length == 0)
    {
        localStorage.setItem("firstDate",JSON.stringify(sprintStartDate))
    }
    localStorage.setItem("lastDate",JSON.stringify(sprintEndDate));
    sprintItemsParsed.push(sprintObject)
    localStorage.setItem('sprintBacklogArray',JSON.stringify(sprintItemsParsed));
    window.location = 'sprintList.html'
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
       htmlElements += ' <div class = "mdl-cell mdl-cell--3-col graybox" style = "position: relative; top: 90%"' + 'id=' + '"' + i + '"' + '>' + "<p id = 'taskTextSprint'>" + sprintName + '<br>' + "Sprint Start Date: " + sprintStartDate + '<br>' + "Sprint End Date: " + sprintEndDate + '<br>' + "Sprint Progression: " + sprintInProgress + "<br>" + "<\p>" + '</div>' +
       `<button class = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent mdl-color--red-400 deleteSprint' + onclick = 'deleteSprint(${i})'> Delete </button>`;
    
    }
    let sprintPlacement = document.getElementById("sprintPlacement");
    sprintPlacement.innerHTML = htmlElements;

    let activeSprintID = JSON.parse(localStorage.getItem("activeSprintID"))
    for (let j = 0; j<array.length; j++)
    {
            let button = document.createElement('button');
            button.type = 'button';
            button.innerHTML = 'See/edit details';
            button.className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent seeDetailsBtn" 
            button.id = j.toString();

            if (j == activeSprintID || array[j].sprintInProgress == 2) {
                button.onclick = function() {
                    //I want to be able to click on the button, be taken to a 'detailed view' page, where i can possibly make a change to the task. 
                    //This will edit the task in local storage.
                    window.location.assign("../Kanban/kanban.html")
                    localStorage.setItem('currentSprintId',JSON.stringify(button.id))
                };
            }
            else {
                button.onclick = function() {
                    //I want to be able to click on the button, be taken to a 'detailed view' page, where i can possibly make a change to the task. 
                    //This will edit the task in local storage.
                    manageSprintView()  // @ Stefan this is where u come in
                    localStorage.setItem('currentSprintId',JSON.stringify(button.id))
                };
            }
            let id = j.toString();
            let container = document.getElementById(id);
            container.appendChild(button);
    }

}

function deleteSprint(index){
    
    if (confirm("Are you sure you want to delete the task ?")) {
        let activeSprintID = JSON.parse(localStorage.getItem("activeSprintID"));
        array = JSON.parse(localStorage.getItem('sprintBacklogArray'));
        // taskIDString = JSON.parse(localStorage.getItem('currentTaskId'));

        if (array[activeSprintID] == array[index]) {
            alert("You kant delete an active sprint");
            return;
        }
        
        // elementNum = parseInt(taskIDString);
        delete array[index];
        array = array.filter(n => n) 
        localStorage.setItem('sprintBacklogArray',JSON.stringify(array));
        location.reload();  

    }
}

function createDetailedView(index)
{
    // console.log(index)
    window.location.href = "../Kanban/kanban.html"
    localStorage.setItem('currentSprintId',JSON.stringify(index))
    

}



function manageSprintView()
{
    window.location.replace('sprintManagement.html');
}
function getDatesinRange(startDate,endDate){
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
        newDate = new Date(date)
        days = newDate.getDate()
        months = newDate.getMonth()
        dates.push(0);
        date.setDate(date.getDate() + 1);
    }
    return dates;
}
