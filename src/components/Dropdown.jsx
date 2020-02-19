import React, { Component } from 'react'
import {Link} from "react-router-dom"


class Dropdown extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             showMenu: false
        }
    }


    render() {
        return (
            <div className="dropdown">
                <img id="dropdown-img" src="menu-grid.png" alt="" />
                <div className="dropdown-content">
                    <ul>
                        <li><Link to="/" >Home</Link></li>
                        <li><Link to="profile" >Profile</Link></li>
                        <li><Link to="reserve" >Reserve tickets</Link></li>
                        <li><Link to="host" >Host an event</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}



export default Dropdown