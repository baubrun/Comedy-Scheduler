import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
  cancel = () => {};

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="modal" onClick={this.handleSubmit}>

        <form className="modal-content animate">
        <div className="home-header">
          <div className="home-title">
            <h1>BIENVENUE TO THE COMEDY HUB</h1>
            <h3>Please register to host events.</h3>
          </div>
        </div>

          <div className="modal-img-container">
            <div className="close"></div>
            <div>
              <img className="user-icon" src="user_icon_gros.png" alt=""></img>
            </div>
          </div>
          <div className="container">
            <label htmlFor="username">
              <b>Username</b>
            </label>
            <input type="text" placeholder="Username" name="username" />

            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input type="password" placeholder="Password" name="password" />
            <button type="submit">Register</button>
            <div className="cancel-btn">
              <Link  id="cancel-btn" to="/" >Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
