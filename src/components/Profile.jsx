import React, { Component } from "react";
import { connect } from "react-redux";
import EventsHistory from "./EventsHistory";
import { getEventsAction, getSeatsAvailAction } from "../actions/actions";
import AddEvent from "./AddEvent";
import UpdateEvent from "./UpdateEvent";
import { compareDates } from "./Events";
// import Loader from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { loadingAction, loadedAction } from "../actions/actions";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showHistory: false,
      showAddEvent: false,
      showUpdateEvent: false,
      selectedEvent: [],
      selectedOption: "",
      userEvents: [],
    };
  }


  dispatchLoaded = () => {
    this.props.loadedData();
  };

  dispatchLoading = () => {
    this.props.loadingData();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.seatsAvail !== this.props.seatsAvail) {
      this.fetchData();
    }
  }

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
      this.fetchSeatsAvail()
    ]).catch(err => console.log(err))
      this.setState({
      userEvents: this.getHostEvents(),
      showHistory: true,
      showAddEvent: false,
      showUpdateEvent: false,
      selectedOption: "",
    });

  }

  dispatchGetEvents = (events) => {
    this.props.getEvents(events);
  };

  dispatchGetSeatsAvail = (seats) => {
    this.props.getSeatsAvail(seats);
  };

  toDelete = () => {
    const found = this.state.userEvents.find(
      (event) => event._id === this.state.selectedOption
    );
    return {
      startDate: found.startDate,
      venue: found.venue,
      image: found.image,
    };
  };

  deleteEvent = async () => {
    if (this.state.selectedOption === "") {
      window.alert("Please select an event.");
      return;
    } else {
      const confirm = window.confirm("Delete event(s) ?");
      if (confirm) {
        const dataEvents = new FormData();
        dataEvents.append("id", this.state.selectedOption);
        dataEvents.append("image", this.toDelete().image);

        const dataSeating = new FormData();
        dataSeating.append("startDate", this.toDelete().startDate);
        dataSeating.append("venue", this.toDelete().venue);

        await Promise.all([
          fetch("/deleteEvents", { method: "POST", body: dataEvents }),
          fetch("/deleteSeating", { method: "POST", body: dataSeating }),
        ]);
        this.fetchEvents();
      }
    }
  };

  getHostEvents = () => {
    const events = this.props.events.filter(
      (event) =>
        event.hostId.toLowerCase().indexOf(this.props.hostId.toLowerCase()) !==
        -1
    );
    return events.sort(compareDates);
  };

  getSelectedEvent = () => {
    const event = this.state.userEvents.find(
      (evt) => evt._id === this.state.selectedOption
    );
    return event;
  };

  handleOptionChange = (event) => {
    this.setState({
      selectedOption: event.target.value,
    });
  };

  showAddEvent = () => {
    this.setState({
      showHistory: false,
      showAddEvent: true,
      showUpdateEvent: false,
      userEvents: this.getHostEvents(),
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
        showUpdateEvent: true,
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
              <div id="events-history-btn" onClick={this.fetchData}>
                Show Events History
              </div>
            </li>
            <li>
              <div id="add-event-btn" onClick={this.showAddEvent}>
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
        {/* {
        this.props.loading ? (
          <div className="profile-body">
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              // timeout={3000} 
              />
          </div>
        ) : ( */}
          <div className="profile-body">
            {/* {this.state.showHistory && !this.props.loading && ( */}
            {this.state.showHistory && (
              <EventsHistory
                userEvents={this.state.userEvents}
                handleOptionChange={this.handleOptionChange}
                selectedOption={this.state.selectedOption}
                // seatsAvail={this.props.seatsAvail}
                fetchData={this.fetchData}
              />
            )}
            {this.state.showAddEvent && (
              <AddEvent userEvents={this.state.userEvents} />
            )}
            {this.state.showUpdateEvent && (
              <UpdateEvent
                event={this.state.selectedEvent}
                id={this.state.selectedOption}
                fetchEvents={this.fetchEvents}
              />
            )}
          </div>
        {/* ) */}
        {/* } */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events,
    hostId: state.auth.hostId,
    seatsAvail: state.seatsAvail.venue,
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
