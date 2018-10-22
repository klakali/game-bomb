function countingFunction() {
  var start = 60;
  var number = document.getElementById("counting-number");
  var date = new Date();
  var seconds = date.getSeconds();
  
  console.log(seconds);
  number.innerHTML = start - seconds;
}

window.setInterval(countingFunction, 1000);
