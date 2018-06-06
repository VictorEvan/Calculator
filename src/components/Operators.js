import React from 'react';
import PropTypes from 'prop-types';

const Operators = props =>
  <div className="operators">
    {props.operators.values.map((operator,i) => (
      <button 
        className="operator"
        key={operator}
        id={props.operators.names[i]}
        onClick={() => props.submitOperator(operator)}
      >
        {operator}
      </button>
    ))}
  </div>

Operators.propTypes = {
  operators: PropTypes.object.isRequired,
  submitOperator: PropTypes.func.isRequired
}

export default Operators;