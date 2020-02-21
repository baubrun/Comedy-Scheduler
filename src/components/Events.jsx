import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";
import { getEventsAction } from "../reducer/actions";

const Event = props => {
  const { title, location, performer, date } = props.events;
  return (
    <div>
      <ul className="event">
        <li>
          <Link to={`/event/${title}`}>{title}</Link>
        </li>
        <li>Date: {date}</li>
        <li>Location: {location}</li>
        <li>Performer: {performer}</li>
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
      searchInput: ""
    };
  }

  handleGetEvents = events => {
    this.props.getEvents(events);
  };

  fetchData = async () => {
    const response = await fetch("/events");
    const body = await response.text();
    const parsed = JSON.parse(body);
    // this.setState({ events: parsed });
    this.handleGetEvents(parsed);
  };

  componentDidMount() {
    this.fetchData();
  }

  handleSearchInput = event => {
    this.setState({ searchInput: event.target.value });
  };

  render() {
    return (
      <div>
        <h1>Events</h1>
        <SearchBar
          handleSearchInput={this.handleSearchInput}
          searchInput={this.state.searchInput}
        />
        <div>
          {this.props.events
            .filter(event =>
              Object.keys(event).some(k =>
                event[k]
                  .toLowerCase()
                  .includes(this.state.searchInput.toLowerCase())
              )
            )
            .map((event, idx) => (
              <Event events={event} key={idx} />
            ))}
        </div>
      </div>
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
