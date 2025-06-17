let dropdown1 = document.querySelector(".dropdown");
let list1 = document.querySelector(".list1");
let answers1 = list1.querySelectorAll("li");
let title1 = dropdown1.querySelector("p");

let dropdown2 = document.querySelector(".dropdown2");
let list2 = document.querySelector(".list2");
let answers2 = list2.querySelectorAll("li");
let title2 = dropdown2.querySelector("p");

let check1 = 0;
let check2 = 0;

dropdown1.addEventListener("click", () => {
  list1.classList.toggle("hidden");
});
answers1.forEach((btn) => {
  btn.addEventListener("click", () => {
    check1 = 1;
    check(check1, check2);
    title1.textContent = btn.textContent;
  });
});

dropdown2.addEventListener("click", () => {
  list2.classList.toggle("hidden");
});

answers2.forEach((btn) => {
  btn.addEventListener("click", () => {
    check2 = 1;
    check(check1, check2);
    title2.textContent = btn.textContent;
  });
});

let btn_convert = document.querySelector(".btn_convert");
let input = document.querySelector(".input");
let content = document.querySelector(".content");
let result = 0;

function check(b, c) {
  if (input.value !== "0.00" && b !== 0 && c !== 0) {
    btn_convert.style = `pointer-events: all;`;

    btn_convert.addEventListener("click", () => {
      if (document.querySelector(".result")) {
        document.querySelector(".result").remove();
      }
      if (
        title1.textContent === "Celseus" &&
        title2.textContent === "Fahrenhreit"
      ) {
        result = (+input.value * 9) / 5 + 32;
      }
      if (
        title1.textContent === "Fahrenhreit" &&
        title2.textContent === "Celseus"
      ) {
        result = ((+input.value - 32) * 5) / 9;
      }
      if (title1.textContent === "Celseus" && title2.textContent === "Kelvin") {
        result = +input.value + 273.15;
      }
      if (title1.textContent === "Kelvin" && title2.textContent === "Celseus") {
        result = +input.value - 273.15;
      }
      if (
        title1.textContent === "Kelvin" &&
        title2.textContent === "Fahrenhreit"
      ) {
        result = ((+input.value - 273.15) * 9) / 5 + 32;
      }
      if (
        title1.textContent === "Fahrenhreit" &&
        title2.textContent === "Kelvin"
      ) {
        result = ((+input.value - 32) * 5) / 9 + 273.15;
      }
      if (title1.textContent === title2.textContent) {
        result = +input.value;
      }

      let p = document.createElement("p");
      p.classList.add("result");
      p.textContent = `${input.value} ${title1.textContent} is ${result.toFixed(
        2
      )} ${title2.textContent}`;
      content.append(p);
    });
  }
}
