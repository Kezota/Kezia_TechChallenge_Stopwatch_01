import { saveStopwatch } from "./storage.js";

export function startStop(startStopBtn, display, state) {
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

export function lap(display, lapsList, state) {
  if (state.isRunning) {
    const lapTime = display.textContent;
    const li = document.createElement("li");
    li.textContent = lapTime;
    lapsList.insertBefore(li, lapsList.firstChild);

    updateDisplay(display, state);
  }
}

export function getLaps(lapsList) {
  return Array.from(lapsList.children).map((li) => li.textContent);
}

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
