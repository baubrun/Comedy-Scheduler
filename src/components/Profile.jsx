import React, { Component } from "react";
import { connect } from "react-redux";
import EventsHistory from "./EventsHistory";
import { getEventsAction } from "../actions/actions";
import Host from "./Host";



class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showHistory: false,
      showAddEventForm: false,
      userEvents: null,
      selectedEvent: null
    };
  }

  getEventsHistory = events => {
    this.props.getEventsHistory(events);
  };

  getUserEvents = () => {
    return this.props.events
      .filter(
        event =>
          event.hostId
            .toLowerCase()
            .indexOf(this.props.hostId.toLowerCase()) !== -1
      )
      .map(
        event => Object.assign(event, { isChecked: false })
      );
  };

  showEventHistory = async () => {
    const response = await fetch("/profile");
    const body = await response.text();
    const parser = JSON.parse(body);
    this.getEventsHistory(parser);
    this.setState({
      showHistory: true,
      showAddEvent: false,
      userEvents: this.getUserEvents()
    });
  };

  changeCheckState = (id, events) => {
    const ans = events.find(evt => evt._id === id);
    ans.isChecked = !ans.isChecked;
    return ans;
  };
  

  handleCheckedInput = event => {
    const selValue = event.target.value;
    const events = this.state.userEvents;
    this.setState({
      selectedEvent: this.changeCheckState(selValue, events)
    });
  };

  getCheckedEvents = () => {
    const checked = this.state.userEvents.filter(
      event => event.isChecked === true
    ).map(e => e._id)
    return checked
  };

  deleteEvent = async () => {
    // window.confirm("Delete event(s) ?")
    // this.getCheckedEvents();

    const data = new FormData();
    data.append("ids", this.getCheckedEvents());
    const response = await fetch("/delete", { method: "POST", body: data });
    const body = await response.text();
    const parser = JSON.parse(body);
    if (parser.success) {
      this.showEventHistory()
  };
  }

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
              <div onClick={this.deleteEvent} id="delete-event-btn">
                Delete Event
              </div>
            </li>
            <li>
              <div id="update-event-btn">Update Event</div>
            </li>
          </ul>
        </div>
        <div className="profile-body">
          {this.state.showHistory && (
            <EventsHistory
              handleCheckedInput={this.handleCheckedInput}
              userEvents={this.state.userEvents}
              hostId={this.props.hostId}
            />
          )}
          {this.state.showAddEvent && <Host />}
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
    getEventsHistory: events => dispatch(getEventsAction(events))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
// export default connect(mapStateToProps)(Profile);
