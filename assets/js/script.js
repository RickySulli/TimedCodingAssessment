const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCountertext = document.getElementById('questionCounter');
const scoretext = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

var timeleft = 60;
var Timer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(Timer);
    document.getElementById("time-left").innerHTML = "Finished";
    window.location.assign('/end.html');
  } else {
    document.getElementById("time-left").innerHTML = timeleft;
  }
  timeleft -= 1;
}, 1000);

let questions = [

    {
        question:  "Inside which HTML element do we put the Javascript?",
            choice1: "<js>",
            choice2: "<javascript>",
            choice3: "<skripz>",
            choice4: "<script>",
        answer: 4
    },
    {
        question:  "Where is the correct place to insert a Javascript?",
            choice1: "The <body> section",
            choice2: "The <head> section",
            choice3: "The <footer> section",
            choice4: "The <middle> section",
        answer: 1
    },
    {
        question:  "What are the variables used for in JavaScript Programs?",
            choice1:"Causing high-school algebra flashbacks.",
            choice2:"Varying randomly.",
            choice3:"Storing numbers, dates and other values",
            choice4:"None of the Above.",
        answer: 3
    },
    {
        question:"_______JavaScript statements embedded in an HTML page can respond to user events such as mouse-clicks, form input and page navigation.",
            choice1:"Server-side",
            choice2:"Client-side",
            choice3:"Local",
            choice4:"Native",
        answer: 2
    },
    {
        question:"Which of the following can't be done with client-side JavaScript?",
            choice1:"Validating a form",
            choice2:"Sending a form's contents by email",
            choice3:"Storing the form's contents to a database file on the server.",
            choice4:"None of the Above",
        answer: 3
    },
    {
        question:"The _______ method of an array object adds and/or removes elements from an array.",
            choice1:"Reverse",
            choice2:"Shift",
            choice3:"Slice",
            choice4:"Splice",
        answer: 4
    },
    {
        question:"To set up the window to capture all Click events, we use which of the following?",
            choice1:"window.captureEvents(Event.CLICK);",
            choice2:"window.handleEvents(Event.CLICK);",
            choice3:"window.routeEvents(Event.CLICK);",
            choice4:"window.raiseEvents(Event.CLICK);",
        answer: 1
    },
    {
        question:"How do we write 'Hello World!' in an alert box?",
            choice1:"alertBox('Hello World')",
            choice2:"msgBox('Hello World')",
            choice3:"msg('Hello World')",
            choice4:"alert('Hello World')",
        answer: 4
    },
    {
        question:"Which of the following is the correct statement of WHILE loop start?",
        choice1:"while(i<=10)",
        choice2:"while(i<=10;i++)",
        choice3:"while  i =1 to 10",
        choice4:"none of these",
        answer: 1
    },
    {
        question:"Which of the following of Boolean objet returns teh primitive value of the Boolean object?",
        choice1:"toString()",
        choice2:"toSource()",
        choice3:"valueOf()",
        choice4:"none of these",
        answer: 3
    }
]

const correctPoints = 10;
const maxQuestions = 10;
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > maxQuestions){
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign('/end.html');
    }
    questionCounter++;
    questionCountertext.innerText = questionCounter + "/" + maxQuestions;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

    choices.forEach( choice =>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });    

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
        };
       choices.forEach(choice =>{
           choice.addEventListener('click', e =>{
              if (!acceptingAnswers) return;

              acceptingAnswers = false;
              
              const selectedChoice = e.target;
              const selectedAnswer = selectedChoice.dataset["number"];
           
              const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
             
        if (classToApply === "correct") {
            incrementScore(correctPoints);
        }      

            selectedChoice.parentElement.classList.add(classToApply);
            console.log(classToApply);
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 300);
 
           });

incrementScore = num => {
    score += num;
    scoretext.innerText = score;
}
       }); 

startGame();
