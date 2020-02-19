import React, { Component } from "react";
import EventCalendar from "./ReserveCalendar";
import { Link } from "react-router-dom";
import Login from "./Login";

const Header = () => {
  return (
    <div className="home-header">
      <div className="home-title">
        <h1>THE COMEDY HUB</h1>
      </div>
      <Link to="/test">test</Link>
    </div>
  );
};

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginModal: null,
      registerModal: null
    };
  }

  componentDidMount() {
    // const response = await fetch("/test");
    // const body = await response.text();
    // const parser = JSON.parse(body);
    // console.log(parser);
    // this.setState({ data: body });
  }

  toggleLogin = () => {
    this.setState({ loginModal: !this.state.loginModal });
  };

  render() {
    return (
      <>
        {this.state.loginModal && (
          <Login
            id="modal"
            loginModal={this.state.loginModal}
            toggleLogin={this.toggleLogin}
          />
        )}

        <div className="home-header">
          <div className="home-title">
            <h1>LE COMEDY HUB</h1>

          </div>
          <div className="venues">
            <div>Le Fou Fou</div>
            <div>Rire Now</div>
            <div>Jokes Blagues</div>
          </div>

        </div>
        <div className="home-body">
          <div className="portal-links">
            <div className="reserve-btn">
              <Link id="reserve-btn" to="/reserve">RESERVE TICKETS</Link>
            </div>
            <div className="host-show-btn" onClick={this.toggleLogin}>
              HOST AN EVENT
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;
