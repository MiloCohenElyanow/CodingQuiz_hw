
const startButton = document.getElementById('start-btn'); // initializing start button from html as startButton
const questionContainerElement = document.getElementById('question-container') // initializing question container as questionContainerElement
const questionElement = document.getElementById('question'); // initializing the question container for use as questionElement to write the questions to the html and their content from the questions array.
const answerButtonsElement = document.getElementById('answer-buttons') // init answer-buttons as answerButtonsElement for writing the actual text to the buttons, in this case we need to grab the container and then can 'bubble down' the answers since they both exist in chronilogical order.


let shuffledQuestions;
let currentQuestionIndex;



startButton.addEventListener('click', startGame); // listening when startButton is clicked and when it is we call startGame


function startGame(){
  console.log("started game"); // just logging when the game is started to the console to make sure it did start
  startButton.classList.add('hide'); // when start button is clicked and startGame function is called we add startButton to the class list hide, and the start button become hidden
  shuffledQuestions = questions.sort(() => Math.random() - .5); // sorting question index randomly by using math random to sort it one way if its above 0 and a different way randomly 
  //if its under 0, we subtraced 0.5 from a number between 0 and 1 so it will always be between -1 and 1 giving a 50% chance to sort the questions 1 of 2 ways every single time the 
  //page is loaded. its less random than actually random but for this use case where somone would only take the quiz once I think this works just fine.
  
  currentQuestionIndex = 0; // setting index to 0 to start at the top after sorting
  questionContainerElement.classList.remove('hide'); // removing hide class from question container when user starts game
  setNextQuestion(); // calling function setnextquestion which will set the next question to the screen from a array of objects that hold the questions and answers
}

function setNextQuestion(){
  showQuestion(shuffledQuestions[currentQuestionIndex]); // calling showquestion with shuffledquestions at the current question index.
}

function showQuestion(question){
  questionElement.innerText = question.question
}

function selectAnswer(){

}

const questions = [ // questions is an array with objects, question is an element of an object ,answers is an array of objects, and those objects have 2 keywords with values, the questions with the content of the question and the value of correct to determine weather it is correct or not. 
  {
    question: 'what is 2+2?',
    answers: [
      {text: '4', correct: true},
      {text: 'bruh', correct: false},
      {text: '239752', correct:false},
      {text: 'at least 7', correct:false},
    ]
  }
]