// COMMENT: The main.js file is the base file that contains the main logic of the application
import { startStop, reset, lap } from "./stopwatch.js";
import { loadStopwatch } from "./storage.js";

// COMMENT: Using the DOMContentLoaded event to ensure that the script runs after the HTML & CSS have fully loaded
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

  // COMMENT: Load stopwatch data from local storage (if any) when the page loads
  loadStopwatch(display, lapsList, state);

  // COMMENT: Add event listeners when the buttons are clicked
  startStopBtn.addEventListener("click", () =>
    startStop(startStopBtn, display, state)
  );
  resetBtn.addEventListener("click", () =>
    reset(startStopBtn, display, lapsList, state)
  );
  lapBtn.addEventListener("click", () => lap(display, lapsList, state));
});
