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
let all_time = 0

if (time.hours !== 0) {
    all_time = time.hours * 60 * 60;
  }
  if (time.minutes !== 0) {
    all_time += time.minutes * 60;
  }
  if (time.seconds !== 0) {
    all_time += time.seconds;
  }
let isWork = false;

btns_add_time.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = parseInt(btn.textContent.slice(2, 9));
    time.minutes += value;
    if (time.minutes > 59) {
      time.hours++;
      time.minutes = time.minutes - 60;
    }
		let time_ = humanReadable(all_time)
    updateTime(time_);
    if (!isWork) {
      startTimer();
      startProgressBar();
      btn_stop.classList.remove("hidden");
      btn_reset.classList.remove("hidden");
      btn_start.classList.add("hidden");
    }
  });
});

let intervals = [];
const styles = document.createElement("style");
document.head.appendChild(styles);

btn_start.addEventListener("click", () => {
  startTimer();
  let style = getComputedStyle(progress_bar, "::before");
  startProgressBar(parseFloat(style.getPropertyValue("width")));
  btn_stop.classList.remove("hidden");
  btn_reset.classList.remove("hidden");
  btn_start.classList.add("hidden");
});

btn_stop.addEventListener("click", () => {
  stopIntervals();
  btn_reset.classList.remove("hidden");
});

btn_reset.addEventListener("click", () => {
  stopIntervals();
  switchTime();
  clearProgress();
});
let str = "";
let ready_time = {
  ...time,
};

function stopIntervals() {
  clearInterval(intervals[0]);
  clearInterval(intervals[1]);
  intervals = [];
  let isWork = false;
  btn_stop.classList.add("hidden");
  btn_start.classList.remove("hidden");
  btn_reset.classList.add("hidden");
}
function clearProgress() {
  styles.textContent = `
		.progress_bar::before {
		content: '';
		display: block;
		width: 0px;
		height: 10px;
		background-color: #ff0000;
	}`;
}
function updateTime(a) {
	if(a){
		if (all_time < 3600) {
    str = `${a.slice(3,8)}`;
  } else {
    str = `${a}`;
  }
	} else {
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
	
	}
	timer.textContent = str;
}
function switchTime() {
  switch (active_tab) {
    case 1:
      timer.textContent = `25:00`;
      time = { hours: 0, minutes: 25, seconds: 0 };
      stopIntervals();
      clearProgress();
      break;
    case 2:
      timer.textContent = `05:00`;
      time = { hours: 0, minutes: 5, seconds: 0 };
      stopIntervals();
      clearProgress();
      break;
    case 3:
      timer.textContent = `15:00`;
      time = { hours: 0, minutes: 15, seconds: 0 };
      stopIntervals();
      clearProgress();
      break;
  }
}

function startTimer() {
  let start_date = Date.now();
  isWork = true;
  time.minutes -= 1;
  let interval_timer = setInterval(() => {
    let seconds = Math.floor((Date.now() - start_date) / 1000);
		let time_ = humanReadable(all_time - seconds)
		if(10 === seconds){
			endTimer()
		}
    updateTime(time_);
  }, 1000);
  intervals.push(interval_timer);
}

let progress_bar = document.querySelector(".progress_bar");

function startProgressBar(value) {
  let style = getComputedStyle(progress_bar);

  let width = 0 || value;

  let percent_width = parseFloat(style.getPropertyValue("width")) / all_time;

  let progress = setInterval(() => {
    width += percent_width;
    styles.textContent = `
		.progress_bar::before {
		content: '';
		display: block;
		width: ${width}px;
		height: 10px;
		background-color: #ff0000;
	}
		`;
  }, 1000);
  intervals.push(progress);
}

function humanReadable(seconds) {
  var pad = function(x) { return (x < 10) ? "0"+x : x; }
  return pad(parseInt(seconds / (60*60))) + ":" +
         pad(parseInt(seconds / 60 % 60)) + ":" +
         pad(seconds % 60)
}

function endTimer(){
	const audio = new Audio('https://phoneky.co.uk/content/mp3tones/tone/2020/sound-fx/screamin_38dc25484811804.mp3')
	audio.play()
}