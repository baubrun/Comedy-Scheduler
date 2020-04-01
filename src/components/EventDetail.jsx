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
        <ul className="event-detail" key={_id}>
          <li>
            <img
              className="performer-img-detail"
              src={`../../${image}`}
              alt=""
            />
          </li>

          <li>
            <li>
              <Link to="/cart">
                <button className="reserve-btn" onClick={dispatchAddToCart}>
                  PURCHASE
                </button>
              </Link>
            </li>

            <li className="event-detail-info">Title: {title}</li>
            <li className="event-detail-info">
              {" "}
              Date: {moment(`${startDate}`).format("DD-MM-YYYY")}
            </li>
            <li className="event-detail-info">Time: {startTime}</li>
            <li className="event-detail-info">
              Venue: {venue.split("_").join(" ")}
            </li>
            <li className="event-detail-info">Performer: {performer}</li>
            <li className="event-detail-info">Price: {price} $</li>
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
