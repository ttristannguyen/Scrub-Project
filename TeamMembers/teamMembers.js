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

        //Team member dashboard! 
        let start = (JSON.parse(localStorage.getItem("firstDate")));
        let end =  (JSON.parse(localStorage.getItem("lastDate")));
        function dateRange(startDate, endDate, steps = 1) {
            const dateArray = [];
            let currentDate = new Date(startDate);
            let endD = new Date(endDate);
          
            while (currentDate <= endD) {
              dateArray.push(new Date(currentDate));
              // Use UTC date to prevent problems with time zones and DST
              currentDate.setUTCDate(currentDate.getUTCDate() + steps);
            }
          
            return dateArray;
          }
          
          let dates = dateRange(start, end);
          totalNumDays = dates.length;
          totalAccHours = 0;
          yValues = []
          let sprintSdEd = []
          for (let i = 0; i<dates.length;i++)
          {
            yValues.push(0); //Space filler
            sprintSdEd.push(0);
          }
          let sprintHoursOld = JSON.parse(localStorage.getItem("sprintBacklogArray"));
          let sprintHours = []
         
          for (let i = 0; i<sprintHoursOld.length;i++)
          {

    
            for (let j = 0; j<sprintHoursOld[i].sprintAccumulatedHours.length;j++)
          {
           
            sprintHours.push(sprintHoursOld[i].sprintAccumulatedHours[j]);
          }
     
           
          }
          for (let i = 0; i<sprintHoursOld.length;i++)
          {
            let sd = new Date(sprintHoursOld[i].sprintStartDate)
            let ed = new Date(sprintHoursOld[i].sprintEndDate)
            for (let j = 0; j < dates.length; j++)
            {
                if(sd.getTime() == dates[j].getTime())
                {
                    sprintSdEd[j] += i+1
                }
                
                if(ed.getTime() == dates[j].getTime())
                {
                    sprintSdEd[j] += i+1
                }
            }
          }

        
          for (let i = 0; i < sprintHours.length; i++) 
          {
            let sprintDate = new Date(sprintHours[i][0]);
            for (let j = 0; j < dates.length; j++)
            {
                if(sprintDate.getTime() == dates[j].getTime())
                {
                    yValues[j] += parseInt(sprintHours[i][1])
                    totalAccHours += parseInt(sprintHours[i][1]);
                }
            }
          }
          datesUpdate = []
          for(let i = 0; i<dates.length; i++)
          {
            datesUpdate.push(dates[i].toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }),)
          }
          
        /*  new Chart("myChart1", {
            type: "line",
            data: {
              labels: datesUpdate,
              datasets: [{
                backgroundColor: "rgba(0,0,0,1.0)",
                borderColor: "rgba(0,0,0,0.1)",
                data: yValues
              }]
            },
         
          });*/
          //For every new sprint, set all the dates of the sprint to 1, all other dates not in the sprint get set to 0 
          //Each new sprint is +1 so that the date is cascading.


          var xAxisLabelMinWidth = 15; // Replace this with whatever value you like
          var myChart = new Chart(document.getElementById('myChart1').getContext('2d'), {
              type: 'line',
              data: { labels: datesUpdate,
                datasets: [{
                  label: "Hours", 
                  backgroundColor: "rgb(0,0,255)",
                  borderColor: "rgb(0,0,255)",
                  data: yValues},
                  {
                    label: "Sprint number",
                    fillColor: 'rgb(255,0,0)',
                    backgroundColor: 'rgb(255,0,0)',
                    pointColor: 'rgb(255,0,0)',
                    showLine: false,
                    data: sprintSdEd,
                    pointStyle: 'triangle',
                    radius: 6,
                },

                ]},
              options: {
                  responsive: true,
                  maintainAspectRatio: false,
            
                    title: {
                        display: true,
                        text: 'Team logged hours',
                        fontColor: 'white'
                    },
                    scales: {
                        yAxes: [{
                          scaleLabel: {
                            display: true,
                            labelString: 'Hours / Sprint Number',
                            size:32,
                            fontColor: 'white',
                          },
                          ticks: {fontColor:'white'},
                        }],
                        xAxes: [{
                          scaleLabel: {
                            display: true,
                            labelString: 'Date',
                            size:32,
                            fontColor: 'white',
                          },
                          ticks: {fontColor:'white'}
                        }]
                      },
                      legend: {display: true,
                        labels: {
                          fontColor: 'white',
                      }},     
                
              }
          });
          
          function fitChart(){
              var chartCanvas = document.getElementById('myChart1');
              var maxWidth = chartCanvas.parentElement.parentElement.clientWidth;
              var width = Math.max(myChart.data.labels.length * xAxisLabelMinWidth, maxWidth);
          
              chartCanvas.parentElement.style.width = width +'px';
          }
          myChart
          fitChart();

          let averageHours = Math.ceil(totalAccHours/totalNumDays);
          
          document.getElementById('teamAnalytics').innerHTML += averageHours + 'hr/s per day' + `<br> <br>` + 'TOTAL TEAM HOURS: ' + totalAccHours + 'hrs';
          
          
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
    array = JSON.parse(localStorage.getItem('teamMemberArray')); //Gets the entire array
    elementNum = parseInt(teamMemberString);

    currentTeamMember = array[elementNum];
    document.getElementById('teamMemberName').innerHTML = array[elementNum].teamMemberFirstName + array[elementNum].teamMemberLastName
    document.getElementById('teamMemberEmail').innerHTML = array[elementNum].teamMemberEmail
    document.getElementById('currentSprintName').innerHTML = array[elementNum].teamMemberSprintInvolvement
    tmArray = JSON.parse(localStorage.getItem('teamMemberArray'))
    accHours = 0
    loggedHours = tmArray[elementNum].teamMemberAccumulatedHours
    for (let i = 0; i < loggedHours.length; i++) 
    {
        accHours += parseInt(loggedHours[i][1]);
    }
    document.getElementById('accumulatedHours').innerHTML = accHours;


}
function checkOnClick()
{
    //checkOnClick.preventDefault();
    let startDateStr = (document.getElementById('dateStarted').value);
    console.log(startDateStr);
    let startDate = new Date(startDateStr);
    let endDateStr = (document.getElementById('dateEnded').value);
    let endDate = new Date (endDateStr);
    function dateRange(startDate, endDate, steps = 1) {
        const dateArray = [];
        let currentDate = new Date(startDate);
        let endD = new Date(endDate);
      
        while (currentDate <= endD) {
          dateArray.push(new Date(currentDate));
          // Use UTC date to prevent problems with time zones and DST
          currentDate.setUTCDate(currentDate.getUTCDate() + steps);
        }
      
        return dateArray;
      }
    let hoursAndDate =  JSON.parse(localStorage.getItem('teamMemberArray'))[elementNum].teamMemberAccumulatedHours
      let dates = dateRange(startDate, endDate);
      totalNumDays = dates.length;
      let yValues2 = []
     let totalAccHours = 0;
      for (let i = 0; i<dates.length;i++)
          {
            yValues2.push(0); //Space filler
            
          }



          for (let i = 0; i < hoursAndDate.length; i++) 
          {
            let dateDay = new Date(hoursAndDate[i][0]);
            for (let j = 0; j < dates.length; j++)
            {
                if(dateDay.getTime() == dates[j].getTime())
                {
                    yValues2[j] += parseInt(hoursAndDate[i][1])
                    totalAccHours += parseInt(hoursAndDate[i][1]);
                }
            }
          }
         let datesUpdate2 = []
          for(let i = 0; i<dates.length; i++)
          {
            datesUpdate2.push(dates[i].toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }),)
          }
      console.log(datesUpdate2);
      console.log(yValues2);
      var xAxisLabelMinWidth = 10
      var myChart2 = new Chart(document.getElementById('myChart2').getContext('2d'), {
        type: 'line',
        data: { labels: datesUpdate2,
          datasets: [{
            label: "Hours", 
            backgroundColor: "rgba(255,255,255,255)",
            borderColor: "rgba(255,255,255,255)",
            data: yValues2},
      

          ]},
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {display: true,
              labels: {
                fontColor: 'white'
              }},
      
              title: {
                  display: true,
                  text:document.getElementById('teamMemberName').innerHTML + 's logged hours',
                  fontColor: 'white,'
              },
              scales: {
                  yAxes: [{display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Hours logged',
                      fontColor:'white'},
                      ticks: {fontColor:'white'},
                      
                    
                  }],
                  xAxes: [{display: true,
                     scaleLabel:
                      {display: true,
                         labelString: "Dates",
                          fontColor:'white'},
                          ticks: {fontColor:'white'}}],
                }     
          
        }
    });
    
    function fitChart(){
        var chartCanvas = document.getElementById('myChart2');
        var maxWidth = chartCanvas.parentElement.parentElement.clientWidth;
        var width = Math.max(myChart2.data.labels.length * xAxisLabelMinWidth, maxWidth);
    
        chartCanvas.parentElement.style.width = width +'px';
    }
    myChart2
    fitChart();

    let averageHours = Math.ceil(totalAccHours/totalNumDays);
    document.getElementById('teamAnalytics').innerHTML = ""
    document.getElementById('teamAnalytics').innerHTML += 'DAILY AVERAGE' + averageHours + 'hr/s per day' + `<br> <br>` + 'TOTAL HOURS: ' + totalAccHours + 'hrs';
     


}