import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Event = (props) => {
  const seatingLeft = (eventDate, seats, venue) => {
    const seat = seats.find((i) => i.startDate === eventDate);
    return seat.venue[venue];
  };

  const { title, startDate, performer, startTime, image } = props.events;
  return (
    <div className="events-list-view">
      {
        <div className="event">
          <div className="event-title">
            <Link to={`/event/${title}`}>{title}</Link>
          </div>
          {/* <div id="performer-img-container">
            <img src={`../../${image}`} alt="" />
          </div> */}
          <div className="event-info">
            <div id="performer-img-events-container">
              {/* <div id="performer-img-container"> */}
              {/* <div id="performer-img-events"> */}
              <img src={`../../${image}`} alt="" />
            </div>

            <div id="performer-name">{performer}</div>
            <div>{moment(`${startDate}`).format("DD-MM-YYYY")}</div>
            <div>{startTime}</div>
            <div className="seats-avail-img-container">
              Seats Available:{" "}
              {seatingLeft(startDate, props.seatsAvail, props.venue) > 0 ? (
                <img
                  id="seats-avail-img"
                  src="green-check-grn-wht-15px.png"
                  alt=""
                />
              ) : (
                <img id="seats-avail-img" src="red-x-red-wht-15px.png" alt="" />
              )}{" "}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Event;
