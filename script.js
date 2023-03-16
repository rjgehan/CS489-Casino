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

function hit() {
  if (gameOver) {
    return;
  }

  let card = drawCard();
  playerHand.push(card);
  let cardImage = createCardImage(card);
  playerHandElement.appendChild(cardImage);
  updateScore(playerHand, playerScoreElement);

  if (playerScore > 21) {
    gameOver = true;
    endGame();
  }
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
  } else if (typeof value === "number") {
    return value;
  } else {
    return 10;
  }
}

function dealCards() {
  playerHand.push(getCard());
  addCardToHand(playerHandElement, playerHand[0]);
  playerScore = calculateScore(playerHand);
  playerScoreElement.textContent = playerScore.toString();

  dealerHand.push(getCard());
  addCardToHand(dealerHandElement, dealerHand[0]);
  dealerScore = calculateScore(dealerHand);
  dealerScoreElement.textContent = dealerScore.toString();

  playerHand.push(getCard());
  addCardToHand(playerHandElement, playerHand[1]);
  playerScore = calculateScore(playerHand);
  playerScoreElement.textContent = playerScore.toString();
}

function endGame() {
  hitButton.disabled = true;
  standButton.disabled = true;
  newGameButton.disabled = false;
  if (playerScore > 21) {
    alert("You bust, dealer wins!");
  } else if (dealerScore > 21) {
    alert("Dealer busts, you win!");
    } else if (playerScore > dealerScore) {
    alert("You win!");
  } else if (playerScore < dealerScore) {
    alert("Dealer wins!");
  } else {
    alert("It's a tie!");
  }
}

function resetGame() {
  playerHand = [];
  dealerHand = [];
  playerScore = 0;
  dealerScore = 0;
  gameOver = false;
  playerHandElement.innerHTML = "";
  dealerHandElement.innerHTML = "";
  playerScoreElement.textContent = "0";
  dealerScoreElement.textContent = "0";
  hitButton.disabled = false;
  standButton.disabled = false;
  newGameButton.disabled = true;
}

resetGame();

