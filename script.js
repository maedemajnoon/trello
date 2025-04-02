let toDoBtn = document.querySelector("#add-task-btn");
let doingBtn = document.querySelector("#add-task-btn_doing");
let doneBtn = document.querySelector("#add-task-btn_done");

let taskInput = document.querySelector("#task-input");
let columns = document.querySelector(".columns");
let eachColumns = document.querySelectorAll(".column");

let toDo = document.querySelector("#todo");
let doing = document.querySelector("#in-progress");
let done = document.querySelector("#done");

let clear = document.querySelector("#clearAll");
let draggedTask = null;
let time = 300;

toDoBtn.addEventListener("click", function (e) {
  createElement(toDo);
});
doingBtn.addEventListener("click", function (e) {
  createElement(doing);
});
doneBtn.addEventListener("click", function (e) {
  createElement(done);
});
function addDraggableTask() {
  document.querySelectorAll(".task").forEach((task) => {
    task.setAttribute("draggable", true);
    task.addEventListener("dragstart", handleDragStart);
    task.addEventListener("dragend", handleDragEnd);
  });
  eachColumns.forEach((col) => {
    col.addEventListener("dragover", handleDragOver);
    col.addEventListener("dragleave", handleDragLeave);
    col.addEventListener("drop", handleDrop);
    col.addEventListener("click", deleteTask);
  });
}
function deleteTask(e) {
  if (e.target.matches("i.fa-trash-o")) {
    let task = e.target.closest(".task");
    if (task) {
      task.remove();
    }
  }
}

function handleDragStart(e) {
  draggedTask = this;
  e.dataTransfer.setData("text/html", e.target.outerHTML);
  e.target.classList.add("over");
}
function handleDragOver(e) {
  if (e.preventDefault()) e.preventDefault();
  e.target.classList.add("dragging");
}
function handleDragLeave(e) {
  e.target.classList.remove("dragging");
}
function handleDrop(e) {
  if (draggedTask) {
    this.appendChild(draggedTask);
  }
  e.target.classList.remove("dragging");
}
function handleDragEnd(e) {
  e.target.classList.remove("over");
}
function createElement(columnName) {
  let new_task = taskInput.value;
  if (new_task == "") return;
  let div = document.createElement("div");
  div.innerHTML = `<div class="task"><p>${new_task}<i class="fa fa-trash-o"></i></p></div>`;
  columnName.appendChild(div);
  taskInput.value = "";

  clear.classList.add("active");
  addDraggableTask();
}
clear.addEventListener("click", function (e) {
  clearAll();
});

function clearAll() {
  if (window.confirm("Are you sure you wanna delete all the tasks?")) {
    setTimeout(() => {
      document.querySelectorAll(".task").forEach((task) => task.remove());
      clear.classList.remove("active");
    }, time);
  }
}
