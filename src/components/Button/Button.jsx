import React from "react";


const Button = ({color, id, text, onClick, name, size ,disabled}) => {
  return (
    <button
    id={id} 
    className={`btn btn-${color} btn-${size} `} 
    name={name} 
    onClick={onClick}
    disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
