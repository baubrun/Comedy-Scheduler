import React, { Component } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  ElementsConsumer,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const PK_STRIPE = "pk_test_1jcRkbFeUYqVsCGYpNX51Ggv00oyStF042";
const stripePromise = loadStripe(PK_STRIPE);


const options = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const DEFAULT_STATE = {
    fullName: "",
    email: "",
    error: null,
    cardComplete: false,
    processing: false,
    paymentMethod: null,
  };
  
export default class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = DEFAULT_STATE;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { stripe, elements } = this.props;
    const { fullName, email, error, cardComplete } = this.state;
    if (!stripe || !elements) {
      return;
    }
    if (error) {
      console.log("[error]", error);
      return elements.getElement("card").focus();
    }
    if (cardComplete) {
      this.setState({ processing: true });
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        fullName,
        email
      },
    });

    this.setState({ processing: false });

    if (payload.error) {
      this.setState({ error: payload.error });
    } else {
      this.setState({ paymentMethod: payload.paymentMethod });
    }
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form className="pay-stripe" onSubmit={this.props.handleSubmit}>
        <ul>
          <li className="pay-field">
            <label htmlFor="fullName">Name on Card</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              onChange={this.handleChange}
              placeholder="Name on Card"
              value={this.state.fullName}
            />
          </li>
          <li className="pay-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={this.handleChange}
              placeholder="email"
              value={this.state.email}
            />
          </li>
          <li>
            <CardElement options={options} />
          </li>
          <li>
            <button id="pay-btn" type="submit" disabled={this.props.stripe}>
              Pay
            </button>
          </li>
        </ul>
      </form>
    );
  }
}
