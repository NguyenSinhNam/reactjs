import React, {
  Component
} from 'react'
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";

import axios from 'axios';

class AddProduct extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: '',
      category: '',
      brand: '',
      status: '',
      sale: 0,
      detail: '',
      avatar: '',
      file: [],
      formError: [],
      list_category: '',
      list_brand: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleInputFile = this.handleInputFile.bind(this);
    this.renderCategory = this.renderCategory.bind(this);
    this.renderBrand = this.renderBrand.bind(this);
    this.renderFormError = this.renderFormError.bind(this);
    this.renderSale = this.renderSale.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost/laravel/laravel/laravel/public/api/category-brand')
    .then(res => {
      this.setState({
        list_category: res.data.category,
        list_brand: res.data.brand
      })
    })
    .catch(error => console.log(error));
  }

  handleInput(e) {
    const nameInput = e.target.name;
    const value = e.target.value;

    this.setState({
      [nameInput]: value
    });

  }

  handleInputFile(e) {
    const file = e.target.files;
      this.setState({
        file: file //cai nay de toan bo thong file upload vao file de xuong check validate
      })
  }

  handleSubmit(e) {
    e.preventDefault();

    let flag = true;
    let name = this.state.name;
    let price = this.state.price;
    let category = this.state.category;
    let brand = this.state.brand;
    let status = this.state.status;
    let sale = this.state.sale;
    let detail = this.state.detail;
    let file = this.state.file;
    let errorSubmit = this.state.formError;

    if (!name) {
      flag = false;
      errorSubmit.name = "Vui long nhap Ten Product";
    }

    if (!price) {
      flag = false;
      errorSubmit.price = "Vui long nhap Gia san pham";
    }

    if (category == "" || !category) {
      flag = false;
      errorSubmit.category = "Vui long chon Category";
    }

    if (brand == "" || !brand) {
      flag = false;
      errorSubmit.brand = "Vui long chon Brand";
    }

    if (status == "" || !status) {
      flag = false;
      errorSubmit.status = "Vui long chon Status";
    }

    if(status == "1") {
      if (!sale) {
        flag = false;
        errorSubmit.sale = "Vui long nhap sale";
      }
    }

    if (!detail) {
      flag = false;
      errorSubmit.detail = "Vui long nhap chi tiet san pham";
    }

    if (file=="") {
      flag = false;
      errorSubmit.file = "Vui long chon anh";
    } else {
      if(file.length <= 3) {
        Object.keys(file).map((items, i) => {
          if (file[items]['size'] > 1048576) {
            flag = false;
            errorSubmit.file = "Kich thuoc anh qua lon";
          }
          const  fileType = file[items]['type'];
          const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
          if (!validImageTypes.includes(fileType)) {
            flag = false;
            errorSubmit.file = "Day khong phai la anh";
          }
        })
      } else {
        flag = false;
        errorSubmit.file = "Tối đa 3 ảnh";
      }
    }

    if (!flag) {
      this.setState({
        formError: errorSubmit
      });
    } else {
      const userData = JSON.parse(localStorage["appState"])

      console.log(userData)

      let url = 'http://localhost/laravel/laravel/laravel/public/api/user/add-product'
      let accessToken = userData.user.auth_token;
      let config = {
        headers: {
          'Authorization' : 'Bearer '+ accessToken,
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      };
      const formData = new FormData();
      formData.append('name', this.state.name);
      formData.append('price', this.state.price);
      formData.append('category', this.state.category);
      formData.append('brand', this.state.brand);
      formData.append('status', this.state.status);
      formData.append('sale', this.state.sale);
      formData.append('company', this.state.company);
      formData.append('detail', this.state.detail);

      Object.keys(file).map((items, i) => {
        formData.append('file[]', file[items]);
      })

      axios.post(url, formData, config)
        .then(response => {
          console.log(response.data)
          if (response.data.data) {
              this.props.history.push('/account/product/list');
          }
        })
    }
  }

  renderCategory() {
    let category = this.state.list_category;
    if (category.length > 0) {
      return (Object.keys(category).map((object, i) => {
        return(
          <option key={i} value={category[object].id} >{category[object].category}</option>
        )
      }))
    }
  }

  renderBrand() {
    let brand = this.state.list_brand;
    if (brand.length > 0) {
      return (Object.keys(brand).map((object, i) => {
        return(
          <option key={i} value={brand[object].id} >{brand[object].brand}</option>
        )
      }))
    }
  }

  renderSale() {
    let {status} = this.state;
    if(status == "1") {
        return (
          <input type="number" min="1" max="100" name="sale" placeholder="%" onChange={this.handleInput} />
        )
    }
  }

  renderFormError() {
    let formError = this.state.formError;
    let message = this.state.message;
    // console.log(message);
    if (Object.keys(formError).length > 0) {
      return (Object.keys(formError).map((key, index) => {
        return (
          <p className="error" key={index}>{formError[key]}</p>
        )
      }))
    } else {
      return (
        <p className="success">{message}</p>
      )
    }
  }

  render() {
    return (
      <div className="col-sm-9">
        <div className="signup-form">
          <h2> Create Product ! </h2>
          <div className="div_alert">
          {this.renderFormError()}
          </div>
          <form className="form_signup" onSubmit={ this.handleSubmit }>
            <input type="text" name="name" placeholder="Name Product" onChange={this.handleInput} />
            <input type="number" name="price" placeholder="Price" onChange={this.handleInput} />
            <select name="category" value={this.state.category} onChange={this.handleInput} >
              <option value="">vui long chon Category</option>
              {this.renderCategory()}
            </select>
            <select name="brand" value={this.state.brand} onChange={this.handleInput}>
              <option value="">vui long chon Brand</option>
              {this.renderBrand()}
            </select>
            <select name="status" value={this.state.status} onChange={this.handleInput}>
              <option value="">vui long chon status</option>
              <option value="0">New</option>
              <option value="1">Sale</option>
            </select>
            {this.renderSale()}
            <input type="text" name="company" placeholder="Company" onChange={this.handleInput} />
            <input type="file" name="image" multiple onChange={ this.handleInputFile } />
            <textarea name="detail" placeholder="Detail" onChange={this.handleInput}></textarea>
            <button type="submit" className="btn btn-default"> Add Product </button>
          </form>
        </div>
      </div>
    )
  }
}

export default AddProduct;
