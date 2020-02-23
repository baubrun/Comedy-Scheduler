import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCartAction } from "../actions/actions";

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: ""
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
    this.setState({
      username: "",
      password: "",
      email: "",
      hostId: ""
    });
    const response = await fetch("/checkout", { method: "POST", body: data });
    const body = await response.text();
    const parser = JSON.parse(body);
    if (parser.success) {
      this.props.history.push("/confirm");
      // }
    }
  };
  render() {
    return (
      <div >
        <form className="checkout-form" onSubmit={this.handleSubmit}>
          <ul className="form container">
            <li>
              <label htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </li>
            <li>
              <label htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                placeholder="lastName"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </li>
            <li>
              <label htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </li>
            <button type="submit">Checkout</button>
            <li>
              <div>
                <Link id="cancel-btn" to="/">
                  Cancel
                </Link>
              </div>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { cart: state.cart };
};

const mapDispatchToProps = dispatch => {
  return {
    getCart: items => dispatch(getCartAction(items))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
