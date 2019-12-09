//Title font
var titleText = document.getElementById('headerText');

function titleFunction() {
  var random = Math.floor(Math.random() * 4); //Returns a random number 0-3 inclusive
  if (random == 0) {
    titleText.style.fontFamily = "Matrix, serif";
  } else if (random == 1) {
    titleText.style.fontFamily = "Gerry, serif";
  } else if (random == 2) {
    titleText.style.fontFamily = "Impact, Charcoal, sans-serif";
  } else if (random == 3) {
    titleText.style.fontFamily = "Comic Sans, san-serif";
  } else {
    return;
  }
}
