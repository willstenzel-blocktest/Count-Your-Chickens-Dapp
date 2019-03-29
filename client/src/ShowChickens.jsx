import React from "react";


// import CanvasJSReact from 'canvasjs.react';
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ShowChickens extends React.Component {
  state = { chickenCountKey: null, currentChickenCount : 1}

 componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.SimpleStorage;

    let chickenCountKey = contract.methods["get"].cacheCall()

    // save the `dataKey` to local component state for later reference
    this.setState({ chickenCountKey });

    this.getChickenCount()
  }

  getChickenCount() {
    const {drizzleState} = this.props
    const contract = drizzleState.contracts.SimpleStorage
    const num = contract.get[this.state.chickenCountKey]
    const number = (number) => {if (typeof number === 'undefined') {return -1} else {return parseInt(number.value)}}

    let updatedCount = number(num)
    return updatedCount
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {drizzleState} = nextProps
    const contract = drizzleState.contracts.SimpleStorage
    const num = contract.get[this.state.chickenCountKey]
    const number = (number) => {if (typeof number === 'undefined') {return 1} else {return parseInt(number.value)}}
    let nextCount = number(num)
    
    return (this.getChickenCount() !== nextCount);
  }

  render() {
    let currentChickenCount = this.getChickenCount()
    return (
      <div>
      <p>The current number of chickens is {currentChickenCount}</p>
        <ChickenFarm numChickens={currentChickenCount} />
    </div>
    );
  }
}

function ChickenFarm(props) {
  var jsxArray = [];

  for (var i = 0; i < props.numChickens; i++) {
    jsxArray.push(<AddChicken key={i} alt={"chicken" + (i + 1)} TOP={Math.random()*10} LEFT={Math.random()*10} chickenId={Math.round(Math.random()) + 1} />)
  }
  return jsxArray;
}

function AddChicken(props) {
  return <img src={require("./static/chicken" + props.chickenId + ".png")} alt={props.alt} style={{marginBottom:props.TOP + 'em', marginLeft:props.LEFT + 'em', width:'50px', height:'50px'}}/>
  // return <img  src={require("./static/chicken1.png")} style={{marginBottom:props.TOP + 'em', marginLeft:props.LEFT + 'em', width:'50px', height:'50px'}}/>
  // return <img  src="./static/chicken1.png" style={{marginBottom:props.TOP + 'em'; marginLeft:{props.LEFT} + 'em'; WIDTH:'50em'; HEIGHT:'50em';}}/>
}

export default ShowChickens;
