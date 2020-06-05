import React, { Component } from "react";
import { connect } from "react-redux";
import { logInAction } from "../../actions/actions";
import { FormInput } from "../FormInput";
import { Button } from "../Button";
import { Header } from "../Header";
import "./Login.css";

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
    this.props.history.push("/register");
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

    const response = await fetch("/login", 
    { method: "POST", body: data });
    const body = await response.text();
    const parser = JSON.parse(body);

    if (parser.success) {
      this.dispatchLogin(parser.hostId);
      this.props.history.push("/profile");
      return;
    }
    if (Array.isArray(parser)) {
      this.setState({ errors: parser });
      return;
    }
  };

  handleCloseErrors = () => {
    this.setState({ errors: [] });
  };

  render() {
    return (
      <div id="login-page" className="">
        <Header text="" type="secondary" />

        <div className="container my-5 ">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <form onSubmit={this.handleSubmit}>
               

                <div id="login-card" className="card border-primary border-0 mt-5">
                  <div className="card-header p-0">
                    <div className="bg-primary text-white text-center py-2">
                      <h3>
                      <i className="fas fa-user-circle fa-2x"></i> Login
                      </h3>
                    </div>
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
                      <Button color="primary btn-block rounded-0" text="login" type="submit"/>
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

