import React, { useState } from 'react';
import "./css/slots.css";
import { ethers } from "ethers";
import abi from "./utils/Casino489.json";

const Slots = () => {
  const [slotValues, setSlotValues] = useState([0, 0, 0]);
  const [balance, setBalance] = useState(10);

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
    let depositedAmount = document.getElementById("inpsl").value;
    if (depositedAmount > 0) {
      setBalance(depositedAmount);
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
            //setBalance(depositedAmount);
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
    else if (depositedAmount <= 0) {
      alert("Insufficient Funds.");
    }
  }

  const withdraw = async () => {
    if (balance > 0) {
      try {
        const { ethereum } = window;
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
          //Withdraw
          try {
            await contract.withdraw(balance,1);
            alert("Withdrawn GoerliETH.");
            console.log("Success. [PASS]");
            balance = 0;
            document.getElementById("txtar").value = balance;
          }
          catch (err){
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
    else if (balance < 0) {
      alert("Can't retrieve money that you owe the Casino!");
    }
  }

  const spin = () => {
    if (balance >= 0) {
      // Generate random slot values
      const newSlotValues = [
        Math.floor(Math.random() * 7) + 1,
        Math.floor(Math.random() * 7) + 1,
        Math.floor(Math.random() * 7) + 1,
      ];
      setSlotValues(newSlotValues);

      // Calculate winnings/losses
      let winnings = 0;
      if (newSlotValues[0] === newSlotValues[1] && newSlotValues[0] === newSlotValues[2]) {
        winnings = 0.0005;
      } else if (
        newSlotValues[0] === newSlotValues[1] ||
        newSlotValues[0] === newSlotValues[2] ||
        newSlotValues[1] === newSlotValues[2]
      ) {
        winnings = 0.0001;
      } else {
        winnings = -0.0001;
      }

      // Update balance
      setBalance(balance + winnings - 0.001);
    }
  };

  return (
    <header className="App-header">
      <h1>SLOTS</h1>
      <body>
        <div>
          <div className="spin-result">{slotValues.join(' - ')}</div>
          <button onClick={spin} className="spinBtn">Spin</button>
          <div className="money-has">{balance}</div>
          <input className="sl-input" type="text" id="inpsl" placeholder="Amount" maxLength="10"></input>
          <button className="ln-guess" onClick={deposit}> Place Bet</button>
          <br></br>
          {!currentAccount && (
          <button className="withdraw-button" onClick={withdraw}>
            Retrieve Earnings
          </button>
        )}
        </div>
      </body>
    </header>
  );
};

export default Slots;