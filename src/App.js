import React, {Component} from "react";
import HomePage from "./components/HomePage"
import {BrowserRouter, Route, Redirect} from "react-router-dom"
import Register from "./components/Register";
import Events from "./components/Events";
import RenderEvent from "./components/EventDetail"
import Profile from "./components/Profile"
import Login from "./components/Login"
import NavBar from "./components/NavBar"
import Checkout from "./components/Checkout"
import InjectedFormCheckout from "./components/Checkout"
import Confirmation from "./components/Confirmation"
import RenderCart from "./components/RenderCart"
import { connect } from "react-redux";



import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const PK_STRIPE = "pk_test_1jcRkbFeUYqVsCGYpNX51Ggv00oyStF042";
const stripePromise = loadStripe(PK_STRIPE)


class App extends Component {

  render() {
    return (
      <div className="App">
        {/* <Elements stripe={stripePromise}> */}

        <BrowserRouter>
        <NavBar />
        <Route exact={true} path="/" component={HomePage}/>
        <Route exact={true} path="/login" component={Login}/>
        <Route exact={true} path="/register" component={Register}/>
        <Route exact={true} path="/events" component={Events}/>
        <Route exact={true} path="/event/:title" component={RenderEvent}/>
        <Route exact={true} path="/cart" component={RenderCart}/>
        <Route exact={true} path="/checkout" component={Checkout}/>
        {/* <Route exact={true} path="/checkout" component={InjectedFormCheckout}/> */}
        <Route exact={true} path="/confirmation" component={Confirmation}/>
        <Route exact={true} path="/profile">
          {!this.props.loggedIn ? <Redirect to="/login" /> : <Profile/>}
        </Route >
        </BrowserRouter>

        {/* </Elements> */}

      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  }
}


export default connect(mapStateToProps,)(App);


