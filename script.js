//Main variables
var button = document.getElementById("button");
var number = document.getElementById("counting-number");
var boomText = document.getElementById('boom');
var bomb = document.getElementById('bomb');
var fieldArea = document.getElementById("field");
var startDescription = document.getElementById("results-start-desc");
var counter = 10;
var score = document.getElementById("score");
var scoreResults = 0;
var target = document.getElementById("target");
var missedSound = document.getElementById("missed-sound");
var catchedSound = document.getElementById("catched-sound");
var bombSound = document.getElementById("bomb-sound");
var tickTok = document.getElementById("tickTock-sound");

// Button Start Game
button.addEventListener("click", function (event) {
    tickTok.play();
    counter = 10;
    resetGame();
    countingDown();
    caseGenerator();
    button.disabled = true;
    button.style.color = "Grey";
    setTimeout(function () {
        button.disabled = false;
    }, 10000); //to prevent from restarting during the play

});

// Reset the game (default values)
function resetGame() {
    tickTok.play();
    boomText.style.display = 'none';
    bomb.style.display = 'block';
    bomb.style.WebkitAnimation = 'none';
    document.getElementById("counting-line").style.height = "0.5rem";
    scoreResults = 0;
    score.innerHTML = "Score: " + scoreResults;
}

// Bomb 
function countingDown() {
    var deadlineCountdown = setInterval(function () {
        tickTok.play();
        number.innerHTML = counter;
        counter--
        if (counter === 4) {
            document.getElementById("counting-line").style.height = "2rem";
        }
        if (counter < 3) {
            bomb.style.WebkitAnimation = "bomb-shake 0.5s 20";
            document.getElementById("counting-line").style.height = "4rem";
        }
        if (counter < 0 && scoreResults >= 10) {
            bombSound.play();
            bomb.style.display = 'none';
            boomText.style.display = 'block';
            startDescription.innerHTML = 'Click the <span class="start-desc">"Try again"</span> button to start the game';
            target.innerHTML = 'You are not fired <span class="start-desc">THIS</span> time.';
            button.style.color = "Red";
            button.innerHTML = 'Try again';
            clearInterval(deadlineCountdown);
        }
        if (counter < 0 && scoreResults < 10) {
            bombSound.play();
            bomb.style.display = 'none';
            boomText.style.display = 'inline';
            startDescription.innerHTML = 'Click the <span class="start-desc">"Try again"</span> button to start the game';
            target.innerHTML = 'You are <span class="start-desc">FIRED</span>!!!';
            button.style.color = "Red";
            button.innerHTML = 'Try again';
            clearInterval(deadlineCountdown);
        } else {
            boomText.style.display = 'none';
        }
    }, 1000);
}

//Case generator
function caseGenerator() {
    var counterCase = counter * 1.50;
    let time = null;
    const caseElement = document.createElement("div");
    var field = document.getElementById("field");

    caseElement.classList.add("case");

    field.appendChild(caseElement);

    function changePosition() {
        counterCase--

        if (counterCase > 0) {
            Object.assign(
                caseElement.style, {
                    top: `${Math.floor(Math.random() * 17) * 5.2}%`,
                    right: `${Math.floor(Math.random() * 17) * 5.1}%`,
                }
            );
        } else {
            clearInterval(time);
            caseElement.parentNode.removeChild(caseElement); //to avoid the 'caseElement' duplication
            return;
        }
    }

    function showCase() {
        changePosition()
        time = setInterval(changePosition, 800);
    }

    //Score 
    fieldArea.addEventListener('click', function (e) {
        if (caseElement === e.target) {
            scoreResults += 1
            catchedSound.play();
            score.innerHTML = "Score: " + scoreResults;
        } else {
            missedSound.play();
        }
    })

    showCase();
};
