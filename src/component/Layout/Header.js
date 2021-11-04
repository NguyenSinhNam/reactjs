import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { withRouter , Link } from "react-router-dom";
import axios from 'axios';
import {AppContext} from '../AppContext'

class Header extends Component  {
static contextType = AppContext;
  constructor(props) {
    super(props)
    this.state = {

    }
  this.isLoggin = this.isLoggin.bind(this);
  this.isLogginAc = this.isLogginAc.bind(this);
  this.isLogginWi = this.isLogginWi.bind(this);
  this.Logout = this.Logout.bind(this);
  this.renderQtyCart = this.renderQtyCart.bind(this);
  }


  Logout() {
    localStorage.clear();
    this.props.history.push('/login');
  }

  isLoggin() {
    localStorage.getItem('appState');
    if (localStorage.getItem('appState')) {
      return (
        <a onClick={this.Logout}><i className="fa fa-lock"></i> Logout</a>
      )
    } else {
      return (
        <Link to={'/login'}><i className="fa fa-lock"></i> Login</Link>
      )
    }
  }

  isLogginAc() {
    localStorage.getItem('appState');
    if (localStorage.getItem('appState')) {
      return (
        <li><Link to={'/account/edit'}><i className="fa fa-user"></i> Account</Link></li>
      )
    }
  }

  isLogginWi() {
    localStorage.getItem('appState');
    if (localStorage.getItem('appState')) {
      return (
        <li><Link to={'/wishlist'}><i className="fa fa-star"></i> Wishlist ({this.context.state.countWishlist})</Link></li>
      )
    }
  }

  renderQtyCart() {
    let cartData = localStorage.getItem('appState');
    if (cartData) {
      let qty = cartData.qty;
      return (
        <span className="number">{qty}</span>
      )
    }
  }

  render() {
    return (
      <header id="header">
        <div className="header_top">
    			<div className="container">
    				<div className="row">
    					<div className="col-sm-6">
    						<div className="contactinfo">
    							<ul className="nav nav-pills">
    								<li><a href=""><i className="fa fa-phone"></i> +2 95 01 88 821</a></li>
    								<li><a href=""><i className="fa fa-envelope"></i> info@domain.com</a></li>
    							</ul>
    						</div>
    					</div>
    					<div className="col-sm-6">
    						<div className="social-icons pull-right">
    							<ul className="nav navbar-nav">
    								<li><a href=""><i className="fa fa-facebook"></i></a></li>
    								<li><a href=""><i className="fa fa-twitter"></i></a></li>
    								<li><a href=""><i className="fa fa-linkedin"></i></a></li>
    								<li><a href=""><i className="fa fa-dribbble"></i></a></li>
    								<li><a href=""><i className="fa fa-google-plus"></i></a></li>
    							</ul>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div>
        <div className="header-middle">
    			<div className="container">
    				<div className="row">
    					<div className="col-md-4 clearfix">
    						<div className="logo pull-left">
    							<a href="index.html"><img src="images/home/logo.png" alt="" /></a>
    						</div>
    						<div className="btn-group pull-right clearfix">
    							<div className="btn-group">
    								<button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
    									USA
    									<span className="caret"></span>
    								</button>
    								<ul className="dropdown-menu">
    									<li><a href="">Canada</a></li>
    									<li><a href="">UK</a></li>
    								</ul>
    							</div>

    							<div className="btn-group">
    								<button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
    									DOLLAR
    									<span className="caret"></span>
    								</button>
    								<ul className="dropdown-menu">
    									<li><a href="">Canadian Dollar</a></li>
    									<li><a href="">Pound</a></li>
    								</ul>
    							</div>
    						</div>
    					</div>
    					<div className="col-md-8 clearfix">
    						<div className="shop-menu clearfix pull-right">
    							<ul className="nav navbar-nav">
    								{this.isLogginAc()}
                    {this.isLogginWi()}
    								<li><a href="checkout.html"><i className="fa fa-crosshairs"></i> Checkout</a></li>
    								<li><Link to={'/cart'}><i className="fa fa-shopping-cart"></i>{this.renderQtyCart()} Cart</Link></li>
    								<li>
                      {this.isLoggin()}
                    </li>
    							</ul>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div>

    		<div className="header-bottom">
    			<div className="container">
    				<div className="row">
    					<div className="col-sm-9">
    						<div className="navbar-header">
    							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
    								<span className="sr-only">Toggle navigation</span>
    								<span className="icon-bar"></span>
    								<span className="icon-bar"></span>
    								<span className="icon-bar"></span>
    							</button>
    						</div>
    						<div className="mainmenu pull-left">
    							<ul className="nav navbar-nav collapse navbar-collapse">
    								<li><Link to={'/'}>Home</Link></li>
    								<li className="dropdown"><a href="#">Shop<i className="fa fa-angle-down"></i></a>
                                        <ul role="menu" className="sub-menu">
                                            <li><a href="shop.html">Products</a></li>
    										<li><a href="product-details.html">Product Details</a></li>
    										<li><a href="checkout.html">Checkout</a></li>
    										<li><a href="cart.html">Cart</a></li>
    										<li>{this.isLoggin()}</li>
                                        </ul>
                                    </li>
    								<li className="dropdown"><Link to={'/blog/list'} className="active">Blog<i className="fa fa-angle-down"></i></Link>
                                        <ul role="menu" className="sub-menu">
                                            <li><Link to={'/blog/list'} className="active">Blog List</Link></li>
    										<li><Link to={'/blog/list/5'}>Blog Single</Link></li>
                                        </ul>
                                    </li>
    								<li><a href="404.html">404</a></li>
    								<li><a href="contact-us.html">Contact</a></li>
    							</ul>
    						</div>
    					</div>
    					<div className="col-sm-3">
    						<div className="search_box pull-right">
    							<input type="text" placeholder="Search"/>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div>
      </header>
    );
  }
}

export default withRouter(Header);
