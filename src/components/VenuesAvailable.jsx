import React, { Component } from "react";

export class VenuesAvailable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      venues: ""
    };
  }

  componentDidMount() {
    this.setState({ venues: this.props.seatsAvail });
  }

  render() {
    /* think of putting this func on parent 
    to be able to pass it to this child for select option of from */
    const findAvailVenues = () => {
      const allVenues = ["LE FOU FOU", "JOKES BLAGUES", "RIRE NOW"].map(v => (
        <li>{v}</li>
      ));
      if (!this.props.seatsAvail) return allVenues;

      const ans = Object.keys(this.state.venues)
        .filter(venue => {
          return venue.indexOf(Object.keys(this.props.seatsAvail)) === -1;
        })
        .map(venueFound => <li>{venueFound.split("_").join(" ")}</li>);
      return ans.length >= 3 ? allVenues : ans;
    };

    return (
      <div>
        <ul className="venues-avail">
          <li>Venues available: </li>
          {findAvailVenues()}
        </ul>
      </div>
    );
  }
}

export default VenuesAvailable;
