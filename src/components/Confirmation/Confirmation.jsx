import React, { Component } from "react";
import { connect } from "react-redux";
import { confirmCheckoutAction, emptyCartAction } from "../../actions/actions";
import "./Confirmation.css"

class Confirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderNum: "",
      total: "",
    };
  }

  seatsTaken = () => {
    return this.props.checkout.map((i) => {
      return {
        venue: i.venue,
        qty: i.qty,
        startDate: i.startDate,
      };
    });
  };

  updateSeating = async () => {
    const data = new FormData();
    data.append("seatsTaken", JSON.stringify(this.seatsTaken()));
    await fetch("/updateSeatsAvail", {
      method: "POST",
      body: data,
    });
  };

  componentDidMount() {
    this.updateSeating();
    this.fetchConfirmation();
  }

  handlePrint = () => {
    window.print();
  };

  fetchConfirmation = async () => {
    const response = await fetch("/orderNum");
    const body = await response.text();
    const parser = JSON.parse(body);
    if (parser.success) {
      this.setState({
        orderNum: parser.order,
        total: parser.amount,
      });
    }
  };

  render() {
    return (
      <>
        <div className="confirmation-header">
          <h1>CONFIRMATION</h1>
        </div>
        <div id="print" onClick={this.handlePrint}>
          <img src="print-40.png" alt="" />
        </div>

        <div className="confirmation-body">
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
            <tbody>
              {this.props.checkout.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>{item.title}</td>
                    <td>{item.performer}</td>
                    <td>{item.venue.split("_").join(" ")}</td>
                    <td>{item.startDate}</td>
                    <td>{item.startTime}</td>
                    <td>{item.qty}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="order-number">
            <div>
              <h2>Confirmation #: </h2> {this.state.orderNum}
            </div>
          </div>
          <div className="order-total">
            <h2>Total Paid: </h2> ${parseInt(this.state.total) / 100}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    checkout: state.checkout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    confirmCheckout: () => dispatch(confirmCheckoutAction()),
    emptyCart: () => dispatch(emptyCartAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
