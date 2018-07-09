import React, { Component } from 'react';
import './css/App.css';

import Display from './components/Display';
import Keypad from './components/Keypad';
import Operators from './components/Operators';

class App extends Component {

  state = {
    formula: "",
    output: "0",
    currentOperator: undefined
  }

  isOutputOperator = () => {
    if (
      this.state.output === "+" ||
      this.state.output === "-" ||
      this.state.output === "/" ||
      this.state.output === "*") {
      return true;
    } else {
      return false;
    }
  }

  numberHandler = number => {
    this.setState({
      output: 
        this.state.output === "0" || this.isOutputOperator() ? number : `${this.state.output}${number}`,
      formula: this.state.output === "0" ? number : `${this.state.formula}${number}`
    });
  }

  operatorHandler = operator => {
    console.log(operator);
    switch(operator) {
      case ".":
        this.setState(state => {
          if (state.output === "0") {
            return {
              output: this.state.output.includes(".") ? this.state.output : `${this.state.output}${"."}`,
              formula: this.state.output.includes(".") ? this.state.output : `0${"."}`
            }
          } else {
            return {
              output: this.state.output.includes(".") ? this.state.output : `${this.state.output}${"."}`,
              formula: this.state.output.includes(".") ? this.state.output : `${this.state.formula}${"."}`
            }
          }
        });
        break;
      case "=":
        this.setState(state => {
          if (state.formula.includes("=") || 
              state.formula.startsWith("/") || 
              state.formula.startsWith("*") ||
              state.formula.startsWith("-") 
            ) {
            console.log("no changes made");
            return null;
          } else if (this.isOutputOperator()) {
            let answer = eval(state.formula.slice(0,state.formula.length-1));
            return {
              output: `${answer}`,
              formula: `${state.formula.slice(0,state.formula.length-1)} = ${answer}`
            }
          } else {
            let answer = eval(state.formula);
            console.log(answer);
            return {
              output: `${answer}`,
              formula: `${state.formula} = ${answer}`
            }
          }
        });
        break;
      case "DEL":
        this.setState( state => {
          if (state.output === "0" && state.formula === "") {
            return null;
          } else {
            return {
              output: "0",
              formula: ""
            }
          }
        });
        break;
      case "/":
        console.log("divide");
        this.displayOperation("/");
        break;
      case "X":
        console.log("multiply");
        this.displayOperation("*");
        break;
      case "-":
        console.log("subtract");
        this.displayOperation("-");
        break;
      case "+":
        console.log("add");
        this.displayOperation("+");
        break;
      default:
        return;
    }
  }

  displayOperation = (type) => {
    this.setState( state => {
      if (state.formula.includes("=")) {
        return {
          output: type,
          formula: state.formula.substr(state.formula.indexOf("=") + 1) + type
        }
      } else if (this.isOutputOperator()) {
        return {
          output: type,
          formula: state.formula.slice(0,state.formula.length-1) + type
        }
      } else {
        return {
          output: type,
          formula: `${state.formula}${type}`
        }
      }
    });
  }

  render() {
    return (
      <div className="calculator">
        <Display 
          formula={this.state.formula}
          output={this.state.output}
        />
        <Keypad
          // properties
          numbers={this.props.numbers}
          kPOperators={this.props.kPOperators}
          // functions
          displayNumber={this.numberHandler}
          submitOperator={this.operatorHandler}
        />
        <Operators 
          operators={this.props.operators}
          submitOperator={this.operatorHandler}
        />
      </div>
    );
  }
}

App.defaultProps = {
  numbers: {
    values: ["0","1","2","3","4","5","6","7","8","9"],
    names: ["zero","one","two","three","four","five","six","seven","eight","nine"]
  },
  operators: {
    values: ["DEL","/","X","-","+"],
    names: ["clear","divide","multiply","subtract","add"]
  },
  kPOperators: {
    values: [".", "="],
    names: ["decimal","equals"]
  }
}

export default App;