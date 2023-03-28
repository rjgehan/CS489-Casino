//test

const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];

const playerHandElement = document.getElementById("player-hand");
const dealerHandElement = document.getElementById("dealer-hand");
const playerScoreElement = document.getElementById("player-score");
const dealerScoreElement = document.getElementById("dealer-score");
const hitButton = document.getElementById("hit-button");
const standButton = document.getElementById("stand-button");
const newGameButton = document.getElementById("new-game-button");

let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;

newGameButton.addEventListener("click", () => {
  deck = createDeck();
  playerHand = [];
  dealerHand = [];
  playerScore = 0;
  dealerScore = 0;
  gameOver = false;
  hitButton.disabled = false;
  standButton.disabled = false;
  newGameButton.disabled = true;
  playerHandElement.innerHTML = "";
  dealerHandElement.innerHTML = "";
  playerScoreElement.textContent = "0";
  dealerScoreElement.textContent = "0";
  dealCards();
});

hitButton.addEventListener("click", () => {
  if (!gameOver) {
    playerHand.push(getCard());
    addCardToHand(playerHandElement, playerHand[playerHand.length - 1]);
    playerScore = calculateScore(playerHand);
    playerScoreElement.textContent = playerScore.toString();
    if (playerScore > 21) {
      gameOver = true;
      endGame();
    }
  }
});

standButton.addEventListener("click", () => {
  if (!gameOver) {
    while (dealerScore < 17) {
      dealerHand.push(getCard());
      addCardToHand(dealerHandElement, dealerHand[dealerHand.length - 1]);
      dealerScore = calculateScore(dealerHand);
      dealerScoreElement.textContent = dealerScore.toString();
    }
    gameOver = true;
    endGame();
  }
});

function createDeck() {
  let deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  shuffle(deck);
  return deck;
}

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function getCard() {
  return deck.pop();
}

function addCardToHand(handElement, card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  const suitElement = document.createElement("p");
  suitElement.textContent = card.suit;
  const valueElement = document.createElement("p");
  valueElement.textContent = card.value.toString();
  cardElement.appendChild(suitElement);
  cardElement.appendChild(valueElement);
  handElement.appendChild(cardElement);
}

function calculateScore(hand) {
  let score = 0;
  let hasAce = false;
  for (let card of hand) {
    if (card.value === "Ace") {
      hasAce = true;
    }
    score += getCardValue(card.value);
  }
  if (hasAce && score + 10 <= 21) {
    score += 10;
  }
  return score;
}

function getCardValue(value) {
  if (value === "Ace") {
    return 1;
  } else if (value === "Jack" || value === "Queen" || value === "King") {
    return 10;
  } else {
    return value;
  }
}

function dealCards() {
  playerHand.push(getCard());
  addCardToHand(playerHandElement, playerHand[playerHand.length - 1]);
  dealerHand.push(getCard());
  addCardToHand(dealerHandElement, dealerHand[dealerHand.length - 1]);
  playerHand.push(getCard());
  addCardToHand(playerHandElement, playerHand[playerHand.length - 1]);
  dealerHand.push(getCard());
  addCardToHand(dealerHandElement, dealerHand[dealerHand.length - 1]);
  playerScore = calculateScore(playerHand);
  dealerScore = calculateScore(dealerHand.slice(0, 1));
  playerScoreElement.textContent = playerScore.toString();
  dealerScoreElement.textContent = dealerScore.toString();
  if (playerScore === 21) {
    gameOver = true;
    endGame();
  }
}

function endGame() {
  hitButton.disabled = true;
  standButton.disabled = true;
  newGameButton.disabled = false;
  dealerScoreElement.textContent = dealerScore.toString();
  while (dealerScore < 17) {
    dealerHand.push(getCard());
    addCardToHand(dealerHandElement, dealerHand[dealerHand.length - 1]);
    dealerScore = calculateScore(dealerHand);
    dealerScoreElement.textContent = dealerScore.toString();
  }
  if (playerScore > 21) {
    alert("You went bust! You lose.");
  } else if (dealerScore > 21) {
    alert("Dealer went bust! You win.");
  } else if (playerScore > dealerScore) {
    alert("You win!");
  } else if (dealerScore > playerScore) {
    alert("You lose.");
  } else {
    alert("It's a tie!");
  }
}

dealCards();
