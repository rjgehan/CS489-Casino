import React, { useState } from 'react';
import "./css/slots.css";

const Slots = () => {
  const [slotValues, setSlotValues] = useState([0, 0, 0]);
  const [balance, setBalance] = useState(100);

  const spin = () => {
    if (balance >= 10) {
      // Generate random slot values
      const newSlotValues = [
        Math.floor(Math.random() * 3) + 1,
        Math.floor(Math.random() * 3) + 1,
        Math.floor(Math.random() * 3) + 1,
      ];
      setSlotValues(newSlotValues);

      // Calculate winnings/losses
      let winnings = 0;
      if (newSlotValues[0] === newSlotValues[1] && newSlotValues[0] === newSlotValues[2]) {
        winnings = 50;
      } else if (
        newSlotValues[0] === newSlotValues[1] ||
        newSlotValues[0] === newSlotValues[2] ||
        newSlotValues[1] === newSlotValues[2]
      ) {
        winnings = 10;
      } else {
        winnings = -10;
      }

      // Update balance
      setBalance(balance + winnings - 10);
    }
  };

  return (
    <div>
      <div className="money-has">Balance: {balance}</div>
      <div className="spin-result">{slotValues.join(' - ')}</div>
      <button onClick={spin} className="spinBtn">Spin</button>
    </div>
  );
};

export default Slots;