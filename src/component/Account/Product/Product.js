import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';

class Product extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listProduct: '',
      idProduct: ''
    }
    this.renderData = this.renderData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {

    const userData = JSON.parse(localStorage["appState"])

    let url = 'http://localhost/laravel/laravel/laravel/public/api/user/my-product'
    let accessToken = userData.user.auth_token;
    let config = {
      headers: {
        'Authorization' : 'Bearer '+ accessToken,
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    }

    axios.get(url, config)
    .then(res => {
      console.log(res.data.data)
      this.setState({
        listProduct: res.data.data
      })
    })
    .catch(error => console.log(error));
  }

  handleDelete(e) {
    let getId = e.target.id;
    const userData = JSON.parse(localStorage["appState"])

    let url = 'http://localhost/laravel/laravel/laravel/public/api/user/delete-product/' + getId
    let accessToken = userData.user.auth_token;
    let config = {
      headers: {
        'Authorization' : 'Bearer '+ accessToken,
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    }

    axios.get(url, config)
      .then(response => {
        this.setState({
          listProduct : response.data.data
        })
      })
  }

  renderData() {
    let {listProduct} = this.state;

    let userData = localStorage.getItem('appState');
    if (listProduct) {

        return Object.keys(listProduct).map((key,index) => {
          const imageProduct = JSON.parse(listProduct[key]['image']);
          return (
            <tr>
              <td>{listProduct[key]['id']}</td>
              <td>{listProduct[key]['name']}</td>
              <td>{listProduct[key]['price']}</td>
              <td><img src={'http://localhost/laravel/laravel/laravel/public/upload/user/product/' + listProduct[key]['id_user'] + '/' + imageProduct[0]} alt={listProduct[key]['name']} /></td>
              <td><Link to={'/account/edit-product/' + listProduct[key]['id']}>Edit</Link></td>
              <td><a id={listProduct[key]['id']} onClick={this.handleDelete}>Delete</a></td>
            </tr>
          )
        })
      }

  }

  render() {
    return (
      <div id="cart_items" className="col-sm-9">
        <div className="cart_info">
          <table className="table table-condensed">
            <thead>
              <tr className="cart_menu">
                <th>Id</th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {this.renderData()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Product;
