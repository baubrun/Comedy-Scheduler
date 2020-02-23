import React, { Component } from "react";
import { connect } from "react-redux";

class RenderCart extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        {this.props.cart.map((item, idx) => {
          return (
            <ul key={idx}>
              <li>Title: {item.title}</li>
              <li>Location: {item.location}</li>
              <li>${item.price}</li>
            </ul>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};

export default connect(mapStateToProps)(RenderCart);
