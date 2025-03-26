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
export function loadStopwatch() {
  // COMMENT: Load stopwatch data from local storage
  const stopwatchData = JSON.parse(localStorage.getItem("stopwatchData")) || {
    currentTime: 0,
    laps: [],
  };

  return stopwatchData;
}
