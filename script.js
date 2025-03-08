// script.js
document.addEventListener("DOMContentLoaded", () => {
  const tasks = document.querySelectorAll(".task");
  const columns = document.querySelectorAll(".column");

  // Add drag events to tasks
  tasks.forEach((task) => {
    task.addEventListener("dragstart", handleDragStart);
    task.addEventListener("dragend", handleDragEnd);
  });

  // Add drag events to columns
  columns.forEach((column) => {
    column.addEventListener("dragover", handleDragOver);
    column.addEventListener("dragenter", handleDragEnter);
    column.addEventListener("dragleave", handleDragLeave);
    column.addEventListener("drop", handleDrop);
  });

  // Handle task addition via button click
  const addButtons = document.querySelectorAll(".add-task-btn");
  addButtons.forEach((button) => {
    button.addEventListener("click", addTask);
  });

  // Drag start event handler
  function handleDragStart(event) {
    event.target.classList.add("dragging");
  }

  // Drag end event handler
  function handleDragEnd(event) {
    event.target.classList.remove("dragging");
  }

  // Drag over event handler
  function handleDragOver(event) {
    event.preventDefault();
  }

  // Drag enter event handler
  function handleDragEnter(event) {
    event.target.classList.add("drag-over");
  }

  // Drag leave event handler
  function handleDragLeave(event) {
    event.target.classList.remove("drag-over");
  }

  // Drop event handler
  function handleDrop(event) {
    event.preventDefault();
    const draggedTask = document.querySelector(".dragging");
    const targetColumn = event.target.closest(".column");

    if (targetColumn && !targetColumn.contains(draggedTask)) {
      targetColumn.appendChild(draggedTask);
    }
    targetColumn.classList.remove("drag-over");
  }

  // Add a new task to the selected column
  function addTask(event) {
    const columnId = event.target.getAttribute("data-column");
    const inputField = document.getElementById(`new-task-input-${columnId}`);
    const taskText = inputField.value.trim();

    if (taskText === "") {
      return; // Do nothing if the input is empty
    }

    // Create a new task
    const newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.textContent = taskText;

    // Add the new task to the column
    const column = document.getElementById(`column-${columnId}`);
    column.insertBefore(newTask, column.lastElementChild); // Add before the button

    // Clear the input field
    inputField.value = "";

    // Add drag events to the new task
    newTask.addEventListener("dragstart", handleDragStart);
    newTask.addEventListener("dragend", handleDragEnd);
  }
});
