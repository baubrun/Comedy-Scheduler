import React from "react";
import { connect } from "react-redux";
import { addToCartAction } from "../actions/actions";
import moment from "moment";
import { Link } from "react-router-dom";

const EventDetail = props => {
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
    price,
    _id
  } = props.event;

  return (
    <div>
      <div className="event-detail-header">
        <Link to="/events">RETURN TO EVENTS</Link>
      </div>
      <div className="event-detail-body">
        <ul className="event" key={_id}>
        <li>
            <Link to="/cart">
              <button className="events-btn" onClick={dispatchAddToCart}>
                RESERVE
              </button>
            </Link>
          </li>
          <li>Title: {title}</li>
          <li> Date:{moment(`${startDate}`).format("DD-MM-YYYY")}</li>
          <li>Time: {startTime}</li>
          <li>Venue: {venue}</li>
          <li>Performer: {performer}</li>
          <li>Price: ${price}</li>
          <li>
            <img className="performer-img-detail" src={`../../${image}`} alt="" />
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
