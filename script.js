const playButton = document.getElementById("play-button");
const resultParagraph = document.getElementById("result");

playButton.addEventListener("click", () => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  
  if (randomNumber <= 50) {
    resultParagraph.textContent = "You win!";
  } else {
    resultParagraph.textContent = "Sorry, you lose.";
  }
});
