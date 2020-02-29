import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EventsHistory from "./EventsHistory";
import { getEventsAction } from "../actions/actions";
import Host from "./Host";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showHistory: false,
      showAddEventForm: false
    };
  }


  handleEventsHistory = events => {
    this.props.getEventsHistory(events);
  };


  showEventHistory = async () => {
    const response = await fetch("/profile")
    const body = await response.text()
    const parser = JSON.parse(body)
    this.handleEventsHistory(parser)

    this.setState({ 
      showHistory: true, 
      showAddEvent: false 
    });
  };

  showAddEventForm = () => {
    this.setState({ 
      showHistory: false, 
      showAddEvent: true 
    });
  };



  render() {
    return (
      <div>
        <div className="profile-header">
          <h1>PROFILE</h1>
          <ul className="profile-buttons">
            <li>
              <div id="events-history-btn" onClick={this.showEventHistory}>
                Show history
              </div>
            </li>
            <li>
              <div id="add-event-btn" onClick={this.showAddEventForm}>
              Add Event
              </div>
            </li>
            <li>
                <div id="delete-event-btn">Delete Event</div>
            </li>
            <li>
                <div id="update-event-btn">Update Event</div>
            </li>
          </ul>
          <div className="add-event-container"></div>
        </div>
        <div className="profile-body">
          {this.state.showHistory && (
          <EventsHistory
            events={this.props.events}
            hostId={this.props.hostId}
          />
          )}
          {this.state.showAddEvent && (
          <Host />
          )}

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.events,
    hostId: state.auth.hostId
  };
};

const mapDispatchToProps = dispatch => {
  return{
    getEventsHistory: events => dispatch(getEventsAction(events))
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
