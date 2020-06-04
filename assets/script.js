window.onload = function () {
  console.log("starting");
};
// Things that need to be added

// Variables for index, countdown and score
var index = 0;
var countdown = 75;
var score = 75;
var highscore = 0;
var quiztime;
// start the quiz when "start" button is clicked in the html file
document.getElementById("start-button").addEventListener("click", (event) => {
  console.log("hello");
  document.getElementById("start-quiz").classList.add("d-none");
  setTime();
  renderQuestions();
  quiztime = setInterval(setTime, 1000);
});
// This will allow the questions to populate.
function renderQuestions() {
  var questionsIndexLength = questions.length - 1;
  if (index <= questionsIndexLength) {
    document.getElementById("question").innerHTML = questions[index].title;
    renderQuestions();
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
// a way to replace previous question, with new question without needing to create a new html for each question
// see if the use selected the right answer
// timer needs to be set
// store initial and high scores without deleting them automatically.
