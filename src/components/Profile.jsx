import React, { Component } from "react";
import { connect } from "react-redux";
import EventsHistory from "./EventsHistory";
import { getEventsAction } from "../actions/actions";
import AddEvent from "./AddEvent";
import UpdateEvent from "./UpdateEvent";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showHistory: false,
      showAddEventForm: false,
      showUpdateEvent: false,
      selectedEvent: [],
      selectedOption: "",
      userEvents: []
    };
  }

  dispatchGetEvents = events => {
    this.props.getEvents(events);
  };



  deleteEvent = async () => {
    if (this.state.selectedOption === "") {
      window.alert("Please select an event.");
      return;
    } else {
      const confirm = window.confirm("Delete event(s) ?");
      if (confirm) {
        const data = new FormData();
        data.append("id", this.state.selectedOption);
        const response = await fetch("/deleteEvents", {
          method: "POST",
          body: data
        });
        const body = await response.text();
        const parser = JSON.parse(body);
        if (parser.success) {
          console.log(parser.success);
          this.LoadEvents();
        }
      } else {
        return;
      }
    }
  };

  enableButtonsOnChecked = condition => {
    const updateBtn = document.getElementById("update-event-btn");
    updateBtn.style.pointerEvents = condition;
    const deleteBtn = document.getElementById("delete-event-btn");
    deleteBtn.style.pointerEvents = condition;
  };


  getHostEvents = () => {
    return this.props.events.filter(
      event =>
        event.hostId.toLowerCase().indexOf(this.props.hostId.toLowerCase()) !==
        -1
    );
  };

  getSelectedEvent = () => {
    const event = this.state.userEvents.find(
      evt => evt._id === this.state.selectedOption
    );
    return event;
  };

  handleOptionChange = event => {
    this.setState({
      selectedOption: event.target.value
    });
  };

  showAddEventForm = () => {
    this.setState({
      showHistory: false,
      showAddEvent: true,
      showUpdateEvent: false,
      userEvents: this.getHostEvents()
    });
  };

  LoadEvents = async () => {
    const response = await fetch("/events");
    const body = await response.text();
    const parser = JSON.parse(body);
    this.dispatchGetEvents(parser);
    this.setState({
      showHistory: true,
      showAddEvent: false,
      showUpdateEvent: false,
      selectedOption: "",
      userEvents: this.getHostEvents()
    });
  };

  showUpdateEventForm = () => {
    if (this.state.selectedOption === "") {
      window.alert("Please select an event.");
      return;
    } else {
      // this.verifyEventSelected();
      this.setState({
        selectedEvent: this.getSelectedEvent(),
        showHistory: false,
        showAddEvent: false,
        showUpdateEvent: true
      });
    }
  };

  render() {
    return (
      <div>
        <div className="profile-header">
          <h1>PROFILE</h1>
          <ul className="profile-buttons">
            <li>
              <div id="events-history-btn" onClick={this.LoadEvents}>
                Load Events
              </div>
            </li>
            <li>
              {/* <div id="add-event-btn" onClick={this.showAddEventForm}> */}
              <div id="add-event-btn" onClick={this.showAddEventForm}>
                Add Event
              </div>
            </li>
            <li>
              <div id="delete-event-btn" onClick={this.deleteEvent}>
                Delete Event
              </div>
            </li>
            <li>
              <div id="update-event-btn" onClick={this.showUpdateEventForm}>
                Update Event
              </div>
            </li>
          </ul>
        </div>
        <div className="profile-body">
          {this.state.showHistory && (
            <EventsHistory
              userEvents={this.state.userEvents}
              // userEvents={this.props.events}
              hostId={this.props.hostId}
              handleOptionChange={this.handleOptionChange}
              selectedOption={this.state.selectedOption}
            />
          )}
          {this.state.showAddEvent && (
            <AddEvent userEvents={this.state.userEvents} />
          )}
          {this.state.showUpdateEvent && (
            <UpdateEvent
              event={this.state.selectedEvent}
              id={this.state.selectedOption}
              LoadEvents={this.LoadEvents}
            />
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
  return {
    getEvents: events => dispatch(getEventsAction(events))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
// export default connect(mapStateToProps)(Profile);
