import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logOutAction } from "../actions/actions";

class NavBar extends Component {
  dispatchLogout = () => {
    this.props.logoutUser();
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
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/events">Tickets</Link>
                </li>
                <li>
                  <Link to="/host">Host an event</Link>
                </li>
                <li>
                  <Link to="/" onClick={this.dispatchLogout}>
                    Logout
                  </Link>
                </li>
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
    logoutUser: () => dispatch(logOutAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
