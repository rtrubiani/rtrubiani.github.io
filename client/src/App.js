import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      
instance.options.address = "0x2219B5241CfF9fe9E36Ff19b6Da4487b07248226"

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(0).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
   this.setState({ storageValue: response });
  };


  async handleClick(event) {
    const { accounts, contract } = this.state;
    const ssInputValue = document.getElementById('ss-input-box').value;
    var value = ssInputValue

    await contract.methods.set(value).send({ from: accounts[0] });
    
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  } 


  
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Insurtech DApp!</h1>
        <p>Upload your travel value to be insured</p>
        <h2>Other users can stake ETH in the Smart Contract to cover your potential losses</h2>
        <p>
          If weather is bad (connection with Chainlink to be done) in your travel dates, you will be refunded
          If weather is good, users will get 1% of your travel value as reward, proportionally to their coverage amount
        </p>
        <p>
          Please enter your <strong>travel value</strong> below
        </p>
  <div>
  <input id="ss-input-box" type="number" placeholder="Provide input"/>  
</div>
  <button id="ss-input-button" onClick={this.handleClick.bind(this)}>Submit Value</button>
        <div>Your travel value is: {this.state.storageValue} Euro</div>
      </div>
    );
  }
}

export default App;
