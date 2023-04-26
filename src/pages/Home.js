import logo from './logo.svg';

export default function Home() {
    return (
        <header className="App-header">
          <h1>CRYPTO CASINO</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <p><strong>Check out Crypto Casino Github</strong></p> 
          <a
            className="App-link"
            href="https://github.com/ryangehan/CS489-Casino.git "
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <p><br></br><br></br>
          <br></br><br></br>Casino uses Ethereum (ETH)</p>
        </header>
    )
}