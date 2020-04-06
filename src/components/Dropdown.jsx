import React from "react";
import { Link } from "react-router-dom";

const Dropdown = props => {
  return (
    <div className="dropdown">
      <img  src="menu-grid-50.png" alt="" />
      <div className="dropdown-content">
        <ul>
          <Link to="/profile">
            <li>PROFILE</li>{" "}
          </Link>
          <Link to="/events">
            <li>EVENTS</li>{" "}
          </Link>
          <Link to="/" onClick={props.logout}>
            <li>LOGOUT</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
