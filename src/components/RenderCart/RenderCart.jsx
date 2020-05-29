import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFromCartAction, getItemsBoughtAction} from "../../actions/actions";
import "./RenderCart.css"

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

  dispatchDelItem = (item) => {
    this.props.delItem(item);
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

  render() {
    let subtotal = 0;
    this.state.cartItems.forEach((pr) => (subtotal += pr.price * pr.qty));

    let tps = subtotal * 0.05;
    let tvq = subtotal * 0.09975;
    let total = subtotal + tps + tvq;
    return (
      <>
        <div className="cart-header">
          <Link to="/events">
            <h1>MORE TICKETS</h1>
          </Link>
          <div className="cart-title">
            <h1>CART</h1>
          </div>
        </div>
        <div className="cart-body">
          {this.state.cartItems.length > 0 ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Venue</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th></th>
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
                          <button
                            id="remove-btn"
                            onClick={this.deleteCartItem}
                            name={item._id}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <ul className="total">
                <li>Sub-Total:</li>
                <li>{subtotal.toFixed(2)}</li>
                <li>TPS:</li>
                <li>{tps.toFixed(2)}</li>
                <li>TVQ:</li>
                <li>{tvq.toFixed(2)}</li>
                <li>Total:</li>
                <li><b>{total.toFixed(2)}</b></li>
                <li>
                  <button id="checkout-btn" onClick={this.handleCheckout}>
                    Checkout
                  </button>
                </li>
              </ul>
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