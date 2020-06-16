import React, { Component } from "react";
import { connect } from "react-redux";
import { CheckoutForm } from "../CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./Checkout.css";
import { Header } from "../Header";

export const PK_STRIPE = "pk_test_1jcRkbFeUYqVsCGYpNX51Ggv00oyStF042";
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

  tps = () => 0.05 * this.calcSubtotal();
  tvq = () => 0.09975 * this.calcSubtotal();
  total = () => this.calcSubtotal() + this.tps() + this.tvq();

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
          tps: this.tps().toFixed(2),
          tvq: this.tvq().toFixed(2),
          total: this.total().toFixed(2),
        })
      : this.props.history.push("/events");
  }

  dispatchResetCheckout = () => {
    this.props.resetCheckout();
  };

  superscript = () => {
    const s = this.state.total.toString();
    const sp = s.split(".");
    return sp;
  };

  render() {
    const numTickets = () => {
      return this.props.checkout.length > 0
        ? this.props.checkout
            .map((t) => t.qty)
            .reduce((acc, curr) => acc + curr)
        : this.props.history.push("/events");
    };

    return (
      <div id="checkout" className="container-fluid bg-dark">
        <Header text="CHECKOUT" type="secondary text-light text-center mb-3" />
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="card bg-white">
              <div className="div card-header text-dark bg-white">
                <h3 className="text-center">SUMMARY</h3>
              </div>
              <div className="card-body bg-primary">
                <div className="card-text text-dark text-center">
                  {`${numTickets()} ticket${numTickets() > 1 ? "s" : ""} for:`}
                  {this.state.itemsBought.map((item, idx) => (
                    <ul className="list-group" key={idx}>
                      <li className="list-group-item text-center">{item.title}</li>
                    </ul>
                  ))}
                </div>
                <div className="card-text text-center my-2">
                  <h3>TOTAL</h3>
                </div>
                <div className="card-text text-center">
                  <h3>
                    {`$ ${this.superscript()[0]}`}
                    <sup>{this.superscript()[1]}</sup>
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card bg-primary">
              <div className="div card-header text-white bg-secondary mb-3">
                <h3 className="text-center">CARD DETAIL</h3>
              </div>
              <div className="card-body">
                <div className="card-text">
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      amount={this.state.total}
                      history={this.props.history}
                      items={this.state.itemsBought}
                    />
                  </Elements>
                </div>
              </div>
            </div>
          </div>
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
export default connect(mapStateToProps)(Checkout);

