import React, { Component, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  ElementsConsumer,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const PK_STRIPE = "pk_test_1jcRkbFeUYqVsCGYpNX51Ggv00oyStF042";
const stripePromise = loadStripe(PK_STRIPE);

const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: "black",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#37383b",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const resetState = () => {
    setName("");
    setEmail("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postCharge = async (id, amount) => {
      const stripeData = new FormData();
      stripeData.append("id", id);
      const [wholeNum, decimal] = amount.split(".");
      const formattedNum = wholeNum + decimal;
      console.log("formattedNum :", formattedNum);

      stripeData.append("amount", formattedNum);

      const response = await fetch("/charge", {
        method: "POST",
        body: stripeData,
      });
      const body = await response.text();
      const parser = JSON.parse(body);
      console.log("charge-parsed :", parser);
    };

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name,
        email,
      },
    });

    if (!error) {
      console.log(paymentMethod);
      const { id } = paymentMethod;
      await Promise.all([postCharge(id, props.amount)]).catch((err) =>
        console.log(err)
      );
      // resetState();

      // try {
      // await postCharge(id, props.amount);
      // console.log(id);
      // console.log(props.amount);
      // postCharge(id, props.amount);
      // } catch (error) {
      // console.log("error :", error);
      // }
      // } else {
      //   console.log("error :", error);
      // }
    }
  };
  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-container">
      <fieldset>
        <label className="stripe-label" htmlFor="name">
          Name
        </label>
        <input
          className="stripe-input"
          id="name"
          type="text"
          onChange={handleName}
          placeholder="Name on Card"
          required
          value={name}
        />
      </fieldset>
      <fieldset>
        <label className="stripe-label" htmlFor="email">
          Email
        </label>
        <input
          className="stripe-input"
          id="email"
          type="email"
          onChange={handleEmail}
          placeholder="Email"
          required
          value={email}
        />
      </fieldset>
      <fieldset>
        <CardElement options={CARD_OPTIONS} />
      </fieldset>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
