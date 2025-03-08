let input = document.querySelector("#task-input"); //input
let button = document.querySelector("#add-task-btn"); //button
let trello_ul = document.querySelector(".task-list"); //each ul in each columns

button.addEventListener("click", () => {
  let new_task = input.value;
  if (new_task == "") return;
  let li = document.createElement("li");
  li.innerHTML = `
  <div class="task draggable">
  <span>${new_task}</span>
  </div>`;
  trello_ul.appendChild(li);
  input.value = "";
  let task = document.querySelectorAll(".draggable");
  //console.log(task);
  task.forEach((t) => {
    //console.log(t.textContent);
    t.setAttribute("draggable", true);
    t.addEventListener("dragstart", () => {});
    t.addEventListener("dragenter", () => {});
    t.addEventListener("dragover", () => {});
    t.addEventListener("dragleave", () => {});
    t.addEventListener("drop", () => {});
    t.addEventListener("dragend", () => {});
  });
});
