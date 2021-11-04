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
import Rate from '../Blog/Rate'

class Comment extends Component {

  constructor(props) {
    super(props)
    this.state = {
      comment: '',
      message: '',
      error: '',
      rating: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  handleInput(e) {
    const nameInput = e.target.name;
    const value = e.target.value;

    this.setState({
      [nameInput]: value
    });
  }

  submitComment(e) {

    e.preventDefault();

    const userData = JSON.parse(localStorage["appState"])

    if(userData) {
      let {comment} = this.state;
      let {rating} = this.state;
      if (comment) {
        let url = 'http://localhost/laravel/laravel/laravel/public/api/blog/comment/' + this.props.idBlog
        let accessToken = userData.user.auth_token;
        let config = {
          headers: {
            'Authorization' : 'Bearer '+ accessToken,
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          }
        };

        const formData = new FormData();
        formData.append('id_blog', this.props.idBlog);
        formData.append('id_user', userData.user.auth.id);
        formData.append('id_comment', this.props.idSubComment ? this.props.idSubComment : 0);
        formData.append('comment', this.state.comment);
        formData.append('image_user', userData.user.auth.avatar);
        formData.append('name_user', userData.user.auth.name);

        axios.post(url, formData, config)
          .then(response => {
            if (response.data.data) {
              this.props.addComment(response.data.data)
            }
          })

      } else {
        this.setState ({
          error: "Vui long nhap de binh luan"
        })
      }
    } else {


      this.setState ({
        error: "Vui long dang nhap de binh luan"
      })
    }
  }

  render() {
    return (
      <div className="replay-box">
        <div className="row">
          <div className="col-sm-12">
            <h2>Leave a replay</h2>
            <div className="text-area">
              <div className="error">{this.state.error}</div>
              <div className="success">{this.props.message}</div>
              <div className="blank-arrow">
                <label>Your Message</label>
              </div>
              <span>*</span>
              <form onSubmit={this.submitComment}>

              <textarea name="comment" rows="11" onChange={ this.handleInput }></textarea>
              <button className="btn btn-primary" type="submit">post comment</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Comment;
