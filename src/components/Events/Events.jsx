import React, { Component } from "react";
import { connect } from "react-redux";
import { CalendarView } from "../CalendarView";
import { Event } from "../Event";
import {
  getEventsAction,
  getSeatsAvailAction,
  loadingAction,
  loadedAction,
} from "../../actions/actions";
import { compareDates } from "../../Utils";
import "./Events.css";
import { Header } from "../Header";
import {
  fetchEvents} from "../../api"

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
  }

  dispatchGetEvents = (events) => {
    this.props.getEvents(events);
  };

  dispatchGetSeatsAvail = (seats) => {
    this.props.getSeatsAvail(seats);
  };

  // fetchEvents = async () => {
  //   const response = await fetch("http://localhost:4000/events");
  //   const body = await response.text();
  //   const parsed = JSON.parse(body);
  //   if (Array.isArray(parsed)) {
  //     this.dispatchGetEvents(parsed);
  //   }
  // };

  // fetchSeatsAvail = async () => {
  //   const response = await fetch("http://localhost:4000/getSeatsAvail");
  //   const body = await response.text();
  //   const parsed = JSON.parse(body);
  //   if (Array.isArray(parsed)) {
  //     this.dispatchGetSeatsAvail(parsed);
  //   }
  // };

  // fetchData = async () => {
  //   await Promise.all([
  //     this.fetchEvents(),
  //     this.fetchSeatsAvail(),
  //   ]).catch((err) => console.log(err));
  // };

  fetchData = async () => {
      try {
        const data = await fetchEvents()
        this.dispatchGetEvents(data)
      } catch (error) {
        
      }
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
      return <h3>NO EVENTS</h3>;
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
      return (
        <div className="container-fluid">
      <CalendarView events={this.state.events} />
      </div>
      );
    else {
      return <h3>NO EVENTS</h3>;
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row events-header">
          <div className="col">
            <div>
              <Header text="EVENTS" type="dark" />
            </div>
          </div>
        </div>
        <div className="row select-option ">
          <div className="mx-auto my-2">
            <select
              className="custom-select custom-select-lg bg-secondary text-center"
              onChange={this.handleVenueChange}
              name="venue"
            >
              <option value="" default>
                CHOOSE A VENUE
              </option>
              <option value="LE_FOU_FOU">LE FOU FOU</option>
              <option value="JOKES_BLAGUES">JOKES BLAGUES</option>
              <option value="RIRE_NOW">RIRE NOW</option>
            </select>
          </div>
        </div>
        <div className="row mb-4 events-toggler">
            <div className="col text-right" >
              <img
                id="list-view"
                onClick={this.toggleListView}
                src="list-view-30px.png"
                alt=""
              />
            </div>
            <div className="col">
              <img
                id="calendar-view"
                onClick={this.toggleCalendarView}
                src="calendar2-view-30px.png"
                alt=""
              />
            </div>
        </div>
        <div className="d-md-flex flex-wrap justify-content-center"
         id="events-body">{this.showEvents()}</div>
      </div>
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
