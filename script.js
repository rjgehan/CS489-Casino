const playButton = document.getElementById("play-button");
const resultParagraph = document.getElementById("result");
const moneyParagraph = document.getElementById("money");

let money = 100;

playButton.addEventListener("click", () => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  
  if (randomNumber <= 40) {
    resultParagraph.textContent = "You win $50!";
    money += 50;
  } else if (randomNumber <= 80) {
    resultParagraph.textContent = "You win $25!";
    money += 25;
  } else if (randomNumber <= 95) {
    resultParagraph.textContent = "You win $10!";
    money += 10;
  } else {
    resultParagraph.textContent = "Sorry, you lose $10.";
    money -= 10;
  }
  
  moneyParagraph.textContent = `You have $${money}.`;
});
