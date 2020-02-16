import React, { Component } from "react";
import { Link } from "react-router-dom";
import Register from "./Register";

class Login extends Component {
  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="modal" onClick={this.handleSubmit}>
        {this.props.loginModal && (
          <form className="modal-content animate">
            <div className="modal-img-container">
              <div className="close" onClick={this.props.toggleLogin}>
                &times;
              </div>
              <div>
                <img
                  className="user-icon"
                  src="user_icon_gros.png"
                  alt=""
                ></img>
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
              <button type="submit">Login</button>
              <div className="register-btn">
                <Link id="register-btn" to="/register">
                  Not registered? Register here!
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
