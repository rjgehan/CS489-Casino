import React, { useState, useEffect } from "react";
import "./App.css";
import Blackjack from "./pages/Blackjack";
import Home from "./pages/Home";
import Wheel from "./pages/Wheel";
import Slots from "./pages/Slots";
import Wallet from "./pages/Wallet";
import Navbar from "./components/navbar";

const LOGIN_KEY = "is_logged_in"; // Define a key for the login state in local storage

const Login = ({ onLogin }) => {
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const is21Plus = age >= 21;
    if (is21Plus) {
      onLogin();
      localStorage.setItem(LOGIN_KEY, "true"); // Save the login state in local storage
    } else {
      alert("You must be 21 or older to access this app!");
    }
  };

  return (
    <body className="login-body">
      <div className="login-container">
        <h2>Welcome to the Crypto Casino!</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="age-input">Please verify your age: </label>
          <input
            type="number"
            id="age-input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <p>
        <br></br>CRYPTO CASINO README<br></br>
        <br></br>Juliana Merlino, Peter Pressley, Ryan Gehan, and Kelly Reynolds
For our project we have decided to create a mock Casino where you can participate in various casino games in order to try to win big with crypto. These would give users the chance to bet their cryptocurrency and if lucky, win more back. 
The overall goal of this system is to cater to a population of people who may not have that much of an interest in crypto but want to start somewhere. By having them participate in a low stakes environment this will allow people to become comfortable using crypto in a way that might seem more familiar to them. 
We will use JavaScript to implement a web-based casino that will feature all casino games for users to participate in. We also plan on using JavaScript to code the
games that will be available to the users.<br></br><br></br>
Github Link: https://github.com/ryangehan/CS489-Casino.git 
Website : https://ryangehan.github.io/CS489-Casino/
<br></br>
        <br></br>
      </p>
    </body>
  );
};

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem(LOGIN_KEY, "false"); // Update the login state in local storage
  };

  useEffect(() => {
    const isLoggedInInStorage = localStorage.getItem(LOGIN_KEY); // Get the login state from local storage
    if (isLoggedInInStorage === "true") {
      setLoggedIn(true);
    }
  }, []);

  let component;
  switch (window.location.pathname) {
    case "/home":
      component = <Home />;
      break;
    case "/blackjack":
      component = <Blackjack />;
      break;
    case "/slots":
      component = <Slots />;
      break;
    case "/wheel":
      component = <Wheel />;
      break;
    case "/wallet":
      component = <Wallet />;
      break;
    default:
      component = <Home />;
      break;
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <h1>Welcome to the Crypto Casino!</h1>
          <Navbar />
          {component}
          <div>
            <br></br>
          </div>
          <button className="Logout" onClick={handleLogout}>
            Logout
          </button>
          <div>
            <br></br>
          </div>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
