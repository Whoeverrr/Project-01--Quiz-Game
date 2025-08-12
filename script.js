// DOM elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-questions");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
    {
        question: "Where is the land of GOLD?",
        answers: [
            { text: "Johannesburg", correct: true },
            { text: "Cape Town", correct: false },
            { text: "Bloemfontein", correct: false },
            { text: "Orange Farm", correct: false },
        ],
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Monaco", correct: false },
            { text: "New York City", correct: false },
            { text: "Paris", correct: true },
            { text: "London", correct: false }
        ],
    },
    {
        question: "Which country currently has the strongest economy in terms of GDP (nominal)?",
        answers: [
            { text: "China", correct: false },
            { text: "USA", correct: true },
            { text: "Germany", correct: false },
            { text: "Japan", correct: false },
        ],
    },
    {
        question: "Which city is the capital of Australia?",
        answers: [
            { text: "Melbourne", correct: false },
            { text: "Perth", correct: false },
            { text: "Sydney", correct: false },
            { text: "Canberra", correct: true },
        ],
    },
    {
        question: "Which city is known as the city of canals?",
        answers: [
            { text: "Amsterdam", correct: false },
            { text: "Venice", correct: true },
            { text: "Bangkok", correct: false },
            { text: "Washington D.C", correct: false },
        ],
    },
];

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

// Start quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

// Show question
function showQuestion() {
    answerDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    // Clear old answers
    answersContainer.innerHTML = "";

    // Add new answers
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}

// Select answer
function selectAnswer(event) {
    if (answerDisabled) return;
    answerDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

// Show results
function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Outstanding, That was perfect!!!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great Job, you know your stuff! Try again.";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort, keep on learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad, try again to improve your score!";
    } else {
        resultMessage.textContent = "Keep on studying. You will surely get better!";
    }
}

// Restart quiz
function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    scoreSpan.textContent = 0;

    resultScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}
