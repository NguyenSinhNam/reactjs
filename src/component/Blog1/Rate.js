import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

class Rate extends Component  {

  constructor(props) {
    super(props)
    this.changeRating = this.changeRating.bind(this);
    this.state = {
      error: '',
      message: '',
      rating: 0,
      countItems: 0
    };
  }

  componentDidMount() {
    axios.get('http://localhost/laravel/laravel/laravel/public/api/blog/rate/' + this.props.idBlog )
    .then(res => {

      let ratingData = res.data.data;

      let totalRate = 0;

      let countItems = 0

      ratingData.map((ratingData, i)  => {
        totalRate = parseInt(totalRate + ratingData.rate)
      })

      countItems = parseInt(ratingData.length)

      this.setState({
        rating: (totalRate / countItems)
      })
    })
    .catch(error => console.log(error));
  }

  changeRating( newRating ) {
    this.setState({
      rating: newRating
    });

    const ratingData = JSON.parse(localStorage["appState"])

    if(ratingData) {

      let {rating} = this.state;

      let url = 'http://localhost/laravel/laravel/laravel/public/api/blog/rate/' + this.props.idBlog
      let accessToken = ratingData.user.auth_token;
      let config = {
        headers: {
          'Authorization' : 'Bearer '+ accessToken,
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      };

      const formData = new FormData();
      formData.append('blog_id', this.props.idBlog);
      formData.append('user_id', ratingData.user.auth.id);
      formData.append('rate', newRating);

      axios.post(url, formData, config)
      .then(res => {
        if (res.data) {
            this.setState({
              message: res.data.message
            })
        } else {

        }
      })

    } else {
      this.setState ({
        error: "Vui long dang nhap de binh luan"
      })
    }
  }

  render() {
    return (
      <StarRatings
        rating={this.state.rating}
        starRatedColor="orange"
        starHoverColor="orange"
        changeRating={this.changeRating}
        numberOfStars={5}
        name='rating'
      />
    )
  }
}

export default Rate;
