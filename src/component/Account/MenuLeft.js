import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import Member from './Member/Edit'
import AddProduct from './Product/AddProduct'
import EditProduct from './Product/EditProduct'

class MenuLeft extends Component {
  render() {
    return (
      <div className="col-sm-3">
        <div className="left-sidebar">
          <h2>Category</h2>
          <div className="panel-group category-products" id="accordian">
							<div className="panel panel-default">
								<div className="panel-heading">
									<h4 className="panel-title">
										<Link to={'/account/edit'}>
											<span className="badge pull-right"><i className="fa fa-plus"></i></span>
											Account
										</Link>
									</h4>
								</div>
								<div id="mens">
									<div className="panel-body">
										<ul>
											<li><Link to={'/account/edit'}>Edit Account</Link></li>
										</ul>
									</div>
								</div>
							</div>
							<div className="panel panel-default">
								<div className="panel-heading">
									<h4 className="panel-title">
										<Link to={'/account/product/list'} data-toggle="collapse" data-parent="#accordian" >
											<span className="badge pull-right"><i className="fa fa-plus"></i></span>
											My Product
										</Link>
									</h4>
								</div>
								<div id="womens" className="">
									<div className="panel-body">
										<ul>
											<li><Link to={'/account/product/add'}>Add Product</Link></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
        </div>
      </div>
    );
  }
}

export default MenuLeft;
