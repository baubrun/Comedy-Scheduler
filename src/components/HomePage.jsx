import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomePage extends Component {

  render() {
    return (
      <div className="home">
        <div className="home-header">
          <div className="venues">
            <div>Le Fou Fou</div>
            <div>Rire Now</div>
            <div>Jokes Blagues</div>
          </div>
        </div>
        <div className="home-body">
          <img src="club-2.jpg" alt=""/>
          <div className="portal-links">
            <Link className="events-btn" id="events-btn" to="/events">
              EVENTS
            </Link>
            <Link  className="add-event-btn" id="add-event-btn" to="/login">
              ADD EVENT
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
