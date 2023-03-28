// Create arrays for the suits and values of the cards
const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];

// Get references to various elements in the HTML
const playerHandElement = document.getElementById("player-hand");
const dealerHandElement = document.getElementById("dealer-hand");
const playerScoreElement = document.getElementById("player-score");
const dealerScoreElement = document.getElementById("dealer-score");
const hitButton = document.getElementById("hit-button");
const standButton = document.getElementById("stand-button");
const newGameButton = document.getElementById("new-game-button");

// Initialize variables for the deck, player's hand, dealer's hand, scores, and game status
let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;

// When the new game button is clicked, reset everything and deal new cards
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

// When the hit button is clicked, draw a new card for the player's hand and update the score
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

// When the stand button is clicked, the dealer draws cards until their score is at least 17, then the game ends
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

// Function to create a new deck of cards
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

// Function to shuffle a deck of cards
function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Function to get a card from the deck
function getCard() {
  return deck.pop();
}

// Function to add a card to a hand
function addCardToHand(handElement, card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  const suitElement = document.createElement("p");
  suitElement.textContent = card.s

// takes a hand (an array of card objects) as input and returns the total score of the hand in the game of blackjack
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

// takes a card value (a string) as input and returns its corresponding numerical value in the game of blackjack.
function getCardValue(value) {
  if (value === "Ace") {
    return 1;
  } else if (value === "Jack" || value === "Queen" || value === "King") {
    return 10;
  } else {
    return value;
  }
}

// deals two cards each to the player and the dealer, calculates their scores, and displays the scores on the webpage. If the player's score is 21, 
// the game is over and the endGame() function is called.
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


// ends the game by disabling the hit and stand buttons and enabling the new game button. It then plays out the dealer's turn according to the rules 
// of blackjack until their score is 17 or higher. It then compares the player's score to the dealer's score and displays a message indicating the result of the game.
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
