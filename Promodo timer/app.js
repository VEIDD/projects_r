import { humanReadable } from "./humanReadable.js";
sessionStorage.setItem('seconds', 0)
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

let all_time = 0;
function allTime() {
  if (time.hours !== 0) {
    all_time = time.hours * 60 * 60;
  }
  if (time.minutes !== 0) {
    all_time += time.minutes * 60;
  }
  if (time.seconds !== 0) {
    all_time += time.seconds;
  }
}
allTime();
let isWork = false;

btns_add_time.forEach((btn) => {
  btn.addEventListener("click", () => {
    const sign = btn.textContent.slice(0,2).trim()
    const value = parseInt(btn.textContent.slice( 2, 9));
    if(sign === '-'){
      time.minutes -= value;
      all_time -= value * 60;

      if(all_time < 0){
        stopIntervals()
        
        all_time = 0
      }  
    } else if(sign === '+') {
      time.minutes += value;
      all_time += value * 60;
    }
    
    if (time.minutes > 59) {
      time.hours++;
      time.minutes = time.minutes - 60;
    }
    
    let time_ = humanReadable(all_time - +sessionStorage.getItem('seconds'));
    updateTime(time_);

		if(!isWork && all_time > 0){
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
  if(timer.textContent !== '00:00'){
    startTimer();
    let style = getComputedStyle(progress_bar, "::before");
    startProgressBar(parseFloat(style.getPropertyValue("width")));
    btn_stop.classList.remove("hidden");
    btn_reset.classList.remove("hidden");
    btn_start.classList.add("hidden");
  } else {
    showModal()
  }
});

btn_stop.addEventListener("click", () => {
  stopIntervals();
  btn_reset.classList.remove("hidden");
});

btn_reset.addEventListener("click", () => {
  stopIntervals();
  switchTime();
  clearProgress();
	progress_bar.style = `width:378px`
  sessionStorage.setItem('seconds', 0)
});
let str = "";
let ready_time = {
  ...time,
};

function stopIntervals() {
  clearInterval(intervals[0]);
  clearInterval(intervals[1]);
  intervals = [];
  isWork = false;
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
  if (a) {
    if (all_time < 3600) {
      str = `${a.slice(3, 8)}`;
			progress_bar.style = `width:378px`
    } else {
      str = `${a}`;
			progress_bar.style = `width:588px`
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
  if (active_tab === 1) {
    timer.textContent = `25:00`;
    time = { hours: 0, minutes: 25, seconds: 0 };
    all_time = time.minutes * 60;
  } else if (active_tab === 2) {
    timer.textContent = `05:00`;
    time = { hours: 0, minutes: 5, seconds: 0 };
    all_time = time.minutes * 60;
  } else if (active_tab === 3) {
    timer.textContent = `15:00`;
    time = { hours: 0, minutes: 15, seconds: 0 };
    all_time = time.minutes * 60;
  }
  
  stopIntervals();
  clearProgress();
}

function startTimer() {
	let start_date = Date.now();
  isWork = true;
  time.minutes -= 1;
  let interval_timer = setInterval(() => {
    let seconds = Math.floor((Date.now() - start_date) / 1000);
		sessionStorage.setItem('seconds', seconds)
    let time_ = humanReadable(all_time - seconds);
    if (all_time === seconds) {
      endTimer();
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

function endTimer() {
  const audio = new Audio(
    "https://phoneky.co.uk/content/mp3tones/tone/2020/sound-fx/screamin_38dc25484811804.mp3"
  );
  audio.play();
}

function showModal(){
  let modal = document.querySelector('.modal')
  modal.classList.remove('hidden')
  setTimeout(() => {
    modal.classList.add('hidden')
  }, 2000);
}