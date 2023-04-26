import React, { useState } from "react";

const deck = [
  "2 of Hearts",
  "3 of Hearts",
  "4 of Hearts",
  "5 of Hearts",
  "6 of Hearts",
  "7 of Hearts",
  "8 of Hearts",
  "9 of Hearts",
  "10 of Hearts",
  "Jack of Hearts",
  "Queen of Hearts",
  "King of Hearts",
  "Ace of Hearts",
  "2 of Spades",
  "3 of Spades",
  "4 of Spades",
  "5 of Spades",
  "6 of Spades",
  "7 of Spades",
  "8 of Spades",
  "9 of Spades",
  "10 of Spades",
  "Jack of Spades",
  "Queen of Spades",
  "King of Spades",
  "Ace of Spades",
  "2 of Clubs",
  "3 of Clubs",
  "4 of Clubs",
  "5 of Clubs",
  "6 of Clubs",
  "7 of Clubs",
  "8 of Clubs",
  "9 of Clubs",
  "10 of Clubs",
  "Jack of Clubs",
  "Queen of Clubs",
  "King of Clubs",
  "Ace of Clubs",
  "2 of Diamonds",
  "3 of Diamonds",
  "4 of Diamonds",
  "5 of Diamonds",
  "6 of Diamonds",
  "7 of Diamonds",
  "8 of Diamonds",
  "9 of Diamonds",
  "10 of Diamonds",
  "Jack of Diamonds",
  "Queen of Diamonds",
  "King of Diamonds",
  "Ace of Diamonds",
];

const shuffle = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};




const Blackjack = () => {
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [gameState, setGameState] = useState("PLAYING");

  const startGame = () => {
    const shuffledDeck = shuffle(deck);
    const playerStartingCards = dealCards(shuffledDeck, 2);
    const dealerStartingCards = dealCards(shuffledDeck, 2);
    setPlayerCards(playerStartingCards);
    setDealerCards(dealerStartingCards);
    setGameState("PLAYING");
  };

  const dealCards = (deck, numCards) => {
    const cards = [];
    if (deck.length < numCards) {
      return cards;
    }
    for (let i = 0; i < numCards; i++) {
      cards.push(deck.pop());
    }
    return numCards === 1 ? cards[0] : cards;
  };
  
  const hit = () => {
    const newCard = dealCards(deck, 1);
    if (!newCard) {
      return;
    }
    setPlayerCards([...playerCards, newCard]);
  };
  
  

  const stand = () => {
    let dealerTotal = calculateTotal(dealerCards);
    while (dealerTotal < 17) {
      const newCard = dealCards(deck, 1)[0];
      setDealerCards([...dealerCards, newCard]);
      dealerTotal = calculateTotal([...dealerCards, newCard]);
    }
    const playerTotal = calculateTotal(playerCards);
    if (playerTotal > dealerTotal || dealerTotal > playerTotal)
      {
        setGameState("PLAYER_WINS");
        } else if (dealerTotal > playerTotal) {
        setGameState("DEALER_WINS");
        } else {
        setGameState("TIE");
        }
        };
    
    const calculateTotal = (cards) => {
    let total = 0;
    let hasAce = false;
    for (let card of cards) {
    const value = card.split(" ")[0];
    if (value === "Ace") {
    hasAce = true;
    total += 11;
    } else if (value === "King" || value === "Queen" || value === "Jack") {
    total += 10;
    } else {
    total += parseInt(value);
    }
    }
    if (hasAce && total > 21) {
    total -= 10;
    }
    return total;
    };
    
    return (
    <div>
    <h1>Blackjack</h1>
    <div>
    <h2>Player Hand ({calculateTotal(playerCards)})</h2>
    {playerCards.map((card, index) => (
    <div key={index}>{card}</div>
    ))}
    </div>
    <div>
    <h2>Dealer Hand ({calculateTotal(dealerCards)})</h2>
    {dealerCards.map((card, index) => (
    <div key={index}>{card}</div>
    ))}
    </div>
    <div>
    {gameState === "PLAYING" && (
    <>
    <button onClick={hit}>Hit</button>
    <button onClick={stand}>Stand</button>
    </>
    )}
    {gameState === "PLAYER_WINS" && <div>Player wins!</div>}
    {gameState === "DEALER_WINS" && <div>Dealer wins!</div>}
    {gameState === "TIE" && <div>It's a tie!</div>}
    {gameState !== "PLAYING" && <button onClick={startGame}>Play again</button>}
    </div>
    </div>
    );
    };
    
    export default Blackjack;