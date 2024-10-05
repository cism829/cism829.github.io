
const rock = document.querySelector('.rock');
const paper = document.querySelector('.paper');
const scissors = document.querySelector('.scissors');
const question = document.getElementById('default');
const display = document.querySelector('#outcome-container');
let reset = document.querySelector('#reset');


let victor = document.getElementById('victor');

const startBtn = document.querySelector('#shuffle');
startBtn.addEventListener("click", animate);

rock.addEventListener("click", playerChoice);
paper.addEventListener("click", playerChoice);
scissors.addEventListener("click", playerChoice);

rock.addEventListener("dblclick", clear);
paper.addEventListener("dblclick", clear);
scissors.addEventListener("dblclick", clear);


const comChoice = document.querySelector('#shuffling');
const cRock = document.createElement('img');
const cPaper = document.createElement('img');
const cScissors = document.createElement('img');

cRock.src = "images/rock.PNG";
cPaper.src = "images/paper.PNG";
cScissors.src = "images/scissors.PNG";
cRock.classList.add('rock');
cPaper.classList.add('paper');
cScissors.classList.add('scissors');




let playerScore = 0;
let computerScore = 0;
let tieScore = 0;




function resetChoice() {
    rock.id = "";
    paper.id = "";
    scissors.id = "";
}

function resetComChoice() {
    cRock.id = "";
    cPaper.id = "";
    cScissors.id = "";
}

function playerChoice(event) {
    const thro = event.currentTarget;

    resetChoice();
    if (thro.classList.contains('rock')) {
        rock.id = "highlight";
    }
    else if (thro.classList.contains('paper')) {
        paper.id = "highlight";
    }
    else {
        scissors.id = "highlight";
    }
}


function animate() {
    resetComChoice();

    const question = document.getElementById("default");
    if (question) {
        question.remove();
    }

    const images = [cRock, cPaper, cScissors];
    let index = 0;


    function showNextImage() {

        if (comChoice.firstChild) {
            comChoice.removeChild(comChoice.firstChild);
        }
        comChoice.appendChild(images[index]);
        index++;
        if (index >= images.length) {
            index = 0;
        }
    }

    showNextImage();


    const shuffleDuration = 5000;
    const shuffleInterval = 300;
    const totalImages = Math.floor(shuffleDuration / shuffleInterval);
    let count = 0;

    function shuffle() {
        showNextImage();
        count++;
        if (count >= totalImages) {
            clearInterval(shuffleTimer);
            compDes();
        }

    }

    const shuffleTimer = setInterval(shuffle, shuffleInterval);


}

function compDes() {

    if (comChoice.firstChild) {
        comChoice.firstChild.remove();
    }

    let desicion = Math.floor(Math.random() * 3) + 1;

    // let desicion = 1;

    if (desicion == 1) {
        comChoice.appendChild(cRock);
        cRock.id = "blue";
    }

    else if (desicion == 2) {
        comChoice.appendChild(cPaper);
        cPaper.id = "blue";
    }

    else {
        comChoice.appendChild(cScissors);
        cScissors.id = "blue";
    }
    outcome();

}

function outcome() {
    const player = document.querySelector('#highlight');
    const computer = document.querySelector('#blue');
    const playerElem = document.getElementById('error');

    if (!player) {
        if (!playerElem) {
            const para = document.createElement('p');
            para.id = "error"
            para.textContent = "Please select an option!";
            display.appendChild(para);
        }
        return;
    }
    else if (playerElem){
        const play = document.getElementById('error');
        play.remove();
    }


    if ((player.classList.contains('paper') && computer.classList.contains('rock')) ||
        (player.classList.contains('rock') && computer.classList.contains('scissors')) ||
        (player.classList.contains('scissors') && computer.classList.contains('paper'))) {

        playerScore++;

        if (!victor) {
            const victorHead = document.createElement('h1');
            victorHead.id = "victor";
            victor = victorHead;
            display.appendChild(victor);
        }
        victor.textContent = "YOU WIN !!!";

    }

    else if (
        (computer.classList.contains('rock') && player.classList.contains('scissors')) ||
        (computer.classList.contains('paper') && player.classList.contains('rock')) ||
        (computer.classList.contains('scissors') && player.classList.contains('paper'))) {

        computerScore++;

        if (!victor) {
            const victorHead = document.createElement('h1');
            victorHead.id = "victor";
            victor = victorHead;
            display.appendChild(victor);
        }
        victor.textContent = "COMPUTER WINS !!!";
    }

    else {
        tieScore++;

        if (!victor) {
            const victorHead = document.createElement('h1');
            victorHead.id = "victor";
            victor = victorHead;
            display.appendChild(victor);
        }
        victor.textContent = "THERE'S A TIE !!!";
    }

    scoreCreate();

}


function scoreCreate() {
    const scoreBox = document.querySelector('#scoreBox');


    if (!scoreBox) {
        const boxScore = document.createElement('div');
        boxScore.id = "scoreBox";
        display.appendChild(boxScore);

        const title = document.createElement('h2');
        title.textContent = "Scores: "
        boxScore.appendChild(title);
    }

    const boxScore = document.querySelector('#scoreBox');

    // Check if the score paragraphs already exist
    let playPara = document.querySelector('#playerScore');
    let comPara = document.querySelector('#computerScore');
    let tiePara = document.querySelector('#tieScore');

    // Create paragraphs if they don't exist
    if (!playPara) {
        playPara = document.createElement('p');
        playPara.id = 'playerScore';
        boxScore.appendChild(playPara);
    }

    if (!comPara) {
        comPara = document.createElement('p');
        comPara.id = 'computerScore';
        boxScore.appendChild(comPara);
    }

    if (!tiePara) {
        tiePara = document.createElement('p');
        tiePara.id = 'tieScore';
        boxScore.appendChild(tiePara);
    }

    // Update the text content of the score paragraphs
    playPara.textContent = "player: " + playerScore;
    comPara.textContent = "com: " + computerScore;
    tiePara.textContent = "ties: " + tieScore;

    if (!reset) {
        const resetBtn = document.createElement('button');
        resetBtn.id = "reset"
        reset = resetBtn;
        resetBtn.textContent = "Reset Scores";
        boxScore.appendChild(resetBtn);

        reset.addEventListener("click", resetScores);
    }
}

function resetScores() {
    playerScore = 0;
    computerScore = 0;
    tieScore = 0;

    // Select the score elements again
    const playPara = document.querySelector('#playerScore');
    const comPara = document.querySelector('#computerScore');
    const tiePara = document.querySelector('#tieScore');

    // Update the text content of the score paragraphs
    playPara.textContent = "player: " + playerScore;
    comPara.textContent = "com: " + computerScore;
    tiePara.textContent = "ties: " + tieScore;
}

function clear(event){
    console.log("clear");
    const removeHighlight = event.currentTarget;

    removeHighlight.id = "";

}



