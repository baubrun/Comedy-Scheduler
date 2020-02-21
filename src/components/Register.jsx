import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      hostId: ""
    };
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append("email", this.state.email);
    data.append("hostId", this.state.hostId);
    this.setState({
      username: "",
      password: "",
      email: "",
      hostId: ""
    });
    const response = await fetch("/register", { method: "POST", body: data });
    const body = await response.text();
    const parser = JSON.parse(body);
    if (parser.success) {
      this.props.history.push("/profile");
    }
  };

  render() {
    return (
      <div className="modal">
        <form className="modal-content animate" onSubmit={this.handleSubmit}>
          <div className="home-header">
            <div className="home-title">
              <h1>BIENVENUE TO THE COMEDY HUB</h1>
              <h3>Please register to host events.</h3>
            </div>
          </div>
          <div className="modal-img-container">
            <div>
              <img className="user-icon" src="user_icon_gros.png" alt=""></img>
            </div>
          </div>
          <div className="container">
            <label htmlFor="username">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />

            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label htmlFor="host">
              <b>Enter your host name.</b>
            </label>
            <input
              id="host"
              type="text"
              name="hostId"              
              placeholder="Host Name"
              onChange={this.handleChange}
            />

            <button type="submit">Register</button>
            <div className="cancel-btn">
              <Link id="cancel-btn" to="/">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
