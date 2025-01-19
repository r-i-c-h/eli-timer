const totalTime = 5; // 5 seconds

const timeDisplay = document.getElementById('time');
const circle = document.querySelector('.circle');

const circumference = 2 * Math.PI * 90; // 2πr, where r = 90

let animationFrameId;
let startTime;
let elapsedTime = 0;
let countdownActive = false;
let countdownPaused = false;

circle.style.strokeDasharray = circumference;

function updateTimerDisplay() {
  const elapsed = elapsedTime + (Date.now() - startTime) / 1000;
  const remainingTime = Math.max(totalTime - elapsed, 0);

  const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
  const seconds = Math.floor(remainingTime % 60).toString().padStart(2, '0');
  timeDisplay.textContent = `${minutes}:${seconds}`;

  const progress = remainingTime / totalTime;
  circle.style.strokeDashoffset = circumference * (1 - progress);
}

function toggleCountdown() {
  const btn = document.getElementById('actionButton');
  if (!countdownActive || countdownPaused) { // START
    startTime = Date.now();
    countdownActive = true;
    countdownPaused = false;
    btn.textContent = "Pause Countdown";
    tick();
  } else {
    countdownPaused = true;
    elapsedTime += (Date.now() - startTime) / 1000;
    cancelAnimationFrame(animationFrameId);
    btn.textContent = "Resume Countdown";
  }
}

function resetClock() {
  cancelAnimationFrame(animationFrameId);
  elapsedTime = 0;
  countdownActive = false;
  countdownPaused = false;
  circle.style.strokeDashoffset = "0";

}

function tick() {
  if (countdownPaused) return;

  const elapsed = elapsedTime + (Date.now() - startTime) / 1000;
  const remainingTime = Math.max(totalTime - elapsed, 0);

  updateTimerDisplay();

  if (remainingTime > 0) {
    animationFrameId = requestAnimationFrame(tick);
  } else {
    countdownActive = false;
    countdownPaused = false;
    timeDisplay.textContent = "🏁";
    document.getElementById('actionButton').textContent = "Start Countdown";
    return null;
  }
}

document.getElementById('actionButton').addEventListener('click', toggleCountdown);
document.getElementById('timer-container').addEventListener('click', toggleCountdown);
document.getElementById('resetButton').addEventListener('click', resetClock);
