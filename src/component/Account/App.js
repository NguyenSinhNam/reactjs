import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import MenuLeft from './MenuLeft'

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <>
        <MenuLeft />
        {this.props.children}
        </>
    );
  }
}

export default App;
