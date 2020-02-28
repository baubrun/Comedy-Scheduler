import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    return (
      <div>
        <div className="profile-header">
          <h1>PROFILE</h1>
          <ul className="profile-buttons">
            <li id="add-event-btn">
              <Link to="/host">Add Event</Link>
            </li>
            <li id="delete-event-btn">
              <Link to="#">Delete Event</Link>
            </li>
            <li id="update-event-btn">
              <Link to="#">Update Event</Link>
            </li>
          </ul>
          <div className="add-event-container"></div>
        </div>
        <div className="profile-body">render user events here</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hostId: state.auth.hostId
  };
};

export default connect(mapStateToProps)(Profile);
