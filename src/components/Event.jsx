import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";


const Event = props => {
  
    const seatingLeft = (eventDate, seats, venue) => {
      const seat = seats.find((i) => i.startDate === eventDate);
      return seat.venue[venue];
    };
  
  
    
    const { title, startDate, performer, startTime, image } = props.events;
  return (
    <>
      {
        <ul className="event">
          <li>
            <Link className="event-title" to={`/event/${title}`}>
              {title}
            </Link>
          </li>
          <li>
            <img id="performer-img" src={`../../${image}`} alt="" />
          </li>
          <li>{performer}</li>
          <li>
            {moment(`${startDate}`).format("DD-MM-YYYY")}
            <li>{startTime}</li>
          </li>
          <li>
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
          </li>
        </ul>
      }
    </>
  );
};

export default Event;
