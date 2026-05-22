// initialize variable for user input
let taskInput = document.getElementById("task-input");
// initialize button to add task
let addTaskBtn = document.getElementById("add-task-btn");
// initialize task display element
let taskDisplay = document.getElementById("display-tasks");

// Initialize task array 
let tasks = []; 

// Add even listener for the button, append task object to task array       
addTaskBtn.addEventListener("click", () => {
    tasks.push(createTask());
    taskInput.value = "";
    displayTasks()
});


// create task object and return it
function createTask() {
    let task = {
        taskId : Date.now(),
        taskName : taskInput.value,
        taskCompleted : false
    }
    return task;
}

// clear element that displays tasks. loop through tasks and add them to dom along with the button to delete task
function displayTasks(){
    taskDisplay.innerHTML  = "";

    tasks.forEach((task)=>{
        let taskRow = document.createElement("div");
        let para = document.createElement("p");
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.value = task.taskId;
        
        para.append(task.taskName);
        
        taskDisplay.appendChild(taskRow);

        taskRow.appendChild(para)
        taskRow.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", ()=>{
            deleteTask(task.taskId);
        });
    });
}

// delete task. filter out task based on id and replace tasks with new filtered out array
function deleteTask(taskId) {
    let newTasks = tasks.filter((task)=> task.taskId !== taskId);
    tasks = newTasks;
    taskDisplay.innerHTML = "";
    displayTasks();
}