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

class Signup extends Component {

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
      message: '',
      formError: [],
      file: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleInputFile = this.handleInputFile.bind(this);
    this.renderFormError = this.renderFormError.bind(this);
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

    let flag = true;
    let name = this.state.name;
    let email = this.state.email;
    let password = this.state.password;
    let address = this.state.address;
    let phone = this.state.phone;
    let level = this.state.level;
    let file = this.state.file;
    let errorSubmit = this.state.formError;

    if (!name) {
      flag = false;
      errorSubmit.name = "Vui long nhap Name";
    }

    if (!email) {
      flag = false;
      errorSubmit.email = "Vui long nhap Email";
    }

    if (!password) {
      flag = false;
      errorSubmit.password = "Vui long nhap password";
    }

    if (!address) {
      flag = false;
      errorSubmit.address = "Vui long nhap address";
    }

    if (!phone) {
      flag = false;
      errorSubmit.phone = "Vui long nhap SDT";
    }

    if (!level) {
      flag = false;
      errorSubmit.level = "Vui long nhap level";
    }
    // console.log(file)
    if (file['name'] == undefined) {
      flag = false;
      errorSubmit.file = "Vui long nhap Avatar";
    } else  {
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
    }else {
      const user = {
        name : this.state.name,
        email : this.state.email,
        password : this.state.password,
        address : this.state.address,
        level : this.state.level,
        phone : this.state.phone,
        avatar : this.state.avatar,
      }

      let message = this.state.message

      axios.post('http://localhost/laravel/laravel/laravel/public/api/register', user )
      .then(res => {
        if(res.data.errors) {
          this.setState({
            formError : res.data.errors
          })
        } else {
          // const nameInput = this.state.name;
          // const value = '';
          this.setState({
            message: res.data.message,
            // [nameInput]: value
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
        <div className="signup-form">
          <h2> New User Signup! </h2>
          <div className="div_alert">
              {this.renderFormError()}
          </div>
          <form action="#" className="form_signup" onSubmit={ this.handleSubmit }>
            <input type="text" name="name" placeholder="Name" onChange={ this.handleInput } />
            <input type="text" name="email" placeholder="Email Address" onChange={ this.handleInput } />
            <input type="password" name="password" placeholder="Password" onChange={ this.handleInput } />
            <input type="text" name="address" placeholder="Address" onChange={ this.handleInput } />
            <input type="text" name="phone" placeholder="Phone" onChange={ this.handleInput } />
            <input type="text" name="level" placeholder="Level" onChange={ this.handleInput } />
            <input type="file" name="avatar" placeholder="Avatar" onChange={ this.handleInputFile } />
            <button type="submit" className="btn btn-default"> Signup </button>
          </form>
        </div>
    )
  }
}

export default Signup;
