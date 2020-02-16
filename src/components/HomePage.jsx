import React, { Component } from "react";
import EventCalendar from "./EventCalendar";
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
        <div className="home-header">
          <div className="home-title">
            <h1>THE COMEDY HUB</h1>
          </div>
          <div>Enjoy one of our venues</div>
        </div>
        <div className="venue-links">
          <div>
            <Link to="/lefoufou">Le Fou Fou</Link>
          </div>
          <div>
            <Link to="/rirenow">Rire Now</Link>
          </div>
          <div>
            <Link to="/jokesblagues">Jokes Blagues</Link>
          </div>
        </div>
        <div className="portal-links">
          <button>
            <Link to="/attend">ATTEND A SHOW</Link>
          </button>
          <button type="button" onClick={this.toggleLogin}>
            HOST A SHOW
          </button>
        </div>
        {this.state.loginModal && (
          <Login
            id="modal"
            loginModal={this.state.loginModal}
            toggleLogin={this.toggleLogin}
          />
        )}
      </>
    );
  }
}

export default HomePage;
