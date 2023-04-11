
var questions = [
    {
        question: "What is your quest?",
        answers: ["The Holy Grail", "New shoes", "Hermes bag", "The Meaning of Life"],
        correct: "The Holy Grail"
    },
    {
        question: "What is the velocity of an unlaiden swallow?",
        answers: ["10mph", "20mph", "50mph", "African or European Swallow?"],
        correct: "20mph"
    },
    {
        question: "What does she have that's huge?",
        answers: ["Tracts of land", "Head", "Feet", "Father"],
        correct: "Tracts of land"
    }];

const MAX_SECONDS = 60;

var currentQuestion = 0;
var secondsRemaining = 0;
var score = 0;

var timer = null;

var startButton = document.getElementById("startButton");

var timerArea = document.getElementById("timerArea");

var questionText = document.getElementById("questionText");

var answerOption1 = document.getElementById("answerOption1");
var answerOption2 = document.getElementById("answerOption2");
var answerOption3 = document.getElementById("answerOption3");
var answerOption4 = document.getElementById("answerOption4");

var scoreCountArea = document.getElementById("scoreCountArea");

var nameText = document.getElementById("nameText");

var saveScoreButton = document.getElementById("saveScoreButton");

function displayQuestion() {

    var question = questions[currentQuestion];

    questionText.textContent = question.question;

    answerOption1.textContent = question.answers[0];
    answerOption2.textContent = question.answers[1];
    answerOption3.textContent = question.answers[2];
    answerOption4.textContent = question.answers[3];

}

function checkAnswer(event) {

    var correctAnswer = questions[currentQuestion].correct;
    var selectedAnswer = event.target.textContent;

    if (correctAnswer == selectedAnswer) {
        score++;
    } else {
        secondsRemaining = secondsRemaining - 5;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        endGame();
    }

}

function startGame() {

    startButton.disabled = true;

    $("#scoreArea").hide();
    $("#questionArea").show();

    score = 0;

    secondsRemaining = MAX_SECONDS;

    timerArea.textContent = secondsRemaining;

    displayQuestion();

    timer = setInterval(() => {

        if (secondsRemaining > 0) {

            secondsRemaining--;

            timerArea.textContent = secondsRemaining;

        } else {

            clearInterval(timer);

            endGame();

        }


    }, 1000);
}

function endGame() {

    clearInterval(timer);

    $("#questionArea").hide();

    questionText.textContent = null;

    answerOption1.textContent = null;
    answerOption2.textContent = null;
    answerOption3.textContent = null;
    answerOption4.textContent = null;

    currentQuestion = 0;

    startButton.disabled = false;

    $("#scoreArea").show();

    scoreCountArea.textContent = score;
    

}

function setup() {

    startButton.addEventListener("click", startGame);

    answerOption1.addEventListener("click", checkAnswer);
    answerOption2.addEventListener("click", checkAnswer);
    answerOption3.addEventListener("click", checkAnswer);
    answerOption4.addEventListener("click", checkAnswer);

    saveScoreButton.addEventListener("click", function(event){

        event.preventDefault();

        localStorage.setItem(nameText.value, score);

        nameText.value = null;

        $("#scoreArea").hide();

    });

}

setup();



