// This file aims at providing the functionality to add a team member in the Team Member page
// This is done by the following steps: 
// Step 1: User clicks on Add Team Member
// Step 2: This takes the user to a new page called ...
// Step 3: This page includes a form-style data input 
// Step 4: User enters their details about the Team Member
// Step 5: The user presses done when they have entered all the required fields 
// Step 6: The details are then added to local storage object under the KEY ...
// Step 7: The user is returned to the main Team Member page
// Step 8: The project backlog item shows
// Step 9: When the project backlog div item is created dynamically, a button is also dynamically created at the bottom right hand corner, this 
//          button can allow a user to see the detailed view of the  task DONE
// step 10: When viewing the detailed view of the task, the details are not editable, however, a user should be able to "edit task details" 
// Step 11: This "edit task details" button takes a user to a pre-filled - editable - form, allowing them to edit any detail in the form that they want. 

//let projectBacklogItemsArray = []; //This will store multiple instances of the PBI objects

function onTmCreationLoad()
{
    if (localStorage.getItem('teamMembersArray') )
{
    console.log("TEST")
}
else
{
    localStorage.setItem('teamMembersArray',JSON.stringify([]));
}

}

let teamMembers = class {
    constructor(first, last, email)
    {
        this.firstName = first;
        this.lastName = last;
        this.emailAddress = email;
    }
}

function tmCreationOnClick()
{
    first = document.getElementById("tmFirstName").value 
    last = document.getElementById("tmLastName").value 
    email = document.getElementById("tmEmail").value 

    let teamMembersObj = new teamMembers(first,last,email);
    teamMembersParsed = JSON.parse(localStorage.getItem('teamMembersArray'))
    teamMembersParsed.push(teamMembersObj)
    localStorage.setItem('teamMembersArray',JSON.stringify(teamMembersParsed));

}

function tmCreationBackOnClick()
{
    window.location = 'teamMembers.html'
}


function onTeamMembersLoad()
{
    //Run through entirety of local storage. Parse the elements back into objects 
    //for each object, print the summarised info into a dynamically created div element 
    array = JSON.parse(localStorage.getItem('teamMembersArray'));
    let htmlElements = "";
    for (let i = 0; i < array.length; i++) {
        let memberFirst = array[i].first; 
        let memberLast= array[i].last; 
       htmlElements += ' <div class = "mdl-cell mdl-cell--3-col graybox" style = "position: relative; top: 90%"' + 'id=' + '"' + i + '"' + '>' + "<p id = 'taskText'>" + memberFirst + '<br>' + "Priority: " + memberLast+ '<br>' + "<\p>" + '</div>';
    }
    let memberPlacement = document.getElementById("memberPlacement");
    memberPlacement.innerHTML = htmlElements;

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
                teamMemberDetailedView()
                localStorage.setItem('currentMemberId',JSON.stringify(button.id))
            };
            let id = j.toString();
            let container = document.getElementById(id);
            container.appendChild(button);
    }

}

function addTeamMemberOnClick()
{
    window.location.href = 'tmCreation.html'   
}

function teamMemberDetailedView()
{
    window.location.href = "teamMemberDetailedView.html"
    //DO this page
}

function teamMemberDetailedViewOnLoad()
{
    //Get the local storage items 
    //Parse the local storage items
    //Get the item for the currently selected item (via button id?)
    taskIDString = JSON.parse(localStorage.getItem('currentMemberId')); //Gets the ID of the current button (position within the local storage array)
    array = JSON.parse(localStorage.getItem('teamMembersArray')); //Gets the entire array
    elementNum = parseInt(taskIDString);
    currentMember = array[elementNum];
    document.getElementById('teamMemberFirstName').setAttribute('value',currentMember.first);
    document.getElementById('teamMemberLastName').setAttribute('value',currentMember.last);
    document.getElementById('teamMemberEmail').setAttribute('value',currentMember.email);

}

function saveEditedDetails()
{
    first = document.getElementById("firstName").value 
    last = document.getElementById("lastName").value 
    email = document.getElementById("email").value 
    let teamMembersObj = new TeamMembers(first,last,email);
    array = JSON.parse(localStorage.getItem('teamMembersArray'))
    memberIDString = JSON.parse(localStorage.getItem('currentMemberId'));
    elementNum = parseInt(memberIDString);    
    array[elementNum] = teamMembersObj; //FIND AND REPLACE
    //Need to re-set back into local storage
    localStorage.setItem('teamMembersArray',JSON.stringify(array));
    console.log("TEST 1")

}

function editDetailBackOnClick()
{
    console.log("TEST 2");
    window.location.replace('teamMembers.html')
}