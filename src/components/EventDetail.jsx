import React from "react";
import { connect } from "react-redux";
import { addToCartAction } from "../actions/actions";
import moment from "moment";
import { Link } from "react-router-dom";

const EventDetail = (props) => {
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
    facebook,
    instagram,
    twitter,
  } = props.event;

  return (
    <>
      <div className="event-detail-header">
        <Link to="/events">
          <h1>EVENTS</h1>
        </Link>
      </div>
      <div className="event-detail-body">
        <div className="performer-img-detail">
          <img src={`../../${image}`} alt="" />
        </div>
        <ul className="event-detail-info">
          <li>
            <Link to="/cart">
              <button className="reserve-btn" onClick={dispatchAddToCart}>
                RESERVE
              </button>
            </Link>
          </li>
          <li>Title: {title}</li>
          <li>Date: {moment(`${startDate}`).format("DD-MM-YYYY")}</li>
          <li>Time: {startTime}</li>
          <li>Venue: {venue.split("_").join(" ")}</li>
          <li>Performer: {performer}</li>
          <li>Price: {price} $</li>
          <li>
            <div className="social-media">
              {facebook && (
                <Link to={`facebook.com/${facebook}`}>
                  <img src="../../fb-chUpload-0.png" alt="facebook" />
                </Link>
              )}
              {instagram && (
                <Link to={`instagram.com/${instagram}`}>
                  <img src="../../ig-chUpload-0.png" alt="instagram" />
                </Link>
              )}
              {twitter && (
                <Link to={`instagram.com/${twitter}`}>
                  <img src="../../tt-chUpload-0.png" alt="twitter" />
                </Link>
              )}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

const RenderEvent = (props) => {
  const eventTitle = props.match.params.title;
  const selectedTitle = props.events.find((event) => {
    return event.title === eventTitle;
  });
  return <EventDetail event={selectedTitle} addToCart={props.addToCart} />;
};

const mapStateToProps = (state) => {
  return {
    events: state.events,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addToCartAction(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderEvent);
