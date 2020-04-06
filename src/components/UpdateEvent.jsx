import React, { Component } from "react";

class UpdateEvent extends Component {
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
      hostId: "",
      id: ""
    };
  }

  componentDidMount() {
    console.log("update mount");
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
      hostId
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
      hostId
    });
    this.preFillVenueOption();
  }

  handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData();
    data.append("id", this.props.id);
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

    const delDup = new FormData()
    delDup.append("delDup", true)

    await Promise.all([
      fetch("/setVenueSeating", { method: "POST", body: data }),
      fetch("/updateEvent", { method: "POST", body: data }),
    ]);
      fetch("/delOriginalImg")

    this.props.fetchEvents()
  };

  handleImage = event => {
    this.setState({ image: event.target.files[0] });
  };

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

  preFillVenueOption = () => {
    const docOption = document.getElementById(this.props.event.venue);
    docOption.selected = true;
  };

  render() {
    return (
      <>
        <div className="update-event-header">
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
                <button type="submit">Submit</button>
              </li>
            </ul>
          </form>
        </div>
      </>
    );
  }
}

export default UpdateEvent;
