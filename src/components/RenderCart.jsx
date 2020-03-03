import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class RenderCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: []
    };
  }

  currencyFormat = amount => {
    return new Intl.NumberFormat("decimal", {
      style: "currency",
      currency: "CAD"
    }).format(amount);
  };

  componentDidMount() {
    const cart = this.props.cart.map(i =>
      Object.assign(i,  {qty: 1})
    )
    this.setState({ cartItems: cart});
  }

  changeItemTotal = () => {
  };

  handleQtyChange = event => {
    const id = event.target.name;
    const qty = event.target.value;
    const idx = this.state.cartItems.findIndex(i => i._id === id)
    const copyCart = [...this.state.cartItems]
    copyCart[idx].qty = qty
    this.setState({cartItems: copyCart})
  };

  render() {
    let subtotal = 0;
    this.state.cartItems.forEach(
      pr => (subtotal += parseInt(pr.price) * parseInt(pr.qty))
    );
    
    let tps = subtotal * 0.05
    let tvq = subtotal *0.09975
    let total = subtotal + tps + tvq
    return (
      <>
        <div className="cart-header">
          <Link to="/events">MORE TICKETS</Link>
          <div className="cart-title">CART</div>
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
                    <th>Quantity</th>
                    <th></th>
                  </tr>
                </thead>
                <tfoot>
                  <tr><td>Maximum of 6 tickets per show.</td></tr>
                </tfoot>
                <tbody>
                  {this.state.cartItems.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{item.title}</td>
                        <td>{item.venue}</td>
                        <td>$ {item.price}</td>
                        <td>
                          <input
                            type="number"
                            defaultValue="1"
                            min="1"
                            max="6"
                            name={`${item._id}`}
                            onChange={this.handleQtyChange}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <ul className="total">
                <li>
                  Sub-Total: 
                </li>
                <li>{subtotal.toFixed(2)}</li>
                <li>TPS:</li>
                <li>{tps.toFixed(2)}</li>
                <li>TVQ:</li>
                <li>{tvq.toFixed(2)}</li>
                <li>Total:</li>
                <li>{this.currencyFormat(total)}</li>
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

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};

export default connect(mapStateToProps)(RenderCart);
