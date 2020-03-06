import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getEventsAction } from "../actions/actions";
import CalendarView from "./CalendarView";
import moment from "moment";


export const Event = props => {
  const {
    title,
    venue,
    startDate,
    performer,
    startTime,
    image,
    seatsAvail,
  } = props.events;

  return (
    <div>
      <ul className="event">
        <li>
          <Link to={`/event/${title}`}>{title}</Link>
        </li>
        <li>Start: {moment(`${startDate} ${startTime}`).format("DD-MM-YYYY HH:mm")}h</li>
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
          <img id="performer-img" src={`../../${image}`} alt="" />
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


  addEvent = (event) => {
    return 
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
          <div className="venue-select">
            <h2>{this.state.venue ? this.state.venue : "CHOOSE A VENUE"}</h2>
            <select onChange={this.handleVenueChange} name="venue">
              <option value="">CHOOSE A VENUE</option>
              <option value="LE FOU FOU">LE FOU FOU</option>
              <option value="JOKES BLAGUES">JOKES BLAGUES</option>
              <option value="RIRE NOW">RIRE NOW</option>
            </select>
          </div>
          <div className="events-header-img">
            <img
              id="calendar-view"
              onClick={this.toggleCalendarView}
              src="calendar2-view-30px.png"
              alt=""
            />
            <img
              id="list-view"
              onClick={this.toggleListView}
              src="list-view-30px.png"
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
