// Questions and answers (customize with your own questions)
const quizQuestions = [
    {
        question: "What is a variable in JavaScript?",
        options: ["A. A programming language", "B. A container for storing data", "C. A type of loop"],
        correctAnswer: "B"
    },
    // Add more questions here...
];

// Global variables
let currentQuestionIndex = 0;
let score = 0;
let timer;
const quizTimeInSeconds = 60; // Adjust as needed
const initialsForm = document.getElementById("initials-form");
const saveScoreButton = document.getElementById("save-score-button");

// Function to start the quiz
function startQuiz() {
    // Hide the start page and show the quiz page
    document.getElementById("start-page").style.display = "none";
    document.getElementById("quiz-page").style.display = "block";
    
    // Start the timer
    startTimer(quizTimeInSeconds);
    
    // Display the first question
    displayQuestion(currentQuestionIndex);
}

// Function to start the timer
function startTimer(seconds) {
    let timeLeft = seconds;
    timer = setInterval(function() {
        document.getElementById("timer").textContent = timeLeft + "s";
        timeLeft--;

        if (timeLeft < 0) {
            endQuiz();
        }
    }, 1000);
}

// Function to display a question
function displayQuestion(index) {
    const questionText = document.getElementById("question-text");
    const answerOptions = document.querySelectorAll(".answer-option");
    
    if (index < quizQuestions.length) {
        questionText.textContent = `Question ${index + 1}: ${quizQuestions[index].question}`;
        
        // Display answer options
        for (let i = 0; i < answerOptions.length; i++) {
            answerOptions[i].textContent = quizQuestions[index].options[i];
        }
    } else {
        // No more questions; end the quiz
        endQuiz();
    }
}

// Function to check the selected answer
function checkAnswer(selectedOption) {
    const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;
    
    if (selectedOption === correctAnswer) {
        // Correct answer; increment score
        score++;
    } else {
        // Incorrect answer; deduct time (e.g., 10 seconds)
        const timeLeft = parseInt(document.getElementById("timer").textContent);
        const timeDeduction = 10;
        const updatedTime = timeLeft - timeDeduction;
        
        if (updatedTime < 0) {
            endQuiz();
        } else {
            startTimer(updatedTime);
        }
    }
    
    // Move to the next question
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timer); // Stop the timer
    document.getElementById("quiz-page").style.display = "none";
    document.getElementById("game-over-page").style.display = "block";
    document.getElementById("final-score").textContent = score;
}

// Event listener for starting the quiz
document.getElementById("start-button").addEventListener("click", startQuiz);

// Event listener for answer options
document.querySelectorAll(".answer-option").forEach(function(option) {
    option.addEventListener("click", function() {
        const selectedOption = option.textContent.charAt(0);
        checkAnswer(selectedOption);
    });
});

// Event listener for saving high score
initialsForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const initialsInput = document.getElementById("initials").value;
    
    if (initialsInput) {
        // Store high score (customize as needed)
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScores.push({ initials: initialsInput, score: score });
        localStorage.setItem("highScores", JSON.stringify(highScores));
        
        // Redirect to high scores page or display high scores
        displayHighScores();
    }
});

// Function to display high scores
function displayHighScores() {
    // Hide game over page and show high scores page (customize as needed)
    document.getElementById("game-over-page").style.display = "none";
    document.getElementById("high-scores-page").style.display = "block";
    
    // Retrieve and display high scores (customize as needed)
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const highScoresList = document.getElementById("high-scores-list");
    
    highScoresList.innerHTML = "";
    highScores.forEach(function(item, index) {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${item.initials}: ${item.score}`;
        highScoresList.appendChild(listItem);
    });
}

// Event listener for retaking the quiz
document.getElementById("retake-quiz-button").addEventListener("click", function() {
    location.reload(); // Reload the page to retake the quiz
});
