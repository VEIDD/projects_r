const btns = document.querySelectorAll(".btn");
const timer = document.querySelector(".timer_text");
const btns_add_time = document.querySelectorAll(".add_time");
const btn_start = document.querySelector(".start");
const btn_stop = document.querySelector(".stop");
const btn_reset = document.querySelector(".reset");

let active_tab = 1;
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btns.forEach((btn) => {
      btn.classList.remove("active");
    });
    active_tab = +btn.getAttribute("data-tab-id");
    if (active_tab === +btn.getAttribute("data-tab-id")) {
      btn.classList.add("active");
    }
    switchTime();
  });
});

let time = {
  hours: 0,
  minutes: 25,
  seconds: 0,
};
let isWork = false;

btns_add_time.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = parseInt(btn.textContent.slice(2, 9));
    time.minutes += value;
    if (time.minutes > 59) {
      time.hours++;
      time.minutes = time.minutes - 60;
    }
    updateTime();
    if (!isWork) {
      startTimer();
    }
  });
});

let intervals = [];
const styles = document.createElement("style");
document.head.appendChild(styles);

btn_start.addEventListener("click", () => {
  startTimer();
  startProgressBar();
  btn_stop.classList.remove("hidden");
  btn_reset.classList.remove("hidden");
  btn_start.classList.add("hidden");
});

btn_stop.addEventListener("click", () => {
  clearInterval(intervals[0]);
  clearInterval(intervals[1]);
  intervals = [];
  btn_start.classList.remove("hidden");
  btn_stop.classList.add("hidden");
});

btn_reset.addEventListener("click", () => {
  clearInterval(intervals[0]);
  clearInterval(intervals[1]);
  intervals = [];
  switchTime();
  btn_stop.classList.add("hidden");
  btn_start.classList.remove("hidden");
  btn_reset.classList.add("hidden");
  styles.textContent = `
		.progress_bar::before {
		content: '';
		display: block;
		width: 0px;
		height: 3px;
		background-color: #ff0000;
	}`;
});
let str = "";
let ready_time = {
  ...time,
};

function updateTime() {
  ready_time = { ...time };

  for (let key in time) {
    if (time[key] < 9) {
      if (time[key].length === undefined) {
        ready_time[key] = `0${time[key]}`;
      }
    }
  }

  if (time.hours === 0) {
    str = `${ready_time.minutes}:${ready_time.seconds}`;
  } else {
    str = `${ready_time.hours}:${ready_time.minutes}:${ready_time.seconds}`;
  }

  timer.textContent = str;
}
function switchTime() {
  switch (active_tab) {
    case 1:
      timer.textContent = `25:00`;
      time = { hours: 0, minutes: 25, seconds: 0 };
      break;
    case 2:
      timer.textContent = `05:00`;
      time = { hours: 0, minutes: 5, seconds: 0 };
      break;
    case 3:
      timer.textContent = `15:00`;
      time = { hours: 0, minutes: 15, seconds: 0 };
      break;
  }
}

function startTimer() {
  isWork = true;

  let interval_timer = setInterval(() => {
    if (time.seconds === 0) {
      time.minutes -= 1;
      time.seconds = 60;
    }
    time.seconds -= 1;
    updateTime();
  }, 1000);
  intervals.push(interval_timer);
}

let progress_bar = document.querySelector(".progress_bar");
let all_time = 0;

function startProgressBar() {
  let style = getComputedStyle(progress_bar);

  let width = 0;
  if (time.hours !== 0) {
    all_time = time.hours * 60 * 60;
  }
  if (time.minutes !== 0) {
    all_time += time.minutes * 60;
  }
  if (time.seconds !== 0) {
    all_time += time.seconds;
  }

  let percent_width = parseFloat(style.getPropertyValue("width")) / all_time;

  let progress = setInterval(() => {
    width += percent_width;
    styles.textContent = `
		.progress_bar::before {
		content: '';
		display: block;
		width: ${width}px;
		height: 3px;
		background-color: #ff0000;
	}
		`;
  }, 1000);
  intervals.push(progress);
  console.log(intervals);
}
