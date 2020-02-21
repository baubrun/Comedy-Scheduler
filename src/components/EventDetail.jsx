import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {AddedToCart} from "./AddToCart";

const EventDetail = props => {

  const dispatchAddToCart = () =>{
    props.addToCart(props.event)
  }

  const {
    title,
    date,
    start,
    end,
    location,
    performer,
    seatsAvail
  } = props.event;

  return (
    <div>
      <ul className="event" key={title}>
        <li>Title: {title}</li>
        <li>Date: {date}</li>
        <li>Start: {start}</li>
        <li>End: {end}</li>
        <li>Location: {location}</li>
        <li>Performer: {performer}</li>
        {/* {replace seats avail by icons} */}
        <li>Seats Available: {seatsAvail}</li>
        {/* <li className="select-show-btn">
          <Link to="/checkout">Select</Link>
        </li> */}
        <li>
          <AddedToCart addToCart={dispatchAddToCart}/>
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
  return <EventDetail event={selectedTitle} addToCart={props.addToCart} />;
};

const mapStateToProps = state => {
  return {
    events: state.events
  };
};

export default connect(mapStateToProps)(RenderEvent);
