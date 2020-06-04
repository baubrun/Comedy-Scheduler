import React from "react";
import { connect } from "react-redux";
import { addToCartAction } from "../../actions/actions";
import moment from "moment";
import { Link } from "react-router-dom";
import "./EventDetail.css";
import { Header } from "../Header";
import { Button } from "../Button";

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
      <Header text="EVENTS" type="secondary" />
      <div id="event-detail-body" className="row bg-dark">
        <div className="col-5 offset-2 mt-5">
          <img
            id="performer-img-detail"
            className="img-fluid "
            src={`../../${image}`}
            alt=""
          />
        </div>
        <div className="col-5 mt-5">
          <ul id="event-detail" className="list-group ">
            <li className="list-group-item ">
              <Link to="/cart">
                <Button
                  text="RESERVE"
                  cn="secondary"
                  onClick={dispatchAddToCart}
                />
              </Link>
            </li>
            <li className="list-group-item ">Title: {title}</li>
            <li className="list-group-item ">
              Date: {moment(`${startDate}`).format("DD-MM-YYYY")}
            </li>
            <li className="list-group-item  ">Time: {startTime}</li>
            <li className="list-group-item  ">
              Venue: {venue.split("_").join(" ")}
            </li>
            <li className="list-group-item  ">Performer: {performer}</li>
            <li className="list-group-item  ">Price: {price} $</li>
            <li className="list-group-item  ">
              <div className="social-media">
                {facebook && (
                  <Link to={`facebook.com/${facebook}`}>
                    <img src={require("../../images/fb.png")} alt="facebook" />
                  </Link>
                )}
                {instagram && (
                  <Link to={`instagram.com/${instagram}`}>
                    <img
                      src={require("../../images/ig-color.png")}
                      alt="instagram"
                    />
                  </Link>
                )}
                {twitter && (
                  <Link to={`instagram.com/${twitter}`}>
                    <img src={require("../../images/tt.png")} alt="twitter" />
                  </Link>
                )}
              </div>
            </li>
          </ul>
        </div>
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
