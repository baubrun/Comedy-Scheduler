import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import {
  loadingAction,
  loadedAction,
  emptyCartAction,
} from "../../actions/actions";
import { connect } from "react-redux";
import {orderNumber, formattedAmount} from "../../Utils"


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



const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState("");
  const [pmtErrors, setPmtErrors] = useState([]);

  useEffect(() => {
    setOrder(orderNumber());
  }, []);

  const dispatchLoaded = () => {
    props.loadedData();
  };

  const dispatchLoading = () => {
    props.loadingData();
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleCloseErrors = () => {
    setPmtErrors([]);
  };

  const dispatchEmptyCart = () => {
    props.emptyCart();
  };


  const storePay = async (order) => {
    const { amount, items } = props;
    const data = new FormData();
    data.append("amount", amount);
    data.append("itemsBought", JSON.stringify(items));
    data.append("order", order);
    const response = await fetch("/checkout", {
      method: "POST",
      body: data,
    });
    const body = await response.text();
    const parser = JSON.parse(body);
    if (parser.success) {
      dispatchEmptyCart();
      props.history.push("/confirmation");
    } else {
      console.log(parser.msg);
    }
  };

  const pay = async (amount, id, orderNum) => {
    const stripeData = new FormData();
    stripeData.append("id", id);
    stripeData.append("amount", formattedAmount(amount));
    stripeData.append("order", orderNum);
    stripeData.append("customer", name);
    const response = await fetch("/charge", {
      method: "POST",
      body: stripeData,
    });
    const body = await response.text();
    const parser = JSON.parse(body);
    dispatchLoaded();
    if (!parser.success) {
      setPmtErrors([parser.msg]);
    } else {
      storePay(order);
    }
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
      dispatchLoading();
      pay(props.amount, id, order);
    } else {
      console.log(error);
    }
  };

  return (
    <form className="stripe-container" onSubmit={handleSubmit}>
      <div className="stripe-header">
        <h1>CARD DETAIL</h1>
      </div>
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
      <fieldset>{<CardElement options={CARD_OPTIONS} />}</fieldset>

      <div className="stripe-error-msg">
        {pmtErrors.map((err, idx) => {
          return (
            <div key={idx} className="errors">
              {err}
              <span id="close-btn" onClick={handleCloseErrors}>
                &times;
              </span>
            </div>
          );
        })}
      </div>

      <button type="submit" disabled={!stripe || props.loading}>
        PURCHASE
        <div className="stripe-spinner">
          <Loader
            type="BallTriangle"
            color="white"
            height={30}
            width={30}
            visible={props.loading}
          />
        </div>
      </button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingData: () => dispatch(loadingAction()),
    loadedData: () => dispatch(loadedAction()),
    emptyCart: () => dispatch(emptyCartAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
