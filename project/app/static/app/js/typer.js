// Select DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const wpmDisplay = document.getElementById("wpmDisplay");
const timeDisplay = document.getElementById("timeDisplay");
const accuracyDisplay = document.getElementById("accuracyDisplay");
const playBtn = document.getElementById("playPauseBtn");
const timeButtons = document.querySelectorAll(".time-options .time");
const keyboardSection = document.querySelector(".keyboard");

let startTime;
let timerRunning = false;
let timerInterval;
let countdownInterval;
let currentQuote = "";
let currentIndex = 0;
let errors = 0;
let totalTyped = 0;
let elapsedTime = 0;
let selectedTime = 60; // default 60 seconds
let timeRemaining = selectedTime;

// Random sentences for typing practice
const sentences = [
    "The quick brown fox jumps over the lazy dog",
    "Programming is the art of telling another human being what one wants the computer to do",
    "Success is not final, failure is not fatal: it is the courage to continue that counts",
    "The only way to do great work is to love what you do",
    "Life is what happens when you're busy making other plans",
    "The future belongs to those who believe in the beauty of their dreams",
    "In the middle of difficulty lies opportunity",
    "The best way to predict the future is to invent it",
    "Creativity is intelligence having fun",
    "The only limit to our realization of tomorrow will be our doubts of today",
    "Every expert was once a beginner",
    "The journey of a thousand miles begins with one step",
    "Practice makes perfect, but nobody's perfect, so why practice",
    "The computer was born to solve problems that did not exist before",
    "Technology is best when it brings people together",
    "Innovation distinguishes between a leader and a follower",
    "The Internet is not just one thing, it's a collection of things",
    "Software is a great combination between artistry and engineering",
    "The best error message is the one that never shows up",
    "Code is like humor. When you have to explain it, it's bad"
];

// Virtual keyboard layout
const keyboardLayout = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Win', 'Menu', 'Ctrl']
];

// Create virtual keyboard
function createVirtualKeyboard() {
    keyboardSection.innerHTML = '';
    
    keyboardLayout.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'keyboard-row';
        
        row.forEach(key => {
            const keyButton = document.createElement('button');
            keyButton.className = 'keyboard-key';
            keyButton.textContent = key;
            keyButton.dataset.key = key;
            
            // Special styling for different key types
            if (key === 'Backspace' || key === 'Enter' || key === 'Shift' || key === 'Caps' || key === 'Tab') {
                keyButton.classList.add('special-key');
            }
            if (key === 'Space') {
                keyButton.classList.add('space-key');
            }
            
            rowDiv.appendChild(keyButton);
        });
        
        keyboardSection.appendChild(rowDiv);
    });
}

// Get random sentence
function getRandomSentence() {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
}

// Get quote from local sentences
function getQuote() {
    currentQuote = getRandomSentence();
    currentIndex = 0;
    errors = 0;
    totalTyped = 0;
    elapsedTime = 0;
    timeRemaining = selectedTime;
    
    quoteDisplay.innerText = currentQuote;
    quoteInput.value = "";
    stopTimer();
    stopCountdown();
    updateTimeDisplay();
    updateAccuracyDisplay();
    wpmDisplay.innerText = "0";
    quoteInput.disabled = false;
    quoteInput.focus();
}

// Start timer
function startTimer() {
    startTime = new Date();
    timerRunning = true;
    timerInterval = setInterval(() => {
        elapsedTime = (new Date() - startTime) / 1000;
        const elapsedMinutes = elapsedTime / 60;
        const wordsTyped = quoteInput.value.trim().split(" ").length;
        const wpm = Math.round(wordsTyped / elapsedMinutes);
        wpmDisplay.innerText = isNaN(wpm) ? "0" : wpm.toString();
    }, 100);
    
    startCountdown();
}

function stopTimer() {
    clearInterval(timerInterval);
    clearInterval(countdownInterval);
    timerRunning = false;
}

function startCountdown() {
    countdownInterval = setInterval(() => {
        timeRemaining--;
        updateTimeDisplay();
        
        if (timeRemaining <= 0) {
            // Time's up - end test
            stopTimer();
            quoteInput.disabled = true;
            showResults();
        }
    }, 1000);
}

function stopCountdown() {
    clearInterval(countdownInterval);
}

function updateTimeDisplay() {
    timeDisplay.innerText = `${timeRemaining}s`;
}

function updateAccuracyDisplay() {
    const accuracy = totalTyped > 0 ? Math.round(((totalTyped - errors) / totalTyped) * 100) : 100;
    accuracyDisplay.innerText = `${accuracy}%`;
}

function showResults() {
    const accuracy = Math.round(((totalTyped - errors) / totalTyped) * 100) || 0;
    const elapsedMinutes = elapsedTime / 60;
    const wpm = Math.round((quoteInput.value.trim().split(" ").length) / elapsedMinutes);
    
    // Redirect to results page with parameters
    const resultsUrl = `/app/results/?wpm=${wpm}&time=${elapsedTime.toFixed(1)}&accuracy=${accuracy}&errors=${errors}`;
    window.location.href = resultsUrl;
}

// Handle keyboard input
function handleKeyPress(event) {
    if (quoteInput.disabled) return;
    
    const typedChar = event.key;
    const expectedChar = currentQuote[currentIndex];
    
    if (!timerRunning) {
        startTimer();
    }
    
    if (typedChar === expectedChar) {
        currentIndex++;
        totalTyped++;
        updateAccuracyDisplay();
        
        if (currentIndex >= currentQuote.length) {
            // Quote completed - end test
            stopTimer();
            quoteInput.disabled = true;
            showResults();
        }
    } else {
        errors++;
        totalTyped++;
        updateAccuracyDisplay();
    }
}

// Event listeners
quoteInput.addEventListener("input", (e) => {
    // Prevent default input behavior, we'll handle it manually
    e.preventDefault();
});

quoteInput.addEventListener("keydown", handleKeyPress);

playBtn.addEventListener("click", getQuote);

timeButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Extract time value from button text (e.g., "30s" -> 30)
        const timeText = button.innerText;
        selectedTime = parseInt(timeText.replace('s', ''));
        timeRemaining = selectedTime;
        updateTimeDisplay();
        
        // Highlight selected button
        timeButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        
        console.log(`Time option selected: ${selectedTime}s`);
    });
});
createVirtualKeyboard();
getQuote();
