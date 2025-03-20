import React from 'react';

const buttonStyle = {
  margin: '10px 0',
  borderRadius: '4px',
  padding: '2px 5px',
  cursor: 'pointer',
};

const labelStyle = {
  fontWeight: 700,
};

const Button = ({ label, handleClick }) => (
  <button
    className="btn btn-default"
    style={buttonStyle}
    onClick={handleClick}
  >
    <span style={labelStyle}>{label}</span>
  </button>
);

export default Button;
