import React, { Component } from "react";
import { connect } from "react-redux";
// import { VenuesAvailable } from "./VenuesAvailable";
import {
  getSeatsAvailAction,
  getAllSeatsAvailAction
} from "../actions/actions";
import CalendarView from "./CalendarView";
import moment from "moment";

class AddEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      venue: "",
      performer: "",
      image: "",
      price: "",
      hostId: this.props.hostId,
      noVenues: false,
      calendarViewShow: false,
      listViewShow: true,
      userEvents: this.props.userEvents
    };
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.venue !== this.state.venue) {
      this.eventsByVenueHostId()
    }
  }



  eventsByVenueHostId = () => {
    const filter = {
      hostId: this.props.hostId,
      venue: this.state.venue
    };
    const userEvents = this.props.userEvents.filter(item => {
      for (const key in filter) {
        if (item[key] !== filter[key] || !item[key]) return false;
      }
      return true;
    });
    this.setState({userEvents: userEvents})
  };


  formatAddedEvents = (startStr, endStr) => {
    const [monthSt, dateSt, yearSt, timeSt] = startStr
      .toString()
      .split(" ")
      .slice(1, 5);
    const [monthEnd, dateEnd, yearEnd, timeEnd] = endStr
      .toString()
      .split(" ")
      .slice(1, 5);

    const regexTime = time =>
      time
        .split(/[d+:]/)
        .slice(0, 2)
        .join(":");
    const formatMonth = month =>
      moment()
        .month(month)
        .format("MM");
    this.setState({
      startDate: `${yearSt}-${formatMonth(monthSt)}-${dateSt}`,
      startTime: regexTime(timeSt),
      endDate: `${yearEnd}-${formatMonth(monthEnd)}-${dateEnd}`,
      endTime: regexTime(timeEnd)
    });
  };

  dispatchGetSeatsAvail = seats => {
    this.props.getSeatsAvail(seats);
  };

  dispatchGetAllSeatsAvail = () => {
    this.props.getAllSeatsAvail();
  };

  handleSubmit = async event => {
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
      title: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      venue: "",
      performer: "",
      price: ""
    });


    // await Promise.all([
    //   fetch("/setVenueSeating", { method: "POST", body: data }),
    //   fetch("/profile", { method: "POST", body: data }),
    // ]).catch(err => console.log(err));

    // this.resetOptionInputFields();
  };

  handleEndTime = event => {
    this.setState({ endTime: event.target.value });
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleImage = event => {
    this.setState({ image: event.target.files[0] });
  };

  // handleStartDate = event => {
  //   this.setState({ startDate: event.target.value });
  // };

  // handleStartTime = event => {
  //   this.setState({ startTime: event.target.value });
  // };

  handleVenueChange = event => {
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
      listViewShow: false
    });
  };

  // disableSubmit = () => {
  //   const submitBtn = document.getElementById("add-submit-btn")
  //   submitBtn.disabled = true

  // }

  render() {
    return (
      <>
        <div className="add-event-header">
          <h2>ADD EVENT</h2>
        </div>
        <div className="add-event-body">
          {/* <VenuesAvailable
            findAvailVenues={this.findAvailVenues}
            defaultVenues={this.state.defaultVenues}
          /> */}
          {/* {this.state.calendarViewShow && ( */}
            <div className="venue-select">
              <select onChange={this.handleVenueChange} name="venue">
                <option value="">SELECT A VENUE</option>
                <option value="LE_FOU_FOU">LE FOU FOU</option>
                <option value="JOKES_BLAGUES">JOKES BLAGUES</option>
                <option value="RIRE_NOW">RIRE NOW</option>
              </select>
            </div>
          {/* )} */}
          <div className="add-events-header-img">
            {/* <img
              id="calendar-view"
              onClick={this.toggleCalendarView}
              src="calendar2-view-30px.png"
              alt=""
            /> */}
          </div>
          <CalendarView 
          selectedVenue={this.state.venue}
          events={this.state.userEvents} 
          />

        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    hostId: state.auth.hostId,
    seatsAvail: state.seatsAvail.venue,
    // events: state.events
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSeatsAvail: seats => dispatch(getSeatsAvailAction(seats)),
    getAllSeatsAvail: () => dispatch(getAllSeatsAvailAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
