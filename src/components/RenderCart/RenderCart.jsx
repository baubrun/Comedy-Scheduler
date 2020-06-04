import React, { Component } from "react";
import { connect } from "react-redux";

import {
  deleteFromCartAction,
  getItemsBoughtAction,
} from "../../actions/actions";
import "./RenderCart.css";
import { Header } from "../Header";
import { Nav } from "../Nav";
import { Button } from "../Button";

export const currencyFormat = (amount) => {
  return new Intl.NumberFormat("decimal", {
    style: "currency",
    currency: "CAD",
  }).format(amount);
};

class RenderCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: [],
    };
  }

  componentDidMount() {
    const cart = this.props.cart.map((i) => Object.assign(i, { qty: 1 }));
    this.setState({ cartItems: cart });
  }

  handleQtyChange = (event) => {
    const id = event.target.name;
    const qty = event.target.value;
    const idx = this.state.cartItems.findIndex((i) => i._id === id);
    const copyCart = [...this.state.cartItems];
    copyCart[idx].qty = parseInt(qty);
    this.setState({ cartItems: copyCart });
  };

  handleCheckout = () => {
    this.props.getBoughtItems(this.state.cartItems);
    this.props.history.push("/checkout");
  };

  deleteCartItem = (event) => {
    const id = event.target.name;
    const item = this.state.cartItems.findIndex((i) => i._id === id);
    const copyCart = [...this.state.cartItems];
    copyCart.splice(item, 1);
    this.setState({ cartItems: copyCart });
    this.dispatchDelItem(item);
  };

  dispatchDelItem = (item) => {
    this.props.delItem(item);
  };


  getButtonName = () => {
    return 
  }

  render() {
    let subtotal = 0;
    this.state.cartItems.forEach((pr) => (subtotal += pr.price * pr.qty));

    let tps = subtotal * 0.05;
    let tvq = subtotal * 0.09975;
    let total = subtotal + tps + tvq;
    return (
      <>
        <Header text="CART" type="secondary" />
        <Nav text="MORE TICKETS" loc="events" type="dark" />
        <div className="cart-body">
          {this.state.cartItems.length > 0 ? (
            <>
              <div className="row">
                <div className="col-md-5 offset-1">
                  <table id="tickets-table" className="table mt-3">
                    <thead>
                      <tr>
                        <th scope="col">Event</th>
                        <th scope="col">Venue</th>
                        <th scope="col">Price</th>
                        <th scope="col">Qty</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.cartItems.map((item, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{item.title}</td>
                            <td>{item.venue.split("_").join(" ")}</td>
                            <td>{item.price}</td>
                            <td>
                              <input
                                type="number"
                                defaultValue="1"
                                min="1"
                                max="100"
                                name={item._id}
                                onChange={this.handleQtyChange}
                              />
                            </td>
                            <td>
                              <Button
                                text="REMOVE"
                                cn="secondary"
                                name={item._id}
                                onClick={this.deleteCartItem}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-5">
                  <table id="total-table" className="table mt-3">
                    <thead>
                      <tr>
                        <th scope="col">Sub-Total</th>
                        <th scope="col">TPS</th>
                        <th scope="col">TVQ</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{subtotal.toFixed(2)}</td>
                        <td>{tps.toFixed(2)}</td>
                        <td>{tvq.toFixed(2)}</td>
                        <td>{total.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row"></div>
              </div>
              <div className="col-md-6 offset-6 text-right">
                <Button
                  className="mx-auto"
                  text="CHECKOUT"
                  cn="dark"
                  onClick={this.handleCheckout}
                />
              </div>
            </>
          ) : (
            <div>
              <h1>Empty</h1>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    delItem: (item) => dispatch(deleteFromCartAction(item)),
    getBoughtItems: (items) => dispatch(getItemsBoughtAction(items)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderCart);
