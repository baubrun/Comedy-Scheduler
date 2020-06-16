import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "../Dropdown";
import {
  logOutAction,
  resetSeatsAvailAction,
  resetEventsAction,
  emptyCartAction,
} from "../../actions/actions";
import "./NavBar.css";

const NavBar = (props) => {
  const currentPage = useLocation().pathname;

  const logout = () => {
    props.logoutUser();
    props.emptyCart();
    props.resetSeatsAvail();
    props.resetEvents();
  };

  return (
    <>
      <nav className="navbar bg-primary p-0 m-0">
          <div>
            <h1>
              <Link
                id="logo"
                className="badge-primary font-weight-bolder"
                to="/"
              >
                <h3 className="ml-1">LE COMEDY HUB</h3>
              </Link>
            </h1>
            {!props.loggedIn && currentPage !== "/login" ? (
              <Link className="badge-secondary" to="/login">
                <div className="font-weight-bold" id="login-link">
                  <h4>LOGIN</h4>
                </div>
              </Link>
            ) : (
              ""
            )}
          </div>

          {props.loggedIn && <Dropdown logout={logout} />}

          <div >
            {props.loggedIn ? `Salut ${props.hostId}!` : ""}
          </div>

          {/* <div className="cart"> */}
          <div>
            <Link to="/cart">
              <img className="mr-1" src="ticket-blk-white.png" alt="CART"></img>
              {props.cart.length > 0 ? (
                // <span className="cart-length">{props.cart.length}</span>
                <span>{props.cart.length}</span>
              ) : (
                ""
              )}
            </Link>
          </div>
      </nav>
    </>
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
