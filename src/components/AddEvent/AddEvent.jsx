import React from "react";
import PropTypes from "prop-types";

const AddEvent = ({ dispatchLoading, handleVenueChange }) => {
  return (
    <>
      <div className="add-event-header">
        <h2 className="show-events-addPage" 
        onClick={dispatchLoading}>
          LOAD EVENTS
        </h2>
        <h2>ADD EVENTS</h2>
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
