const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById('finalScore');
const mostRecentScore = document.getElementById('mostRecentScore');
finalScore.innerText = mostRecentScore;
username.addEventListener('keyup', () =>{
    saveScoreBtn.disabled = !username.value;
    console.log(username.value);
});

saveHighScore = e => {
    e.preventDefault();
    
};