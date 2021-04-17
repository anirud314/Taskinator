/*Replace This: var buttonEl = document.querySelector("#save-task");
With this:*/
var formEl = document.querySelector("#task-form");

var tasksToDoEl = document.querySelector("#tasks-to-do");

//console.log(buttonEl);
var createTaskHandler = function(){
    
    event.preventDefault();

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
};

/*Replace this: buttonEl.addEventListener("click", createTaskHandler);
With this: */
formEl.addEventListener("submit", createTaskHandler);