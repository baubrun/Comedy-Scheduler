import React from "react";
import { connect } from "react-redux";

export const SeatsAvailable = props => {
  return (
    <div >
      {/* {props.seatsAvail.forEach((s, idx) =>  */}
      {/* <ul key={idx} > */}
      <ul className="seats-avail">
        <li>Available: </li>
        <li>LE FOU FOU </li>
        <li>JOKES BLAGUES </li>
        <li>RIRE NOW </li>
        {/* <li>{s.venue["RIRE NOW"]}</li> */}
        {/* <li>{s.venue["LE FOU FOU"]}</li> */}
        {/* <li>{s.venue["RIRE NOW"]}</li> */}
      </ul>
      {/* )} */}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    seatsAvail: state.seatsAvail
  };
};

export default connect(mapStateToProps)(SeatsAvailable);
