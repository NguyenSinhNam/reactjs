import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';
import CartItems from './CartItems'

class Cart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      productCart: {},
      idProduct: ''
    }
    this.renderData = this.renderData.bind(this);
    this.idProduct = this.idProduct.bind(this);
  }

  componentDidMount() {
    let objectCart = localStorage.getItem('productCart');
    axios.post('http://localhost/laravel/laravel/laravel/public/api/product/cart', objectCart)
    .then(response => {
      if (response.data.data) {
        this.setState({
          productCart: response.data.data
        })
      }
    })
  }

  idProduct(id){

      let idProduct = id;

      let productCart = this.state.productCart.filter((item) =>
       item.id != idProduct
     );

      let cart = JSON.parse(localStorage.getItem('productCart')); //get cart form localStorage and convert to array
      delete cart[idProduct.toString()]; //delete item in cart with id delete
      localStorage.setItem('productCart', JSON.stringify(cart)); //convert cart to json and save to localStorage
      // // let total = this.state.total - (product.qty * product.price)
      this.setState({productCart});

  }

  componentWillReceiveProps(){
    let productCart = this.state.productCart
    this.setState({productCart});
  }


  renderData() {
    let productCart = this.state.productCart;

    return Object.keys(productCart).map((key,index) => {
      const image = JSON.parse(productCart[key]['image']);
      let total = (productCart[key]['qty']*productCart[key]['price']) - (productCart[key]['qty']*productCart[key]['price']**productCart[key]['sale']*0.01);
      return (
        <CartItems
        product = {productCart[key]}
        idProduct = {this.idProduct}
        total = {total}
        />
      )
    })
  }

  render() {
    return (
      <div className="col-sm-9">
        <div id="cart_items">
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Item</td>
                  <td className="description"></td>
                  <td className="price">Price</td>
                  <td className="price">Sale</td>
                  <td className="quantity">Quantity</td>
                  <td className="total">Total</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {this.renderData()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Cart;
