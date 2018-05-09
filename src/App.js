import React, { Component } from 'react';
import './App.css';

import { login } from './api';

class App extends Component {
  async componentDidMount() {
    login();
  }
  render() {
    return (
      <div>
        hi
      </div>
    );
  }
}
export default App;
