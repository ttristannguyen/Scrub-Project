// Predefined keys for LS
const TASK_KEY = "currentTaskIndex"
const PBILIST_KEY = "PBIListData"
// class ProjectBacklogItem {
//     constructor(taskName, taskDescription, taskType, taskStoryPoint, taskPriority)
//     {
//         this.taskName = taskName;
//         this.taskDescription = taskDescription;
//         this.taskType = taskType;
//         this.taskStoryPoint = taskStoryPoint;
//         this.taskPriority = taskPriority;
//     }
//     get taskName() {return this.taskName}
//     get taskDescription() {return this.taskDescription}
//     get taskType() {return this.taskType}
//     get taskStoryPoint() {return this.taskStoryPoint}
//     get taskPriority() {return this.taskPriority}
//     fromData(data) {
//         this.taskName = data.taskName;
//         this.taskDescription = data.taskDescription;
//         this.taskType = data.taskType;
//         this.taskStoryPoint = data.taskStoryPoint;
//         this.taskPriority = data.taskPriority;
//     }

// }

class PBIList {
    constructor() {
        this.PBIList = [];
    }
    get PBIList() { return this.PBIList; }
    addItem(PBI) {

        if (PBI instanceof ProjectBacklogItem) {

            this.PBIList.push(PBI);
        }
    }
    getItem(task_key) {

        return this.PBIList[task_key];

    }
    fromData(data) {
        this.PBIList = [];
        let tasks = []
        for (let i = 0; i < data.PBIList.length; i++) {
            let tempItems = new ProjectBacklogItem();
            tempItems.fromData(data.PBIList.taksks[i]);
            PBIList.items.push(tempItems);
        }
    }


}



function checkLSData(key) {
    if (localStorage.getItem(key) != null) {
        return true;
    }
    return false;
}

function retrieveLSData(key) {
    let data = localStorage.getItem(key);
    try {
        data = JSON.parse(data);
    }
    catch (err) { }
    finally {
        return data;
    }
}

function updateLSData(key, data) {
    let json = JSON.stringify(data);
    localStorage.setItem(key, json);
}