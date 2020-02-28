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


class App extends Component {


  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <NavBar />
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
        </BrowserRouter>
      </div>
    )
  }
}


export default App;


