import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import './index.css';
import Home from './component/Home'
import Blog from './component/Blog1/Index'
import Account from './component/Account/Index'
import ProductDetail from './component/Account/Product/ProductDetail'
import Cart from './component/Account/Product/Cart'
import Wishlist from './component/Account/Product/Wishlist'
import BlogSingle from './component/Blog1/BlogSingle'
import Login from './component/Config/Login'
import App from './App';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <Router>
        <App>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/blog/list' component={Blog} />
            <Route path='/blog/detail/:id' component={BlogSingle} />
            <Route path='/login' component={Login} />
            <Route path='/product/detail/:id' component={ProductDetail} />
            <Route path='/cart' component={Cart} />
            <Route path='/wishlist' component={Wishlist} />
            <Route component={Account} />
          </Switch>
        </App>
      </Router>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
