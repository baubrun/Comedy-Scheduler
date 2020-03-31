import React, { Component } from "react";
import { connect } from "react-redux";
import { currencyFormat } from "./RenderCart";
import { confirmCheckoutAction } from "../actions/actions";
import { emptyCartAction } from "../actions/actions";
import { resetCheckoutAction } from "../actions/actions";
import StripeCheckout from "react-stripe-checkout";

const PK_STRIPE = "pk_test_1jcRkbFeUYqVsCGYpNX51Ggv00oyStF042";

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
      cvv: "",
      receiptUrl: ""
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
        title: i.title,
        venue: i.venue,
        startDate: i.startDate,
        startTime: i.startTime,
        performer: i.performer,
        price: i.price,
        qty: i.qty
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
          total: this.total().toFixed(2)
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

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleToken = async (token, address) => {
    const data = new FormData();
    data.append("token", token);
    data.append("address", address);
    data.append("address", address);
    await fetch("/charge", { method: "POST", body: data });
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

    // const response = await fetch("/checkout", { method: "POST", body: data });
    // const body = await response.text();
    // const parser = JSON.parse(body);
    // if (parser.success) {
    //   this.dispatchConfirmCheckout();
    //   this.dispatchEmptyCart();
    //   this.dispatchResetCheckout();
    //   this.props.history.push("/confirmation");
    // }
  };

  tps = () => 0.05 * this.calcSubtotal().toFixed(2);
  tvq = () => 0.09975 * this.calcSubtotal().toFixed(2);
  total = () => this.calcSubtotal() + this.tps() + this.tvq();

  render() {
    const numTickets = () => {
      return this.props.checkout.length > 0
        ? this.props.checkout.map(t => t.qty).reduce((acc, curr) => acc + curr)
        : this.props.history.push("/events");
    };

    return (
      <>
        <div className="checkout-header">Checkout</div>
        <div className="checkout-body">
          {this.props.checkout === []
            ? this.props.history.push("/events")
            : !this.props.checkedOut && (
                <>
                  <ul className="checkout-flex-container">
                    <li>Cards Accepted</li>
                    <li className="cc-icons">
                      <li>
                        <img src="ax-64.png" alt="" />
                      </li>
                      <li>
                        <img src="dc-64.png" alt="" />
                      </li>
                      <li>
                        <img src="mc-64.png" alt="" />
                      </li>
                      <li>
                        <img src="vs-64.png" alt="" />
                      </li>
                      <li className="debit-card-logo">
                        <img id="debit-card" src="db-48.png" alt="" />
                      </li>
                    </li>
                    <div />
                    <li className="pay-btn">
                      <StripeCheckout
                        amount={this.state.total * 100}
                        currency="CAD"
                        stripeKey={PK_STRIPE}
                        token={this.handleToken}
                        country="CA"
                      />
                    </li>
                  </ul>

                  <div className="total-checkout">
                    <h2>Summary</h2>
                    {`
                    ${numTickets()} ticket${numTickets() > 1 ? "s" :""} for:`}
                    {this.state.itemsBought.map((item, idx) => (
                      <ul className="items-summary" key={idx}>
                        <li>{item.title}</li>
                      </ul>
                    ))}
                    <h2>{`Total: $${this.state.total}`}</h2>
                  </div>
                </>
              )}
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
