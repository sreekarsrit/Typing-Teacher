// Select DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const wpmDisplay = document.getElementById("wpmDisplay");
const playBtn = document.getElementById("playPauseBtn");
const timeButtons = document.querySelectorAll(".time-options .time");

let startTime;
let timerRunning = false;
let timerInterval;
let countdownInterval;
let selectedTime = 60; // default timeout in seconds
let timeRemaining = selectedTime;

// Local list of small English words
const smallWords = [
  "cat", "dog", "sun", "tree", "book", "car", "pen", "cup", "hat", "bird",
  "fish", "ball", "star", "leaf", "milk", "shoe", "door", "cake", "rain", "snow"
];

// Fetch quote from API
async function getQuote() {
  // Select a random word from the local list
  const randomIndex = Math.floor(Math.random() * smallWords.length);
  const randomWord = smallWords[randomIndex];
  quoteDisplay.innerText = randomWord;
  quoteInput.value = "";
  stopTimer();
  stopCountdown();
  timeRemaining = selectedTime;
  updateTimeDisplay();
  wpmDisplay.innerText = "WPM: 0";
  quoteInput.disabled = false;
}

// Start timer
function startTimer() {
  startTime = new Date();
  timerRunning = true;
  timerInterval = setInterval(() => {
    const elapsed = (new Date() - startTime) / 1000 / 60;
    const wordsTyped = quoteInput.value.trim().split(" ").length;
    const wpm = Math.round(wordsTyped / elapsed);
    wpmDisplay.innerText = `WPM: ${isNaN(wpm) ? 0 : wpm}`;
  }, 1000);
  startCountdown();
}

function stopTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
}

function startCountdown() {
  countdownInterval = setInterval(() => {
    timeRemaining--;
    updateTimeDisplay();
    if (timeRemaining <= 0) {
      stopTimer();
      stopCountdown();
      quoteInput.disabled = true;
      alert("Time's up!");
    }
  }, 1000);
}

function stopCountdown() {
  clearInterval(countdownInterval);
}

function updateTimeDisplay() {
  const timeDisplay = document.getElementById("timeDisplay");
  if (timeDisplay) {
    timeDisplay.innerText = `Time: ${timeRemaining}s`;
  } else {
    const timeDiv = document.createElement("div");
    timeDiv.id = "timeDisplay";
    timeDiv.style.marginTop = "10px";
    timeDiv.style.fontWeight = "bold";
    wpmDisplay.parentNode.insertBefore(timeDiv, wpmDisplay.nextSibling);
    timeDiv.innerText = `Time: ${timeRemaining}s`;
  }
}

// Event listeners
quoteInput.addEventListener("input", () => {
  if (!timerRunning && quoteInput.value.length > 0) {
    startTimer();
  }
});

playBtn.addEventListener("click", getQuote);

timeButtons.forEach(button => {
  button.addEventListener("click", () => {
    selectedTime = parseInt(button.innerText);
    timeRemaining = selectedTime;
    updateTimeDisplay();
  });
});

// Initial quote load
getQuote();
