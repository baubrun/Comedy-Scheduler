import React, {Component} from "react";
import HomePage from "./components/HomePage"
import Reserve from "./components/Reserve"
import {BrowserRouter, Route} from "react-router-dom"
import Register from "./components/Register";
import Host from "./components/Host";
import Events from "./components/Events";
import RenderEvent from "./components/EventDetail"




class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <Route exact={true} path="/" component={HomePage}/>
        <Route exact={true} path="/reserve" component={Reserve}/>
        <Route exact={true} path="/register" component={Register}/>
        <Route exact={true} path="/host" component={Host}/>
        <Route exact={true} path="/evt" component={Events}/>
        <Route exact={true} path="evt/:title" component={RenderEvent} />
        
        
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
