import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { loadingAction, loadedAction } from "../actions/actions";
import { connect } from "react-redux";

const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: "black",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "18px",
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

const orderNumber = () => {
  return "CB3" + Math.floor(Math.random() * 1000);
};

const formattedAmount = (amount) => {
  const [wholeNum, decimal] = amount.split(".");
  console.log("formattedNum :", wholeNum + decimal);
  return wholeNum + decimal;
};

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState("");
  const [stripeMsg, setSripeMsg] = useState("")

  useEffect(() => {
    setOrder(orderNumber());
  }, []);

  // const resetState = () => {
  //   setName("");
  //   setEmail("");
  // };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const postCharge = async (amount, id, orderNum) => {
    const stripeData = new FormData();
    stripeData.append("id", id);
    stripeData.append("amount", formattedAmount(amount));
    stripeData.append("description", orderNum);
    const response = await fetch("/charge", {
      method: "POST",
      body: stripeData,
    });
    const body = await response.text();
    const parser = JSON.parse(body);
    if (!parser.success) {
      setSripeMsg(parser.msg)
      console.log('stripeMsg :', stripeMsg);
    }
    // else {
    //   props.history.push("/confirmation")
    // }
  };

  const postPurchase = async (order) => {
    const { amount, items } = props;
    const data = new FormData();
    data.append("amount", amount);
    data.append("itemsBought", JSON.stringify(items));
    data.append("order", order);
    await fetch("/checkout", {
      method: "POST",
      body: data,
    });
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name,
        email,
      },
    });
    if (!error) {
      const { id } = paymentMethod;
      await Promise.all([
        postCharge(props.amount, id, order),
        postPurchase(order),
      ]).catch((err) => console.log(err));
    } else {
      setSripeMsg(error)
      console.log(stripeMsg);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="stripe-container">
      <div className="stripe-header"><h1>CARD DETAIL</h1></div>
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
          // required
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
          // required
          value={email}
        />
      </fieldset>
      <fieldset>
        
        <CardElement options={CARD_OPTIONS} />
      </fieldset>
      <button type="submit" disabled={!stripe || props.loading}>
        PURCHASE
        <div className="stripe-spinner">
        <Loader 
        type="BallTriangle"
        color="white"
        height={30}
        width={30}
        visible={!props.loading}
        />
        </div>
      </button>
      <div className="stripe-msg">

      </div>
    </form>
  );
};


const mapStateToProps = (state) => {
  return {
    seatsAvail: state.seatsAvail,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingData: () => dispatch(loadingAction()),
    loadedData: () => dispatch(loadedAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);

// export default CheckoutForm;
