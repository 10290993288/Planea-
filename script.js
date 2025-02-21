document.addEventListener("DOMContentLoaded", function () {
    loadTasks(); // Cargar tareas almacenadas al iniciar la app
});

function showTaskForm() {
    document.getElementById("task-form").style.display = "flex";
}

function closeTaskForm() {
    document.getElementById("task-form").style.display = "none";
}

function addTask() {
    let taskName = document.getElementById("task-name").value;
    let taskDate = document.getElementById("task-date").value;
    let taskCategory = document.getElementById("task-category").value;
    let taskDescription = document.getElementById("task-description").value;

    if (taskName.trim() === "") {
        alert("Por favor, ingresa un nombre para la tarea.");
        return;
    }

    let taskList = document.getElementById("task-list");

    let li = document.createElement("li");
    li.innerHTML = `<strong>${taskName}</strong> - ${taskDate} <br> 
                    <small>${taskCategory}</small> <br> 
                    <p>${taskDescription}</p>
                    <button onclick="deleteTask(this)">🗑 Eliminar</button>`;

    taskList.appendChild(li);
    saveTask(taskName, taskDate, taskCategory, taskDescription);
    closeTaskForm();
}

function deleteTask(element) {
    element.parentElement.remove();
    saveAllTasks();
}

function saveTask(name, date, category, description) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ name, date, category, description });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("task-list");

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${task.name}</strong> - ${task.date} <br> 
                        <small>${task.category}</small> <br> 
                        <p>${task.description}</p>
                        <button onclick="deleteTask(this)">🗑 Eliminar</button>`;
        taskList.appendChild(li);
    });
}

function saveAllTasks() {
    let taskList = document.getElementById("task-list");
    let tasks = [];

    taskList.querySelectorAll("li").forEach(li => {
        let taskName = li.querySelector("strong").textContent;
        let taskDate = li.childNodes[1].textContent.split(" - ")[1].trim();
        let taskCategory = li.querySelector("small").textContent;
        let taskDescription = li.querySelector("p").textContent;
        
        tasks.push({ name: taskName, date: taskDate, category: taskCategory, description: taskDescription });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
