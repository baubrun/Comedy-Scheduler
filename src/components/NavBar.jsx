import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  logOutAction,
  resetSeatsAvailAction,
  resetEventsAction
} from "../actions/actions";

class NavBar extends Component {
  logout = () => {
    this.props.logoutUser();
    this.props.resetSeatsAvail();
    this.props.resetEvents();
  };

  render() {
    return (
      <div className="navbar">
        <div className="home-title">
          <h1>
            <Link to="/">LE COMEDY HUB</Link>
          </h1>
          <div className="hostId">
            {this.props.loggedIn ? `Salut ${this.props.hostId}!` : ""}
          </div>
        </div>
        {this.props.loggedIn && (
          <div className="dropdown">
            <img id="dropdown-img" src="menu-grid.png" alt="" />
            <div className="dropdown-content">
              <ul>
                <Link to="/profile">
                  <li>Profile</li>{" "}
                </Link>
                <Link to="/events">
                  <li>Tickets</li>{" "}
                </Link>
                <Link to="/profile">
                  <li>Add event</li>{" "}
                </Link>
                <Link to="/" onClick={this.logout}>
                  <li>Logout</li>
                </Link>
              </ul>
            </div>
          </div>
        )}
        {
          <div className="cart">
            <Link to="/cart">
              <img src="ticket-blk-white.png" alt=""></img>
              {this.props.cart.length > 0 ? (
                <span className="cart-length">{this.props.cart.length}</span>
              ) : (
                ""
              )}
            </Link>
          </div>
          //  )
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    hostId: state.auth.hostId,
    cart: state.cart,
    checkedOut: state.checkedOut
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logOutAction()),
    resetSeatsAvail: () => dispatch(resetSeatsAvailAction()),
    resetEvents: () => dispatch(resetEventsAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
