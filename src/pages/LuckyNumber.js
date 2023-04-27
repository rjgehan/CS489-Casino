import React, { useState } from 'react';
import "./css/luckynumber.css";
import { ethers } from "ethers";
import abi from "./utils/Casino489.json";

const LuckyNumber = () => {

    let winnings = 0;

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
                const amount = ethers.utils.parseEther("0.001");
                await contract.deposit({value: amount});
                alert("Deposited.");
                console.log("Paid the Casino. [PASS]");
                alert("Casino Not Paid!");
                console.log("Unsuccesful. [FAIL]");
      
            } else {
              console.log("ETH window obj doesn't exist...");
            }
          } catch (error) {
            console.log(error);
          }
        }
    
      const withdraw = async () => {
          try {
            const { ethereum } = window;
      
            if (ethereum) {
              const provider = new ethers.providers.Web3Provider(ethereum);
              const signer = provider.getSigner();
              const contract = new ethers.Contract(contractAddress, contractABI, signer);
      
              //Withdraw
              try {
                await contract.withdraw(winnings,1);
                alert("Withdrawn GoerliETH.");
                console.log("Success. [PASS]");
              }
              catch (err){
                alert("Not Withdrawn any GoerliETH!");
                console.log("Unsuccesful. [FAIL]");
              }
      
            } else {
              console.log("ETH window obj doesn't exist...");
            }
          } catch (error) {
            console.log(error);
          }
        }

    const guess = () => {
        // Prompt user for a number between 1-50
        //let userNumber = parseInt(prompt("Choose a number between 1 and 50:"));
        let userNumber = document.getElementById("inptxt").value;

        // Generate a random number between 1-50
        let randomNumber = Math.floor(Math.random() * 50) + 1;
        winnings = randomNumber;

        // Check if user number matches the random number
        if (userNumber == randomNumber) {
            // If the numbers match, the user wins the amount of money equal to the random number
            //console.log("Congratulations! You won " + randomNumber + "GoerliETH!");
            document.getElementById("txtg").value = "Congratulations! You won " + randomNumber + "GoerliETH!";
            withdraw(randomNumber/1000,1);
        } else {
            //If the numbers don't match, the user doesn't win anything
            //console.log("Sorry, the random number was " +randomNumber + ". Better luck next time!");
            document.getElementById("txtg").value = "Sorry, the random number was " +randomNumber + ". Better luck next time!";
            deposit();
        }
    }

  return (
    <header className="App-header">
      <h1>LUCKY NUMBER GAME</h1>
      <body>
        <div>
        <p>Guess a Number between 1 and 50.</p>
        <input className="ln-input" type="text" id="inptxt" placeholder="Number" maxLength="5"></input>
        <button className="ln-guess" onClick={guess}>
          Guess
        </button>
        <div><textarea readOnly className="guess-display" id="txtg"></textarea></div>
        </div>
      </body>
    </header>
  );
};
export default LuckyNumber;