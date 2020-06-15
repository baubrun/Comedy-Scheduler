import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Event.css";

const Event = (props) => {
  // const seatingLeft = (eventDate, seats, venue) => {
  //   const seat = seats.find((i) => i.startDate === eventDate);
  //   return seat.venue[venue];
  // };

  const { title, startDate, performer, startTime, image } = props.events;
  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      <div className="card-body text-center mb-3">
        <Link className="card-link text-center" to={`/event/${title}`}>
          {title}
        </Link>
        <img className="card-img img-fluid img-event mb-2" src={`../../${image}`} alt="" />
        <div className="card-text" id="performer-name">{performer}</div>
        <div className="card-text">{moment(`${startDate}`).format("DD-MM-YYYY")}</div>
        <div className="card-text">{startTime}</div>
      </div>
    </div>
  );
};

export default Event;
