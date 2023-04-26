const Blackjack = () =>
{
    let deck = [];
    let player = [];
    let dealer = [];

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

    const count = (cardHand) =>
    {
        let total = 0;

        for(let i = 0; i < cardHand.length; i++)
        {
            if(cardHand[i].currentValue == 'Jack' || cardHand[i].currentValue == 'Queen' || cardHand[i].currentValue == 'King')
            {
                total += 10;
            }

            else if(cardHand[i].currentValue == 'Ace')
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
                total += cardHand[i].currentValue;
            }
        }
        return total;
    };

    const startingGame = () =>
    {
        deck = createDeckOfCards();
        player = dealingPlayersCards(deck);
        dealer = dealingDealersCards(deck);

        console.log("Your Score: " + count(player));
    }

    const hit = (cardDeck, playersCards, dealersCards) =>
    {
        let newPlayerCard = cardDeck.pop();
        playersCards.push(newPlayerCard);

        if(count(dealersCards) < 17)
        {
            let newDealerCard = cardDeck.pop();
            dealersCards.push(newDealerCard);
        }
    };

    const dealerHit = (cardDeck, dealersCards) =>
    {
        let dealerValue = count(dealersCards);

        while(dealerValue < 17)
        {
            let newDealerCard = cardDeck.pop();
            dealersCards.push(newDealerCard);

            dealerValue = count(dealersCards);
        }
    }

    const stay = (deck, playersCards, dealersCards) =>
    {
        let playerScore = count(playersCards);
        let dealerScore = count(dealersCards);

        if(dealerScore < 17)
        {
            dealerHit(deck, dealersCards);
        }

        if(playerScore > 21)
        {
            console.log("You Lose");
            console.log("Your Score: " + playerScore);
            console.log("Dealer's Score: " + dealerScore);
        }

        else if(dealerScore > 21)
        {
            console.log("You Win");
            console.log("Your Score: " + playerScore);
            console.log("Dealer's Score: " + dealerScore);
        }

        else if(dealerScore > playerScore)
        {
            console.log("You Lose");
            console.log("Your Score: " + playerScore);
            console.log("Dealer's Score: " + dealerScore);
        }

        else if(playerScore > dealerScore)
        {
            console.log("You Win");
            console.log("Your Score: " + playerScore);
            console.log("Dealer's Score: " + dealerScore);
        }

        else
        {
            console.log("Draw");
            console.log("Your Score: " + playerScore);
            console.log("Dealer's Score: " + dealerScore);
        }
    };


return (
    <div className="blackjack">
      <h2>Play a game of Blackjack!</h2>
      <button onClick={startingGame}>
        Start a New Game
      </button>
      <button onClick={() => hit(deck, player, dealer)}>
        Hit
      </button>
      <button onClick={() => stay(deck, dealer)}>
        Stay
      </button>

    </div>
  );
};
