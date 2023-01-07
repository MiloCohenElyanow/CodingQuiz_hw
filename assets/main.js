
const startButton = document.getElementById('start-btn'); // initializing start button from html as startButton
const nextButton = document.getElementById('next-btn'); // etc
const questionContainerElement = document.getElementById('question-container') // initializing question container as questionContainerElement
const questionElement = document.getElementById('question'); // initializing the question container for use as questionElement to write the questions to the html and their content from the questions array.
const answerButtonsElement = document.getElementById('answer-buttons') // init answer-buttons as answerButtonsElement for writing the actual text to the buttons, in this case we need to grab the container and then can 'bubble down' the answers since they both exist in chronilogical order.


let shuffledQuestions, currentQuestionIndex



startButton.addEventListener('click', startGame); // listening when startButton is clicked and when it is we call startGame
nextButton.addEventListener('click',() =>{
  currentQuestionIndex++; // move current question index up one when next button is clicked and then set the next question with setnextquestion.
  setNextQuestion();
} )


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
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]); // calling showquestion with shuffledquestions at the current question index.
}

function showQuestion(question){
  questionElement.innerText = question.question; // populating the question field above the answer buttons, reading from question variable in question object from the currentquestionindex
  question.answers.forEach(answer => { //arrow function just to compress all of this and do it efficiently 
    const button = document.createElement('button'); // creating new buttons each time we call showquestions, essential for question seperation
    button.innerText = answer.text; // setting new buttons text to the new questions answer text
    button.classList.add('btn'); // setting new button to class of btn
    if(answer.correct) {
      button.dataset.correct = answer.correct; // setting only the correct data set to correct, and the rest can stay defaulted to false, this way we dont have to work with real bolean values, this will only happen if the button is correct
    }
    button.addEventListener('click', selectAnswer); //event listener as click and when we do we call select answer
    answerButtonsElement.appendChild(button); // 'writing' or apending these new buttons we just made to the answer button section as children
  })
}


function resetState(){
  clearStatusClass(document.body); // reset the body background color to neutral when a answer for a question has not been selected.
  clearStatusClass(document.body);
  nextButton.classList.add('hide'); // hiding next button until we click on an answer\
  while(answerButtonsElement.firstChild){// essential while, in answerButtonsElement if there is any first child inside of the answer button element
    answerButtonsElement.removeChild(answerButtonsElement.firstChild); // removing all answers that came before current, and next answers simply wont display
  }
}



function selectAnswer(e) { // taking e(event) in as para
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct // getting the 'correct' data set that is true since it defualts to evaluating that way.
  setStatusClass(document.body, correct); // selecting the body and telling it weather it should be set to correct or wrong.
  // need to convert the live objects and datasets into an array, and running that for and through each of the buttons
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct); // setting the status of the button weather or not the status of the button is correct or not 
  })
  if(shuffledQuestions.length > currentQuestionIndex + 1){ // if we arent on the last question then we will show the next button otherwise the next button will not show. the next button return throws an error if there isnt any questions left.
  nextButton.classList.remove('hide'); // remove hide class from next button when select answer is called, or when the answer for the question is chosen.
  }
  else {
    startButton.innerText = 'Restart?'; // when we finish the last question instead of making an entire new restart button we can just reuse the start button and simply rename the text inside to restart. and when clicked the quiz will start over again in a new order
    startButton.classList.remove('hide'); // showing the restart or (start) button when done with the last question
  }
}


