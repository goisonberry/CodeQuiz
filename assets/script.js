window.onload = function () {
  console.log("starting");
};
//Global variables for index, countdown, score
var index = 0;
var countDown = 75;
var score = 75;
var highScore = 0;
var quizTime;

// Start the quiz when "start" button is clicked in the html file
document.getElementById("start-button").addEventListener("click", (event) => {
  console.log("hello");
  document.getElementById("start-quiz").classList.add("d-none");
  document.getElementById("quiz-questions").classList.remove("d-none");
  setTime();
  renderQuestions();
  quizTime = setInterval(setTime, 1000);
});
// This will allow the questions to populate
function renderQuestions() {
  var questionsIndexLength = questions.length - 1;
  if (index <= questionsIndexLength) {
    document.getElementById("question").innerHTML = questions[index].title;
    renderQuestionChoices();
  }
  quizOver();
}
// This will populate the choices that relate to the question being asked
function renderQuestionChoices() {
  var question = questions[index].choices;
  console.log(question);
  for (var option = 0; option < question.length; option++) {
    var questionOptionsDiv = document.getElementById("question-choices");
    var questionButtons = document.createElement("button");
    questionButtons.className =
      "btn btn-outline-primary btn-lg d-flex justify-content-around";
    questionButtons.innerHTML = question[option];
    // This occurs when user selects a choice.
    questionButtons.setAttribute(
      "onclick",
      "checkAnswer(" + index + "," + option + ");"
    );
    questionOptionsDiv.append(questionButtons);
  }
  quizOver();
}
// This will allow for a new question to populate without needing to create a new html file for each question.
function clearQuestionDiv() {
  console.log("About to clear html");
  document.getElementById("question-choices").innerHTML = "";
  quizOver();
}
// This will see if the user selected the right answer.
function checkAnswer(question, answer) {
  console.log("question: ", question);
  console.log("answer: ", answer);
  let correctAnswer = questions[question].answer;
  let userAnswer = questions[question].choices[answer];
  if (userAnswer == correctAnswer) {
    index = index + 1;
    console.log(score);
    console.log("Correct");
  }
  // This will allow code to continue even if wrong answer is selcted along with taking away time
  else {
    index = index + 1;
    countDown = countDown - 15;
    score = score - 15;
    console.log(score);
    console.log("Next question: ", index);
    console.log("Incorrect");
  }
  clearQuestionDiv();
  renderQuestions();
  quizOver();
}
// This sets up the timer to start countiing down from 75 seconds.
function setTime() {
  document.getElementById("quiz-time").innerHTML = countDown + "sec left";
  countDown--;
  if (countDown == -1) {
    clearInterval(quizTime);
  }
  quizOver();
}
// This will check to see if the conditions are occuring correctly within each function.
function quizOver() {
  if (index >= 5 || countDown <= 0) {
    document.getElementById("quiz-questions").classList.add("d-none");
    document.getElementById("all-done").classList.remove("d-none");
    document.getElementById("quiz-time").innerHTML = countDown + "sec left";
    document.getElementById("final-score").innerHTML = countDown;

    clearInterval(quizTime);
  }
}
// Event listener stores initial and high scores without deleting them automatically
document.getElementById("initials-button").addEventListener("click", saveScore);

//Function for saving high score and user's initials
function saveScore() {
  var userInitials = document.querySelector("#initial-input").value;
  var finalScore = countDown;

  //Object stores intitials and high scores
  var scoreObject = { initials: userInitials, score: finalScore };

  var highScores = localStorage.getItem("highScoreList");

  if (highScores == null) {
    localStorage.setItem("highScoreList", JSON.stringify([scoreObject]));
    console.log(highScores);
  } else {
    highScoreList = JSON.parse(highScores);
    console.log(typeof highScoreList);
    highScoreList.push(scoreObject);
    localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
  }
}
