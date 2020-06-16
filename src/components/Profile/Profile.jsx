import React, { Component } from "react";
import { connect } from "react-redux";
import { EventsHistory } from "../EventsHistory";
import { AddEventContainer } from "../AddEventContainer";
import UpdateEvent from "../UpdateEvent/UpdateEvent";
import { compareDates, 
  toggleProfileButtons 
} from "../../Utils";
import {
  getEventsAction,
  getSeatsAvailAction,
  loadingAction,
  loadedAction,
} from "../../actions/actions";
import { Button } from "../Button";
import { Header } from "../Header";
import "./Profile.css";
import { fetchEvents, delEvents } from "../../api";

// const del = document.getElementById("delete-event-btn")
// const upt = document.getElementById("update-event-btn")

// const hideButtons = () => {
//   // del.style.display = "none"
//   del.disabled = true
//   // upt.style.display = "none"
//   upt.disabled = true
// }



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

  dispatchLoading = async () => {
    this.props.loadingData();

    try {
      const data = await fetchEvents();
      this.dispatchGetEvents(data);
      setTimeout(() => {
        this.dispatchLoaded();
        }, 2000);
      ;
      this.showEvents();
    } catch (error) {
      console.log(error);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.showAddEvent !== this.state.showAddEvent ||
      prevState.showUpdateEvent !== this.state.showUpdateEvent
    ) {
      toggleProfileButtons();
    }
  }

  showEvents = () => {
    this.setState({
      userEvents: this.getHostEvents(),
      showHistory: true,
      showAddEvent: false,
      showUpdateEvent: false,
      selectedOption: "",
    });
  };

  dispatchGetEvents = (events) => {
    this.props.getEvents(events);
  };

  dispatchGetSeatsAvail = (seats) => {
    this.props.getSeatsAvail(seats);
  };

  deleteEvent = async () => {
    if (this.state.selectedOption === "") {
      window.alert("Please select an event.");
      return;
    } else {
      const confirm = window.confirm("Delete event(s) ?");
      if (confirm) {
        let dataEvents = new FormData();
        dataEvents.append("_id", this.state.selectedOption);
        console.log("this.state.selectedOption", this.state.selectedOption);
        
        try {
          await delEvents(dataEvents);
          this.dispatchLoading();
        } catch (error) {
          console.log(error);
        }
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

  // toggleProfileButtons = () => {
  //   const doc = document.getElementById("profile-btns");
  //   const addEventShown = this.state.showAddEvent;
  //   const updateEventShown = this.state.showUpdateEvent;
  //   if (addEventShown || updateEventShown) {
  //     doc.style.display = "none";
  //   } else {
  //     doc.style.display = "flex";
  //   }
  // };

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



  renderProfileButtons = () => {
    return (
      <div id="profile-btns" className="row sticky-top text-center" style={{ backgroundColor: "white" }}>
        <div className="col-6 col-md-3 my-2 justify-content-center">
          <Button
            color="secondary"
            id="add-event-btn"
            text="ADD EVENTS"
            onClick={this.showAddEvent}
          />
        </div>
        <div className="col-6 col-md-3 my-2">
          <Button
            color="danger"
            id="delete-event-btn"
            text="DELETE EVENT"
            onClick={this.deleteEvent}
          />
        </div>
        <div className="col-6 col-md-3 my-2">
          <Button
            color="dark"
            id="events-history-btn"
            text="LOAD EVENTS"
            onClick={this.dispatchLoading}
          />
        </div>
        <div className="col-6 col-md-3 my-2">
          <Button
            color="primary text-white"
            id="update-event-btn"
            text="UPDATE EVENT"
            onClick={this.showUpdateEventForm}
          />
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Header text="PROFILE" type="dark" />
        {this.renderProfileButtons()}

        <div className="">
          {this.state.showHistory && (
            <EventsHistory
              userEvents={this.state.userEvents}
              handleOptionChange={this.handleOptionChange}
              selectedOption={this.state.selectedOption}
            />
          )}
          {this.state.showAddEvent && (
            <AddEventContainer
              userEvents={this.state.userEvents}
              dispatchLoading={this.dispatchLoading}
            />
            
          )}
          {this.state.showUpdateEvent && (
            <UpdateEvent
              event={this.state.selectedEvent}
              id={this.state.selectedOption}
              dispatchLoading={this.dispatchLoading}
            />
          )}
        </div>
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
