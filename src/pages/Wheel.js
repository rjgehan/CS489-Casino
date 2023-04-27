import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "./utils/Casino489.json";
import "./css/wheel.css";

const prizes = [ 0, 0.1, 0.2, 0.3, 0.4, -0.5];

let total = 0;

const Wheel = () => {

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
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
        //Deposit
        try {
          await contract.deposit();
          alert("Deposited.");
          console.log("Paid the Casino. [PASS]");
        }
        catch (err){
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

  // Casino Doesn't Have Enough Money to Withdraw
  const withdraw = async () => {
    if (total > 0) {
      try {
        const { ethereum } = window;
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
          //Withdraw
          try {
            await contract.withdraw(prize,2);
            alert("Withdrawn GoerliETH.");
            console.log("Success. [PASS]");
            total = 0;
            document.getElementById("txtar").value = total;
          }
          catch {
            alert("Casino is too Poor.");
            console.log("Unsuccesful. [FAIL]");
          }
        } else {
          console.log("ETH window obj doesn't exist...");
        }
      } catch (error) {
        console.log(error);
      }
    }
    else if (total < 0) {
      alert("Can't retrieve money that you owe the Casino!");
    }
  }

  const [spinning, setSpinning] = useState(false);
  const [prize, setPrize] = useState("");

  const spinWheel = () => {
    // Set spinning to true to disable spin button
    setSpinning(true);

    // Generate random index and select prize
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[randomIndex];

    total += selectedPrize
    if (total < 0){
      deposit();
    }
    // Set prize state after delay to simulate spinning
    setTimeout(() => {
      setPrize(selectedPrize);
      setSpinning(false);
      document.getElementById("txtar").value = total;
    }, 3000);
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <header className="App-header">
    <h1>WHEEL</h1>
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
      <div className="prize-display">{prize} GoerliETH</div>
      <div><textarea readOnly className="total-display" id="txtar"></textarea></div>
      {currentAccount && (
          <button className="withdraw-button" onClick={withdraw}>
            Retrieve Earnings
          </button>
        )}
    </div>
    </header>
  );
};

export default Wheel;