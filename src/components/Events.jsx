import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getEventsAction, getSeatsAvailAction } from "../actions/actions";
import CalendarView from "./CalendarView";
import moment from "moment";

export const Event = props => {
  const {
    title,
    startDate,
    performer,
    startTime,
    image,
    seatsAvail
  } = props.events;

  return (
    <div>
    {props.events === [] ? (
        "NO EVENTS"
      ) : ( 
        <div className="event">
          <div className="event-title-info">
            <Link to={`/event/${title}`}>{title}</Link>
            <img id="performer-img" src={`../../${image}`} alt="" />
          </div>
          <div className="event-title-info ">{performer}</div>

          <div className="event-title-info">
            {moment(`${startDate}`).format("DD-MM-YYYY")}
            <br />
            <br />
            {startTime}
          </div>
          {/* <div className="seatsAvail "> */}
          <div className="event-title-info ">
            {/* <div id="seats-avail-title"> */}
            Seats Available:{" "}
            {seatsAvail > 0 ? (
              // {this.props.seatsAvail > 0 ? (
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
       )} 
    </div>
  );
};

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calendarViewShow: false,
      listViewShow: true,
      venue: "",
      startDate: "",
      events: []
    };
  }

  componentDidMount() {
    this.fetchEvents();
    this.eventsByVenue();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.venue !== this.state.venue) {
      this.eventsByVenue();
    }
  }

  dispatchGetEvents = events => {
    this.props.getEvents(events);
  };

  dispatchGetSeatsAvail = seats => {
    this.props.getSeatsAvail(seats);
  };

  fetchEvents = async () => {
    const response = await fetch("/events");
    const body = await response.text();
    const parsed = JSON.parse(body);
    this.dispatchGetEvents(parsed);
  };

  eventsByVenue = () => {
    const events = this.props.events.filter(
      event => event.venue.indexOf(this.state.venue) !== -1
    );
    this.setState({ events: events });
  };

  handleSearchInput = event => {
    this.setState({ searchInput: event.target.value });
  };

  handleVenueChange = event => {
    this.setState({ venue: event.target.value });
  };

  toggleCalendarView = () => {
    this.setState({
      calendarViewShow: true,
      listViewShow: false
    });
  };

  toggleListView = () => {
    this.setState({
      listViewShow: true,
      calendarViewShow: false
    });
  };

  render() {
    return (
      <>
        <div className="events-header">
          <h2>EVENTS</h2>
          <div className="venue-select">
            <h2>{this.state.venue ? this.state.venue : "CHOOSE A VENUE"}</h2>
            <select onChange={this.handleVenueChange} name="venue">
              <option value="">CHOOSE A VENUE</option>
              <option value="LE_FOU_FOU">LE FOU FOU</option>
              <option value="JOKES_BLAGUES">JOKES BLAGUES</option>
              <option value="RIRE_NOW">RIRE NOW</option>
            </select>
          </div>
          <div className="events-header-img">
            <img
              id="list-view"
              onClick={this.toggleListView}
              src="list-view-30px.png"
              alt=""
            />
            <img
              id="calendar-view"
              onClick={this.toggleCalendarView}
              src="calendar2-view-30px.png"
              alt=""
            />
          </div>
        </div>
        <div className="events-body">
          {this.state.listViewShow &&
            this.props.events
              .filter(event =>
                event.venue
                  .toLowerCase()
                  .includes(this.state.venue.toLowerCase())
              )
              .map((event, idx) => (
                <Event
                  events={event}
                  key={idx}
                  seatsAvail={this.props.seatsAvail}
                />
              ))}
          {this.state.calendarViewShow && (
            <CalendarView events={this.state.events} />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.events
    // seatsAvail: state.seating
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEvents: events => dispatch(getEventsAction(events))
    // getSeatsAvail: seats => dispatch(getSeatsAvailAction(seats))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);

// fetchSeatsAvail = async () => {
//   const data = new FormData();
//   data.append("startDate", this.state.startDate);
//   const response = await fetch("/getSeatsAvail", {
//     method: "POST",
//     body: data
//   });
//   const body = await response.text();
//   const parsed = JSON.parse(body);
//   this.dispatchGetSeatsAvail(parsed);
// };
