import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Sidebar from '../Layout/Sidebar'
import Rate from '../Blog/Rate'
import axios from 'axios';

class Blog extends Component  {

  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
    this.renderData = this.renderData.bind(this);
  }

    componentDidMount() {
      axios.get('http://localhost/laravel/laravel/laravel/public/api/blog')
      .then(res => {
        this.setState({
          items: res.data.blog.data,
        })
      })
      .catch(error => console.log(error));
    }

    renderData(){
      let {items} = this.state;
      if (items instanceof Array) {
        return items.map((object, i) => {
          return (
            <div className="single-blog-post" key={i}>
              <h3>{object.title}</h3>
              <div className="post-meta">
								<ul>
									<li><i className="fa fa-user"></i> {object.id_auth}</li>
									<li><i className="fa fa-clock-o"></i> 1:33 pm</li>
									<li><i className="fa fa-calendar"></i>{object.created_at}</li>
								</ul>
							</div>
              <Link to={'/blog/detail/' + object.id}>
								<img src={'http://localhost/laravel/laravel/laravel/public/upload/Blog/image/'+object.image} alt={object.title} />
							</Link>
							<p>{object.description}</p>
							<Link className="btn btn-primary" to={'/blog/detail/' + object.id}>Read More</Link>
            </div>
          )
        })
      }
    }

    render() {
      return (
        <div className="col-sm-9">
          <div className="blog-post-area">
            <h2 className="title text-center">Latest From our Blog</h2>
            {this.renderData()}
          </div>
        </div>
      )
    }
}

export default Blog;
