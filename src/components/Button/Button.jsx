import React from "react";
import Loader from "react-loader-spinner";


const Button = ({color, id, text, onClick, name, size ,disabled, loading}) => {
  return (
    <button
    id={id} 
    className={`btn btn-${color} btn-${size} `} 
    name={name} 
    onClick={onClick}
    disabled={disabled}
    >
      {text}

      {loading && (<div className="stripe-spinner">
          <Loader
            type="BallTriangle"
            color="white"
            height={30}
            width={30}
            visible={loading}
          />
        </div> )}

    </button>
  );
};

export default Button;
