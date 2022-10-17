//This aims at allowing the creation of team members, displaying team members details
//Details includes name, email.


function onTeamMemberCreationLoad()
//This function creates the team member array for local storage 
{
    // localStorage.setItem('currentTaskID',JSON.stringify(0))
    if (localStorage.getItem('teamMemberArray') )
{
    console.log("TEST")
}
else
//Adding in the team member array to local storage if not already there. 
{
    localStorage.setItem('teamMemberArray',JSON.stringify([]));
}
}

let teamMemberItem = class {
    constructor(teamMemberFirstName, teamMemberLastName, teamMemberEmail,teamMemberAccumulatedHours, teamMemberSprintInvolvement)
    {
        this.teamMemberFirstName = teamMemberFirstName
        this.teamMemberLastName = teamMemberLastName
        this.teamMemberEmail = teamMemberEmail
        this.teamMemberAccumulatedHours = teamMemberAccumulatedHours
        this.teamMemberSprintInvolvement = teamMemberSprintInvolvement
    }

}


function addTeamMemberSaveOnClick()
//When the team member "add" button is clicked, this function is called
{
    teamMemberFirstName = document.getElementById("teamMemberFirstName").value 
    teamMemberLastName = document.getElementById("teamMemberLastName").value 
    teamMemberEmail = document.getElementById("teamMemberEmail").value
    teamMemberSprintInvolvement = "None" //Just for now
    teamMemberAccumulatedHours = [] //Just for now

    if (teamMemberFirstName == null || teamMemberLastName == null || teamMemberEmail == null){
        errorMessageLocation = document.getElementById('errorMessage')
        errorMessageLocation.innerHTML = "Please Fill Out the team member: First and Last name and their email"
        return
    }



    let teamMemberItem1 = new teamMemberItem(teamMemberFirstName, teamMemberLastName, teamMemberEmail,teamMemberAccumulatedHours,teamMemberSprintInvolvement);
    teamMemberParsed = JSON.parse(localStorage.getItem('teamMemberArray'))
    teamMemberParsed.push(teamMemberItem1)
    localStorage.setItem('teamMemberArray',JSON.stringify(teamMemberParsed));
    window.location = 'teamMembers.html'
}

function addTeamMemberBackOnClick()
//After adding a team member, the user is sent back to the teamMembers page
{
    window.location = 'teamMembers.html'
}

function onTeamMembersLoad()
{

    if (localStorage.getItem('teamMemberArray') )
    {
        console.log("TEST")
    }
    else
    //Adding in the team member array to local storage if not already there. 
    {
        localStorage.setItem('teamMemberArray',JSON.stringify([]));
    }
    //Run through entirety of local storage. Parse the elements back into objects 
    //for each object, print the summarised info into a dynamically created div element
    array = JSON.parse(localStorage.getItem('teamMemberArray'));
    let htmlElements = "";
        for (let i = 0; i < array.length; i++) 
        {

            let teamMemberFirstName = array[i].teamMemberFirstName; //this is the name of the task from the new object
            let teamMemberLastName = array[i].teamMemberLastName; //Gets the priority for dynamic entering
                htmlElements += `<div class = 'teamMemberBox' id="teamMemberBox" onclick = createTeamMemberDetailedView(${i}) ><p id = 'teamMemberText'>${teamMemberFirstName}<br> ${teamMemberLastName}</p></div>` +
                `<button class = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent mdl-color--red-400 deleteButton' + onclick = 'deleteTeamMember(${i})' id = 'deleteTeamMember'> Delete </button>`;
        }
        

   
    let teamMemberPlacement = document.getElementById("teamMemberPlacement");
    teamMemberPlacement.innerHTML = htmlElements;

        //Team member dashboard! ''




        //TM dashboard NEW
    
    }


    function dateRange(dateStarted, dateEnded, steps = 1) {
      let dateArray = [];
      let currentDate = dateStarted
      let endD = dateEnded
    
      while (currentDate <= endD) {
        dateArray.push(new Date(currentDate));
        // Use UTC date to prevent problems with time zones and DST
        currentDate.setUTCDate(currentDate.getUTCDate() + steps);
      }
    
      return dateArray;
    }

