import React from "react";
import { connect } from "react-redux";

const Checkout = (props) => {
  return (
    <>
      <div className="checkout-header">
        <h1>CHECKOUT</h1>
      </div>

      <div className="checkout-summary">
        <div>
          <h2>SUMMARY</h2>
        </div>
        <div className="checkout-summary-items">
          {`${props.numTickets} ticket${
            props.numTickets > 1 ? "s" : ""
          } for:`}
          {this.state.itemsBought.map((item, idx) => (
            <ul key={idx}>
              <li>{item.title}</li>
            </ul>
          ))}
        </div>
        <div className="checkout-summary-total-amount">
          <div className="checkout-summary-total">TOTAL </div>
          <div className="checkout-summary-amount">
            {`$ ${props.superscript()[0]}`}
            <sup>{props.superscript()[1]}</sup>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    checkout: state.checkout,
    checkedOut: state.checkedOut,
  };
};

export default connect(mapStateToProps)(Checkout);
