import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Product from './Account/Product/Product'
import {AppContext} from './AppContext'
import axios from 'axios';

class Home extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props)
    this.state = {
      listProduct: '',
      category: [],
      id: '',
      qty: 1,
      list_category: '',
      list_wishlist: '',
      productCart: ''
    }
    this.renderListproduct = this.renderListproduct.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleWishlist = this.handleWishlist.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost/laravel/laravel/laravel/public/api/product')
    .then(res => {
      this.setState({
        listProduct: res.data.data
      })
    })
    .catch(error => console.log(error));

    axios.get('http://localhost/laravel/laravel/laravel/public/api/category-brand')
    .then(res => {
      this.setState({
        list_category: res.data.category
      })
    })
    .catch(error => console.log(error));
  }

  handleChange(e) {
    e.preventDefault();

    let getId = e.target.id;
    let qty = 1;

    let objectCart= {};

    let flag = true;

    let productCart = [];

    let cartData = localStorage.getItem('productCart');

    if(cartData) {
      objectCart = JSON.parse(cartData);
      Object.keys(objectCart).map(function(key,index) {
        if (key == getId) {
          objectCart[key] = parseInt(objectCart[key]) + 1;
          flag = false;
        }
      })
    }

    if (flag) {
      objectCart[getId] = qty;
    }

    localStorage.setItem('productCart', JSON.stringify(objectCart));

    console.log(objectCart)

  }

  handleWishlist(e) {
    e.preventDefault();
  	let wishlist = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];

  	let id = e.target.id;
  	if(!wishlist.includes(id)) {
  		wishlist.push(id)
  	}
  	this.context.wishlistContext(wishlist.length)

    console.log(wishlist.length)
  	// this.context.wishlistContext(3);
  	localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }

  renderListproduct() {
    let listProduct = this.state.listProduct;

    if (listProduct.length > 0) {
      return listProduct.map((object, i) => {
        const imageProduct = JSON.parse(object.image);
        return (
          <div className="col-sm-4" key={i}>
            <div className="product-image-wrapper">
              <div className="single-products">
                  <div className="productinfo text-center">
                    <img src={'http://localhost/laravel/laravel/laravel/public/upload/user/product/' + object.id_user + '/' + imageProduct[0]} alt={object.name} />
                    <h2>{object.price}</h2>
                    <p><Link to={'/product/detail/'}>{object.name}</Link></p>
                    <a href="#" id={object.id} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                  <div className="product-overlay">
                    <div className="overlay-content">
                      <h2>{object.price}</h2>
                      <p><Link to={'product/detail/' + object.id}>{object.name}</Link></p>
                      <a id={object.id} onClick={this.handleChange} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                    </div>
                  </div>
              </div>
              <div className="choose">
                <ul className="nav nav-pills nav-justified">
                  <li><a onClick={this.handleWishlist} id={object.id}><i className="fa fa-plus-square"></i>Add to wishlist</a></li>
                  <li><a href="#"><i className="fa fa-plus-square"></i>Add to compare</a></li>
                </ul>
              </div>
            </div>
          </div>
        )
      })
    }
  }

  renderCategory() {
    let category = this.state.list_category;
    if (category.length > 0) {
      return (Object.keys(category).map((object, i) => {
        return(
          <div className="panel-heading" key={i}>
            <h4 className="panel-title">
              <a href="#">
                {category[object].category}
              </a>
            </h4>
          </div>
        )
      }))
    }
  }

  render() {
    return (
      <>
      <section id="slider">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div id="slider-carousel" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                  <li data-target="#slider-carousel" data-slide-to="0" className="active"></li>
                  <li data-target="#slider-carousel" data-slide-to="1"></li>
                  <li data-target="#slider-carousel" data-slide-to="2"></li>
                </ol>

                <div className="carousel-inner">
                  <div className="item active">
                    <div className="col-sm-6">
                      <h1><span>E</span>-SHOPPER</h1>
                      <h2>Free E-Commerce Template</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                      <button type="button" className="btn btn-default get">Get it now</button>
                    </div>
                    <div className="col-sm-6">
                      <img src="images/home/girl1.jpg" className="girl img-responsive" alt="" />
                      <img src="images/home/pricing.png"  className="pricing" alt="" />
                    </div>
                  </div>
                  <div className="item">
                    <div className="col-sm-6">
                      <h1><span>E</span>-SHOPPER</h1>
                      <h2>100% Responsive Design</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                      <button type="button" className="btn btn-default get">Get it now</button>
                    </div>
                    <div className="col-sm-6">
                      <img src="images/home/girl2.jpg" className="girl img-responsive" alt="" />
                      <img src="images/home/pricing.png"  className="pricing" alt="" />
                    </div>
                  </div>

                  <div className="item">
                    <div className="col-sm-6">
                      <h1><span>E</span>-SHOPPER</h1>
                      <h2>Free Ecommerce Template</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                      <button type="button" className="btn btn-default get">Get it now</button>
                    </div>
                    <div className="col-sm-6">
                      <img src="images/home/girl3.jpg" className="girl img-responsive" alt="" />
                      <img src="images/home/pricing.png" className="pricing" alt="" />
                    </div>
                  </div>

                </div>

                <a href="#slider-carousel" className="left control-carousel hidden-xs" data-slide="prev">
                  <i className="fa fa-angle-left"></i>
                </a>
                <a href="#slider-carousel" className="right control-carousel hidden-xs" data-slide="next">
                  <i className="fa fa-angle-right"></i>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>
      <section>
    		<div className="container">
    			<div className="row">
    				<div className="col-sm-3">
    					<div className="left-sidebar">
    						<h2>Category</h2>
    						<div className="category-products">
    							<div className="panel panel-default">
    								{this.renderCategory()}
    							</div>
                </div>
    					</div>
    				</div>
            <div className="col-sm-9 padding-right">
              <div className="features_items">
                <h2 className="title text-center">Features Items</h2>
                {this.renderListproduct()}
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
    );
  }
}

export default Home;
