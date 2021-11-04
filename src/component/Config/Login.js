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
import Signup from '../Config/Signup'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      level: '',
      formError: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.renderFormError = this.renderFormError.bind(this);
  }

  handleInput(e) {
    const nameInput = e.target.name;
    const value = e.target.value;

    this.setState({
      [nameInput]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let flag = true;
    let email = this.state.email;
    let password = this.state.password;
    let level = this.state.level;
    let errorSubmit = this.state.formError;

    if (!email) {
      flag = false;
      errorSubmit.email = "Vui long nhap lai Email";
    }

    if (!password) {
      flag = false;
      errorSubmit.password = "Vui long nhap lai password";
    }

    if (!level) {
      flag = false;
      errorSubmit.password = "Vui long nhap lai level";
    }

    if (!flag) {
      this.setState({
        formError: errorSubmit
      });
    }else {
      const user = {
        email : this.state.email,
        password : this.state.password,
        level : this.state.level
      }

      let response = this.state.response

      axios.post('http://localhost/laravel/laravel/laravel/public/api/login', user )
      .then(res => {
        if(res.data.errors) {
          this.setState({
            formError : res.data.errors
          })

        } else {

          let userData = {
            auth_token : res.data.success.token,
            auth : res.data.Auth
          }

          let appState = {
            user: userData
          }

          localStorage.setItem('appState', JSON.stringify(appState));

          this.setState({
            response: res.data.response,
            user: appState.user
          })

          this.props.history.push('/');
        }
      })

    }

  }

  renderFormError() {
    let formError = this.state.formError;
    let response = this.state.response;
    // console.log(message);
    if (Object.keys(formError).length > 0) {
      return (Object.keys(formError).map((key, index) => {
        return (
          <p className="error" key={index}>{formError[key]}</p>
        )
      }))
    } else {
      return (
        <p className="success">{response}</p>
      )
    }
  }

  render() {
    return (
      <section id="form">
          <div className="row">
            <div className="col-sm-6">
              <div className="signup-form">
                <h2> New User Login! </h2>
                <div className="div_alert">
                {this.renderFormError()}
                </div>
                <form className="form_signup" onSubmit={ this.handleSubmit }>
                  <input type="text" name="email" placeholder="Email Address" onChange={ this.handleInput } />
                  <input type="password" name="password" placeholder="Password" onChange={ this.handleInput } />
                  <input type="text" name="level" placeholder="Level" onChange={ this.handleInput } />
                  <button type="submit" className="btn btn-default"> Login </button>
                </form>
              </div>
            </ div>
            <div className="col-sm-6">
            <Signup />
            </div>
          </div>
      </section>
    )
  }
}

export default Login;
