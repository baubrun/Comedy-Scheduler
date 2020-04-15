import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <div className="home-header">
          <div className="venues">
            <div>
              <h1>LE FOU FOU</h1>{" "}
            </div>
            <div>
              <h1>RIRE NOW</h1>
            </div>
            <div>
              <h1>JOKES BLAGUES</h1>
            </div>
          </div>
        </div>
        <div className="home-body">
          <img src="club-2.jpg" alt="" />
          <Link className="home-events btn" to="/events">
            <div>
              <h1>EVENTS</h1>
            </div>
          </Link>
          <div className="break"></div>
          <Link className="home-add btn" to="/login">
            <div>
              <h1>ADD EVENT</h1>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
