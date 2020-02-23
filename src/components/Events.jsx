import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";
import { getEventsAction } from "../actions/actions";
import CalendarView from "./CalendarView";
import options from "../data/data.js"


export const Event = props => {
  const { title, location, performer, start, end, seatsAvail } = props.events;
  return (
    <div>
      <ul className="event">
        <li>
          <Link to={`/event/${title}`}>{title}</Link>
        </li>
        <li>Date: {new Date(start).toLocaleString("en-GB", options)}</li>
        {/* <li>Start: {new Date(start).toLocaleTimeString()}</li> */}
        {/* <li>End: {end}</li> */}
        <li>Location: {location}</li>
        <li>Performer: {performer}</li>
        <li className="seatsAvail">
          Seats Available:{" "}
          {seatsAvail > 0 ? (
            <img
              id="seatsAvail-img"
              src="green-check-grn-wht-15px.png"
              alt=""
            />
          ) : (
            <img id="seatsAvail-img" src="red-x-red-wht-15px.png" alt="" />
          )}
        </li>
        <li>
          <img src="" alt="" />
        </li>
      </ul>
    </div>
  );
};

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calendarViewShow: false,
      listViewShow: true,
      venue: ""
    };
  }

  handleGetEvents = events => {
    this.props.getEvents(events);
  };

  fetchData = async () => {
    const response = await fetch("/events");
    const body = await response.text();
    const parsed = JSON.parse(body);
    this.handleGetEvents(parsed);
  };

  componentDidMount() {
    this.fetchData();
  }

  handleSearchInput = event => {
    this.setState({ searchInput: event.target.value });
  };

  toggleListView = () => {
    this.setState({
      listViewShow: true,
      calendarViewShow: false
    });
  };

  toggleCalendarView = () => {
    this.setState({
      calendarViewShow: true,
      listViewShow: false
    });
  };

  handleVenueChange = event => {
    this.setState({ venue: event.target.value });
  };

  render() {
    return (
      <>
        <div className="events-header">
          {/* <div className="events-title">
            <h1>{this.state.venue ? this.state.venue : "CHOOSE A VENUE"}</h1>
          </div> */}
          <>
            <div className="venue-select">
              <h2>VENUE</h2>
              <select onChange={this.handleVenueChange} name="venue">
                <option value=""></option>
                <option value="LE FOU FOU">LE FOU FOU</option>
                <option value="JOKES BLAGUES">JOKES BLAGUES</option>
                <option value="RIRE NOW">RIRE NOW</option>
              </select>
            </div>
          </>

          {/* <div id="events-title">
            <h1>EVENTS</h1>
          </div> */}
          <div className="events-header-img">
            <div id="calendar-view" onClick={this.toggleCalendarView}>
              <img src="calendar2-view-30px.png" alt="" />
            </div>
            <div id="list-view" onClick={this.toggleListView}>
              <img src="list-view-30px.png" alt="" />
            </div>
          </div>
          <div id="events-search"></div>
        </div>
        <div className="events-body">
          {this.state.listViewShow &&
            this.props.events
              .filter(event =>
                event.location
                  .toLowerCase()
                  .includes(this.state.venue.toLowerCase())
              )
              .map((event, idx) => <Event events={event} key={idx} />)}
          {this.state.calendarViewShow && <CalendarView />}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { events: state.events };
};

const mapDispatchToProps = dispatch => {
  return {
    getEvents: events => dispatch(getEventsAction(events))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
// export default connect(mapStateToProps, null)(Events);
