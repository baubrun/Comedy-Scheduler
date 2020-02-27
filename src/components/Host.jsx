import React, { Component } from "react";



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

class Host extends Component {
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
      hostId: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    // this.props.handleSelect();

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
    this.setState({
      title: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      venue: "",
      performer: "",
      price: "",
      hostId: ""
    });
    await fetch("/host", { method: "POST", body: data });
  };


  handleImage = event => {
    this.setState({image: event.target.files[0]})
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleVenueChange = event => {
    this.setState({ venue: event.target.value });
  };

  handleStartTime = event => {
    this.setState({ startTime: event.target.value });
  };
  handleEndTime = event => {
    this.setState({ endTime: event.target.value });
  };


  /* input not needed as start and end will be onSelect */
  render() {
    return (
      <>
        <div className="host-header">
          <h2>Add an event</h2>
        </div>
        <div className="host body">
          <form className="host-flex-container" onSubmit={this.handleSubmit}>
            <ul className="host-form-container">
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
                <label htmlFor="start-time">Start time</label>
                <select id="start-time" onChange={this.handleStartTime}>
                <option value=""></option>
                  {timeSelector().map((t, idx) => {
                    return <option key={idx} value={t}>{t}</option>;
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
                <option value=""></option>
                  {timeSelector().map((t, idx) => {
                    return <option key={idx} value={t}>{t}</option>;
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
                  <option value=""></option>
                  <option value="LE FOU FOU">LE FOU FOU</option>
                  <option value="JOKES BLAGUES">JOKES BLAGUES</option>
                  <option value="RIRE NOW">RIRE NOW</option>
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
              {/* <li>
                <label htmlFor="seats">Seats</label>
                <input
                  id="seats"
                  type="number"
                  name="seats"
                  onChange={this.handleChange}
                />
              </li> */}
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
                <button type="submit">Submit</button>
              </li>
            </ul>
          </form>
        </div>
      </>
    );
  }
}

export default Host;
