import React, {Component} from "react";
import HomePage from "./components/HomePage"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Register from "./components/Register";
import Host from "./components/Host";
import Events from "./components/Events";
import RenderEvent from "./components/EventDetail"
import Profile from "./components/Profile"
import Login from "./components/Login"
import NavBar from "./components/NavBar"
import Checkout from "./components/Checkout"
import Confirm from "./components/Confirm"
import RenderCart from "./components/RenderCart"
import { connect } from "react-redux";
import { getEventsAction } from "./actions/actions";



class App extends Component {

  // handleGetEvents = events => {
  //   this.props.getEvents(events);
  // };

  // fetchData = async () => {
  //   const response = await fetch("/events");
  //   const body = await response.text();
  //   const parser = JSON.parse(body);
  //   this.handleGetEvents(parser);
  // };

  // componentDidMount() {
  //   this.fetchData();
  // }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <NavBar />

        {/* <Switch> */}
        <Route exact={true} path="/" component={HomePage}/>
        <Route exact={true} path="/login" component={Login}/>
        <Route exact={true} path="/register" component={Register}/>
        <Route exact={true} path="/host" component={Host}/>
        <Route exact={true} path="/events" component={Events}/>
        <Route exact={true} path="/event/:title" component={RenderEvent} />
        <Route exact={true} path="/profile" component={Profile} />
        <Route exact={true} path="/checkout" component={Checkout} />
        <Route exact={true} path="/confirm" component={Confirm} />
        <Route exact={true} path="/cart" component={RenderCart} />
        {/* </Switch> */}
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { events: state.events };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     getEvents: events => dispatch(getEventsAction(events))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default connect(mapStateToProps, null)(App);


