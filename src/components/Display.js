import React from 'react';
import PropTypes from 'prop-types';

const Display = props =>
  <div className="display-wrapper">
    <div className="formula-screen">{props.formula}</div>
    <div className="output-screen" id="display">{props.output}</div>
  </div>

Display.propTypes = {
  formula: PropTypes.string,
  output: PropTypes.string.isRequired,
}

export default Display;