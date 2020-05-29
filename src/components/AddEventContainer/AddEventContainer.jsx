import React, { Component } from "react";
import { connect } from "react-redux";
import { getSeatsAvailAction } from "../../actions/actions";
import {CalendarView} from "../CalendarView";
import {AddEvent} from "../AddEvent";

const DEFAULT_STATE = {
  title: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  venue: "",
  performer: "",
  image: "",
  price: "",
};

class AddEventContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...DEFAULT_STATE,
      hostId: this.props.hostId,
      noVenues: false,
      calendarViewShow: false,
      listViewShow: true,
      userEvents: this.props.userEvents,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.venue !== this.state.venue) {
      this.eventsByVenueHostId();
    }
  }

  // dispatchLoading = () => {
  //   this.props.loadData();
  // };

  eventsByVenueHostId = () => {
    const filter = {
      hostId: this.props.hostId,
      venue: this.state.venue,
    };
    const userEvents = this.props.userEvents.filter((item) => {
      for (const key in filter) {
        if (item[key] !== filter[key] || !item[key]) return false;
      }
      return true;
    });
    this.setState({ userEvents: userEvents });
  };

  dispatchGetSeatsAvail = (seats) => {
    this.props.getSeatsAvail(seats);
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("title", this.state.title);
    data.append("startDate", this.state.startDate);
    data.append("startTime", this.state.startTime);
    data.append("endDate", this.state.endDate);
    data.append("endTime", this.state.endTime);
    data.append("venue", this.state.venue);
    data.append("performer", this.state.performer);
    data.append("image", this.state.image);
    data.append("price", this.state.price);
    data.append("hostId", this.state.hostId);
    this.setState({
      DEFAULT_STATE,
    });
  };

  handleEndTime = (event) => {
    this.setState({ endTime: event.target.value });
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleImage = (event) => {
    this.setState({ image: event.target.files[0] });
  };

  handleVenueChange = (event) => {
    this.setState({ venue: event.target.value });
  };

  resetOptionInputFields = () => {
    const docFile = document.getElementById("upload");
    docFile.value = "";
    const docOption = document.getElementsByClassName("default-option");
    docOption.selected = true;
  };

  toggleCalendarView = () => {
    this.setState({
      calendarViewShow: true,
      listViewShow: false,
    });
  };

  render() {
    return (
      <>
        <div className="add-event-body">
          <AddEvent
            dispatchLoading={this.props.dispatchLoading}
            handleVenueChange={this.handleVenueChange}
          />
        </div>
        <div className="add-event-body">
          <CalendarView
            selectedVenue={this.state.venue}
            events={this.state.userEvents}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    hostId: state.auth.hostId,
    seatsAvail: state.seatsAvail.venue,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSeatsAvail: (seats) => dispatch(getSeatsAvailAction(seats)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEventContainer);
