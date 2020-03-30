import React from "react";
import { Link } from "react-router-dom";

const Dropdown = props => {
  return (
    <div className="dropdown">
      <img id="dropdown-img" src="menu-grid.png" alt="" />
      <div className="dropdown-content">
        <ul>
          <Link to="/profile">
            <li>Profile</li>{" "}
          </Link>
          <Link to="/events">
            <li>Events</li>{" "}
          </Link>
          <Link to="/" onClick={props.logout}>
            <li>Logout</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
