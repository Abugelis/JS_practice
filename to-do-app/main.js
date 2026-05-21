// initialize variable for user input
let taskInput = document.getElementById("task-input");
// initialize button to add task
let addTaskBtn = document.getElementById("add-task-btn");

// Initialize task array 
const tasks = []; 

// Add even listener for the button, append task object to task array       
addTaskBtn.addEventListener("click", () => {
    tasks.push(createTask());
    
    console.log(tasks);
});


// create task object and return it
function createTask() {
    let task = {
        taskId : Date.now(),
        taskName : taskInput.value,
        taskCompleted : false
    }

    return task;
};


