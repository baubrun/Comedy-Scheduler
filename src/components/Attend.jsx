import React, { Component } from "react";
import { Link } from "react-router-dom";

class Attend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      venue: ""
    };
  }

  handleVenueChange = event => {
    this.setState({ venue: event.target.value });
  };

  render() {
    return (
      <>
        <div className="attend-header">
          <div className="attend-title">
            <h1>{this.state.venue ? this.state.venue : "CHOOSE A VENUE"}</h1>
          </div>
          <div className="venue-select">
            <h2>VENUE</h2>
            <select onChange={this.handleVenueChange} name="venue">
              <option value=""></option>
              <option value="LE FOU FOU">LE FOU FOU</option>
              <option value="JOKES BLAGUES">JOKES BLAGUES</option>
              <option value="RIRE NOW">RIRE NOW</option>
            </select>
          </div>
          <div className="user-icon">
            <Link to="/login">
              <img src="user-icon.png" alt="" />
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default Attend;
