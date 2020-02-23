import React, { Component } from "react";
import ReserveCalendar from "./ReserveCalendar"

class CalendarView extends Component {
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
        <div className="calendar-header">
        </div>
        <div>
            <ReserveCalendar />
          </div>
      </>
    );
  }
}

export default CalendarView;
