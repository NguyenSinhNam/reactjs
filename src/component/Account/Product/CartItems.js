import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';

class CartItems extends Component {

  constructor(props) {
    super(props)
    this.state = {
      product: '',
      objectCart: {},
      qty: '',
      total: '',
    }
    this.handleUp = this.handleUp.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.getId = this.getId.bind(this);
  }

  componentDidMount() {
    let product = this.props.product;
    let total = (product.qty*product.price) - (product.qty*product.price*product.sale*0.01);
    this.setState({
      qty: product.qty,
      total: total
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.product !== this.props.product){
      let product = nextProps.product;
      let total = (product.qty*product.price) - (product.qty*product.price*product.sale*0.01);
      this.setState({
        qty: product.qty,
        total: total
      })
    }
  }

  getId(e) {
    this.props.idProduct(e.target.id)
  }

  handleUp() {
    let product = this.props.product;
    let qty = this.state.qty + 1;
    this.setState({
      total: (qty*product.price) - (qty*product.price*product.sale*0.01),
      qty: qty
    })
  }

  handleDown() {
    let product = this.props.product;
    let qty = this.state.qty - 1;
    if(qty < 0) {
      this.setState({
        qty: 0,
        total: 0,
      })
    }
    else {
      this.setState({
        qty: qty,
        total: (qty*product.price) - (qty*product.price*product.sale*0.01),
      })
    }
  }

  render() {
    let product = this.props.product;

    const image = JSON.parse(product.image)
    return (
      <tr>
        <td className="cart_product"><a href="#"><img src={'http://localhost/laravel/laravel/laravel/public/upload/user/product/' + product.id_user + '/' + image[0]} alt={product.name} /></a></td>
        <td className="cart_description">
          <h4><a href="#">{product.name}</a></h4><p>Web ID:{product.id}</p>
        </td>
        <td className="cart_price"><p>${product.price}</p></td>
        <td className="cart_price"><p>{product.sale}%</p></td>
        <td className="cart_quantity">
          <div className="cart_quantity_button">
            <a className="cart_quantity_up" onClick={this.handleUp}> + </a>
            <input className="cart_quantity_input" type="text" name="quantity" value={this.state.qty} size="2" />
            <a className="cart_quantity_down" onClick={this.handleDown}> - </a>
          </div>
        </td>
        <td className="cart_total"><p className="cart_total_price">${this.state.total}</p></td>
        <td className="cart_delete"><a className="cart_quantity_delete" id={product.id} onClick={this.getId}>x</a></td>
      </tr>
    )
  }
}

export default CartItems;
