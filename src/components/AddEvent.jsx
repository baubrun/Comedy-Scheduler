import React, { Component } from "react";
import { connect } from "react-redux";
import { VenuesAvailable } from "./VenuesAvailable";
import {
  getSeatsAvailAction,
  getAllSeatsAvailAction
} from "../actions/actions";
import CalendarView from "./CalendarView";
import moment from "moment";



const DateTimeFormatter = (date, time) => {
  return moment(`${date} ${time}`).format()

}



const venueNames = ["LE FOU FOU", "JOKES BLAGUES", "RIRE NOW"];

const calcOverlappedEvents = (start, end, newStart) => {
  const a = parseInt(start.split(":").join(""));
  const b = parseInt(end.split(":").join(""));
  const c = parseInt(newStart.split(":").join(""));
  return c > a && c < b;
};

const timeSelector = () => {
  let selectTimes = [];
  let hour = 20;
  let min = 45;
  while (hour < 24) {
    for (let i = 0; i < 3; i++) {
      min += 15;
      let time = `${hour}:${min}`;
      if (min === 60) {
        hour += 1;
        min = 0;
        time = `${hour}:0${min}`;
      }
      if (hour === 24 && min === 0) {
        hour = 0;
        min = 0;
        time = `0${hour}:0${min}`;
      }
      selectTimes.push(time);
      if (hour === 1) {
        return selectTimes;
      }
    }
  }
};

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
      defaultVenues: [],
      noVenues: false,
      calendarViewShow: false,
      listViewShow: true,

    };
  }

  componentDidMount() {
    this.setState({ defaultVenues: Object.keys(this.props.seatsAvail) });
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.startDate !== this.state.startDate) {
    //   this.fetchAvailVenue();
    // }
    // if (prevState.startTime !== this.state.startTime) {
    //   this.fetchOverlapped();
    // }
  }

  dispatchGetSeatsAvail = seats => {
    this.props.getSeatsAvail(seats);
  };

  dispatchGetAllSeatsAvail = () => {
    this.props.getAllSeatsAvail();
  };

  fetchAvailVenue = async () => {
    const data = new FormData();
    data.append("startDate", this.state.startDate);
    const response = await fetch("/getSeatsAvail", {
      method: "POST",
      body: data
    });
    const body = await response.text();
    const parser = JSON.parse(body);
    if (parser.success) {
      this.dispatchGetSeatsAvail(parser.result.venue);
    } else {
      this.dispatchGetSeatsAvail();
    }
  };

  fetchOverlapped = async () => {
    const data = new FormData();
    data.append("startDate", this.state.startDate);
    data.append("venue", this.state.venue);
    // data.append("endTime", this.state.endTime);
    const response = await fetch("/slotsTaken", {
      method: "POST",
      body: data
    });
    const body = await response.text();
    const parser = JSON.parse(body);
    if (parser.success) {
      // const start = parser.result.startTime
      // const end = parser.result.endTime
      // const expectedStart = this.state.startTime
      // const ole = calcOverlappedEvents(
      //   start,
      //   end,
      //   expectedStart
      // )
      // console.log('ole :', ole);
      console.log("result", parser.result);
    }
  };

  findAvailVenues = () => {
    const defaultVenues = this.state.defaultVenues;
    if (!this.props.seatsAvail) return defaultVenues;
    const selectedVenues = Object.keys(this.props.seatsAvail);
    const availVenues = defaultVenues.filter(v => !selectedVenues.includes(v));
    // console.log("availVenues :", availVenues);
    return availVenues.length < 1 ? "NONE" : availVenues;
  };


  formattedEvents = () => {
    // console.log('this.props.events :', this.props.events);

    const filterEventProps = this.props.events.map(event => {
      console.log("DateTimeFormatter", DateTimeFormatter(event.startDate, event.startTime))
      console.log("DateTimeFormatter", DateTimeFormatter(event.endDate, event.endTime))
      return {
        // works for non overnight events
        title: event.title,
        start: new Date(DateTimeFormatter(event.startDate, event.startTime)),
        end: new Date(DateTimeFormatter(event.endDate, event.endTime)),
      };
    });
    console.log('filterEventProps :', filterEventProps);
    return filterEventProps
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

    await Promise.all([
      fetch("/profile", { method: "POST", body: data }),
      fetch("/setVenueSeating", { method: "POST", body: data })
    ]).catch(err => console.log(err));

    this.resetOptionInputFields();
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

  handleStartDate = event => {
    this.setState({ startDate: event.target.value });
  };

  handleStartTime = event => {
    this.setState({ startTime: event.target.value });
  };

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

          <div className="add-events-header-img">
            <img
              id="list-view"
              onClick={this.toggleListView}
              src="list-view-30px.png"
              alt=""
            />
            <img
              id="calendar-view"
              onClick={this.toggleCalendarView}
              src="calendar2-view-30px.png"
              alt=""
            />
          </div>
          {this.state.calendarViewShow && (
          <CalendarView 
          events={this.props.userEvents}
          />
          
          )}

          {/* <form
            className="add-event-flex-container"
            onSubmit={this.handleSubmit}
          >
            <ul className="add-event-form-container">
              <li>
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  onChange={this.handleChange}
                  value={this.state.title}
                />
              </li>
              <li>
                <label htmlFor="start-date">Start date</label>
                <input
                  id="start-date"
                  type="date"
                  name="startDate"
                  onChange={this.handleStartDate}
                  value={this.state.startDate}
                />
              </li>
              <li>
                <label htmlFor="start-time">Start time</label>
                <select id="start-time" onChange={this.handleStartTime}>
                  <option className="default-option" value=""></option>
                  {timeSelector().map((time, idx) => {
                    return (
                      <option key={idx} value={time}>
                        {time}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li>
                <label htmlFor="end-date">End date</label>
                <input
                  id="end-date"
                  type="date"
                  name="endDate"
                  onChange={this.handleChange}
                  value={this.state.endDate}
                />
              </li>

              <li>
                <label htmlFor="end-time">End time</label>
                <select id="end-time" onChange={this.handleEndTime}>
                  <option className="default-option" value=""></option>
                  {timeSelector().map((time, idx) => {
                    return (
                      <option key={idx} value={time}>
                        {time}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li>
                <label htmlFor="venue">Venue</label>
                <select
                  id="venue"
                  name="venue"
                  onChange={this.handleVenueChange}
                >
                  <option className="default-option" value=""></option>
                  {this.findAvailVenues() === "NONE" ? (
                    <option value=""></option>
                  ) : (
                    this.findAvailVenues().map(v => (
                      <option value={v}>{v.split("_").join(" ")}</option>
                    ))
                  )}
                </select>
              </li>
              <li>
                <label htmlFor="performer">Performer</label>
                <input
                  id="performer"
                  type="text"
                  name="performer"
                  onChange={this.handleChange}
                  value={this.state.performer}
                />
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  onChange={this.handleChange}
                  value={this.state.price}
                />
              </li>
              <li>
                <label htmlFor="upload">Image</label>
                <input
                  id="upload"
                  type="file"
                  name="image"
                  onChange={this.handleImage}
                />
              </li>
              <li>
                <button id="add-submit-btn" type="submit">
                  Submit
                </button>
              </li>
            </ul>
          </form> */}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    hostId: state.auth.hostId,
    seatsAvail: state.seatsAvail.venue
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSeatsAvail: seats => dispatch(getSeatsAvailAction(seats)),
    getAllSeatsAvail: () => dispatch(getAllSeatsAvailAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
