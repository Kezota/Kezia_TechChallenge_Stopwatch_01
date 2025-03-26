// COMMENT: The stopwatch.js file contains the logic for the stopwatch functionality
import { saveStopwatch } from "./storage.js";

// COMMENT: Function to start or stop (pause) the stopwatch
export function startStop(startStopBtn, display, state) {
  // COMMENT: If the stopwatch is running, stop it. Otherwise, start it
  if (state.isRunning) {
    clearInterval(state.interval);
    startStopBtn.textContent = "Start";
  } else {
    state.interval = setInterval(() => {
      state.centiseconds++;
      if (state.centiseconds === 100) {
        state.centiseconds = 0;
        state.seconds++;
      }
      if (state.seconds === 60) {
        state.seconds = 0;
        state.minutes++;
      }
      updateDisplay(display, state);
    }, 10);
    startStopBtn.textContent = "Pause";
  }

  state.isRunning = !state.isRunning;
}

// COMMENT: Function to reset the stopwatch
export function reset(startStopBtn, display, lapsList, state) {
  clearInterval(state.interval);
  state.centiseconds = 0;
  state.seconds = 0;
  state.minutes = 0;
  state.isRunning = false;
  lapsList.innerHTML = "";
  startStopBtn.textContent = "Start";

  updateDisplay(display, state);
}

// COMMENT: Function to record a lap
export function lap(display, lapsList, state) {
  if (state.isRunning) {
    const lapTime = display.textContent;
    const li = document.createElement("li");
    li.textContent = lapTime;
    lapsList.insertBefore(li, lapsList.firstChild);

    updateDisplay(display, state);
  }
}

// COMMENT: Function to update the display
export function updateDisplay(display, state) {
  display.textContent = `${String(state.minutes).padStart(2, "0")}:${String(
    state.seconds
  ).padStart(2, "0")}:${String(state.centiseconds).padStart(2, "0")}`;

  // COMMENT: Save the stopwatch data to local storage
  saveStopwatch(
    {
      minutes: state.minutes,
      seconds: state.seconds,
      centiseconds: state.centiseconds,
    },
    getLaps(lapsList)
  );
}

// COMMENT: Function to get the lap times from the laps list
function getLaps(lapsList) {
  return Array.from(lapsList.children).map((li) => li.textContent);
}
