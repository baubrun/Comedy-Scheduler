import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <h4 className="font-weight-bold text-left">LE FOU FOU </h4>
        </div>
        <div className="col-md-4">
          <h4 className="font-weight-bold text-center">RIRE NOW </h4>
        </div>
        <div className="col-md-4">
          <h4 className="font-weight-bold text-right">JOKES BLAGUES</h4>
        </div>
      </div>
      <div className="row position-relative">
        <div className="col">
          <Link  className="btn btn-secondary btn-lg font-weight-bolder" role="button" to="/events">
            TICKETS
          </Link>
        </div>

        <div className="col">
          <Link id="host-btn" className="btn btn-primary btn-lg font-weight-bolder" role="button" to="/login">
            HOST AN EVENT
          </Link>
        </div>
        <img className="img-fluid home-img " src="club-2.jpg" alt="club" />
      </div>
    </div>
  );
};

export default HomePage;
