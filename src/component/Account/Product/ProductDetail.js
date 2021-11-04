import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';

class ProductDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      detailProduct: '',
      category: '',
      list_category: '',
    }
    this.renderData = this.renderData.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost/laravel/laravel/laravel/public/api/product/detail/' + this.props.match.params.id)
    .then(res => {
      console.log(res.data.data)
      this.setState({
        detailProduct: res.data.data,
      })
    })
    .catch(error => console.log(error));

    axios.get('http://localhost/laravel/laravel/laravel/public/api/category-brand')
    .then(res => {
      this.setState({
        list_category: res.data.category,
      })
    })
    .catch(error => console.log(error));
  }

  renderData() {
    let detailProduct = this.state.detailProduct;
    if (detailProduct) {
      const imageProduct = JSON.parse(detailProduct.image);
      return (
        <div className="col-sm-9 padding-right">
          <div className="product-details">
            <div className="col-sm-5">
              <div className="view-product">
                <img src={'http://localhost/laravel/laravel/laravel/public/upload/user/product/' + detailProduct.id_user + '/' + imageProduct[0]} alt="" />
                <a href={'http://localhost/laravel/laravel/laravel/public/upload/user/product/' + detailProduct.id_user + '/' + imageProduct[0]} rel="prettyPhoto"><h3></h3></a>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }


  render() {
    return (
      <section>
    		<div className="container">
    			<div className="row">
            {this.renderData()}
          </div>
        </div>
      </section>
    );
  }
}

export default ProductDetail;