function checkOnClick2()
 //THis is for when a user clicks on the SD and ED in the team.html page. 
{
  document.getElementById("placement").value = ""
  let dateStarted = new Date(document.getElementById("dateStarted").value)
  let dateEnded = new Date(document.getElementById("dateEnded").value)
  let tm = JSON.parse(localStorage.getItem("teamMemberArray"))
  
  for (let i = 0; i < tm.length; i++) 
  {
    let dateArray = []
    let hoursAcc = 0 
    for (let j = 0; j < tm[i].teamMemberAccumulatedHours.length; j++) 
    {
      date = new Date(tm[i].teamMemberAccumulatedHours[j][0])
      dateArray.push(date)

    }
    for (let k = 0; k < dateArray.length; k++) 
    {
      if( dateStarted <= dateArray[k] && dateEnded >= dateArray[k] )
      {
          hoursAcc += parseInt(tm[i].teamMemberAccumulatedHours[k][1])
      }
    }
    let dates2 = dateRange(dateStarted, dateEnded);
      totalNumDays = dates2.length;
    let teamMemberPlacement = document.getElementById("placement");
    teamMemberPlacement.innerHTML += tm[i].teamMemberFirstName + " accumulated hours:       " +  hoursAcc + " hrs,  " + "       Average daily work = " + Math.ceil(hoursAcc/totalNumDays) + ".  "  + `<br>`;
  }
}

function addTeamMemberOnClick()
{
    window.location.href = 'tmCreation.html'   
}

function deleteTeamMember(index){
    
    if (confirm("Are you sure you want to delete the team member ?")) {
        array = JSON.parse(localStorage.getItem('teamMemberArray'));
       array.splice(index,1)
        localStorage.setItem('teamMemberArray',JSON.stringify(array));
        location.reload();  

    }
}

function createTeamMemberDetailedView(index)
{
    window.location.href = "teamMemberDetailed.html"
    localStorage.setItem('currentTeamMember',JSON.stringify(index))
    

}

function teamMemberDetailedView()
{   

    //Get the local storage items 
    //Parse the local storage items
    //Get the item for the currently selected item (via button id?)
    teamMemberString = JSON.parse(localStorage.getItem('currentTeamMember')); //Gets the ID of the current button (position within the local storage array)
    tm = JSON.parse(localStorage.getItem('teamMemberArray')); //Gets the entire array
    elementNum = parseInt(teamMemberString);

    document.getElementById('teamMemberName').innerHTML = tm[elementNum].teamMemberFirstName + tm[elementNum].teamMemberLastName
    document.getElementById('teamMemberEmail').innerHTML = tm[elementNum].teamMemberEmail
    document.getElementById('currentSprintName').innerHTML = tm[elementNum].teamMemberSprintInvolvement
    let dateStarted = new Date(JSON.parse(localStorage.getItem("activeSprint")).sprintStartDate)
    let dateEnded = new Date(JSON.parse(localStorage.getItem("activeSprint")).sprintEndDate)
    dateArray = []
    for (let k = 0; k < tm[elementNum].teamMemberAccumulatedHours.length; k++) 
    {
      date = new Date(tm[elementNum].teamMemberAccumulatedHours[k][0])
      dateArray.push(date)
    }
    let dates = []
    let hours = []
    for (let k = 0; k < tm[elementNum].teamMemberAccumulatedHours.length; k++) 
    {
      if( dateStarted <= dateArray[k] && dateEnded >= dateArray[k])
      {
          dates.push(dateArray[k])
          hours.push(tm[elementNum].teamMemberAccumulatedHours[k][1])
      }
    }
    var xValues = dates;
    var yValues = hours;
    var barColors = ["red", "green","blue","orange","brown"];
    var ctx = document.getElementById("myChart");
    Chart.defaults.global.defaultFontColor = "White";
    var myChart = new Chart(ctx,{
      type: "bar",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        plugins: {
            title: {
                display: true,
                text: 'Hours worked by date',
                padding: {
                  top: 10,
                  bottom: 30
              }
            }
        }
    }
    });
   
}
