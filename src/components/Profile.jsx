import React, { Component } from "react";
import Dropdown from "./Dropdown";

class Profile extends Component {
  render() {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <div><Dropdown /></div>

          <h1>PROFILE</h1>
        </div>
        <div className="profile-body"></div>
      </div>
    );
  }
}

export default Profile;
