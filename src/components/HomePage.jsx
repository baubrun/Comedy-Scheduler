import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomePage extends Component {

  render() {
    return (
      <>
        <div className="home-header">
          <div className="venues">
            <div>Le Fou Fou</div>
            <div>Rire Now</div>
            <div>Jokes Blagues</div>
          </div>
        </div>
        <div className="home-body">
          <div className="portal-links">
            <Link className="reserve-btn" id="reserve-btn" to="/events">
              EVENTS
            </Link>

            <Link  className="add-event-btn" id="add-event-btn" to="/login">
              ADD EVENT
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;
