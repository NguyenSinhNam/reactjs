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

class EditProduct extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: '',
      category: '',
      brand: '',
      status: 0,
      sale: 0,
      detail: '',
      avatar: '',
      file: [],
      formError: [],
      list_category: '',
      list_brand: '',
      company: '',
      idUser: '',
      image: '',
      avatarCheckBox: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleInputFile = this.handleInputFile.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.renderCategory = this.renderCategory.bind(this);
    this.renderBrand = this.renderBrand.bind(this);
    this.renderFormError = this.renderFormError.bind(this);
    this.renderSale = this.renderSale.bind(this);
    this.renderProduct = this.renderProduct.bind(this);
  }

  componentDidMount() {

    const userData = JSON.parse(localStorage["appState"])

    let url = 'http://localhost/laravel/laravel/laravel/public/api/user/product/' + this.props.match.params.id
    let accessToken = userData.user.auth_token;
    let config = {
      headers: {
        'Authorization' : 'Bearer '+ accessToken,
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    };
    axios.get(url, config )
    .then(res => {
      let productData = res.data.data
      this.setState({
        idUser: productData.id_user,
        name: productData.name,
        price: productData.price,
        category: productData.id_category,
        brand: productData.id_brand,
        status: productData.status,
        sale: productData.sale,
        detail: productData.detail,
        image: productData.image,
        company: productData.company_profile
      })
    })
    .catch(error => console.log(error));

    //
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

  handleCheckbox(e) {
    let avatarCheckBox = this.state.avatarCheckBox;
    const checked = e.target.checked;
    const value = e.target.value;
    if(checked == true) {
      avatarCheckBox.push(value)
      this.setState({
        avatarCheckBox: avatarCheckBox
      })
    } else {
        let index = avatarCheckBox.indexOf(value);
        if (index > -1) {
            avatarCheckBox.splice(index, 1);
            this.setState({
              avatarCheckBox: avatarCheckBox
            })
        }
    }
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
    let company = this.state.company;
    let detail = this.state.detail;
    let file = this.state.file;
    let avatarCheckBox = this.state.avatarCheckBox;
    let errorSubmit = this.state.formError;
    let image = this.state.image

    if (!name) {
      flag = false;
      errorSubmit.name = "Vui long nhap Ten Product";
    }

    if (!price) {
      flag = false;
      errorSubmit.price = "Vui long nhap Gia san pham";
    }

    if (!company) {
      flag = false;
      errorSubmit.price = "Vui long nhap Công ty";
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

    if((image.length - avatarCheckBox.length) + file.length > 3) {
      flag = false;
      errorSubmit.file = "Số lượng ảnh không lớn hơn 3";
    } else {
      if (image.length - avatarCheckBox.length + file.length == 0) {
        flag = false;
        errorSubmit.file = "Vui lòng tải ảnh lên";
      } else {
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
      }
    }

    if (!flag) {
      this.setState({
        formError: errorSubmit
      });
    } else {
      const userData = JSON.parse(localStorage["appState"])

      let url = 'http://localhost/laravel/laravel/laravel/public/api/user/edit-product/' + this.props.match.params.id
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

      Object.keys(this.state.avatarCheckBox).map((item, i) => {
          formData.append("avatarCheckBox[]", this.state.avatarCheckBox[item]);
          console.log(avatarCheckBox)
      });

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
    let statusProduct = this.state.status;
    if(statusProduct == "1") {
        return (
          <input type="number" min="1" max="100" name="sale" value={this.state.sale} onChange={this.handleInput} />
        )
    }
  }

  renderProduct() {
    let image = this.state.image;
    let idUser = this.state.idUser;
    if(image) {
      return image.map((object, i) => {
        return (
          <label id={object} key={i}>
            <img src={'http://localhost/laravel/laravel/laravel/public/upload/user/product/' + idUser + '/' + object} />
            <input name={object} type="checkbox" onChange={this.handleCheckbox} value={object} />
          </label>
        )
      })
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
    console.log()
    return (
      <div className="col-sm-9">
        <div className="signup-form">
          <h2> Edit Product ! </h2>
          <div className="div_alert">
          {this.renderFormError()}
          </div>
          <form className="form_signup" onSubmit={ this.handleSubmit }>
            <input type="text" name="name" value={this.state.name} onChange={this.handleInput} />
            <input type="number" name="price" value={this.state.price} onChange={this.handleInput} />
            <select name="category" value={this.state.category} onChange={this.handleInput} >
              {this.renderCategory()}
            </select>
            <select name="brand" value={this.state.brand} onChange={this.handleInput}>
              {this.renderBrand()}
            </select>
            <select name="status"  value={this.state.status} onChange={this.handleInput}>
              <option value="0">New</option>
              <option value="1">Sale</option>
            </select>
            {this.renderSale()}
            <input type="text" name="company" value={this.state.company} onChange={this.handleInput} />
            <input type="file" name="image" multiple onChange={ this.handleInputFile } />
            <div className="imageProduct">
              {this.renderProduct()}
            </div>
            <textarea name="detail" value={this.state.detail} onChange={this.handleInput}></textarea>
            <button type="submit" className="btn btn-default"> Edit Product </button>
          </form>
        </div>
      </div>
    )
  }
}

export default EditProduct;
