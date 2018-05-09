import React, { Component } from 'react';
import './App.css';

import {
  login,
  createThread,
} from './api';

class App extends Component {
  async componentDidMount() {
    const user = await login();
    console.log(user);
  }
  render() {
    return (
      <div>
        <button onClick={() => createThread()}>+</button>
      </div>
    );
  }
}
export default App;
