let dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((el) => {
  el.addEventListener("click", () => {
    const list = el.querySelector(".list");
    list.classList.toggle("hidden");
    list.querySelectorAll("li").forEach((element) => {
      element.addEventListener("click", () => {
        el.querySelector("p").textContent = element.textContent;
        check();
      });
    });
  });
});

let btn_convert = document.querySelector(".btn_convert");
let input = document.querySelector(".input");
let content = document.querySelector(".content");
let result = 0;

function check() {
  let title1 = document.querySelector(".check1");
  let title2 = document.querySelector(".check2");
  if (
    input.value !== "0.00" &&
    title1.textContent !== "From Unit" &&
    title2.textContent !== "To Unit"
  ) {
    btn_convert.style = `pointer-events: all;`;

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

    btn_convert.addEventListener("click", () => {
      let p = document.querySelector(".result");
      p.textContent = `${input.value} ${title1.textContent} is ${result.toFixed(2)} ${title2.textContent}`;
      content.append(p);
    });
  }
}
