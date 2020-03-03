import React from "react";
import { connect } from "react-redux";
import { addToCartAction } from "../actions/actions";
import moment from "moment";
import { Link } from "react-router-dom";

const EventDetail = props => {

  const reserveTicket = () => {
    const rsvBtn = document.getElementsByClassName("reserve-btn")
    rsvBtn.disabled = true

  }


  const dispatchAddToCart = () => {
    props.addToCart(props.event);
  };

  const {
    title,
    venue,
    startDate,
    performer,
    startTime,
    image,
    price
  } = props.event;

  return (
    <div>
      <div className="event-detail-header">
      <Link to="/events">RETURN TO EVENTS</Link>
        <div></div>{title}
      </div>
      <div className="event-detail-body">
        <ul className="event" key={title}>
          <li>Title: {title}</li>
          <li>
            Start:{" "}
            {moment(`${startDate} ${startTime}`).format("DD-MM-YYYY HH:mm")}h
          </li>
          <li>Venue: {venue}</li>
          <li>Performer: {performer}</li>
          <li>Price: ${price}</li>
          <li>
            <img id="performer-img" src={`../../${image}`} alt="" />
          </li>

          <li>
            <Link to="/cart">
            <button className="reserve-btn" onClick={dispatchAddToCart}>
              Reserve
            </button>
            </Link>
          </li>
        </ul>
      </div>
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
