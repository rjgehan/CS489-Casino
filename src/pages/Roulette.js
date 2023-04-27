import React, { useState } from 'react';
import "./css/roulette.css";
import { ethers } from "ethers";
import abi from "./utils/Casino489.json";

const Roulette = () => {

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

    let numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
  
    let colors = {
      0: 'green',
      32: 'red',
      15: 'black',
      19: 'red',
      4: 'black',
      21: 'red',
      2: 'black',
      25: 'red',
      17: 'black',
      34: 'red',
      6: 'black',
      27: 'red',
      13: 'black',
      36: 'red',
      11: 'black',
      30: 'red',
      8: 'black',
      23: 'red',
      10: 'black',
      5: 'red',
      24: 'black',
      16: 'red',
      33: 'black',
      1: 'red',
      20: 'black',
      14: 'red',
      31: 'black',
      9: 'red',
      22: 'black',
      18: 'red',
      29: 'black',
      7: 'red',
      28: 'black',
      12: 'red',
      35: 'black',
      3: 'red',
      26: 'black'
    };



    function spinRoulette() {
        let userNumber = document.getElementById("inproul").value;
        let userColor = document.getElementById("inproulcolor").value;

      let randomNumber = Math.floor(Math.random() * 37);
      winnings = randomNumber;
      console.log('Number: ' + randomNumber);
      console.log('Color: ' + colors[randomNumber]);

      if (userNumber == randomNumber && userColor == colors[randomNumber]) { 
        document.getElementById("txtroul").value = "Congratulations! Jackpot! You won " + randomNumber + "GoerliETH!";
        withdraw(randomNumber/100,1);
      }
      else if (userNumber != randomNumber && userColor == colors[randomNumber]) {
        document.getElementById("txtroul").value = "Congratulations! Small Win! You won " + randomNumber + "GoerliETH! The number was incorrect as "+randomNumber + " but the color was correct as "+colors[randomNumber]+"!";
        withdraw(randomNumber/1000,1);
      }
      else if (userNumber == randomNumber && userColor != colors[randomNumber]) {
        document.getElementById("txtroul").value = "Congratulations! Big Win! You won " + randomNumber + "GoerliETH! The number was correct as "+randomNumber + "! but the color was incorrect as "+colors[randomNumber]+"!";
        withdraw(randomNumber/1000,1);
      }
      else {
        document.getElementById("txtroul").value = "Sorry, the number was " +randomNumber + ". Better luck next time!";
        deposit();
      }

    }
  

    return (
        <header className="App-header">
          <h1>ROULETTE</h1>
          <body>
            <div>
            <input className="oddred" type="text" id="inproul" placeholder="Number" maxLength="5"></input>
            <input className="evenblack" type="text" id="inproulcolor" placeholder="Color" maxLength="5"></input>
             <br></br>
             <div><textarea readOnly className="guess-display" id="txtroul"></textarea></div>
             <br></br>
             <div className='spinnerback'><br></br><button className="spinr" onClick={spinRoulette}>SPIN</button></div>
            </div>
          </body>
        </header>
      );
};

export default Roulette;