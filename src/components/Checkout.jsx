import React, { Component } from "react";
import { connect } from "react-redux";
import { confirmCheckoutAction } from "../actions/actions";
import { emptyCartAction } from "../actions/actions";
import { resetCheckoutAction } from "../actions/actions";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const PK_STRIPE = "pk_test_1jcRkbFeUYqVsCGYpNX51Ggv00oyStF042";
const stripePromise = loadStripe(PK_STRIPE);

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsBought: [],
      subTotal: 0,
      tps: 0,
      tvq: 0,
      total: 0,
    };
  }

  calcSubtotal = () => {
    const subTotal = this.props.checkout
      .map((item) => item.price * item.qty)
      .reduce((prevVal, currentVal) => prevVal + currentVal);
    return subTotal;
  };

  filterItemsBought = () => {
    return this.props.checkout.map((i) => {
      return {
        title: i.title,
        venue: i.venue,
        startDate: i.startDate,
        startTime: i.startTime,
        performer: i.performer,
        price: i.price,
        qty: i.qty,
      };
    });
  };

  componentDidMount() {
    this.props.checkout.length > 0
      ? this.setState({
          itemsBought: this.filterItemsBought(),
          subTotal: this.calcSubtotal(),
          tps: this.tps(),
          tvq: this.tvq(),
          total: this.total().toFixed(2),
        })
      : this.props.history.push("/events");
  }

  dispatchConfirmCheckout = () => {
    this.props.confirmCheckout();
  };

  dispatchEmptyCart = () => {
    this.props.emptyCart();
  };

  dispatchResetCheckout = () => {
    this.props.resetCheckout();
  };


  tps = () => 0.05 * this.calcSubtotal().toFixed(2);
  tvq = () => 0.09975 * this.calcSubtotal().toFixed(2);
  total = () => this.calcSubtotal() + this.tps() + this.tvq();

  render() {
    const numTickets = () => {
      return this.props.checkout.length > 0
        ? this.props.checkout
            .map((t) => t.qty)
            .reduce((acc, curr) => acc + curr)
        : this.props.history.push("/events");
    };

    return (
      <div className="checkout">
        <div className="checkout-header">CHECKOUT</div>

        <div className="checkout-body">
          {this.props.checkout === []
            ? this.props.history.push("/events")
            : !this.props.checkedOut && (
                <>
                  <div className="total-checkout">
                    <div>
                      <h2>SUMMARY</h2>
                    </div>
                    <div>
                      {`${numTickets()} ticket${
                        numTickets() > 1 ? "s" : ""
                      } for:`}
                    </div>
                    <div>
                    {this.state.itemsBought.map((item, idx) => (
                      <ul className="items-summary" key={idx}>
                        <li>{item.title}</li>
                      </ul>
                    ))}
                    </div>
                    <div>
                      <h2>{`TOTAL: $${this.state.total}`}</h2>
                    </div>
                  </div>

                  <div className="payment-section">
                    <div className="cc-cards">
                      <img src="ax.png" alt="" />
                      <img src="dc.png" alt="" />
                      <img src="mc.png" alt="" />
                      <img src="vs.png" alt="" />
                    </div>
                    <Elements stripe={stripePromise}>
                      <CheckoutForm amount={this.state.total}/>
                    </Elements>
                  </div>
                </>
              )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    checkout: state.checkout,
    checkedOut: state.checkedOut,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    confirmCheckout: () => dispatch(confirmCheckoutAction()),
    emptyCart: () => dispatch(emptyCartAction()),
    resetCheckout: () => dispatch(resetCheckoutAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
