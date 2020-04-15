import React, { Component } from "react";

const validTime = (start, end) => {
  const [h1, m1] = start.split(":");
  const [h2, m2] = end.split(":");
  const givenStart = new Date(0, 0, 0, h1, m1, 0);
  const givenEnd = new Date(0, 0, 0, h2, m2, 0);
  return givenStart < givenEnd || givenStart === givenEnd ? true : false;
};

const validTimeFormat = (start, end) => {
  // const time = validTime(start, end);
  const regex = RegExp(/([0-1]?\d|2[0-3]):[0-5]\d$/);
  const startFormat = regex.test(start);
  const endFormat = regex.test(end);
  // return startFormat && endFormat && time ? true : false;
  return startFormat && endFormat  ? true : false;
};

const minutesToTenDigits = (min) => {
  if (min >= 0 && min < 10) {
    return `0${min}`;
  }
};

const timeToNumber = (time) => {
  const h = parseInt(time.split(":")[0]);
  const m = parseInt(time.split(":")[1]);
  return [h, m];
};

const timeFixed15 = (givenTime) => {
  console.log("givenTime :", givenTime);
  const [givenHour, givenMinute] = timeToNumber(givenTime);
  let hour = givenHour;
  let minute = 0;
  let time = [];
  if (givenMinute % 15 === 0) {
    time[0] = givenHour;
    const mins = minutesToTenDigits(givenMinute);
    time[1] = givenMinute === 0 ? mins : givenMinute;
    return time.join(":");
  }
  if (givenMinute > 0 && givenMinute < 15) {
    minute = 15;
  }
  if (givenMinute > 15 && givenMinute < 30) {
    minute = 30;
  }
  if (givenMinute > 30 && givenMinute < 45) {
    minute = 45;
  }
  if (givenMinute > 45) {
    minute = 0;
    hour += 1;
  }
  time[0] = hour;
  const mins = minutesToTenDigits(minute);
  time[1] = mins ? mins : minute;
  return time.join(":");
};

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
  hostId: "",
  id: "",
  facebook: "",
  instagram: "",
  twitter: "",
  errors: [],
};

class UpdateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = DEFAULT_STATE;
  }

  componentDidMount() {
    const {
      title,
      startDate,
      startTime,
      endDate,
      endTime,
      venue,
      performer,
      image,
      price,
      hostId,
      facebook,
      instagram,
      twitter,
    } = this.props.event;

    this.setState({
      id: this.props.id,
      title,
      startDate,
      startTime,
      endDate,
      endTime,
      venue,
      performer,
      image,
      price,
      hostId,
      facebook,
      instagram,
      twitter,
    });
    this.preFillVenueOption();
    fetch("/delOriginalImg", {method: "DELETE"})

  }

  handleCloseErrors = () => {
    this.setState({ errors: [] });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const vf = validTimeFormat(this.state.startTime, this.state.endTime);

    if (!vf) {
      return this.setState({ errors: ["Please enter a valid time."] });
    }

    const data = new FormData();
    data.append("id", this.props.id);
    data.append("title", this.state.title);
    data.append("startDate", this.state.startDate);
    data.append("startTime", timeFixed15(this.state.startTime));    
    data.append("endDate", this.state.endDate);
    data.append("endTime", timeFixed15(this.state.endTime));
    data.append("venue", this.state.venue);
    data.append("performer", this.state.performer);
    data.append("image", this.state.image);
    data.append("price", this.state.price);
    data.append("hostId", this.state.hostId);
    data.append("facebook", this.state.facebook);
    data.append("instagram", this.state.instagram);
    data.append("twitter", this.state.twitter);

    const delDup = new FormData();
    delDup.append("delDup", true);

    await Promise.all([
      fetch("/setVenueSeating", { method: "POST", body: data }),
      fetch("/updateEvent", { method: "POST", body: data }),
    ]).catch(err => err);


    this.props.dispatchLoading();
  };

  handleImage = (event) => {
    this.setState({ image: event.target.files[0] });
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleVenueChange = (event) => {
    this.setState({ venue: event.target.value });
  };

  handleStartTime = (event) => {
    this.setState({ startTime: event.target.value });
  };
  handleEndTime = (event) => {
    this.setState({ endTime: event.target.value });
  };

  preFillVenueOption = () => {
    const docOption = document.getElementById(this.props.event.venue);
    docOption.selected = true;
  };

  render() {
    return (
      <>
        <div className="update-event-header">
          {/* <h2 className="show-events-updatePage" onClick={this.props.fetchData}>
            LOAD EVENTS
          </h2> */}
          <h2>UPDATE EVENT</h2>
        </div>
        <div className="update-body">
          <form
            className="update-event-flex-container"
            onSubmit={this.handleSubmit}
          >
            <ul className="update-event-form-container">
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
                  onChange={this.handleChange}
                  value={this.state.startDate}
                />
              </li>
              <li>
                {this.state.errors.map((err, idx) => {
                  return (
                    <div key={idx} className="errors">
                      {err}
                      <span id="close-btn" onClick={this.handleCloseErrors}>
                        &times;
                      </span>
                    </div>
                  );
                })}
              </li>
              <li className="time-format">ex: HH:MM</li>
              <li>
                <label htmlFor="start-time">Start time</label>
                <input
                  id="start-time"
                  type="text"
                  value={this.state.startTime}
                  onChange={this.handleStartTime}
                  placeholder="HH:MM"
                />
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
              <li className="time-format">ex: HH:MM</li>
              <li>
                <label htmlFor="end-time">End time</label>
                <input
                  id="end-time"
                  type="text"
                  value={this.state.endTime}
                  onChange={this.handleEndTime}
                  placeholder="HH:MM"
                />
              </li>
              <li>
                <label htmlFor="venue">Venue</label>
                <select
                  id="venue"
                  name="venue"
                  onChange={this.handleVenueChange}
                >
                  <option value=""></option>
                  <option id="LE_FOU_FOU" value="LE_FOU_FOU">
                    LE FOU FOU
                  </option>
                  <option id="JOKES_BLAGUES" value="JOKES_BLAGUES">
                    JOKES BLAGUES
                  </option>
                  <option id="RIRE_NOW" value="RIRE_NOW">
                    RIRE NOW
                  </option>
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
                  defaultValue={10}
                />
              </li>
              <li>
                <label htmlFor="facebook">Facebook</label>
                <input
                  id="facebook"
                  name="facebook"
                  type="text"
                  value={this.state.facebook}
                  onChange={this.handleChange}
                />
              </li>
              <li>
                <label htmlFor="instagram">Instagram</label>
                <input
                  id="instagram"
                  name="instagram"
                  type="text"
                  value={this.state.instagram}
                  onChange={this.handleChange}
                />
              </li>
              <li>
                <label htmlFor="twitter">Twitter</label>
                <input
                  id="twitter"
                  name="twitter"
                  type="text"
                  value={this.state.twitter}
                  onChange={this.handleChange}
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
              <li className="update-btns">
                <button id="submit-update-btn" type="submit">
                  UPDATE
                </button>
                <button
                  id="cancel-update-btn"
                  onClick={this.props.dispatchLoading}
                  type="button"
                >
                  CANCEL
                </button>
              </li>
            </ul>
          </form>
        </div>
      </>
    );
  }
}

export default UpdateEvent;
