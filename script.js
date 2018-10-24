// Reset the game 
function resetGame() {
    var counter = 10;
    var resetButton = document.createElement("button");
    var resultsArea = document.getElementById("results");
    
      resultsArea.appendChild(resetButton);
    
    boomText.style.display = 'none';
    bomb.style.display = 'block';
    button.innerHTML = 'Play again';
    bomb.style.WebkitAnimation = 'none';
}

//Counting
let counter = 7;
var button = document.getElementById("button");
var number = document.getElementById("counting-number");
var boomText = document.getElementById('boom');
var bomb = document.getElementById('bomb');

function countingDown() {
    var deadlineCountdown = setInterval(function () {
        number.innerHTML = counter;
        console.log(counter);
        counter--
        if (counter < 5) {
            bomb.style.WebkitAnimation = "bomb-shake 0.5s 20";
        }
        if (counter < 3) {
            bomb.style.WebkitAnimation = "bomb-raise 0.5s 20";
        }
        if (counter === 0) {
            bomb.style.display = 'none';
            boomText.style.display = 'block';
            clearInterval(deadlineCountdown);
            resetGame();
        } else {
            boomText.style.display = 'none';
        }
    }, 1000);
}

button.addEventListener("click", function (event) {
    countingDown();
    button.disabled = true;
    setTimeout(function () {
        button.disabled = false;
    }, 10000);
   
});
//END Counting



//Case generator

var caseElement = document.createElement("div");
var fieldArea = document.getElementById("field");
console.log(caseElement);
caseElement.classList.add('case');
