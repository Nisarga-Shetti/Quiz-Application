const questions = [
    {
        question: "What is the capital city of Australia?",
        answers: [ 
            "Sydney",
            "Melbourne",
            "Canberra",
            "Brisbane"
        ],
        correct: "Canberra"
    },

    {
        question: "Which planet in our solar system is known as the 'Red Planet'?",
        answers: [
            "Venus",
            "Mars",
            "Jupiter",
            "Saturn"
        ],
        correct: "Mars"
    },

    {
        question: "Who was the first President of the United States?",
        answers: [
            "Thomas Jefferson",
            "Abraham Lincoln",
            "George Washington",
            "John Adams"
        ],
        correct: "George Washington"
    },

    {
        question: "Which artist released the best-selling album of all time, 'Thriller'?",
        answers: [
            "Prince",
            "Madonna",
            "Michael Jackson",
            "Elton John"
        ],
        correct: "Michael Jackson"
    },

    {
        question: "Which is generally recognized as the longest river in the world?",
        answers: [
            "Nile",
            "Amazon",
            "Yangtze",
            "Mississippi"
        ],
        correct: "Nile"
    },

    {
        question: "In which year did the RMS Titanic sink on its maiden voyage?",
        answers: [
            "1905",
            "1912",
            "1918",
            "1923"
        ],
        correct: "1912"
    },

    {
        question: "What is the chemical symbol for the element Gold?",
        answers: [
            "Ag",
            "Fe",
            "Au",
            "Gd"
        ],
        correct: "Au"
    },

    {
        question: "Which animated feature film became the first-ever movie to be nominated for the Academy Award for Best Picture?",
        answers: [
            "Aladdin",
            "Beauty and the Beast",
            "The Lion King",
            "Toy Story"
        ],
        correct: "Beauty and the Beast"
    },

    {
        question: "What is the approximate half-life of Carbon-14, widely used in radiocarbon dating?",
        answers: [
            "1,250 years",
            "5,730 years",
            "12,500 years",
            "250 years"
        ],
        correct: "5,730 years"
    },

    {
        question: "The Peace of Westphalia in 1648 brought an end to which major European conflict?",
        answers: [
            "Seven Years' War",
            "Thirty Years' War",
            "Napoleonic Wars",
            "War of the Spanish Succession"
        ],
        correct: "Thirty Years' War"
    },

    {
        question: "Which country has the most time zones in the world (including its overseas departments and territories)?",
        answers: [
            "Russia",
            "United States",
            "France",
            "China"
        ],
        correct: "France"
    },

    {
        question: "Which virtual alternative rock band was created in 1998 by musician Damon Albarn and artist Jamie Hewlett?",
        answers: [
            "Daft Punk",
            "Gorillaz",
            "MGMT",
            "Justice"
        ],
        correct: "Gorillaz"
    },

    {
        question: "Which subatomic particle was discovered by J.J. Thomson in 1897 through cathode-ray tube experiments?",
        answers: [
            "Proton",
            "Neutron",
            "Electron",
            "Photon"
        ],
        correct: "Electron"
    },

    {
        question: "The ancient Phoenician and Roman rival city of Carthage was located in which present-day North African country?",
        answers: [
            "Egypt",
            "Libya",
            "Tunisia",
            "Morocco"
        ],
        correct: "Tunisia"
    },

    {
        question: "Mount Kilimanjaro is the highest free-standing mountain and peak in Africa. In which country is it located?",
        answers: [
            "Kenya",
            "Tanzania",
            "Uganda",
            "Ethiopia"
        ],
        correct: "Tanzania"
    },
];

const startscreen = document.getElementById("start-screen");
const quizscreen = document.getElementById("quiz-screen");
const resultscreen= document.getElementById("result-screen");

const startbtn = document.getElementById("start-btn");
const restartbtn = document.getElementById("restart-btn");
const nextbtn = document.getElementById("next-btn");
const prevbtn = document.getElementById("prev-btn");

const questionelement = document.getElementById("question");
const answerbuttons = document.getElementById("answer-buttons");

const timerelement = document.getElementById("timer");
const scoreelement = document.getElementById("score");
const progressbar = document.getElementById("progress-bar");

const finalscore = document.getElementById("final-score");
const resultmessage= document.getElementById("result-message");

let currentquestionindex = 0;
let score = 0;
let timeleft = 60;
let timerinterval;
let useranswers = [];

function startQuiz() {
    currentquestionindex = 0;
    score = 0;
    timeleft = 60;
    useranswers = [];

    startscreen.classList.add("hidden");
    resultscreen.classList.add("hidden");
    quizscreen.classList.remove("hidden");

    scoreelement.textContent = score;
    timerelement.textContent = timeleft;

    showQuestion();

    clearInterval(timerinterval);

    timerinterval = setInterval(() => {
        timeleft--;
        timerelement.textContent = timeleft;

        if (timeleft <= 0) {
            endQuiz();
        }
    },  1000);
}

function showQuestion() {
    resetAnswers();

    const currentquestion = questions[currentquestionindex];

    questionelement.textContent = `${currentquestionindex + 1}. ${currentquestion.question}`;
    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer-btn");

        button.addEventListener("click", () => {
            selectAnswer(answer);
        });

        answerbuttons.appendChild(button);

    });

    updateNavigation();
    updateProgress();
    updateScore();
}

function resetAnswers() {
    answerbuttons.innerHTML = "";
}

function selectAnswer(selectedAnswer) {
    if (useranswers[currentquestionindex] !== undefined) {
        return;
    }

    useranswers[currentquestionindex] = selectedAnswer;

    const correctanswer = questions[currentquestionindex].correct;
    const buttons = answerbuttons.querySelectorAll(".answer-btn");

    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === correctanswer) {
            button.classList.add("correct");
        }

        if (button.textContent === selectedAnswer && selectedAnswer !== correctanswer) {
            button.classList.add("incorrect");
        }
    });

    updateScore();
}

function updateScore() {
    score = 0;
    questions.forEach((question, index) => {
        if (useranswers[index] === question.correct) {
            score++;
        }
    });

    scoreelement.textContent = score;
}

function updateNavigation() {
    prevbtn.disabled = currentquestionindex === 0;

    nextbtn.textContent =  currentquestionindex === questions.length - 1 ? "Finish Quiz" : "Next";
}

function updateProgress() {
    const progress = ((currentquestionindex + 1) / questions.length) * 100;

    progressbar.style.width = `${progress}%`;
}

function nextQuestion() {
    if (currentquestionindex < questions.length - 1) {
        currentquestionindex++;
        showQuestion();

    } else {
        endQuiz();
    }
}

function previousQuestion() {
    if (currentquestionindex > 0) {
        currentquestionindex--;
        showQuestion();
    }
}

function endQuiz() {
    clearInterval(timerinterval);
    updateScore();

    quizscreen.classList.add("hidden");
    resultscreen.classList.remove("hidden");

    finalscore.textContent = `Your Score: ${score} / ${questions.length}`;

    if (score >= 8) {
        resultmessage.textContent = "Excellent! Great job!";

    } else if (score >= 5) {
        resultmessage.textContent = "Good work! Keep practicing";

    } else {
        resultmessage.textContent = "Keep learning! Try again.";

    }

    progressbar.style.width = "100%";
}

startbtn.addEventListener("click", startQuiz);
nextbtn.addEventListener("click", nextQuestion);
prevbtn.addEventListener("click", previousQuestion);
restartbtn.addEventListener("click", startQuiz);