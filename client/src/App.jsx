import React from 'react';
import './App.css';
import ShowChickens from './ShowChickens'
import SetChickens from './SetChickens'
import assist from 'bnc-assist'


class App extends React.Component {

state = { loading: true, drizzleState: null };

 componentDidMount() {

   var bncAssistConfig = {
      dappId: "823ab89a-de77-4177-8c6d-de800130b2b6",

      //networkId: 5  // [Integer] The network ID of the Ethereum network your dapp is deployd on.
                      //           See below for instructions on how to setup for local blockchains.
    };

   var assistInstance = assist.init(bncAssistConfig);

   // assistInstance.onboard()
   //   .then(function(success) {
   //     // User has been successfully onboarded and is ready to transact
   //     // This means we can be sure of the follwing user properties:
   //     //  - They are using a compatible browser
   //     //  - They have a web3-enabled wallet installed
   //     //  - The w    console.log('These are the methods ', contract.methods)allet is connected to the config-specified networkId
   //     //  - The wallet is unlocked and contains at least `minimumBalance` in wei
   //     //  - They have connected their wallet to the dapp, congruent with EIP1102
   //   })
   //   .catch(function(error) {
   //     // The user exited onboarding before completion
   //     // Will let you know what stage of onboarding the user was up to when they exited
   //     console.log(error.msg);
   //   })


   // Add Drizzle
   const { drizzle } = this.props;

   // subscribe to changes in the store
   this.unsubscribe = drizzle.store.subscribe(() => {

     // every time the store updates, grab the state from drizzle
     const drizzleState = drizzle.store.getState();

     // check to see if it's ready, if so, update local component state
     if (drizzleState.drizzleStatus.initialized) {
       this.setState({ loading: false, drizzleState })
     }
   });
 }

 componentWillUnmount() {
   this.unsubscribe()
 }

 render() {
   if (this.state.loading) return "Loading Drizzle...";

   return (
   <div className="container">
      <h1>Count Your Chickens!</h1>
        <ShowChickens
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}/>
          <br/>
          <SetChickens
            drizzle = {this.props.drizzle}
            drizzleState= {this.state.drizzleState}/>
   </div>
 )}

}


export default App;
