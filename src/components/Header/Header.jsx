import React from "react";

const Header = ({ text, type }) => {
  return (
    <div className="row">
      <div className={`col-md bg-${type} py-1`}>
        <h3 className="text-center" style={{ color: "white" }}>
          {text}
        </h3>
      </div>
    </div>
  );
};

export default Header;
