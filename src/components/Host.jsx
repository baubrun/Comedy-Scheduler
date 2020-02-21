import React, { Component } from "react";

class Host extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      date: "",
      start: null,
      end: null,
      location: "",
      performer: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData();
    data.append("title", this.state.title);
    data.append("date", this.state.date);
    data.append("start", this.state.start);
    data.append("end", this.state.end);
    data.append("location", this.state.location);
    data.append("performer", this.state.performer);
    this.setState({
      title: "",
      date: "",
      start: "",
      end: "",
      location: "",
      performer: ""
    });
    await fetch("/host", { method: "POST", body: data });
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="modal">
        {/* <div className="host-header"></div> */}
        <div className="modal-content animate">
          <div className="">
            <form className="event-form" onSubmit={this.handleSubmit}>
              <ul>
                <li>
                  <label htmlFor="title">Title(optional)</label>
                  <input
                    id="title"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.title}
                    name="title"
                  />
                </li>
                {/* <li>
                  <label htmlFor="date">Date</label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    onChange={this.handleChange}
                    value={this.state.date}
                  />
                </li> */}
                <li>
                  <label htmlFor="start">Start time</label>
                  <input
                    id="start"
                    type="time"
                    min="20:00"
                    max="23:59"
                    name="start"
                    onChange={this.handleChange}
                    value={this.state.time}
                  />
                </li>
                <li>
                  <label htmlFor="end">End time</label>
                  <input
                    id="end"
                    type="time"
                    min="20:00"
                    max="23:59"
                    name="end"
                    onChange={this.handleChange}
                    value={this.state.time}
                  />
                </li>
                <li>
                  <label htmlFor="location">Location</label>
                  <select id="location" name="location" onChange={this.handleChange}>
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
                  />
                </li>
                {/* <li>
                  <label htmlFor="seatsAvailable">Seats Available</label>
                  <input id="seatsAvailable" type="number" />
                </li> */}
              </ul>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Host;
