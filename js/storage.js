// COMMENT: The storage.js file is used to save and load stopwatchData from local storage
import { updateDisplay } from "./stopwatch.js";

// COMMENT: Function to save stopwatch data to local storage
export function saveStopwatch(currentTime, laps) {
  const stopwatchData = {
    currentTime: currentTime,
    laps: laps,
  };

  // COMMENT: Save the stopwatch data to local storage
  localStorage.setItem("stopwatchData", JSON.stringify(stopwatchData));
}

// COMMENT: Function to load stopwatch data from local storage
export function loadStopwatch(display, lapsList, state) {
  // COMMENT: Load stopwatch data from local storage
  const stopwatchData = JSON.parse(localStorage.getItem("stopwatchData")) || {
    currentTime: 0,
    laps: [],
  };

  state.minutes = stopwatchData.currentTime.minutes || 0;
  state.seconds = stopwatchData.currentTime.seconds || 0;
  state.centiseconds = stopwatchData.currentTime.centiseconds || 0;

  // COMMENT: Display the loaded stopwatch data
  stopwatchData.laps.forEach((lapTime) => {
    const li = document.createElement("li");
    li.textContent = lapTime;
    lapsList.append(li);
  });

  // COMMENT: Update the display with the loaded stopwatch data
  updateDisplay(display, state);
}
