import React, { Component } from "react";
import { connect } from "react-redux";
import { confirmCheckoutAction } from "../actions/actions";

class Confirmation extends Component {
  generateConfirmId = () => {
    return "CB3" + Math.floor(Math.random() * 1000);
  };

  seatsTaken = () => {
    return this.props.checkout.map(i => {
      return {
        venue: i.venue,
        qty: i.qty,
        startDate: i.startDate
      };
    });
  };

  updateSeating = async () => {
    const data = new FormData();
    data.append("seatsTaken", JSON.stringify(this.seatsTaken()));
    await fetch("/updateSeatsAvail", {
      method: "POST",
      body: data
    });
    // const body = await response.text();
    // const parser = JSON.parse(body);
    // if (parser.success) {
    // }
  };

  componentDidMount(){
    this.updateSeating()
  }

  render() {
    return (
      <div>
        {this.props.checkout.length > 0 ? (
          <table className="confirm">
            <thead>
              <tr>
                <th>Event</th>
                <th>Performer</th>
                <th>Venue</th>
                <th>Date</th>
                <th>Time</th>
                <th># of tickets</th>
              </tr>
            </thead>
            <tfoot className="confirm-num">
              <tr>
                <td>Confirmation #: {this.generateConfirmId()}</td>
              </tr>
            </tfoot>
            <tbody>
              {this.props.checkout.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>{item.title}</td>
                    <td>{item.performer}</td>
                    <td>{item.venue}</td>
                    <td>{item.startDate}</td>
                    <td>{item.startTime}</td>
                    <td>{item.qty}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h1>Purchase a ticket!</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkout: state.checkout
  };
};

const mapDispatchToProps = dispatch => {
  return {
    confirmCheckout: () => dispatch(confirmCheckoutAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
