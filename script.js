let addTaskBtn = document.querySelector("#add-task-btn");
let taskInput = document.querySelector("#task-input");
let columns = document.querySelector(".columns");
let eachColumns = document.querySelectorAll(".column");
let toDo = document.querySelector("#todo");

let draggedTask = null;

addTaskBtn.addEventListener("click", function (e) {
  let new_task = taskInput.value;
  if (new_task == "") return;
  let div = document.createElement("div");
  div.innerHTML = `<div class="task draggable"><p>${new_task}</p></div>`;
  toDo.appendChild(div);
  taskInput.value = "";
  //eachColumns.forEach((col) => {
  document.querySelectorAll(".task").forEach((task) => {
    task.setAttribute("draggable", true);
    task.addEventListener("dragstart", handleDragStart);
    // task.addEventListener("dragenter", handleDragEnter);
    // task.addEventListener("dragover", handleDragOver);
    // task.addEventListener("dragleave", handleDragLeave);
    // task.addEventListener("drop", handleDrop);
    task.addEventListener("dragend", handleDragEnd);
  });
  document.querySelectorAll(".column").forEach((col) => {
    col.addEventListener("dragenter", handleDragEnter);
    col.addEventListener("dragover", handleDragOver);
    col.addEventListener("dragleave", handleDragLeave);
    col.addEventListener("drop", handleDrop);
  });
});
function handleDragStart(e) {
  draggedTask = this;
  console.log("start");
  //e.target.classList.add("drag");
  e.dataTransfer.setData("text/html", e.target.outerHTML);
  //console.log(e.target);
  console.log("over");
  e.target.classList.add("over");
}
function handleDragEnter(e) {
  console.log("enter");
}
function handleDragOver(e) {
  if (e.preventDefault()) e.preventDefault();
  e.target.classList.add("dragging");
}
function handleDragLeave(e) {
  console.log("leave");
  e.target.classList.remove("dragging");
}
function handleDrop(e) {
  console.log("drop");
  //console.log(e.dataTransfer.getData("text/html"));
  //console.log(e.target);
  let col2 = document.querySelector("#in-progress");
  //e.target.appendChild(col2);
  if (draggedTask) {
    this.appendChild(draggedTask);
  }
  e.target.classList.remove("dragging");
}
function handleDragEnd(e) {
  console.log("end");
  e.target.classList.remove("over");
}
