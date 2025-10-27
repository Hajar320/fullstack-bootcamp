const selection = document.querySelector(".op");
const timer = document.querySelector("#timer");
let correctname = '';
let leaderboard = { correct: 0, wrong: 0 };
let timerInterval;
let time = 10;
let clickCount = 0;

async function fetchrandom() {
    try {
        const response = await fetch('http://localhost:3000/emojis');
        const data = await response.json();
        const randomEmoji = document.querySelector(".png");
        
        randomEmoji.textContent = data.emj;
        correctname = data.name;
        
        // Reset and start timer for new question
        resetTimer();
        
    } catch (error) {
        console.error('Error fetching emoji:', error);
        check.textContent = "Error loading emoji!";
        check.style.color = "red";
    }
}

async function fetchOptions() {
    try {
        const response = await fetch("http://localhost:3000/options");
        const data = await response.json();
        const shuffled = data.sort(() => 0.5 - Math.random());
        
        // CLEAR existing options first
        selection.innerHTML = '';
        
        // Add default option
        const defaultOption = document.createElement("option");
        defaultOption.textContent = "Choose an answer...";
        defaultOption.value = "";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selection.appendChild(defaultOption);
        
        // Add new options
        shuffled.slice(0, 3).forEach(optionText => {
            const option = document.createElement("option");
            option.textContent = optionText;
            option.value = optionText;
            selection.appendChild(option);
        });
        
        // Add correct option (make sure it's included)
        const correctOption = document.createElement("option");
        correctOption.textContent = correctname;
        correctOption.value = correctname;
        selection.appendChild(correctOption);
        
        // Shuffle the final options in dropdown
        const optionsArray = Array.from(selection.options);
        const shuffledOptions = optionsArray.sort(() => 0.5 - Math.random());
        selection.innerHTML = '';
        
        // Add default option back first
        selection.appendChild(defaultOption);
        
        // Add shuffled options
        shuffledOptions.forEach(option => {
            if (option.value !== "") { // Don't add the default option again
                selection.appendChild(option);
            }
        });
        
    } catch (error) {
        console.error('Error fetching options:', error);
        check.textContent = "Error loading options!";
        check.style.color = "red";
    }
}

// Combined function to fetch both
async function loadNewQuestion() {
    check.textContent = "Loading...";
    check.style.color = "blue";
    await fetchrandom();
    await fetchOptions();
    check.textContent = "";
}

const check = document.querySelector(".check");
const scores = document.querySelector("#score");
const btn = document.querySelector("#submit");

btn.addEventListener("click", function handleGuess() {
    const selectionvalue = selection.value;
    
    // Validate selection
    if (!selectionvalue) {
        check.textContent = "Please select an option!";
        check.style.color = "orange";
        return;
    }
    
    clickCount++;
    
    // Stop timer when answering
    clearInterval(timerInterval);
    
    if (selectionvalue === correctname) {
        check.textContent = "Correct! 🎉";
        check.style.color = "green";
        leaderboard.correct += 1;
    } else {
        check.textContent = `Wrong! Correct answer: ${correctname}`;
        check.style.color = "red";
        leaderboard.wrong += 1;
    }
    
    scores.textContent = `Correct: ${leaderboard.correct} | Wrong: ${leaderboard.wrong}`;
    
    // Check for game over (after 5 guesses)
    if (clickCount >= 5) {
        setTimeout(() => {
            alert(`Game Over! You guessed ${clickCount} times!\nFinal Score - Correct: ${leaderboard.correct} | Wrong: ${leaderboard.wrong}`);
            // Reset game
            clickCount = 0;
            leaderboard = { correct: 0, wrong: 0 };
            scores.textContent = `Correct: ${leaderboard.correct} | Wrong: ${leaderboard.wrong}`;
            check.textContent = "Game Reset! Start again!";
            resetTimer();
        }, 1000);
    } else {
        // Load next question after delay
        setTimeout(() => {
            loadNewQuestion();
            check.textContent = "";
        }, 1500);
    }
});

const startbtn = document.querySelector("#start");
startbtn.addEventListener('click', () => {
    resetTimer();
    loadNewQuestion();
    scores.textContent = "Correct: 0 | Wrong: 0";
    clickCount = 0;
    leaderboard = { correct: 0, wrong: 0 };
    check.textContent = "";
});

function resetTimer() {
    clearInterval(timerInterval);
    time = 10;
    if (timer) {
        timer.textContent = `Time: ${time}s`;
        timer.style.color = "black";
    }
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        time--;
        if (timer) {
            timer.textContent = `Time: ${time}s`;
        }
        
        if (time <= 3 && timer) {
            timer.style.color = "red";
        }
        
        if (time <= 0) {
            clearInterval(timerInterval);
            handleTimeUp();
        }
    }, 1000);
}

function handleTimeUp() {
    check.textContent = "Time's up! ⏰";
    check.style.color = "orange";
    leaderboard.wrong += 1;
    scores.textContent = `Correct: ${leaderboard.correct} | Wrong: ${leaderboard.wrong}`;
    
    // Check if game should end due to time up after 5 rounds
    if (clickCount >= 5) {
        setTimeout(() => {
            alert(`Game Over! Time's up!\nFinal Score - Correct: ${leaderboard.correct} | Wrong: ${leaderboard.wrong}`);
            clickCount = 0;
            leaderboard = { correct: 0, wrong: 0 };
            scores.textContent = `Correct: ${leaderboard.correct} | Wrong: ${leaderboard.wrong}`;
            check.textContent = "";
            resetTimer();
        }, 1500);
    } else {
        // Load next question after delay
        setTimeout(() => {
            check.textContent = "";
            loadNewQuestion();
        }, 1500);
    }
}

// Initialize first question when page loads
window.addEventListener('load', () => {
    loadNewQuestion();
}); 
