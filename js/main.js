import { startStop, reset, lap, getLaps, updateDisplay } from "./stopwatch.js";
import { loadStopwatch } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const startStopBtn = document.getElementById("startStopBtn");
  const resetBtn = document.getElementById("resetBtn");
  const lapBtn = document.getElementById("lapBtn");
  const lapsList = document.getElementById("lapsList");

  const state = {
    centiseconds: 0,
    seconds: 0,
    minutes: 0,
    interval: null,
    isRunning: false,
  };

  // COMMENT: Load stopwatch data from local storage
  const loadedData = loadStopwatch();
  state.minutes = loadedData.currentTime.minutes || 0;
  state.seconds = loadedData.currentTime.seconds || 0;
  state.centiseconds = loadedData.currentTime.centiseconds || 0;

  // COMMENT: Display the loaded stopwatch data
  loadedData.laps.forEach((lapTime) => {
    const li = document.createElement("li");
    li.textContent = lapTime;
    lapsList.appendChild(li);
  });
  updateDisplay(display, state);

  // COMMENT: Add event listeners when the buttons are clicked
  startStopBtn.addEventListener("click", () =>
    startStop(startStopBtn, display, state)
  );
  resetBtn.addEventListener("click", () =>
    reset(startStopBtn, display, lapsList, state)
  );
  lapBtn.addEventListener("click", () => lap(display, lapsList, state));
});
