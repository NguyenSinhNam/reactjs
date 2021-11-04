import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Header from './component/Layout/Header'
import Footer from './component/Layout/Footer'
import Blog from './component/Blog/Index'
import Sidebar from './component/Layout/Sidebar'
import { withRouter  } from "react-router-dom";

import {AppContext} from './component/AppContext'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      countWishlist : 0
    }
    this.stateWishlistContext = this.stateWishlistContext.bind(this)
  }

  stateWishlistContext(number) {

    this.setState({
      countWishlist: number
    })
  }
  
  render() {
  let pathname = this.props.location.pathname

    return (
      <AppContext.Provider value={{
        state: this.state,
        wishlistContext: this.stateWishlistContext
        }}>
      <div className="App">
        <Header />
        <section className="sec_app">
          <div className="container">
            <div className="row">
            {pathname.includes("account") ? "" : <Sidebar />}
            {this.props.children}
            </div>
      		</div>
        </section>
        <Footer />
      </div>
      </AppContext.Provider>
    );
  }
}

export default withRouter(App);
