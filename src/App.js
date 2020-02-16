import React, {Component} from 'react';
import "./css/reset.css"
import './css/App.css';
import HomePage from "./components/HomePage"
import Attend from "./components/Attend"
import {BrowserRouter, Route} from "react-router-dom"
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <Route exact={true} path="/" component={HomePage}/>
        <Route exact={true} path="/attend" component={Attend}/>
        <Route exact={true} path="/register" component={Register}/>

        
        
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
