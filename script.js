// Reset the game ----- in progress
function resetGame() {
    boomText.style.display = 'none';
    bomb.style.display = 'block';
    bomb.style.WebkitAnimation = 'none';
    document.getElementById("counting-line").style.height = "0.5rem";
}

//Counting
var button = document.getElementById("button");
var number = document.getElementById("counting-number");
var boomText = document.getElementById('boom');
var bomb = document.getElementById('bomb');
var fieldArea = document.getElementById("field");
var startDescription = document.getElementById("results-start-desc");
var counter = 10;


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
        if (counter < 0) {
            bomb.style.display = 'none';
            boomText.style.display = 'block';
            button.innerHTML = 'Play again';
            startDescription.innerHTML = 'Click the <span class="start-desc">"Play again"</span> button to start the game';
            clearInterval(deadlineCountdown);
        } else {
            boomText.style.display = 'none';
        }
    }, 1000);
}
// Button Start Game
button.addEventListener("click", function (event) {
    counter = 10;
    resetGame();
    countingDown();
    caseGenerator();
    button.disabled = true;
    setTimeout(function () {
        button.disabled = false;
    }, 10000);

});
// Button Show Case

//Case generator


// omg
function caseGenerator() {
    var counterCase = counter * 1.7;
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
            caseElement.parentNode.removeChild(caseElement);
            return;
        }
    }

    function showCase() {
        changePosition()
        time = setInterval(changePosition, 700);
    }

    showCase();
};