function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct') // when the element(answer/choice box) results to being correct when clicked on we set the css class to correct and subsequently the wrest of them to wrong class
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct') // when moving to the next question we set the question boxes to neither correct or wrong to default to neutral class.
  element.classList.remove('wrong')
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
  },
  {
    question: 'what is jQuery?',
    answers: [
      {text: 'A JS library designed to make Querying html and css elements easier and more effecient', correct: false},
      {text: 'A HTML library made to make css design easier by putting a bunch of preset css elements into the html', correct: false},
      {text: 'A JS library designed to simplify HTML DOM tree traversal, aswell as event handling, CSS animation, and Ajax', correct:true},
      {text: 'A CSS library that makes design easier by adding lots of premade classes and elements and simply manipulating those', correct:false},
    ]
  },
  {
    question: 'what is 2*3?',
    answers: [
      {text: 'at least 4', correct: true},
      {text: 'your mom', correct: false},
      {text: '6', correct:true},
      {text: '21...', correct:false},
    ]
  },
  {
    question: "what is Gary's favorite movie",
    answers: [
      {text: 'Star Trek', correct: false},
      {text: 'Family Guy Movies', correct: false},
      {text: 'StarWars franchise', correct:false},
      {text: 'Doctor Strange', correct:true},
    ]
  },
  {
    question: 'from a famous vine quote...what are those?',
    answers: [
      {text: 'Chanclas', correct: true},
      {text: "Nike Air Maxe's", correct: false},
      {text: "Jordan Air Ones", correct:false},
      {text: 'Crocks, in sport mode', correct:false},
    ]
  },
  {
    question: 'what is the most effecient form of sea travel?',
    answers: [
      {text: 'Nobody travelels the seas these days...', correct: false},
      {text: 'Getting swallowed by a whale', correct: false},
      {text: 'This question is dumb', correct:false},
      {text: 'Traveling with Captain Jack Sparrow', correct:true},
    ]
  },
  {
    question: 'What is the best coding langauge, obviously un-biased',
    answers: [
      {text: 'Python', correct: true},
      {text: 'HTML,CSS,JS', correct: true},
      {text: 'C++,C#', correct:true},
      {text: 'Ruby, Django', correct:true},
    ]
  },
  {
    question: 'If you were president what is the first thing you would HAVE to do',
    answers: [
      {text: 'Commit a Capitol crime, then pardon yourself', correct: true},
      {text: 'Trash the whitehouse with a epic party', correct: true},
      {text: 'Fill out paper work, because you just became president', correct:false},
      {text: 'Tell your vice president your going on a 4 year vacation', correct:true},
    ]
  },
  {
    question: 'What is the most popular streaming platform',
    answers: [
      {text: 'HULU', correct: false},
      {text: 'TWITCH', correct: true},
      {text: 'NETFLIX', correct:false},
      {text: 'YOUTUBE', correct:true},
    ]
  },
  {
    question: 'what is the best question answer?',
    answers: [
      {text: 'A', correct: false},
      {text: 'B', correct: true},
      {text: 'C', correct:false},
      {text: 'D', correct:false},
    ]
  },
  {
    question: 'what is the most popular rythm game ever made',
    answers: [
      {text: 'OSU!', correct: true},
      {text: 'Beat Saber', correct: false},
      {text: 'Guitar Hero', correct:true},
      {text: 'Friday Night Funkin', correct:false},
    ]
  },
  {
    question: 'what was a revolutionary 32-Bit MMO RPG game, released in 2001',
    answers: [
      {text: 'Minecraft', correct: false},
      {text: 'Realm Of The Mad God', correct: false},
      {text: 'RuneScape', correct:true},
      {text: 'Impossible Quiz', correct:false},
    ]
  },
  {
    question: 'What company makes the best gaming periferals overall',
    answers: [
      {text: 'Logitech', correct: true},
      {text: 'Glorious', correct: false},
      {text: 'Turtle Beach', correct:false},
      {text: 'Xbox', correct:false},
    ]
  },
  {
    question: 'What is bootstrap?',
    answers: [
      {text: 'A free open source css framework directed at mobile-first front end webdevelopement, containing templates, typography, buttons, navigation, and so much more', correct: true},
      {text: 'ur mom lol', correct: true},
      {text: 'Fortnight Battlepass', correct:true},
      {text: 'something from Ohio', correct:false},
    ]
  },
  {
    question: 'what is 2+2?... But the second time',
    answers: [
      {text: '4', correct: false},
      {text: 'bruh', correct: true},
      {text: '239752', correct:false},
      {text: 'at least 7', correct:false},
    ]
  },
]