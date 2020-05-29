import React, { Component } from "react";
import { connect } from "react-redux";
import {CalendarView} from "../CalendarView";
import {Event} from "../Event";
import {
  getEventsAction,
  getSeatsAvailAction,
  loadingAction,
  loadedAction,
} from "../../actions/actions";
import {compareDates} from "../../Utils"
import "./Events.css"



const toggleBlockFlex = (state) => {
  const doc = document.getElementById("events-body");
  if (!state) {
    doc.style.display = "block";
  } else {
    doc.style.display = "flex";
    doc.style.flexFlow = "row wrap";
  }
};

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calendarViewShow: false,
      listViewShow: true,
      venue: "",
      startDate: "",
      events: [],
    };
  }

  componentDidMount() {
    this.fetchData();
    this.eventsByVenue();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.venue !== this.state.venue) {
      this.eventsByVenue();
    }
    if (prevState.listViewShow !== this.state.listViewShow) {
      toggleBlockFlex(this.state.listViewShow);
    }
  }

  dispatchGetEvents = (events) => {
    this.props.getEvents(events);
  };

  dispatchGetSeatsAvail = (seats) => {
    this.props.getSeatsAvail(seats);
  };

  fetchEvents = async () => {
    const response = await fetch("/events");
    const body = await response.text();
    const parsed = JSON.parse(body);
    if (Array.isArray(parsed)) {
      this.dispatchGetEvents(parsed);
    }
  };

  fetchSeatsAvail = async () => {
    const response = await fetch("/getSeatsAvail");
    const body = await response.text();
    const parsed = JSON.parse(body);
    if (Array.isArray(parsed)) {
      this.dispatchGetSeatsAvail(parsed);
    }
  };

  fetchData = async () => {
    await Promise.all([
      this.fetchEvents(),
      this.fetchSeatsAvail(),
    ]).catch((err) => console.log(err));
  };

  eventsByVenue = () => {
    const events = this.props.events.filter(
      (event) => event.venue.indexOf(this.state.venue) !== -1
    );
    const eventsSorted = events.sort(compareDates);
    this.setState({ events: eventsSorted });
  };

  handleSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  handleVenueChange = (event) => {
    this.setState({ venue: event.target.value });
  };

  toggleCalendarView = () => {
    this.setState({
      calendarViewShow: true,
      listViewShow: false,
    });
  };

  toggleListView = () => {
    this.setState({
      listViewShow: true,
      calendarViewShow: false,
    });
  };

  showEvents = () => {
    if (
      (!this.state.listViewShow && this.state.events.length < 1) ||
      !this.state.venue
    ) {
      return <h1 className="events-no-events">NO EVENTS</h1>;
    }
    if (this.state.listViewShow && this.state.events.length > 0) {
      return this.state.events
        .filter((event) =>
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
      return <h1 className="events-no-events">NO EVENTS</h1>;
    }
  };

  render() {
    const venueFormatted = this.state.venue.split("_").join(" ");
    return (
      <>
        <div className="events-header">
          <h1>EVENTS</h1>
          <div className="venue-select">
            <h2>{venueFormatted ? venueFormatted : "CHOOSE A VENUE"}</h2>
            <select onChange={this.handleVenueChange} name="venue">
              <option value="" default>
                CHOOSE A VENUE
              </option>
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
        <div id="events-body">{this.showEvents()}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events,
    seatsAvail: state.seatsAvail,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: (events) => dispatch(getEventsAction(events)),
    getSeatsAvail: (seats) => dispatch(getSeatsAvailAction(seats)),
    loadingData: () => dispatch(loadingAction()),
    loadedData: () => dispatch(loadedAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);