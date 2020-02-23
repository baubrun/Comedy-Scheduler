import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AddedToCart } from "./RenderCart";
import { addToCartAction } from "../actions/actions";
import options from "../data/data.js"


const EventDetail = props => {
  const dispatchAddToCart = () => {
    props.addToCart(props.event);
  };

  const {
    title,
    date,
    start,
    location,
    performer,
    seatsAvail,
    price
  } = props.event;

  return (
    <div>
      <ul className="event" key={title}>
        <li>Title: {title}</li>
        <li>Date: {new Date(start).toLocaleString("en-GB", options)}</li>
        {/* <li>Start: {start}</li> */}
        <li>Location: {location}</li>
        <li>Performer: {performer}</li>
        {/* {replace seats avail by icons} */}
        <li>Seats Available: {seatsAvail}</li>
        <li>Price: ${price}</li>
        {/* <li className="select-show-btn">
          <Link to="/checkout">Select</Link>
        </li> */}
        <li>
          {/* <AddedToCart addToCart={dispatchAddToCart}/> */}
          <button className="reserve-btn" onClick={dispatchAddToCart}>
            Reserve
          </button>
        </li>
      </ul>
    </div>
  );
};

const RenderEvent = props => {
  const eventTitle = props.match.params.title;
  const selectedTitle = props.events.find(event => {
    return event.title === eventTitle;
  });
  return (
    <EventDetail
      event={selectedTitle}
      addToCart={props.addToCart}
    />
  );
};

const mapStateToProps = state => {
  return {
    events: state.events,
    cart: state.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: item => dispatch(addToCartAction(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderEvent);
