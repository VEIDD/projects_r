export function humanReadable(seconds) {
  let hours = "00";
  let minutes = "00";
  let second = "00";

  if (seconds < 1) {
  } else {
    hours = Math.floor(seconds / 3600);
    if (hours * 3600 < seconds) {
      if (seconds - hours * 3600 > 59) {
        minutes = Math.floor((seconds - hours * 3600) / 60);
      }
      if (seconds - (hours * 3600 + minutes * 60) < 60) {
        if (seconds - (hours * 3600 + minutes * 60) > 0) {
          second = seconds - (hours * 3600 + minutes * 60);
        }
      }
    }
    hours <= 9 ? (hours = "0" + hours) : hours === 0 ? (hours = "00") : false;

    if (minutes <= 9 && typeof minutes === "number") {
      minutes = "0" + minutes;
    }
    if (second <= 9 && typeof second === "number") {
      second = "0" + second;
    }
  }

  let result = `${hours}:${minutes}:${second}`;
  return result;
}
