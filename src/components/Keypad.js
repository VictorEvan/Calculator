import React from 'react';
import PropTypes from 'prop-types';

const Keypad = props =>
  <div className="keypad">
    {props.numbers.values.map((number,i) => (
      <button 
        className="key" 
        key={number}
        id={props.numbers.names[i]} 
        onClick={() => props.displayNumber(number)}
      >
        {number}
      </button>
    ))}
    {props.kPOperators.values.map((operator,i) => (
      <button 
        className="key" 
        key={operator}
        id={props.kPOperators.names[i]}
        onClick={() => props.submitOperator(operator)}
      >
        {operator}
      </button>
    ))}
  </div>

Keypad.propTypes = {
  numbers: PropTypes.object.isRequired,
  kPOperators: PropTypes.object.isRequired,
  displayNumber: PropTypes.func.isRequired,
  submitOperator: PropTypes.func.isRequired
}

export default Keypad;