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
      date: "",
      start: "",
      end: "",
      venue: "",
      performer: "",
      hostId: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    // this.props.handleSelect();

    event.preventDefault();
    const data = new FormData();
    data.append("title", this.state.title);
    data.append("date", this.state.date);
    data.append("start", this.state.start);
    data.append("end", this.state.end);
    data.append("venue", this.state.venue);
    data.append("performer", this.state.performer);
    data.append("price", this.state.price);
    this.setState({
      title: "",
      date: "",
      start: "",
      end: "",
      venue: "",
      performer: "",
      price: ""
    });
    await fetch("/host", { method: "POST", body: data });
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleVenueChange = event => {
    this.setState({ venue: event.target.value });
  };

  handleStartChange = event => {
    this.setState({ start: event.target.value });
  };
  handleEndChange = event => {
    this.setState({ end: event.target.value });
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
                  onChange={this.handleChange}
                  value={this.state.title}
                  name="title"
                />
              </li>
              <li>
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  onChange={this.handleChange}
                  value={this.state.date}
                />
              </li>
              <li>
                <label htmlFor="start">Start time</label>
                <select id="start" onChange={this.handleStartChange}>
                <option value=""></option>
                  {timeSelector().map((t, idx) => {
                    return <option key={idx} value={t}>{t}</option>;
                  })}
                </select>
              </li>
              <li>
                <label htmlFor="end">End time</label>
                <select id="end" onChange={this.handleEndChange}>
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
                  value={this.state.price || ""}
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
                <label htmlFor="image">Image</label>
                <input
                  id="image"
                  type="file"
                  name="image"
                  onChange={this.handleChange}
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
