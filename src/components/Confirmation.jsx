import React from "react";
import { connect } from "react-redux";

const Confirmation = props => {
  return (
    <div className="confirmation body">
      {this.props.checkout.map((item, idx) => (
        <ul className="items-summary" key={idx}>
          <li>{item.title}</li>
          <li>{item.performer}</li>
          <li>{item.venue}</li>
          <li>{item.date}</li>
        </ul>
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return { checkout: state.checkout };
};

export default connect(mapStateToProps)(Confirmation);
