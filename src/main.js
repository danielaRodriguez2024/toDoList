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