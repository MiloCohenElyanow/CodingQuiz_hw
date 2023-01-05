

const startQButt = document.querySelector("#startQButt"); // selecting the startQButt button from the html






function homeMain(){
  //defining homepage main, I want a homepage before the quiz, just seems more realistic.
  startQButt.addEventListener("click", quizMain) // add event listener to startQButt , and when event click happens call quiz main
}

function quizMain (){
  //defining the mainquiz page
  quizdef();
}