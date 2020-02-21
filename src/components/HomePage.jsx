import React, { Component } from "react";
import EventCalendar from "./ReserveCalendar";
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
            <div className="reserve-btn">
              <Link id="reserve-btn" to="/reserve">TICKETS</Link>
            </div>
            <div className="host-btn" >
            <Link 
            id="host-btn" 
            to="/login">HOST AN EVENT</Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;
