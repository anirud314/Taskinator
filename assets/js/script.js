/*Replace This: var buttonEl = document.querySelector("#save-task");
With this:*/
var tasks = [];
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;

var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
    //console.log(tasks);
    saveTasks();
    tasksToDoEl.appendChild(listItemEl);
    
    taskIdCounter++;
};

var createTaskActions = function(taskId){
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //Create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //Create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    //Create select element
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    
    actionContainerEl.appendChild(statusSelectEl);
    
    var statusChoices= ["To Do", "In Progress", "Completed"];
    for (var i = 0; i <statusChoices.length; i++) {
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl);
    };

    return actionContainerEl;
}; 

var TaskFormHandler = function(event){

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form");
        return false;
    }
    formEl.reset();
    
    var isEdit = formEl.hasAttribute("data-task-id");
    
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        //console.log(taskDataObj);
        //console.log(taskDataObj.status);

        createTaskEl(taskDataObj);
    }
    
};

var taskButtonHandler = function(event) {
    console.log(event.target);

    //Edit Button clicked
    if (event.target.matches(".edit-btn")){
        var taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    }

    //delete button clicked
    else if (event.target.matches(".delete-btn")){
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var editTask = function(taskId) {
    

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    
    formEl.setAttribute("data-task-id", taskId);
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    
};

var completeEditTask = function(taskName, taskType, taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    for (var i = 0; i < tasks.length; i++){
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }

    alert("Task Updated!");

    //console.log(tasks);
    saveTasks();
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
    var updatedTaskArr = [];

    for(var i = 0; i < tasks.length; i++){
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    tasks = updatedTaskArr;
    //console.log(tasks);
    saveTasks();
};

var taskStatusChangeHandler = function(event) {
    // get the task items id
    var taskId = event.target.getAttribute("data-task-id");
    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    for (var i = 0; i < tasks.length; i++){
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    //console.log(tasks);
    saveTasks();
};

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
/*Replace this: buttonEl.addEventListener("click", createTaskHandler);
With this: */
formEl.addEventListener("submit", TaskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);