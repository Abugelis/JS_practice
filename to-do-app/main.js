// initialize variable for user input
let taskInput = document.getElementById("task-input");
// initialize button to add task
let addTaskBtn = document.getElementById("add-task-btn");
// initialize task display element
let toDoDisplay = document.getElementById("to-do-tasks");
let activeTasksDisplay = document.getElementById("active-tasks");
let completedTasksDisplay = document.getElementById("completed-tasks");

// Initialize task array 
let tasks = []; 

// Add even listener for the button, append task object to task array       
addTaskBtn.addEventListener("click", () => {
    tasks.push(createTask());
    taskInput.value = "";
    saveTasks();
    displayTasks()
});


// create task object and return it
function createTask() {
    let task = {
        taskId : Date.now(),
        taskName : taskInput.value,
        taskStatus: "toDo"
    }
    return task;
}

// clear element that displays tasks. loop through tasks and add them to dom along with the button to delete task
function displayTasks(){
    toDoDisplay.innerHTML  = "";
    activeTasksDisplay.innerHTML = "";
    completedTasksDisplay.innerHTML = "";

    tasks.forEach((task)=>{
        let taskRow = document.createElement("div");
        let para = document.createElement("p");
        
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.value = task.taskId;

        let statusBtn = document.createElement("button");
        
        
        if(task.taskStatus === "toDo"){
            statusBtn.textContent = "Start Task";
            toDoDisplay.appendChild(taskRow);
        }
        else if(task.taskStatus === "active"){
            statusBtn.textContent = "Complete Task";
            activeTasksDisplay.appendChild(taskRow);
        }
        else if (task.taskStatus === "completed"){
            statusBtn.textContent = "Reset Task";
            completedTasksDisplay.appendChild(taskRow);
        }    
        
        para.append(task.taskName);

        taskRow.appendChild(para)
        taskRow.appendChild(deleteBtn);
        taskRow.appendChild(statusBtn);

        deleteBtn.addEventListener("click", ()=>{
            deleteTask(task.taskId);
        });

        statusBtn.addEventListener("click", ()=>{
            updateTask(task.taskId);
        });
    });
}

// delete task. filter out task based on id and replace tasks with new filtered out array
function deleteTask(taskId) {
    let newTasks = tasks.filter((task)=> task.taskId !== taskId);
    tasks = newTasks;


    saveTasks();
    displayTasks();
}

// update task. change status
function updateTask(taskId) {
    tasks.forEach((task) => {
        if(task.taskId === taskId ){
            if(task.taskStatus === "toDo"){
                task.taskStatus = "active"
            }
            else if (task.taskStatus === "active"){
                task.taskStatus = "completed"
            }
            else {
                task.taskStatus = "toDo"
            }
        }
    });

    saveTasks();
    displayTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
    let retrievedTasks = localStorage.getItem("tasks");
    tasks = retrievedTasks ? JSON.parse(retrievedTasks) : [];
}

loadTasks();
displayTasks();