import React, { useState } from "react";

const prizes = ["$10", "$20", "$50", "$100", "$200", "$500"];

const Wheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [prize, setPrize] = useState("");

  const spinWheel = () => {
    // Set spinning to true to disable spin button
    setSpinning(true);

    // Generate random index and select prize
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[randomIndex];

    // Set prize state after delay to simulate spinning
    setTimeout(() => {
      setPrize(selectedPrize);
      setSpinning(false);
    }, 3000);
  };

  return (
    <div className="wheel-container">
      <h2>Spin the Wheel of Fortune!</h2>
      <div className={`wheel ${spinning ? "spinning" : ""}`}>
        <div className="wheel-inner">
          {prizes.map((prize, index) => (
            <div key={index} className={`segment ${index}`}>
              {prize}
            </div>
          ))}
        </div>
      </div>
      <button className="spin-button" disabled={spinning} onClick={spinWheel}>
        {spinning ? "Spinning..." : "Spin"}
      </button>
      <div className="prize-display">{prize}</div>
    </div>
  );
};

export default Wheel;