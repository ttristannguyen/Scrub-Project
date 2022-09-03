function loadPB() {
    return JSON.parse(localStorage.getItem('projectBacklogItemArray'))
}

function loadSB() {
    return JSON.parse(localStorage.getItem('sprintBacklogItemArray'))
}

function assignTasks() {
    console.log("Task Assigning ...");
    
    let productBacklog = loadPB();
    let sprintBacklog = loadSB();
    let checkBoxes = document.getElementsByName("pBCheckbox");

    // Shifting PBIs
    let removedItems = [];
    for(i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            sprintBacklog.push(productBacklog[i]);
            removedItems.push(productBacklog[i]);
        }
    }
        
    // Removing Items from pBList
    for(i = 0; i < productBacklog.length; i++) {
        if (removedItems.includes(productBacklog[i])) {
            item = productBacklog.splice(i, 1);
            console.log(`Removed Item: ${item}`)
            i--;
        }
    }

    localStorage.setItem('projectBacklogItemArray', JSON.stringify(productBacklog));
    localStorage.setItem('sprintBacklogItemArray', JSON.stringify(sprintBacklog));

    displayPB(productBacklog);
    displaySB(sprintBacklog);
}

function unassignTasks() {
    console.log("Task Unassigning ...");
    let productBacklog = loadPB();
    let sprintBacklog = loadSB();
    let checkBoxes = document.getElementsByName("sBCheckbox");

    // Shifting PBIs
    let removedItems = [];
    for(i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            productBacklog.push(sprintBacklog[i]);
            removedItems.push(sprintBacklog[i]);
        }
    }

    // Removing Items from pBList
    for(i = 0; i < sprintBacklog.length; i++) {
        if (removedItems.includes(sprintBacklog[i])) {
            sprintBacklog.splice(i, 1);
            console.log(`Removed Item: ${item}`)
            i--;
        }
    }

    localStorage.setItem('projectBacklogItemArray', JSON.stringify(productBacklog));
    localStorage.setItem('sprintBacklogItemArray', JSON.stringify(sprintBacklog));

    displayPB(productBacklog);
    displaySB(sprintBacklog);
}

function loadBacklogs() {
    let productBacklog = ['PBI Item 1', 'PBI Item 2', 'PBI Item 3', 'PBI Item 4', 'PBI Item 5'];
    let sprintBacklog = ['Spr Item 1', 'Spr Item 2', 'Spr Item 3', 'Spr Item 4', 'Spr Item 5'];

    localStorage.setItem('projectBacklogItemArray', JSON.stringify(productBacklog));
    localStorage.setItem('sprintBacklogItemArray', JSON.stringify(sprintBacklog));
    console.log("Backlogs Stored");

    productBacklog = loadPB();
    sprintBacklog = loadSB(); 
    displayPB(productBacklog)  
    displaySB(sprintBacklog)
}

function displayPB(productBacklog) {
    let output = '';

    for (let i = 0; i < productBacklog.length; i++) {
        if (productBacklog[i] != 1) {
            output += `
                <tr>
                    <td>
                        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="pBList${i}">
                            <input type="checkbox" id="pBList${i}" class="mdl-checkbox__input" name="pBCheckbox">
                        </label>
                    </td>
                    <td class="mdl-data-table__cell--non-numeric">${productBacklog[i]}</td>
                </tr>
            `
        }
    }

    // Assigning html
    let productBacklogTableBody = document.getElementById("productBacklogList");
    productBacklogTableBody.innerHTML = output;
}

function displaySB(sprintBacklog) {
    let output = '';

    for (let i = 0; i < sprintBacklog.length; i++) {
        if (sprintBacklog[i] != 1) {
            output += `
                <tr>
                    <td>
                        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="sBList${i}">
                            <input type="checkbox" id="sBList${i}" class="mdl-checkbox__input" name="sBCheckbox">
                        </label>
                    </td>
                    <td class="mdl-data-table__cell--non-numeric">${sprintBacklog[i]}</td>
                </tr>
            `
        }
    }

    // Assigning html
    let sprintBacklogTableBody = document.getElementById("sprintBacklogList");
    sprintBacklogTableBody.innerHTML = output;
}