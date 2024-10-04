
const rock = document.querySelector('.rock');
const paper = document.querySelector('.paper');
const scissors = document.querySelector('.scissors');
const question = document.getElementById('default');

const startBtn = document.querySelector('#shuffle');
startBtn.addEventListener("click", animate);

rock.addEventListener("click", playerChoice);
paper.addEventListener("click", playerChoice);
scissors.addEventListener("click", playerChoice);


const comChoice = document.querySelector('#shuffling');
const cRock = document.createElement('img');
const cPaper = document.createElement('img');
const cScissors = document.createElement('img');

// Set image sources and classes
cRock.src = "images/rock.PNG";
cPaper.src = "images/paper.png";
cScissors.src = "images/scissors.png";
cRock.classList.add('rock');
cPaper.classList.add('paper');
cScissors.classList.add('scissors');

function playerChoice(event) {
    const thro = event.currentTarget;
    console.log("clicked rock");

    if (thro.classList.contains('rock')) {
        console.log("this is a rock");
        rock.id = "highlight";
    }
    else if (thro.classList.contains('paper')) {
        console.log("this is paper");
        paper.id = "highlight";
    }
    else {
        console.log("these are scissors");
        scissors.id = "highlight";
    }
}

function animate() {
    const question = document.getElementById("default");
    if (question) {
        question.remove(); // Remove the question mark image
    }
    // Array to hold the images
    const images = [cRock, cPaper, cScissors];
    let index = 0; // To track the current image

    // Function to show the next image
    function showNextImage() {
        // Clear the previous image if it exists
        if (comChoice.firstChild) {
            comChoice.removeChild(comChoice.firstChild);
        }


        // Append the current image to the container
        comChoice.appendChild(images[index]);
        index++;

        // If we reach the end of the images array, reset the index
        if (index >= images.length) {
            index = 0;
        }
    }

    // Show the first image immediately
    showNextImage();

    // Set interval to shuffle images for 5 seconds
    const shuffleDuration = 5000; // 5 seconds
    const shuffleInterval = 300; // Show each image for 300 ms
    const totalImages = Math.floor(shuffleDuration / shuffleInterval); // Calculate total images to show
    let count = 0; // Counter for the total images shown

    // Named function for shuffling
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

    // let desicion = Math.floor(Math.random() * 3) + 1;
    let desicion = 2;

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
    console.log("the winner is: " + desicion);

}

function outcome() {
    const player = document.querySelector('#highlight');
    const computer = document.querySelector('#blue');
    const display = document.querySelector('#outcome-container');

    console.log("player chose: " + player);
    console.log("computer chose: " + computer);

    if (player.classList.contains('rock') && computer.classList.contains('paper')){
        console.log("player loses");
        const para = document.createElement('p');
        para.textContent = "player has lost";
        display.appendChild(para);
    }
}

