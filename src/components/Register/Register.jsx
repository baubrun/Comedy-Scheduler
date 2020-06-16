import React, { Component } from "react";
import { connect } from "react-redux";
import { logInAction } from "../../actions/actions";
import { Header } from "../Header";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import { FormInput } from "../FormInput";
import { dataRequestPost, goToEndpoint } from "../../api";
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      hostId: "",
      errors: [],
    };
  }

  dispatchLogin = (hostId) => {
    this.props.loginUser(hostId);
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleCancel = () => {
    this.props.history.push("/");
  };

  handleSubmit = async (event) => {
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
      hostId: "",
    });

    const rg = dataRequestPost("/register", data)
    if (rg.success) {
      this.dispatchLogin(rg.hostId);
      goToEndpoint("/profile", this.props);
    }
    else {
      this.setState({ errors: rg.errors });
    }
  };

  handleCloseErrors = () => {
    this.setState({ errors: [] });
  };

  render() {
    return (
      <>
        <Header text="BIENVENUE TO THE COMEDY HUB" type="dark" />
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <form onSubmit={this.handleSubmit}>
                <div
                  id="login-card"
                  className="card border-secondary border-0 mt-5"
                >
                  <div className="card-header p-0">
                    <div className="bg-secondary text-white text-center py-2">
                      <h3>
                        <i className="fas fa-user-circle fa-2x"></i> Register
                      </h3>
                    </div>
                  </div>

                  <div onClick={this.handleCloseErrors} style={{cursor: "pointer"}}>
                      {this.state.errors.map((err, idx) => {
                          return (
                            <div className="bg-danger text-light text-center py-2" key={idx} id="errors">
                              {err.msg}
                            </div>)
                        })}
                  </div>


                  <div className="card-body border-secondary p-3">
                    <div className="form-group">
                      <div className="input-group mb-2 p">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fa fa-user text-secondary"></i>
                          </div>
                        </div>
                        <FormInput
                          name="username"
                          onChange={this.handleChange}
                          placeholder="Username"
                          type="text"
                          value={this.state.username}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fa fa-key text-secondary"></i>
                          </div>
                        </div>
                        <FormInput
                          name="password"
                          onChange={this.handleChange}
                          placeholder="Password"
                          type="text"
                          value={this.state.password}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fa fa-envelope text-secondary"></i>
                          </div>
                        </div>
                        <FormInput
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>

                    <label
                      className="text-white font-weight-bold my-2"
                      htmlFor="host"
                    >
                      Choose a host name
                    </label>

                    <div className="form-group">
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fa fa-portrait text-secondary"></i>
                          </div>
                        </div>
                        <FormInput
                          id="host"
                          type="text"
                          name="hostId"
                          placeholder="Host Name"
                          onChange={this.handleChange}
                          value={this.state.hostId}
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <Button
                        color="secondary btn-block rounded-0"
                        text="REGISTER"
                        type="submit"
                        onClick={this.handleSubmit}
                      />
                    </div>
                    <div>
                    <div className="text-center my-3">
                      <Button
                        color="danger btn-block rounded-0"
                        text="CANCEL"
                        type="submit"
                        onClick={this.handleCancel}
                      />
                    </div>
                    <Link
                        className="text-white font-weight-bold my-2"
                        to="/login"
                      >
                        Already registered? Login.
                      </Link>
                    </div>

                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (hostId) => dispatch(logInAction(hostId)),
  };
};

export default connect(null, mapDispatchToProps)(Register);
