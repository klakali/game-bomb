//Main variables
var button = document.querySelector(".results__button--start");
var number = document.querySelector(".bombInside__countingNumber");
var boomText = document.querySelector(".gameArea__boomTextContainer");
var bomb = document.querySelector(".deadline__bombItem");
var countingLine = document.querySelector(".deadline__CountingLine");
var fieldArea = document.querySelector(".gameArea__field");
var startDescription = document.querySelector(".results__desc--start");
var score = document.querySelector(".results__score");
var targetDisplay = document.querySelector(".results__target");
var missedSound = document.querySelector(".results__missedSound");
var catchedSound = document.querySelector(".results__catchedSound");
var bombSound = document.querySelector(".deadline__bombSound");
var tickTok = document.querySelector(".deadline__tickTockSsound");
var level = document.querySelector(".results__button--level")
var counter = 10;
var scoreResults = 0;
var target = 0;

// Button Start Game (Main event)
button.addEventListener("click", function (event) {
    tickTok.play();
    counter = 10;
    resetGame();
    countingDown();
    caseGenerator();
    button.disabled = true;
    level.disabled = true;
    button.style.color = "Grey";
    level.style.color = "Grey";
    setTimeout(function () {
        button.disabled = false;
        level.disabled = false;
    }, 10000); //to prevent from restarting during the play

});

// Reset the game (default values)
function resetGame() {
    tickTok.play();
    boomText.style.display = 'none';
    bomb.style.display = 'block';
    bomb.style.WebkitAnimation = 'none';
    countingLine.style.height = "0.5rem";
    scoreResults = 0;
    score.innerHTML = "Score: " + scoreResults;
    targetDisplay.innerHTML = "The target: <span class='results__button--red'>10</span>";
}

//Level button 
level.addEventListener("click", function (event) {
    if (this.value === "1") {
        target = 13;
        targetDisplay.innerHTML = 'The target: <span class="results__button--red">' + target + '</span>';
    } else if (level.value === "2") {
        target = 11;
        targetDisplay.innerHTML = 'The target: <span class="results__button--red">' + target + '</span>';
    } else if (level.value === "3") {
        target = 10;
        targetDisplay.innerHTML = 'The target: <span class="results__button--red">' + target + '</span>';
    }
});

// Bomb 
function countingDown() {
    var deadlineCountdown = setInterval(function () {
        tickTok.play();
        number.innerHTML = counter;
        counter--
        if (counter === 4) {
            countingLine.style.height = "2rem";
        }
        if (counter < 3) {
            bomb.style.WebkitAnimation = "bomb-shake 0.5s 20";
            countingLine.style.height = "4rem";
        }
        if (counter < 0 && scoreResults < target) {
            bombSound.play();
            bomb.style.display = 'none';
            boomText.style.display = 'block';
            startDescription.innerHTML = 'Click the <span class="results__button--red">"Try again"</span> button to start the game';
            targetDisplay.innerHTML = 'You are <span class="results__button--red">FIRED</span>!!!';
            button.style.color = "Red";
            level.style.color = "White";
            button.innerHTML = 'Try again';
            clearInterval(deadlineCountdown);
        }
        if (counter < 0 && scoreResults >= target) {
            bombSound.play();
            bomb.style.display = 'none';
            boomText.style.display = 'block';
            startDescription.innerHTML = 'Click the <span class="results__button--red">"Try again"</span> button to start the game';
            targetDisplay.innerHTML = 'You are not fired <span class="results__button--red">THIS</span> time.';
            button.style.color = "Red";
            level.style.color = "White";
            button.innerHTML = 'Try again';
            clearInterval(deadlineCountdown);
        }
    }, 1000);
}

//Case generator
function caseGenerator() {
    var counterCase = counter * 1.2;
    let time = null;
    const caseElement = document.createElement("div");
    var field = document.querySelector(".gameArea__field");

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
        if (level.value === "1") {
            counterCase = counter * 1.2;
            changePosition();
            time = setInterval(changePosition, 1000);
        } else if (level.value === "2") {
            counterCase = counter * 1.5;
            changePosition();
            time = setInterval(changePosition, 800);
        } else if (level.value === "3") {
            counterCase = counter * 2.3;
            changePosition();
            time = setInterval(changePosition, 500);
        }

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
