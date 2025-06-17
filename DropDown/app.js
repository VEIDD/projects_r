let dropdown = document.querySelector(".dropdown");
let title = document.querySelector(".title");
let elements = document.querySelector(".elements");
let answers = document.querySelectorAll(".element");
let select = document.querySelector(".krug");
title.addEventListener("click", () => {
  title.classList.toggle("active");
  elements.classList.toggle("hidden");
});

answers.forEach((btn) => {
  btn.addEventListener("click", () => {
    title.textContent = btn.textContent;
    title.classList.toggle("active");
    elements.classList.toggle("hidden");
    select.classList.remove("hidden");
    btn.append(select);
  });
});
