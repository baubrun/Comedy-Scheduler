import React from "react";


const Button = ({cn, id, text, onClick, name}) => {
  return (
    <button
    id={id} 
    className={`btn btn-${cn} btn-lg btn-block`} 
    name={name} 
    onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
