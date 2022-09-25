function loadBurndownChart() {

    sprintID = JSON.parse(localStorage.getItem('currentSprintId'));
    sprintArray = JSON.parse(localStorage.getItem('sprintBacklogArray'));
    currSprint = sprintArray[sprintID]
    // accumulatedHours = currSprint.dateDifferences;

    currDate = new Date();
    startDate = new Date(currSprint.sprintStartDate);
    endDate =  new Date(currSprint.sprintEndDate)
    datesBetween = getDatesinRange(startDate,endDate);
    totalStoryPoints = 0;
    // Expected Hours
    for (i = 0; i < currSprint.sprintTaskList.length; i++){
        totalStoryPoints += parseInt(currSprint.sprintTaskList[i].taskStoryPoint)
    }
    var yValues = []
    yValues.push(totalStoryPoints)

    toMinus = parseFloat((totalStoryPoints*1.0/(datesBetween.length-1)).toFixed(2));
    console.log(toMinus)
    for (i = 0; i < datesBetween.length; i++){
        yValues.push((yValues[yValues.length-1] - toMinus).toFixed(2));
    }
    // Actual Hours
    actualHours = []
    fromStartDatetoNow(startDate,new Date(),actualHours,totalStoryPoints);
    console.log(actualHours)
    for (i = 0; i < currSprint.sprintAccumulatedHours.length; i++){
        difference = (new Date(currSprint.sprintAccumulatedHours[i][0])).getTime() - startDate.getTime();
        index = difference / (1000*3600*24)
        for (j = index; j <= actualHours.length - 1; j ++){
            actualHours[j] -= currSprint.sprintAccumulatedHours[i][1]
        }
    }
    // Accumulated Hours
    accumulatedHours = []
    fromStartDatetoNow(startDate,new Date(),accumulatedHours,0);
    for (i = 0; i < currSprint.sprintAccumulatedHours.length; i++){
        difference = (new Date(currSprint.sprintAccumulatedHours[i][0])).getTime() - startDate.getTime();
        index = difference / (1000*3600*24)
        for (j = index; j <= accumulatedHours.length - 1; j ++){
            accumulatedHours[j] += parseInt(currSprint.sprintAccumulatedHours[i][1])
        }
    }
    console.log(accumulatedHours)



    new Chart("myChart", {
      type: "line",
      data: {
        labels: datesBetween,
        datasets: [{
          label: "Ideal Sprint Velocity",
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(255,0,0,1)",
          borderColor: "rgba(255,0,0,1)",
          data: yValues,
        }, 
        {
          label: "Actual Sprint Velocity",
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,255,0,1)",
          borderColor: "rgba(0,255,0,1)",
          data: actualHours,
        },
        {
          label: "Accumulated Effort",
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1)",
          borderColor: "rgba(0,0,255,1)",
          data: accumulatedHours,
        }
    ]},
      options: {
        legend: {display: true,},
        scales: {
          yAxes: [{ticks: {min:-10, max:totalStoryPoints}}],
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
function fromStartDatetoNow(startDate,endDate,array,value){
    const date = new Date(startDate.getTime());

    // const dates = [];

    while (date <= endDate) {
        newDate = new Date(date)
        days = newDate.getDate()
        months = newDate.getMonth()
        date.setDate(date.getDate() + 1);
        array.push(value)
        
    }
    return
}