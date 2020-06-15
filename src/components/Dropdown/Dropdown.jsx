import React from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css";

const Dropdown = (props) => {
  return (
    <div className="dropdown ">
      <img src="menu-grid-50.png" alt="" />
      <div className="dropdown-content">
        <Link to="/profile">
          <li>PROFILE</li>{" "}
        </Link>
        <Link to="/events">
          <li>EVENTS</li>{" "}
        </Link>
        <Link to="/" onClick={props.logout}>
          <li>LOGOUT</li>
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
