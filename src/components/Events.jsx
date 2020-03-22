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
  console.log("seats :", seat.venue[venue]);
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
    <div>
      {
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
          <div className="event-title-info ">
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
      }
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

  async componentDidMount() {
    this.dispatchGetSeatsAvail(await this.fetchData("/getSeatsAvail"))
    this.dispatchGetEvents(await this.fetchData("/events"))
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

  fetchData = async url =>{
    const response = await fetch(url)
    const body = await response.text()
    const parser = JSON.parse(body)
    if (Array.isArray(parser)){
      return parser
    }
  }


  fetchEvents = async () => {
    const response = await fetch("/events");
    const body = await response.text();
    const parsed = JSON.parse(body);
    if (parsed) {
      this.dispatchGetEvents(parsed);
    }
  };

  fetchSeatsAvail = async () => {
    const response = await fetch("/getSeatsAvail");
    const body = await response.text();
    const parsed = JSON.parse(body);
    if (parsed) {
      this.dispatchGetSeatsAvail(parsed);
    }
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

