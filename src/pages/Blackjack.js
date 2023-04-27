import React, { useState } from "react";
import "./css/blackjack.css";
import { ethers } from "ethers";
import abi from "./utils/Casino489.json";

const Blackjack = () =>
{
    let startGameBtn = true;
    let deck = [];
    let player = [];
    let dealer = [];

    const [currentAccount, setCurrentAccount] = useState("");
    const contractAddress = "0xFd35f80E05BA6B8dF357a9593f8410e997aadb8B";
    const contractABI = abi.abi;

    const checkIfWalletIsConnected = async () => {
      try {
        const { ethereum } = window;
  
        if (!ethereum) {
          console.log("Make sure you have an ETH wallet!");
          return;
        } else {
          console.log("We have the ethereum object", ethereum);
        }
  
        // Pulls array of accounts
        const accounts = await ethereum.request({ method: "eth_accounts" });
  
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setCurrentAccount(account);
        } else {
          console.log("No authorized account found")
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    const deposit = async () => {
      let depositedAmount = document.getElementById("inpbljk").value;
        try {
          const { ethereum } = window;
    
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
    
            //Deposit
            try {
              const amount = ethers.utils.parseEther(depositedAmount);
              await contract.deposit({value: amount});
              alert("Deposited.");
              console.log("Paid the Casino. [PASS]");
            }
            catch {
              alert("Casino Not Paid!");
              console.log("Unsuccesful. [FAIL]");
            }
          } else {
            console.log("ETH window obj doesn't exist...");
          }
        } catch (error) {
          console.log(error);
        }
      }
  
    const withdraw = async () => {
        let depositedAmount = document.getElementById("inpbljk").value;
        try {
          const { ethereum } = window;
    
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
    
            //Withdraw
            try {
              await contract.withdraw(depositedAmount,2);
              alert("Withdrawn GoerliETH.");
              console.log("Success. [PASS]");
            }
            catch {
              alert("Casino too Poor.");
              console.log("Unsuccesful. [FAIL]");
            }
          } else {
            console.log("ETH window obj doesn't exist...");
          }
        } catch (error) {
          console.log(error);
        }
      }

    const createDeckOfCards = () =>
    {
        const cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
        const cardSuits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];

        const cardDeck = [];

        for(let i = 0; i < cardValues.length; i++) 
        {
            for(let j = 0; j < cardSuits.length; j++)
            {
                const currentValue = cardValues[i];
                const currentSuit = cardSuits[j];
                cardDeck.push({currentValue, currentSuit});
            }
        }

        return cardDeck;
    };

    const shuffle = (cardDeck) =>
    {
        for(let i = 0; i < cardDeck.length; i++)
        {
            let number = Math.floor(Math.random() * (cardDeck.length-1));
            let temp = cardDeck[i];
            cardDeck[i] = cardDeck[number];
            cardDeck[number] = temp;
        }
    };

    const dealingPlayersCards = (cardDeck) =>
    {
        shuffle(cardDeck);

        let playerFirstCard = cardDeck.pop();
        let playerSecondCard = cardDeck.pop();

        let playersHand = [playerFirstCard, playerSecondCard];
        return playersHand;
    };

    const dealingDealersCards = (cardDeck) =>
    {
        shuffle(cardDeck);

        let dealerFirstCard = cardDeck.pop();
        let dealerSecondCard = cardDeck.pop();

        let dealersHand = [dealerFirstCard, dealerSecondCard];

        return dealersHand
    };

    const displayPlayerHand = () =>
    {
        let symbol;
        let cardValue;

        document.getElementById("bljk").value += "\nYour Cards: ";

        for(let i = 0; i < player.length; i++)
        {
            if(player[i].currentSuit == 'Hearts'){
                symbol = '♥';
            }
            else if(player[i].currentSuit == 'Diamonds'){
                symbol = '♦';
            }
            else if(player[i].currentSuit == 'Spades'){
                symbol = '♠';
            }
            else{
                symbol = '♣';
            }

            if(player[i].currentValue == 'Jack'){
                cardValue = 'J';
            }
            else if(player[i].currentValue == 'Queen'){
                cardValue = 'Q';
            }
            else if(player[i].currentValue == 'King'){
                cardValue = 'K';
            }
            else if(player[i].currentValue == 'Ace'){
                cardValue = 'A';
            }
            else{
                cardValue = player[i].currentValue;
            }

            document.getElementById("bljk").value += cardValue + symbol + " ";
        }
    }

    const displayDealerHand = () =>
    {
        let symbol;
        let cardValue;

        if(dealer[0].currentSuit == 'Hearts'){
            symbol = '♥';
        }
        else if(dealer[0].currentSuit == 'Diamonds'){
            symbol = '♦';
        }
        else if(dealer[0].currentSuit == 'Spades'){
            symbol = '♠';
        }
        else{
            symbol = '♣';
        }

        if(dealer[0].currentValue == 'Jack'){
            cardValue = 'J';
        }
        else if(dealer[0].currentValue == 'Queen'){
            cardValue = 'Q';
        }
        else if(dealer[0].currentValue == 'King'){
            cardValue = 'K';
        }
        else if(dealer[0].currentValue == 'Ace'){
            cardValue = 'A';
        }
        else{
            cardValue = dealer[0].currentValue;
        }

        document.getElementById("bljk").value += "\nDealer's First Card: " + cardValue + symbol;
    }

    const displayDealerHandEnd = () =>
    {
        let symbol;
        let cardValue;

        document.getElementById("bljk").value += "\nDealer's Cards: ";

        for(let i = 0; i < dealer.length; i++)
        {
            if(dealer[i].currentSuit == 'Hearts'){
                symbol = '♥';
            }
            else if(dealer[i].currentSuit == 'Diamonds'){
                symbol = '♦';
            }
            else if(dealer[i].currentSuit == 'Spades'){
                symbol = '♠';
            }
            else{
                symbol = '♣';
            }

            if(dealer[i].currentValue == 'Jack'){
                cardValue = 'J';
            }
            else if(dealer[i].currentValue == 'Queen'){
                cardValue = 'Q';
            }
            else if(dealer[i].currentValue == 'King'){
                cardValue = 'K';
            }
            else if(dealer[i].currentValue == 'Ace'){
                cardValue = 'A';
            }
            else{
                cardValue = dealer[i].currentValue;
            }

            document.getElementById("bljk").value += cardValue + symbol + " ";
        }
    }

    const countPlayer = () =>
    {
        let total = 0;

        for(let i = 0; i < player.length; i++)
        {
            if(player[i].currentValue == 'Jack' || player[i].currentValue == 'Queen' || player[i].currentValue == 'King')
            {
                total += 10;
            }

            else if(player[i].currentValue == 'Ace')
            {
                if(total + 11 <= 21)
                {
                    total += 11;
                }
                else
                {
                    total += 1;
                }
            }

            else
            {
                total += player[i].currentValue;
            }
        }
        return total;
    };

    const countDealer = () =>
    {
        let total = 0;

        for(let i = 0; i < dealer.length; i++)
        {
            if(dealer[i].currentValue == 'Jack' || dealer[i].currentValue == 'Queen' || dealer[i].currentValue == 'King')
            {
                total += 10;
            }

            else if(dealer[i].currentValue == 'Ace')
            {
                if(total + 11 <= 21)
                {
                    total += 11;
                }
                else
                {
                    total += 1;
                }
            }

            else
            {
                total += dealer[i].currentValue;
            }
        }
        return total;
    };

    const startingGame = () =>
    {
        deck = createDeckOfCards();
        player = dealingPlayersCards(deck);
        dealer = dealingDealersCards(deck);

        document.getElementById("bljk").value = "Your Score: " + countPlayer(player);
        displayPlayerHand();
        displayDealerHand();
    }

    const hit = (cardDeck, playersCards, dealersCards) =>
    {
        if(countPlayer(playersCards) < 21)
        {
            let newPlayerCard = cardDeck.pop();
            playersCards.push(newPlayerCard);
        }
        else
        {
            alert("You Busted --- Click 'Stay' to end game.");
        }

        document.getElementById("bljk").value = "Your Score: " + countPlayer(playersCards);
        displayPlayerHand();
        displayDealerHand();

        if(countDealer(dealersCards) < 17)
        {
            let newDealerCard = cardDeck.pop();
            dealersCards.push(newDealerCard);
        }
    };

    const dealerHit = (cardDeck, dealersCards) =>
    {
        let dealerValue = countDealer(dealersCards);

        while(dealerValue < 17)
        {
            let newDealerCard = cardDeck.pop();
            dealersCards.push(newDealerCard);

            dealerValue = countDealer(dealersCards);
        }
    }

    const stay = (deck, playersCards, dealersCards) =>
    {
        let playerScore = countPlayer(playersCards);
        let dealerScore = countDealer(dealersCards);

        if(dealerScore < 17)
        {
            dealerHit(deck, dealersCards);
        }

        dealerScore = countDealer(dealersCards);

        if(playerScore > 21)
        {
            document.getElementById("bljk").value = "Sorry, you lose.";
            document.getElementById("bljk").value += "\nYour Score: " + playerScore;
            displayPlayerHand();
            document.getElementById("bljk").value += "\nDealer's Score: " + dealerScore;
            displayDealerHandEnd();
        }

        else if(dealerScore > 21)
        {
            document.getElementById("bljk").value = "Congratulations! You Win!";
            document.getElementById("bljk").value += "\nYour Score: " + playerScore;
            displayPlayerHand();
            document.getElementById("bljk").value += "\nDealer's Score: " + dealerScore;
            displayDealerHandEnd();
            withdraw();
        }

        else if(dealerScore > playerScore)
        {
            document.getElementById("bljk").value = "Sorry, you lose.";
            document.getElementById("bljk").value += "\nYour Score: " + playerScore;
            displayPlayerHand();
            document.getElementById("bljk").value += "\nDealer's Score: " + dealerScore;
            displayDealerHandEnd();
        }

        else if(playerScore > dealerScore)
        {
            document.getElementById("bljk").value = "Congratulations! You Win!";
            document.getElementById("bljk").value += "\nYour Score: " + playerScore;
            displayPlayerHand();
            document.getElementById("bljk").value += "\nDealer's Score: " + dealerScore;
            displayDealerHandEnd();
            withdraw();
        }

        else
        {
            document.getElementById("bljk").value = "Draw";
            document.getElementById("bljk").value += "\nYour Score: " + playerScore;
            displayPlayerHand();
            document.getElementById("bljk").value += "\nDealer's Score: " + dealerScore;
            displayDealerHandEnd();
        }
    };


return (
  <header className="App-header">
    <h1>BLACKJACK</h1>
    <body>
    <div className="blackjack">
      <h2>Play a game of Blackjack!</h2>
      <button onClick={startingGame}>
        Start a New Game
      </button>
      <br></br>
      <button className="hit-button" onClick={() => hit(deck, player, dealer)}>
        Hit
      </button>
      <button className="stand-button" onClick={() => stay(deck, player, dealer)}>
        Stay
      </button>
      <div><textarea readOnly className="blackjack-output" id="bljk"></textarea></div>
      <input className="sl-input" type="text" id="inpbljk" placeholder="Amount" maxLength="10"></input>
      <button className="ln-guess" onClick={deposit}> Place Bet</button>
    </div>
    </body>
    </header>
  );
};

export default Blackjack;