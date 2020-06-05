import React from "react";
import { Link } from "react-router-dom";

const Dropdown = (props) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-default dropdown-toggle"
        type="button"
        id="dropdownMenu"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <img src="menu-grid-50.png" alt="" />
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenu">
        <Link className="dropdown-item" to="/profile">
          PROFILE
        </Link>
        <Link className="dropdown-item" to="/events">
          EVENTS
        </Link>
        <Link className="dropdown-item" to="/" onClick={props.logout}>
          LOGOUT
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
