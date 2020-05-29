import React from "react";

const Button = ({id, text, onClick}) => {
  return (
    <div id={id} onClick={onClick}>
      {text}
    </div>
  );
};

export default Button;
