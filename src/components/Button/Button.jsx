import React from "react";


const Button = ({color, id, text, onClick, name, size}) => {
  return (
    <button
    id={id} 
    className={`btn btn-${color} btn-${size} `} 
    name={name} 
    onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
