import React from 'react'
import {Link} from "react-router-dom"


const Nav = ({text, loc, type}) => {
    return (
        <div className="row">
        <div className={`col-md bg-${type} py-1`}>
          <h3 className="text-center" style={{ color: "white" }}>
            <Link to={`/${loc}`}>{text}</Link>
          </h3>
        </div>
      </div>
      )
}

export default Nav
