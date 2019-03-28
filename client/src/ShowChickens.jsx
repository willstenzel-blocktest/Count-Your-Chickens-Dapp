import React from "react";


// import CanvasJSReact from 'canvasjs.react';
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ShowChickens extends React.Component {
  state = { chickenCountKey: {} };

  componentDidMount() {
    const { drizzle} = this.props;
    const contract = drizzle.contracts.SimpleStorage;
    console.log("drizzle ", drizzle);
    console.log("SimpleStorage ", contract);

    console.log('These are the methods ' + contract.methods)

    let chickenCountKey = contract.methods["get"].cacheCall()

    console.log("chickenCountKey ", chickenCountKey);
    // save the `dataKey` to local component state for later reference
    this.setState({ chickenCountKey });
  }

  render() {
    // get the contract state from drizzleState
    const { SimpleStorage } = this.props.drizzleState.contracts;

    // get the number of chickens from the contract
    const number = (number) => {if (typeof number === 'undefined') {return 0} else {return parseInt(number.value)}}
    let numChickens = number(SimpleStorage.get[this.state.chickenCountKey])

    return (
      <div>
      <p>The current number of chickens is {numChickens}</p>
        <ChickenFarm numChickens={numChickens} />
    </div>
    );
  }
}

function ChickenFarm(props) {
  var jsxArray = [];

  for (var i = 0; i < props.numChickens; i++) {
    jsxArray.push(<AddChicken TOP={Math.random()*20} LEFT={Math.random()*20} chickenId={Math.round(Math.random())} />)
  }
  return jsxArray;
}

function AddChicken(props) {
  return <img  src={require("./static/chicken1.png")} style={{marginBottom:props.TOP + 'em', marginLeft:props.LEFT + 'em', width:'50px', height:'50px'}}/>
  // return <img  src="./static/chicken1.png" style={{marginBottom:props.TOP + 'em'; marginLeft:{props.LEFT} + 'em'; WIDTH:'50em'; HEIGHT:'50em';}}/>
}

export default ShowChickens;
