import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getEventsAction, getSeatsAvailAction } from "../actions/actions";
import CalendarView from "./CalendarView";
import moment from "moment";

export const comp = (a, b) => {
  let dateA = new Date(a.startDate);
  let dateB = new Date(b.startDate);
  return dateA - dateB;
};

export const seatingLeft = (eventDate, seats, venue) => {
  const seat = seats.find(i => i.startDate === eventDate);
  return seat.venue[venue];
};

export const Event = props => {
  const {
    title,
    startDate,
    performer,
    startTime,
    image
  } = props.events;

  return (
    <>
      {
        <ul className="event">
          <li >
            <Link to={`/event/${title}`}>{title}</Link>
            <img id="performer-img" src={`../../${image}`} alt="" />
          </li>
          <li >{performer}</li>

          <li >
            {moment(`${startDate}`).format("DD-MM-YYYY")}
            <br />
            <br />
            {startTime}
          </li>
          <li >
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
    this.fetchEvents()
    this.fetchSeatsAvail()
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
    // if (parsed) {
      this.dispatchGetEvents(parsed);
    // }
  };

  fetchSeatsAvail = async () => {
    const response = await fetch("/getSeatsAvail");
    const body = await response.text();
    const parsed = JSON.parse(body);
    // if (parsed) {
      this.dispatchGetSeatsAvail(parsed);
    // }
  };

  eventsByVenue = () => {
    const events = this.props.events.filter(
      event => event.venue.indexOf(this.state.venue) !== -1
    );
    const eventsSorted = events.sort(comp);
    this.setState({ events: eventsSorted });
  };

  seatsAvail = () => {
    this.setState({ seatsAvail: this.props.seatsAvail });
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

  showEvents = () => {
    if (
      (!this.state.listViewShow && this.state.events.length < 1) ||
      !this.state.venue
    ) {
      return <h1>NO EVENTS</h1>;
    }
    if (this.state.listViewShow && this.state.events.length > 0) {
      return this.state.events
        .filter(event =>
          event.venue.toLowerCase().includes(this.state.venue.toLowerCase())
        )
        .map((event, idx) => (
          <Event
            events={event}
            key={idx}
            seatsAvail={this.props.seatsAvail}
            venue={this.state.venue}
          />
        ));
    }
    if (this.state.calendarViewShow)
      return <CalendarView events={this.state.events} />;
    else {
      return <h1>NO EVENTS</h1>;
    }
  };

  render() {
    const venueFormatted = this.state.venue.split("_").join(" ")

    return (
      <>
        <div className="events-header">
          <h2>EVENTS</h2>
          <div className="venue-select">
            <h2>{venueFormatted ? venueFormatted : "CHOOSE A VENUE"}</h2>
            <select onChange={this.handleVenueChange} name="venue">
              <option value="" default>CHOOSE A VENUE</option>
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
          {this.showEvents()}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.events,
    seatsAvail: state.seatsAvail.venue
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEvents: events => dispatch(getEventsAction(events)),
    getSeatsAvail: seats => dispatch(getSeatsAvailAction(seats))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);

