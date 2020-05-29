import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {Dropdown} from "../Dropdown";
import {
  logOutAction,
  resetSeatsAvailAction,
  resetEventsAction,
  emptyCartAction, 
} from "../../actions/actions";

const NavBar = (props) => {
  const currentPage = useLocation().pathname;

  const logout = () => {
    props.logoutUser();
    props.emptyCart()
    props.resetSeatsAvail();
    props.resetEvents();
  };

  return (
    <div className="navbar">
      <div className="home-title">
        <h1>
          <Link to="/">LE COMEDY HUB</Link>
        </h1>
        {!props.loggedIn && currentPage !== "/login" ? (
          <Link to="/login">
            <div id="login-link"><h1>LOGIN</h1></div>
          </Link>
        ) : (
          ""
        )}
      </div>

      {props.loggedIn && <Dropdown logout={logout} />}

      <div className="hostId">
        {props.loggedIn ? `Salut ${props.hostId}!` : ""}
      </div>

      <div className="cart">
        <Link to="/cart">
          <img src="ticket-blk-white.png" alt="CART"></img>
          {props.cart.length > 0 ? (
            <span className="cart-length">{props.cart.length}</span>
          ) : (
            ""
          )}
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    hostId: state.auth.hostId,
    cart: state.cart,
    checkedOut: state.checkedOut,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logOutAction()),
    resetSeatsAvail: () => dispatch(resetSeatsAvailAction()),
    resetEvents: () => dispatch(resetEventsAction()),
    emptyCart: () => dispatch(emptyCartAction()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);