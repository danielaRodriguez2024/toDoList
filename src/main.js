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

// Función auxiliar para crear un elemento de tarea
function createTaskItem(task, index, status) {
    const taskItem = document.createElement('li');
    taskItem.className = 'flex justify-between items-center bg-white px-4 py-2 mb-2 rounded';

    const taskText = document.createElement('span');
    taskText.textContent = `[${status}] ${task.description}`;

    const taskActions = document.createElement('div');

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Completar';
    completeButton.className = 'bg-green-500 text-white px-2 py-1 rounded mr-2';
    completeButton.addEventListener('click', () => {
        task.toggleCompleted();
        if (status === 'Pendiente') {
            completeTask(index);
        } else {
            // Si está en la lista de completadas, deshacer la acción
            task.toggleCompleted();
            tasks.push(task);
            completedTasks.splice(index, 1);
        }
        renderTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.className = 'bg-red-500 text-white px-2 py-1 rounded';
    deleteButton.addEventListener('click', () => {
        if (status === 'Pendiente') {
            tasks.splice(index, 1);
        } else {
            completedTasks.splice(index, 1);
        }
        renderTasks();
    });

    taskActions.appendChild(completeButton);
    taskActions.appendChild(deleteButton);

    taskItem.appendChild(taskText);
    taskItem.appendChild(taskActions);

    if (task.completed) {
        taskText.classList.add('line-through');
    }
    return taskItem;
}

const tasks = [];
const completedTasks = [];
const addTaskButton = document.getElementById('addTask');
addTaskButton.addEventListener('click', addTask);

// Inicialmente, renderizamos las tareas existentes
renderTasks();