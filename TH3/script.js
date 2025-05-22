// Task array to store tasks
let tasks = [];

// DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

// Add task button event listener
addTaskBtn.addEventListener("click", addTask);

// Filter button event listeners
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    filterTasks(button.id); // Sử dụng button.id
  });
});

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    isDone: false,
  };

  tasks.push(task);
  saveTasksToLocalStorage();
  renderTasks();
  taskInput.value = ""; // Clear input
}

// Function to render tasks based on filter
function renderTasks(filter = "all") {
  taskList.innerHTML = ""; // Clear current list

  let filteredTasks = tasks;
  if (filter === "pending") {
    filteredTasks = tasks.filter((task) => !task.isDone);
  } else if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.isDone);
  }

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    if (task.isDone) li.classList.add("completed");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;
    taskSpan.addEventListener("click", () => toggleTaskCompletion(task.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Function to toggle task completion
function toggleTaskCompletion(taskId) {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, isDone: !task.isDone } : task
  );
  saveTasksToLocalStorage();
  renderTasks(document.querySelector(".filter-btn.active").dataset.filter);
}

// Function to delete a task
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasksToLocalStorage();
  renderTasks(document.querySelector(".filter-btn.active").dataset.filter);
}

// Function to save tasks to localStorage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

// Function to filter tasks
function filterTasks(filter) {
  renderTasks(filter);
}