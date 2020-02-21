import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="home-title">
          <h1>LE COMEDY HUB</h1>
        </div>

        <div className="dropdown">
          <img id="dropdown-img" src="menu-grid.png" alt="" />
          {/* <img id="dropdown-img2" src="black-menu-grid.png" alt="" /> */}
          <div className="dropdown-content">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>
              <li>
                <Link to="profile">Profile</Link>
              </li>
              <li>
                <Link to="reserve">Reserve tickets</Link>
              </li>
              <li>
                <Link to="host">Host an event</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

export default connect(mapStateToProps)(NavBar);
