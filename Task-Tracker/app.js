let btn_enter = document.querySelector(".enter");
let input = document.querySelector(".input");
let container = document.querySelector(".container");
let count = 1 || localStorage.getItem("count");

btn_enter.addEventListener("click", () => {
  createTask();
});

let isFocus = false
input.addEventListener('focus', () => {
  isFocus = true
})
input.addEventListener('blur', () => {
  isFocus = false
})
document.addEventListener('keydown', (key) => {
  if(isFocus && key.key === 'Enter'){
    createTask()
  }
})
function changeCount(del, del_id) {
  let array = document.querySelectorAll(".task");
  count = array.length;
  localStorage.setItem("count", count);

  if(del){
    let array = document.querySelectorAll(".task");
    let a = 1
    array.forEach((task) => {
      task.setAttribute('data-task-id', a)
      a++
    })
    if(del_id < array.length+1 && del_id !== '1'){
      for(let i = del_id; i < array.length+1; i++){
        let tempHtml = localStorage.getItem(i+1)
        localStorage.setItem(`${i}`, tempHtml)
      }
      if(array.length === 1){
        localStorage.removeItem(1)
      } else {
        localStorage.removeItem(array.length+1)
      }
    }
    if(del_id === '1'){
      for(let i = 1; i < array.length; i++){
        let tempHtml = localStorage.getItem(i+1)
        localStorage.setItem(`${i}`, tempHtml)
      }
      if(array.length === 1){
        localStorage.removeItem(1)
      } else {
        localStorage.removeItem(array.length+1)
      }
    }
  } 
}

function createTask() {
  let block = document.createElement("div");
  block.classList.add("task");
  block.setAttribute("data-task-id", `${+localStorage.getItem("count")+1}`);

  let text_task = document.createElement("p");
  text_task.textContent = input.value;

  let btn_ready = document.createElement("button");
  btn_ready.classList.add("ready_task");
  let btn_ready_active = false
  btn_ready.addEventListener('click', () => {
    btn_ready.classList.toggle('ready_task_active')
    text_task.classList.toggle('text_task_active')
    localStorage.setItem(block.getAttribute('data-task-id'), block.innerHTML);
    btn_ready_active = true
  })
  // if(!btn_ready_active){
  //   localStorage.setItem(count, block.innerHTML);
  // }

  let del_task = document.createElement("img");
  del_task.setAttribute("src", "img/trash-can-svgrepo-com.svg");
  del_task.classList.add("del_task");

  del_task.addEventListener("click", () => {
    block.remove();
    localStorage.removeItem(
      del_task.parentElement.getAttribute("data-task-id")
    );
    changeCount(true, +del_task.parentElement.getAttribute("data-task-id") );
  });
  block.append(btn_ready,text_task,del_task);
  localStorage.setItem(+localStorage.getItem("count")+1, block.innerHTML);
  container.append(block);

  changeCount();
}

document.addEventListener('DOMContentLoaded', () => {
  count = +localStorage.getItem('count')

  for(let i = 1; i < count+1; i++){

    let block = document.createElement('div');
    block.classList.add("task");
    block.setAttribute("data-task-id", i);
    block.innerHTML = localStorage.getItem(i);
    let del_task = block.querySelector('.del_task')

    
    if(del_task !== null){
      del_task.addEventListener("click", () => {
      block.remove();
      localStorage.removeItem(
        del_task.parentElement.getAttribute("data-task-id")
      );
      changeCount(true, +del_task.parentElement.getAttribute("data-task-id"));
    });
    }
    let btn_ready = block.querySelector('.ready_task')
    let text_task = block.querySelector('p')
    if(btn_ready !== null){
      btn_ready.addEventListener('click', () => {
      btn_ready.classList.toggle('ready_task_active')
      text_task.classList.toggle('text_task_active')
      localStorage.setItem(block.getAttribute('data-task-id'), block.innerHTML);
  })
    }
    container.append(block);
  }

})