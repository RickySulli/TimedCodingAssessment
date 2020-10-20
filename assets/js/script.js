const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCountertext = document.getElementById('questionCounter');
const scoretext = document.getElementById('score');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
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

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple")
.then(res => {
    return res.json();
})
.then(loadedQuestions => {
    console.log(loadedQuestions.results);
   questions = loadedQuestions.results.map(loadedQuestion =>{
        const formattedQuestion = {
            question: loadedQuestion.question
        };
    const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random()*3) +1;
        answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer)
        
        answerChoices.forEach((choice, index) => {
            formattedQuestion ["choice" + (index+1)] = choice;
        
        })
        return formattedQuestion;
    });

 
 startGame();

})
.catch(err => {
    console.error(err);
});

const correctPoints = 10;
const maxQuestions = 10;
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
 loader.classList.add('hidden')
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


