import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Event = props => {
    const {title, location, performer} = props.events
  return (
    <div>
          <ul className="event">
            <li>Title: {title}</li>
            <li>Location: {location}</li>
            <li>Performer: {performer}</li>
            <li>
              <img src="" alt="" />
            </li>
            <li>
              <Link to={`/${title}`}>{title}</Link>
            </li>
          </ul>
    </div>
  );
};

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      searchInput: ""
    };
  }

  fetchData = async () => {
    const response = await fetch("/events");
    const body = await response.text();
    const parsed = JSON.parse(body);
    this.setState({ events: parsed });
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
          {this.state.events
            .filter(event => {
              return (
                event.performer
                  .toLowerCase()
                  .indexOf(this.state.searchInput.toLowerCase()) !== -1
              );
            })
            .map((event, idx) => (
              <Event events={event} key={idx} />
            ))}
        </div>
      </div>
    );
  }
}

export default Events;
