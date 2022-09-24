function loadBurndownChart() {
    sprintID = JSON.parse(localStorage.getItem('currentSprintId'));
    sprintArray = JSON.parse(localStorage.getItem('sprintBacklogArray'));
    currSprint = sprintArray[sprintID]
    // console.log(currSprint)
    startDate = new Date(currSprint.sprintStartDate);
    endDate =  new Date(currSprint.sprintEndDate)
    datesBetween = getDatesinRange(startDate,endDate);
    totalStoryPoints = 0
    for (i = 0; i < currSprint.sprintTaskList.length; i++){
        // console.log(currSprint.sprintTaskList[i])
        totalStoryPoints += parseInt(currSprint.sprintTaskList[i].taskStoryPoint)
    }
    var yValues = []
    yValues.push(totalStoryPoints)
    toMinus = parseFloat((totalStoryPoints*1.0/datesBetween.length).toFixed(2))
    // console.log(yValues[-1] - toMinus)
    for (i = 0; i < datesBetween.length; i++){
        yValues.push(yValues[yValues.length-1] - toMinus);
    }

    
    new Chart("myChart", {
      type: "line",
      data: {
        labels: datesBetween,
        datasets: [{
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,0,1)",
          borderColor: "rgba(0,0,0,1)",
          data: yValues
        }]
      },
      options: {
        legend: {display: true},
        scales: {
          yAxes: [{ticks: {min: 0, max:totalStoryPoints}}],
        }
      }
    });
    
}
function getDatesinRange(startDate,endDate){
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
        newDate = new Date(date)
        days = newDate.getDate()
        months = newDate.getMonth()
        dates.push(days + "/" + months);
        date.setDate(date.getDate() + 1);
    }
    return dates;
}