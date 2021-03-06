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
import { orderNumber, formattedAmount } from "../../Utils";
import { FormInput } from "../FormInput";
import { Button } from "../Button";
import "./CheckoutForm.css";
import { dataRequestPost, goToEndpoint } from "../../api";

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

    const ckout = await dataRequestPost("/checkout", data);
    console.log(ckout);
    
    if (ckout.success) {
      dispatchEmptyCart();
      goToEndpoint("/confirmation", props);
    } else {
      console.log(ckout.msg);
    }
  };

  const pay = async (amount, id, orderNum) => {
    const stripeData = new FormData();
    stripeData.append("id", id);
    stripeData.append("amount", formattedAmount(amount));
    stripeData.append("order", orderNum);
    stripeData.append("customer", name);

    const chr = await dataRequestPost("/charge", stripeData);
    dispatchLoaded();
    if (!chr.success) {
      setPmtErrors([chr.msg]);
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
    <form className="form-group" onSubmit={handleSubmit}>
      <fieldset>
        <FormInput
          className=""
          type="text"
          onChange={handleName}
          placeholder="Name on Card"
          required
          value={name}
        />
      </fieldset>
      <fieldset id="stripe-input">
        <FormInput
          type="text"
          onChange={handleEmail}
          placeholder="Email"
          required
          value={email}
        />
      </fieldset>
      <fieldset className="form-control">
        {<CardElement options={CARD_OPTIONS} />}
      </fieldset>

      <div className="stripe-error-msg bg-danger text-light my-2 text-center">
        {pmtErrors.map((err, idx) => {
          return (
            <div
              key={idx}
              className="errors"
              onClick={handleCloseErrors}
              style={{ cursor: "pointer" }}
            >
              {err}
            </div>
          );
        })}
      </div>
      <Button
        color="dark text-white my-3"
        size="block"
        text="PURCHASE"
        type="submit"
        disabled={!stripe || props.loading}
        loading={props.loading}
      ></Button>
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
