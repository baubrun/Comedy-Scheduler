import React, { Component } from "react";
import { connect } from "react-redux";
import EventsHistory from "./EventsHistory";
import { getEventsAction, getSeatsAvailAction } from "../actions/actions";
import AddEvent from "./AddEvent";
import UpdateEvent from "./UpdateEvent";
import { comp } from "./Events";

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

  async componentDidMount() {
    this.dispatchGetSeatsAvail(await this.fetchData("/getSeatsAvail"));
  }

  dispatchGetEvents = events => {
    this.props.getEvents(events);
  };

  dispatchGetSeatsAvail = seats => {
    this.props.getSeatsAvail(seats);
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
          this.showEvents();
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

  fetchData = async url => {
    const response = await fetch(url);
    const body = await response.text();
    const parser = JSON.parse(body);
    if (Array.isArray(parser)) {
      return parser;
    }
  };

  // confirmOverlapped = async () => {
  //   const data = new FormData();
  //   data.append("startDate", this.state.startDate);
  //   data.append("venue", this.state.venue);
  //   // data.append("endTime", this.state.endTime);
  //   const response = await fetch("/slotsTaken", {
  //     method: "POST",
  //     body: data
  //   });
  //   const body = await response.text();
  //   const parser = JSON.parse(body);
  //   if (parser.success) {
  //     // const start = parser.result.startTime
  //     // const end = parser.result.endTime
  //     // const expectedStart = this.state.startTime
  //     // const ole = calcOverlappedEvents(
  //     //   start,
  //     //   end,
  //     //   expectedStart
  //     // )
  //     // console.log('ole :', ole);
  //     console.log("result", parser.result);
  //   }
  // };

  getHostEvents = () => {
    const events = this.props.events.filter(
      event =>
        event.hostId.toLowerCase().indexOf(this.props.hostId.toLowerCase()) !==
        -1
    );
    return events.sort(comp);
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

  showEvents = async () => {
    this.dispatchGetEvents(await this.fetchData("/events"));
    this.showEvents()
  };

  showEvents = () => {
    this.setState({
      showHistory: true,
      showAddEvent: false,
      showUpdateEvent: false,
      selectedOption: "",
      userEvents: this.getHostEvents()
    });

  }

  showAddEventForm = () => {
    this.setState({
      showHistory: false,
      showAddEvent: true,
      showUpdateEvent: false,
      userEvents: this.getHostEvents()
    });
  };

  showUpdateEventForm = () => {
    if (this.state.selectedOption === "") {
      window.alert("Please select an event.");
      return;
    } else {
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
              <div id="events-history-btn" onClick={this.showEvents}>
                Show Events
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
              hostId={this.props.hostId}
              handleOptionChange={this.handleOptionChange}
              selectedOption={this.state.selectedOption}
              seatsAvail={this.props.seatsAvail}
            />
          )}
          {this.state.showAddEvent && (
            <AddEvent userEvents={this.state.userEvents} />
          )}
          {this.state.showUpdateEvent && (
            <UpdateEvent
              event={this.state.selectedEvent}
              id={this.state.selectedOption}
              showEvents={this.showEvents}
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
    hostId: state.auth.hostId,
    seatsAvail: state.seatsAvail.venue
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEvents: events => dispatch(getEventsAction(events)),
    getSeatsAvail: seats => dispatch(getSeatsAvailAction(seats))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
