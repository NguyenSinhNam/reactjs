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

class ListComment extends Component {

  constructor(props) {
    super(props)
    this.state = {
      comment: '',
      idCmt: ''
    }
    this.renderData = this.renderData.bind(this);
    this.getId = this.getId.bind(this);
  }

  getId(e) {
    this.props.idSubComment(e.target.id)
  }

  renderData(){
    let {listComment} = this.props;
    if (listComment.length > 0) {
      return listComment.map((object, i) => {
        if(object.id_comment == 0) {
        return (
          <>
          <li className="media" key={i}>
            <a className="pull-left">
              <img className="media-object" src={'http://localhost/laravel/laravel/laravel/public/upload/user/avatar/'+ object.image_user} alt="" />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li><i className="fa fa-user"></i>{object.name_user}</li>
                <li><i className="fa fa-clock-o"></i> {object.created_at}</li>
                <li><i className="fa fa-calendar"></i> {object.created_at}</li>
              </ul>
              <p>{object.comment}</p>
              <a className="btn btn-primary" id={object.id} onClick={this.getId} ><i className="fa fa-reply"></i>Replay</a>
            </div>
          </li>
          {
            listComment.map((object2, u) => {
              if(object2.id_comment == object.id) {
                return (
                  <li className="media second-media" key={u}>
                    <a className="pull-left">
                      <img className="media-object" src={'http://localhost/laravel/laravel/laravel/public/upload/user/avatar/'+ object2.image_user} alt="" />
                    </a>
                    <div className="media-body">
                      <ul className="sinlge-post-meta">
                        <li><i className="fa fa-user"></i>{object2.name_user}</li>
                        <li><i className="fa fa-clock-o"></i> {object2.created_at}</li>
                        <li><i className="fa fa-calendar"></i> {object2.created_at}</li>
                      </ul>
                      <p>{object2.comment}</p>
                    </div>
                  </li>
                )
              }
            })
          }
          </>
        )
      }

      })
    }
  }

  render() {
    return (
      <div className="response-area">
        <h2>3 RESPONSES</h2>
        <ul className="media-list">
          {this.renderData()}
        </ul>
      </div>
    )
  }
}

export default ListComment;
