import React, { Component } from "react";
import { connect } from "react-redux";
import { logInAction } from "../../actions/actions";
import { FormInput } from "../FormInput";
import { Button } from "../Button";
import "./Login.css";
import { Link } from "react-router-dom";
import { dataRequestPost, goToEndpoint } from "../../api";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
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

  handleRegister = () => {
    goToEndpoint("/register", this.props) 
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    this.setState({
      username: "",
      password: "",
    });

    const lg = await dataRequestPost("/login", data)
    if (lg.success) {
      this.dispatchLogin(lg.hostId);
      goToEndpoint("/profile", this.props)
      return;
    }else {
      this.setState({ errors: lg });
      return;
    }
  };

  handleCloseErrors = () => {
    this.setState({ errors: [] });
  };

  render() {
    return (
      <div id="login-page" className="">

        <div className="container my-5 ">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <form onSubmit={this.handleSubmit}>
                <div
                  id="login-card"
                  className="card border-primary border-0 mt-5"
                >
                  <div className="card-header p-0">
                    <div className="bg-primary text-white text-center py-2">
                      <h3>
                        <i className="fas fa-user-circle fa-2x"></i> Login
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

                  <div className="card-body border-primary p-3">
                    <div className="form-group">
                      <div className="input-group mb-2 p">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fa fa-user text-primary"></i>
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
                            <i className="fa fa-key text-primary"></i>
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

                    <div className="text-center">
                      <Button
                        color="primary btn-block rounded-0"
                        text="login"
                        type="submit"
                      />
                    </div>
                    <div>
                      <Link className="text-white font-weight-bold" to="/register">
                        Register Here.
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (hostId) => dispatch(logInAction(hostId)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
