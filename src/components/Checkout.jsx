import React, { Component } from "react";
import { connect } from "react-redux";
import { currencyFormat } from "./RenderCart";
import { confirmCheckoutAction } from "../actions/actions";
import { emptyCartAction } from "../actions/actions";
import { resetCheckoutAction } from "../actions/actions";

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      itemsBought: [],
      subTotal: 0,
      tps: 0,
      tvq: 0,
      total: 0,
      cardName: "",
      cardNumber: "",
      exp: "",
      cvv: ""
    };
  }

  calcSubtotal = () => {
    const subTotal = this.props.checkout
      .map(item => item.price * item.qty)
      .reduce((prevVal, currentVal) => prevVal + currentVal);
    return subTotal;
  };

  filterItemsBought = () => {
    return this.props.checkout.map(i => {
      return {
        title:  i.title,
        venue: i.venue,
        startDate: i.startDate,
        startTime: i.startTime,
        performer: i.performer,
        price: i.price,
        qty: i.qty
      }
    })
  }

  componentDidMount() {
    this.setState({
      itemsBought: this.filterItemsBought(),
      subTotal: this.calcSubtotal(),
      tps: this.tps(),
      tvq: this.tvq(),
      total: currencyFormat(this.total())
    });
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

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData();
    data.append("firstName", this.state.firstName);
    data.append("lastName", this.state.lastName);
    data.append("email", this.state.email);
    data.append("address", this.state.address);
    data.append("city", this.state.city);
    data.append("total", this.state.total);
    data.append("cardName", this.state.cardName);
    data.append("cardNumber", this.state.cardNumber);
    data.append("exp", this.state.exp);
    data.append("cvv", this.state.cvv);
    data.append("itemsBought", JSON.stringify(this.state.itemsBought));
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      subTotal: 0,
      tps: 0,
      tvq: 0,
      total: 0,
      cardName: "",
      cardNumber: "",
      exp: "",
      cvv: "",
      itemsBought: []
    });
    const response = await fetch("/checkout", { method: "POST", body: data });
    const body = await response.text();
    const parser = JSON.parse(body);
    if (parser.success) {
      this.dispatchConfirmCheckout();
      this.dispatchEmptyCart();
      this.dispatchResetCheckout();
      this.props.history.push("/confirmation");
    }
  };

  tps = () => 0.05 * this.calcSubtotal().toFixed(2);
  tvq = () => 0.09975 * this.calcSubtotal().toFixed(2);
  total = () => this.calcSubtotal() + this.tps() + this.tvq();

  render() {
    const numTickets = this.props.checkout
      .map(t => t.qty)
      .reduce((acc, curr) => acc + curr);

    return (
      <>
        <div className="checkout-header">Checkout</div>
        <div className="checkout-body">
          {!this.props.checkedOut && (
            <>
              <form
                className="checkout-flex-container"
                onSubmit={this.handleSubmit}
              >
                <ul className="checkout-form-container">
                  <li>Billing Address</li>
                  <li>
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      name="firstName"
                      onChange={this.handleChange}
                      type="text"
                      placeholder="First Name"
                      value={this.state.firstName}
                    />
                  </li>
                  <li>
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                    />
                  </li>
                  <li>
                    <label htmlFor="email">Email *</label>
                    <input
                      // type="email"
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </li>
                  <li>
                    <label htmlFor="address" className="">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={this.state.address}
                      onChange={this.handleChange}
                    />
                  </li>
                  <li>
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={this.state.city}
                      onChange={this.handleChange}
                    />
                  </li>
                </ul>
                <ul className="checkout-form-container">
                  <li>Payment Details</li>
                  <li>
                    <div className="cc">Accepted Cards</div>
                    <div>
                      <img src="amex-cc.png" alt="" />
                      <img src="disc-cc.png" alt="" />
                      <img src="mc-cc.png" alt="" />
                      <img src="visa-cc.png" alt="" />
                    </div>
                  </li>
                  <li>
                    <label htmlFor="cardName">Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Name on card"
                      value={this.state.cardName}
                      onChange={this.handleChange}
                    />
                  </li>
                  <li>
                    <label htmlFor="cardNumber">Credit card number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1111-2222-3333-4444"
                      value={this.state.cardNumber}
                      onChange={this.handleChange}
                    />
                  </li>
                  <li className="exp-cvv">
                    <label htmlFor="exp">Exp Year</label>
                    <input
                      type="text"
                      name="exp"
                      placeholder="Exp"
                      value={this.state.exp}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={this.state.cvv}
                      onChange={this.handleChange}
                    />
                  </li>
                  <li>
                    <button
                      className="process-btn"
                      onClick={this.handleSubmit}
                      type="submit"
                    >
                      Process Payment
                    </button>
                  </li>
                </ul>
                <div></div>
              </form>
              <div className="total-checkout">
                <h2>Summary</h2>
                {`${numTickets} tickets for: `}
                {this.state.itemsBought.map((item, idx) => (
                  <ul className="items-summary" key={idx}>
                    <li>{item.title}</li>
                  </ul>
                ))}
                {`Total: ${this.state.total}`}
              </div>
            </>
          )
          }
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkout: state.checkout,
    checkedOut: state.checkedOut
  };
};

const mapDispatchToProps = dispatch => {
  return {
    confirmCheckout: () => dispatch(confirmCheckoutAction()),
    emptyCart: () => dispatch(emptyCartAction()),
    resetCheckout: () => dispatch(resetCheckoutAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
