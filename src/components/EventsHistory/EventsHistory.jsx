import React from "react";
import moment from "moment";
import { loadingAction, loadedAction } from "../../actions/actions";
import { connect } from "react-redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import "./EventsHistory.css";
import { Header } from "../Header";

const seatingEmpty = null;

export const EventsHistory = (props) => {
  // const seatingLeft = (eventDate, seats, venue) => {
  //   const seat = seats.find((i) => i.startDate === eventDate);
  //   return !seat ? seatingEmpty === true : seat.venue[venue];
  // };

  const loadingSize = 200;
  return (
    <div className="">
      <Header text="EVENTS HISTORY" type="secondary" />

      <div className="">
        <div className="col mx-auto">
          {/* <Loader
            type="Rings"
            color="rgba(224, 151, 33, 0.7)"
            height={loadingSize}
            width={loadingSize}
            visible={props.loading}
          /> */}
        </div>

        <div className="">
          {!props.loading &&
            (props.userEvents.length > 0 ? (
              props.userEvents.map((event, idx) => (
                <div
                  className="card mb-12 mx-auto my-2"
                  key={idx}
                  style={{ maxWidth: "840px" }}
                >
                  <div className="row">
                    <div className="col-12">
                      <h5 className="card-title text-white text-center">
                        {event.title}
                      </h5>
                    </div>
                  </div>

                  <div className="row no-gutters">
                    <div className="col-12 col-md-4">
                      <img
                        id="history-card-img"
                        className="card-img mx-3"
                        src={`../../${event.image}`}
                        alt=""
                      />{" "}
                    </div>
                    <div className="col-md-8">
                      <div className="card-body text-center">
                        <div className="card-text">
                          <h5 className="text-primary" style={{display: "inline"}}>
                            Date</h5> {moment(event.startDate).format("DD-MM-YYYY")}
                        </div>
                        <div className="card-text">
                          <h5 className="text-primary" style={{display: "inline"}}>
                            Time</h5> {event.startTime}
                        </div>
                        <div className="card-text">
                          <h5 className="text-primary" style={{display: "inline"}}>
                            Venue</h5> {event.venue.split("_").join(" ")}
                        </div>                        
                        <div className="card-text">
                          <h5 className="text-primary" style={{display: "inline"}}>
                            Performer</h5> {event.performer}
                        </div>
                        <div className="card-text">
                          <h5 className="text-primary" style={{display: "inline"}}>
                            Price</h5> {event.price}
                        </div>                        
                        <div className="card-text">
                          <h5 className="text-primary" style={{display: "inline"}}>
                            Facebook </h5> {event.facebook}
                        </div>                        
                        
                        <div className="card-text">
                          <h5 className="text-primary" style={{display: "inline"}}>
                            Instagram </h5> {event.instagram}
                        </div> 

                        <div className="card-text">
                          <h5 className="text-primary" style={{display: "inline"}}>
                            Twitter </h5> {event.twitter}
                        </div> 
                        <div className="form-check">
                          <label
                            className="form-check-label text-white"
                            // htmlFor={`checkbox${event._id}`}
                            style={{fontFamily: "Roboto", fontWeight: "bold", letterSpacing: "2px"}}
                          >
                            <input
                              className="check-form-input mr-2"
                              id={`checkbox${event._id}`}
                              checked={props.selectedOption === event._id}
                              type="radio"
                              onChange={props.handleOptionChange}
                              value={event._id}
                              
                            />
                            Delete / Update
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="row">
                <div className="col text-center">
                  <h3>NO EVENTS</h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    seatsAvail: state.seatsAvail,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingData: () => dispatch(loadingAction()),
    loadedData: () => dispatch(loadedAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsHistory);
