// Definimos una clase para poder agregar la tarea
class Task {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }
}

// Función para poner las tareas pendientes
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDescription = taskInput.value.trim();
    
    if (taskDescription !== '') {
        const task = new Task(taskDescription);
        tasks.push(task);
        renderTasks();
        taskInput.value = '';
    }
}

// Función para mover una tarea completada a la lista de tareas completadas
function completeTask(index) {
    const completedTask = tasks.splice(index, 1)[0];
    completedTasks.push(completedTask);
    renderTasks();
}

// Función para renderizar las tareas en las listas de pendientes y completadas
function renderTasks() {
    const taskList = document.getElementById('taskList');
    const completedTaskList = document.getElementById('completedTaskList');

    taskList.innerHTML = '';
    completedTaskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = createTaskItem(task, index, 'Pendiente');
        taskList.appendChild(taskItem);
    });

    completedTasks.forEach((task, index) => {
        const taskItem = createTaskItem(task, index, 'Completada');
        completedTaskList.appendChild(taskItem);
    });
}