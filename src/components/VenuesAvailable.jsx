import React, { Component } from "react";

export class VenuesAvailable extends Component {
  render() {
    return (
      <div>
        <ul className="venues-avail">
          <li>Venues available: </li>
          {this.props.findAvailVenues() === "NONE"
            ? "NONE"
            : this.props
                .findAvailVenues()
                .map((venueFound, idx) => (
                  <li key={idx}>{venueFound.split("_").join(" ")}</li>
                ))}
        </ul>
      </div>
    );
  }
}

// export default VenuesAvailable;
