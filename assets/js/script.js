let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let taskIdCounter = 0;
let pageContentEl = document.querySelector('#page-content')

let taskFormHandler = function(event) {
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;
    //package up data as an objects
    let taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
    };

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();
    createTaskEL(taskDataObj);


}


let createTaskActions = function(taskId) {
    let actionContainerEl = document.createElement('div');
    actionContainerEl.className = 'task-actions';

    //create edit button
    let editButtonEL = document.createElement('button');
    editButtonEL.textContent = 'Edit';
    editButtonEL.className = 'btn edit-btn';
    editButtonEL.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(editButtonEL);

    //create delete button


    let deleteButtonEL = document.createElement('button');
    deleteButtonEL.textContent = 'Delete';
    deleteButtonEL.className = 'btn delete-btn';
    deleteButtonEL.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(deleteButtonEL);
    let statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    let statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        let statusOptionsEl = document.createElement('option');
        statusOptionsEl.textContent = statusChoices[i];
        statusOptionsEl.setAttribute('value', statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionsEl);
    }
    return actionContainerEl
}

let createTaskEL = function(taskDataObj) {
    // create list item
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    listItemEl.setAttribute('data-task-id', taskIdCounter);

    let taskInfoEl = document.createElement("div");
    // create div to hold task info and add to list item
    taskInfoEl.className = "task-info";

    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    let taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    taskIdCounter++
}

let taskButttonHandler = function(event) {
    console.log(event.target);

    if (event.target.matches('.delete-btn')) {
        let taskId = event.target.getAttribute('data-task-id');
        deleteTask(taskId);
    }
};

let deleteTask = function(taskId) {
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener('click', taskButttonHandler);