let btn_enter = document.querySelector(".enter");
let input = document.querySelector(".input");
let container = document.querySelector(".container");

btn_enter.addEventListener("click", () => {
  let block = document.createElement("div");
  block.classList.add("task");

  let text_task = document.createElement("p");
  text_task.textContent = input.value;

  let btn_ready = document.createElement("button");
  btn_ready.classList.add(".ready_task");

  block.append(text_task, btn_ready);
  container.append(block);
});
