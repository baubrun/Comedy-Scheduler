import React from "react";
import PropTypes from "prop-types";
import {Header} from "../Header"

const AddEvent = ({ dispatchLoading, handleVenueChange }) => {
  // const del = document.getElementById("delete-event-btn")
  // const upt = document.getElementById("update-event-btn")
  // const add = document.getElementById("add-event-btn")
  // const hideButtons = () => {
  //   add.disabled = true
  //   del.disabled = true
  //   upt.disabled = true
  // }
  
  return (
    <>
    {/* {hideButtons()} */}
      <div className="add-event-header">
        {/* <h2 className="show-events-addPage" 
        onClick={dispatchLoading}>
          LOAD EVENTS
        </h2> */}
        <Header type="secondary" text="ADD EVENTS" />
      </div>
      <div className="add-event-body">
        <div className="venue-select">
          <select onChange={handleVenueChange} name="venue">
            <option value="">SELECT A VENUE</option>
            <option value="LE_FOU_FOU">LE FOU FOU</option>
            <option value="JOKES_BLAGUES">JOKES BLAGUES</option>
            <option value="RIRE_NOW">RIRE NOW</option>
          </select>
        </div>
      </div>

    </>
  );
};

AddEvent.propTypes = {
  dispatchLoading: PropTypes.func,
  handleVenueChange: PropTypes.func,
};

export default AddEvent;
