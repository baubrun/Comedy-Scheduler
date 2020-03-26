import React, { Component } from "react";
import { connect } from "react-redux";
import { logInAction } from "../actions/actions";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  dispatchLogin = hostId => {
    this.props.loginUser(hostId);
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleRegister = () => {
    this.props.history.push("/register");
  };

  handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    this.setState({
      username: "",
      password: ""
    });
    const response = await fetch("/login", { method: "POST", body: data });
    const body = await response.text();
    const parser = JSON.parse(body);
    if (parser.success) {
      this.dispatchLogin(parser.hostId);
      this.props.history.push("/profile");
    }
  };

  render() {
    return (
      <div className="modal login">
       {/* <div className="login-form">  */}
        <form className="modal-content animate" onSubmit={this.handleSubmit}>
        {/* <form className="login-flex-container" onSubmit={this.handleSubmit}> */}
          {/* <div className="login-form-container"> */}
          <div className="modal-img-container">
          {/* <div className="login-form-img"> */}
            <div>
              <img className="user-icon" src="user_icon_gros.png" alt=""></img>
            </div>
          </div>
          <div className="container">
          {/* <div  className="login-form-fields" > */}
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
            <button className="login-btn" type="submit">
              Login
            </button>
            <button
              className="not-registered-btn"
              type="submit"
              onClick={this.handleRegister}
            >
              Not registered? Register here!
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: hostId => dispatch(logInAction(hostId))
  };
};

export default connect(null, mapDispatchToProps)(Login);
