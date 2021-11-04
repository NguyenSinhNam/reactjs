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

class Edit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      address: '',
      phone: '',
      level: '',
      avatar: '',
      file: '',
      id: '',
      message: '',
      formError: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleInputFile = this.handleInputFile.bind(this);
    this.renderFormError = this.renderFormError.bind(this);
  }

  componentDidMount() {
    let userData = JSON.parse(localStorage.getItem('appState'));
    if(userData) {
      this.setState({
          name: userData.user.auth.name,
          email: userData.user.auth.email,
          address: userData.user.auth.address,
          phone: userData.user.auth.phone,
          level: userData.user.auth.level,
          avatar: userData.user.auth.avatar,
          id: userData.user.auth.id,
      })
    }
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

    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        avatar: e.target.result, //cai nay de gui qua api
        file: file[0] //cai nay de toan bo thong file upload vao file de xuong check validate
      })
    };
    reader.readAsDataURL(file[0]);
  }

  handleSubmit(e) {
    e.preventDefault();

    let userData = JSON.parse(localStorage.getItem('appState'));

    let flag = true;
    let name = this.state.name;
    let email = this.state.email;
    let password = this.state.password;
    let address = this.state.address;
    let phone = this.state.phone;
    let file = this.state.file;
    let errorSubmit = this.state.formError;

    if (!name) {
      flag = false;
      errorSubmit.name = "Vui long nhap Name";
    }

    if (!address) {
      flag = false;
      errorSubmit.address = "Vui long nhap address";
    }

    if (!phone) {
      flag = false;
      errorSubmit.phone = "Vui long nhap SDT";
    }

    if (password) {
      this.setState({
        password: this.state.password
      })
    }

    if(file['type']) {
      if (file['size'] > 1048576) {
        flag = false;
        errorSubmit.file = "Kich thuoc anh qua lon";
      }
      const  fileType = file['type'];
      const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
      if (!validImageTypes.includes(fileType)) {
        flag = false;
        errorSubmit.file = "Day khong phai la anh";
      }
    }

    if (!flag) {
      this.setState({
        formError: errorSubmit
      });
    } else {
      let userData = JSON.parse(localStorage.getItem('appState'));
      let url = 'http://localhost/laravel/laravel/laravel/public/api/user/update/' + this.state.id
      let accessToken = userData.user.auth_token;

      let config = {
        headers: {
          'Authorization' : 'Bearer '+ accessToken,
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      };
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', userData.user.auth.email);
      formData.append('password', password);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('level', 0);
      if(this.state.avatar) {
          formData.append('avatar', this.state.avatar);
      }

      let message = this.state.message

      axios.post(url, formData, config)
      .then(response => {
        console.log(response)
        if (response) {
          let userData = {
            auth_token : response.data.success.token,
            auth : response.data.Auth
          }

          let appState = {
            user: userData
          }

          localStorage.setItem('appState', JSON.stringify(appState));
          this.setState({
            message: response.data.response
          })
        }
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
    return (
      <div className="col-sm-9">
        <div className="signup-form">
          <h2> Edit Account </h2>
          <div className="div_alert">
              {this.renderFormError()}
          </div>
          <form action="#" className="form_signup" onSubmit={ this.handleSubmit }>
            <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={ this.handleInput } />
            <input type="text" name="email" placeholder="Email Address" disable value={this.state.email} />
            <input type="password" name="password" placeholder="******" onChange={ this.handleInput } />
            <input type="text" name="address" placeholder="Address" value={this.state.address} onChange={ this.handleInput } />
            <input type="text" name="phone" placeholder="Phone" value={this.state.phone} onChange={ this.handleInput } />
            <input type="text" name="level" placeholder="Level" disable value={this.state.level} />
            <input type="file" name="avatar" placeholder="Avatar" onChange={ this.handleInputFile } />
            <button type="submit" className="btn btn-default"> Update </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Edit;
