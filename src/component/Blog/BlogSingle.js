import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Sidebar from '../Layout/Sidebar'
import Rate from '../Blog/Rate'
import StarRatings from 'react-star-ratings';
import ListComment from '../Blog/ListComment'
import Comment from '../Blog/Comment'
import axios from 'axios';

class BlogSingle extends Component  {

  constructor(props) {
    super(props)
    this.state = {
      single: '',
      comment: '',
      next:'',
      prev:'',
      cmtChild: '',
      rating: '',
      message: '',
      countItems: 0,
      idSubComment: '',
    }
    this.renderData = this.renderData.bind(this);
    this.pagination = this.pagination.bind(this);
    this.addComment = this.addComment.bind(this);
    this.idSubComment = this.idSubComment.bind(this);
  }

    componentDidMount() {
      axios.get('http://localhost/laravel/laravel/laravel/public/api/blog/detail/' + this.props.match.params.id )
      .then(res => {
        // console.log(res.data.data.comment)
        this.setState({
          single: res.data.data,
          comment: res.data.data.comment
        })
      })
      .catch(error => console.log(error));
      //

      axios.get('http://localhost/laravel/laravel/laravel/public/api/blog/detail-pagination/' + this.props.match.params.id )
      .then(res => {
        this.setState({
          next: res.data.next,
          prev: res.data.previous
        })
      })
      .catch(error => console.log(error));

      axios.get('http://localhost/laravel/laravel/laravel/public/api/blog/rate/' + this.props.match.params.id )
      .then(res => {

        let ratingData = res.data.data;
        let countItems = 0;

        // countItems = parseInt(ratingData.length)
        this.setState({
          countItems : parseInt(ratingData.length)
        })
      })
      .catch(error => console.log(error));
    }

    pagination(e){
      let getId = e.target.id;

      axios.get('http://localhost/laravel/laravel/laravel/public/api/blog/detail-pagination/' + getId )
      .then(res => {
        this.setState({
          single: res.data.data,
          next: res.data.next,
          prev: res.data.previous
        })
      })
      .catch(error => console.log(error));
    }

    addComment(data){
        this.setState({comment: this.state.comment.concat(data)})
    }

    idSubComment(id){
      this.setState({
        idSubComment : id
      })
    }

    renderData() {
      let {single} = this.state;
      let buttonPrev = '';
      let buttonNext = '';

      if (this.state.prev) {
        buttonPrev = <li><a id={this.state.prev} onClick={this.pagination}>Pre</a></li>
      }

      if (this.state.next) {
        buttonNext = <li><a id={this.state.next} onClick={this.pagination}>Next</a></li>
      }

        return (
          <div className="single-blog-post">
            <h3>{single['title']}</h3>
            <div className="post-meta">
              <ul>
                <li><i className="fa fa-user"></i> {single['id_auth']}</li>
                <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                <li><i className="fa fa-calendar"></i> {single['created_at']}</li>
              </ul>
            </div>
            <Link to={'http://localhost/laravel/laravel/laravel/public/upload/Blog/image/'+single.image}>
              <img src={'http://localhost/laravel/laravel/laravel/public/upload/Blog/image/'+single.image} alt="" />
            </Link>
            {single['description']}

            <div className="pager-area">
              <ul className="pager pull-right">
              {buttonPrev}
              {buttonNext}
              </ul>
            </div>
            <div className="rating-area">
						<ul className="ratings">
							<li className="rate-this">Rate this item:</li>
							<li>
								<Rate idBlog = {this.props.match.params.id} rating = {this.state.rating} message = {this.props.message} />
							</li>
							<li className="color">({this.state.countItems} votes)</li>
						</ul>
						<ul className="tag">
							<li>TAG:</li>
							<li><a className="color" href="">Pink <span>/</span></a></li>
							<li><a className="color" href="">T-Shirt <span>/</span></a></li>
							<li><a className="color" href="">Girls</a></li>
						</ul>
					</div>

        </div>
      )
    }

    render() {
      return (
        <div className="col-sm-9">
          <div className="blog-post-area">
            <h2 className="title text-center">LATEST FROM OUR BLOG</h2>
              {this.renderData()}
          </div>
          <ListComment listComment = {this.state.comment} idSubComment = {this.idSubComment}/>
          <Comment idBlog = {this.props.match.params.id} addComment = {this.addComment} idSubComment = {this.state.idSubComment} />
        </div>
      )
    }
}

export default BlogSingle;
