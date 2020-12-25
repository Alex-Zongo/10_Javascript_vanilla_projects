const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secondsEl = document.getElementById("seconds");

const newYears = "1 Jan 2021";

function Countdown() {
  const newYearsDate = new Date(newYears);
  const currentDate = new Date();
  const remainingMsec = newYearsDate - currentDate;
  const totalSeconds = remainingMsec / 1000;
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds % 60);

  daysEl.innerHTML = days;
  hoursEl.innerHTML = formatTime(hours);
  minsEl.innerHTML = formatTime(minutes);
  secondsEl.innerHTML = formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// initial call
Countdown();

setInterval(Countdown, 1000);
