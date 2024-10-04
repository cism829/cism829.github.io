const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');
const scissors = document.querySelector('#scissors');

const startBtn = document.querySelector('#shuffle');
startBtn.addEventListener("click", shuffleAni);

rock.addEventListener("click", playerChoice);
paper.addEventListener("click", playerChoice);
scissors.addEventListener("click", playerChoice);

function playerChoice(event){
    const thro = event.currentTarget;
    console.log("clicked rock");
}

function shuffleAni(event){
    var elem = document
}
