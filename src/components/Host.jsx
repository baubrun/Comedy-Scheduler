import React, { Component } from "react";

class Host extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //     title: "",
      //     start: null,
      //     end: null,
      //     location: "",
      //     performer: "",
      //     hostId: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.props.handleSelect();

    // event.preventDefault();
    // const data = new FormData();
    // data.append("title", this.state.title);
    // // data.append("date", this.state.date);
    // data.append("start", this.props.start);
    // data.append("end", this.props.end);
    // data.append("location", this.state.location);
    // data.append("performer", this.state.performer);
    // this.setState({
    //   title: "",
    //   date: "",
    //   start: "",
    //   end: "",
    //   location: "",
    //   performer: ""
    // });
    // await fetch("/host", { method: "POST", body: data });
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };
  /* input not needed as start and end will be onSelect */
  render() {
    return (
      <>
        <div className="host-header">
            <h2>Add an event</h2>
        </div>
        <div className="host body">
          <div className="">
            <form className="host-form"  onSubmit={this.handleSubmit}>
              <ul>
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
                  <input
                    id="start"
                    type="time"
                    min="20:00"
                    max="23:59"
                    name="start"
                    // onChange={this.handleChange}
                    value={this.props.start}
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
                    // onChange={this.handleChange}
                    value={this.props.end}
                  />
                </li>
                <li>
                  <label htmlFor="location">Location</label>
                  <select
                    id="location"
                    name="location"
                    onChange={this.handleChange}
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
                  />
                </li>
                <li>
                  <label htmlFor="price">Price</label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    onChange={this.handleChange}
                  />
                </li>
                <li>
                  <label htmlFor="seats">Seats</label>
                  <input
                    id="seats"
                    type="number"
                    name="seats"
                    onChange={this.handleChange}
                  />
                </li>
                <li>
                  <label htmlFor="image">Image</label>
                  <input
                    id="image"
                    type="file"
                    name="image"
                    onChange={this.handleChange}
                  />
                </li>
              </ul>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Host;
