let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function timeToString(time) {
  const date = new Date(time);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  display.textContent = timeToString(elapsedTime);
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTime, 10);
  startPauseBtn.textContent = "Pause";
  isRunning = true;
}

function pause() {
  clearInterval(timerInterval);
  startPauseBtn.textContent = "Start";
  isRunning = false;
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  display.textContent = "00:00:00.000";
  startPauseBtn.textContent = "Start";
  laps.innerHTML = "";
  isRunning = false;
}

function lap() {
  if (!isRunning) return;
  const lapTime = timeToString(elapsedTime);
  const li = document.createElement("li");
  li.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;
  laps.appendChild(li);
}

// Event Listeners
startPauseBtn.addEventListener("click", () => {
  if (!isRunning) {
    start();
  } else {
    pause();
  }
});

resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);
