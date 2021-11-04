import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import './index.css';
import Member from './Member/Edit'
import AddProduct from './Product/AddProduct'
import Product from './Product/Product'
import EditProduct from './Product/EditProduct'
import App from './App'

class Index extends Component {
  render () {
    return(
      <div>
        <Router>
          <App>
            <Switch>
              <Route path='/account/edit' component={Member} />
              <Route path='/account/product/add' component={AddProduct} />
              <Route path='/account/product/list' component={Product} />
              <Route path='/account/edit-product/:id' component={EditProduct} />
            </Switch>
          </App>
        </Router>
      </div>
    )
  }
}

export default Index;
