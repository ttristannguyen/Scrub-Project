
function onTeamMemberCreationLoad()
{
    // localStorage.setItem('currentTaskID',JSON.stringify(0))
    if (localStorage.getItem('teamMemberArray') )
{
    console.log("TEST")
}
else
{
    localStorage.setItem('teamMemberArray',JSON.stringify([]));
}

}

let teamMember = class {
    constructor(firstName, lastName, emailAddress)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
    }

}

function teamMemberCreationOnClick()
{
    firstName = document.getElementById("firstName").value 
    lastName = document.getElementById("lastName").value 
    emailAddress= document.getElementById("emailAddress").value 
    console.log(firstName)
    console.log(lastName)
    if (firstName == null || lastName == null || emailAddress == null){
        errorMessageLocation = document.getElementById('errorMessage')
        errorMessageLocation.innerHTML = "Please Fill Out the First Name, Last Name and Email Address"
        return
    }

    let teamMemberObj = new teamMember(firstName,lastName,emailAddress);
    teamMembersParsed = JSON.parse(localStorage.getItem('teamMemberArray'))
    teamMembersParsed.push(teamMemberObj)
    localStorage.setItem('teamMemberArray',JSON.stringify(teamMembersParsed));
    window.location = 'teamMembers.html'
}

function teamMemberCreationBackOnClick()
{
    window.location = 'teamMembers.html'
}


function onTeamMemberLoad()
{
    //Run through entirety of local storage. Parse the elements back into objects 
    //for each object, print the summarised info into a dynamically created div element
    array = JSON.parse(localStorage.getItem('teamMemberArray'));
    let htmlElements = "";
    for (let i = 0; i < array.length; i++) {
        let firstName = array[i].firstName; //this is the name of the task from the new object
        let lastName = array[i].lastName; //Gets the priority for dynamic entering
        console.log(lastName)
        htmlElements += `<div class = 'mdl-cell mdl-cell--3-col graybox pbiBox' onclick = createDetailedView(${i}) style = 'position: relative; top: 90%' id="${i}"><p id = 'taskText'>${taskName}<br>Priority: ${priority}<br>Story Points:${storyPoints}<\p></div>` +
        // "<button class = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent mdl-color--green-400' + onclick = 'createDetailedView()' id = 'detailViewBtn'> See/Edit Details </button>" + 
        `<button class = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent mdl-color--red-400' + onclick = 'deletePBI(${i})' id = 'deleteBtn'> Delete </button>`;
        
    }
    let memberPlacement = document.getElementById("memberPlacement");
    memberPlacement.innerHTML = htmlElements;

    

    // for (let j = 0; j<elements.length; j++)
    // {
        
    //     let button = document.createElement('button');
    //     button.type = 'button';
    //     button.innerHTML = 'See/edit details';
    //     button.className = 'btn-styled';
    //     button.id = "" + j + "";
    //     button.onclick = function() {
    //         //I want to be able to click on the button, be taken to a 'detailed view' page, where i can possibly make a change to the task. 
    //         //This will edit the task in local storage.
    //         createDetailedView()
    //         localStorage.setItem('currentTaskId',JSON.stringify(button.id))
    //     };
    //     console.log(button)
            
    //     let button2 = document.createElement('button');
    //     button2.type = 'button';
    //     button2.innerHTML = 'Delete';
    //     button2.className = 'btn-styled_del';
    //     button2.id = "" + j + ""
    //     button2.onclick = function() {
    //         deletePBI()
    //         localStorage.setItem('currentTaskId',JSON.stringify(button2.id))
    //     };

    //     let id = j.toString();
    //     let container = document.getElementById(id);
    //     console.log(container)
    //     container.appendChild(button);
    //     container.appendChild(button2);


    // }

}

function addTeamMemberOnClick()
{
    window.location.href = 'teamMemberCreation.html'
}

function deletePBI(index){
    
    if (confirm("Are you sure you wanna delete this Team Member ?")) {
        array = JSON.parse(localStorage.getItem('teamMemberArray'));
        // taskIDString = JSON.parse(localStorage.getItem('currentTaskId'));
        
        // elementNum = parseInt(taskIDString);
        delete array[index];
        array = array.filter(n => n) 
        localStorage.setItem('teamMemberArray',JSON.stringify(array));
        location.reload();  
        console.log("A")
    }
 
}

/*
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
    switch (currentTask.taskType){
        case "Ui":
            document.getElementById('taskType').value = "UI";
            break;
        case "Testing":
            document.getElementById('taskType').value = "Testing";
            break;
        case "Core":
            document.getElementById('taskType').value = "Core";
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
    taskType = document.getElementById("taskType").value 
    taskStoryPoint = document.getElementById("taskStoryPoint").value 
    taskPriorityTag = document.getElementsByTagName('input')
    
    if (taskName == "" || taskDescription == "" || taskType == ""){
        console.log("taskName " + taskName )
        console.log("taskdesc " + taskDescription )
        console.log("tasktype " + taskType)
        return 
    }
    for (var i = 0 ; i < taskPriorityTag.length ; i++) {
        if (taskPriorityTag[i].type == 'radio' && taskPriorityTag[i].checked){ var taskPriority = taskPriorityTag[i].value}
        
    }
    console.log(taskPriority)
    let productBackLogItemObj = new projectBacklogItem(taskName,taskDescription,taskType,taskStoryPoint,taskPriority);
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
}*/