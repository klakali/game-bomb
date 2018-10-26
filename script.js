//Main variables
var button = document.getElementById("button");
var number = document.getElementById("counting-number");
var bomb = document.getElementById('bomb');
var fieldArea = document.getElementById("field");
var startDescription = document.getElementById("results-start-desc");
var counter = 10;
var score = document.getElementById("score");
var scoreResults = 0;
var target = document.getElementById("target");
var boom = document.getElementById("boom-item");

// Button Start Game
button.addEventListener("click", function (event) {
    counter = 10;
    resetGame();
    countingDown();
    caseGenerator();
    button.disabled = true;

    setTimeout(function () {
        button.disabled = false;
    }, 12000); //to prevent from restarting during the play

});

// Reset the game (default values)
function resetGame() {
    bomb.style.display = 'block';
    bomb.style.WebkitAnimation = 'none';
    document.getElementById("counting-line").style.height = "0.5rem";
    scoreResults = 0;
    score.innerHTML = "Score: " + scoreResults;
}

// Bomb 
function countingDown() {
    var deadlineCountdown = setInterval(function () {
        number.innerHTML = counter;
        counter--
        if (counter === 4) {
            document.getElementById("counting-line").style.height = "2rem";
        }
        if (counter < 3) {
            bomb.style.WebkitAnimation = "bomb-shake 0.5s 20";
            document.getElementById("counting-line").style.height = "4rem";
        }
        if (counter < 0 && scoreResults < 10) {
            boom.innerHTML = "Boom!";
            bomb.style.display = 'none';
            button.innerHTML = 'Try again';
            startDescription.innerHTML = 'Click the <span class="start-desc">"Try again"</span> button to start the game';
            target.innerHTML = 'You are <span class="start-desc">FIRED</span>!!!';
            clearInterval(deadlineCountdown);
        }
        if (counter < 0 && scoreResults >= 10) {
            boom.innerHTML = "Boom!";
            bomb.style.display = 'none';
            button.innerHTML = 'Try again';
            startDescription.innerHTML = 'Click the <span class="start-desc">"Try again"</span> button to start the game';
            target.innerHTML = 'You are not fired <span class="start-desc">THIS</span> time.';
            clearInterval(deadlineCountdown);
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
                    left: `${Math.floor(Math.random() * 10) * 2.9}rem`
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
            score.innerHTML = "Score: " + scoreResults;
        }
    })

    showCase();
};
