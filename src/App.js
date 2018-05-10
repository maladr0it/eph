import React, { Component } from 'react';
import './App.css';

// test IDs
// PC:    ZNO5s71UJndyFxNu7alLPrVxfro1
// PHONE: VhuzOP1UNdT7HN805d6db8eDs1e2 

import {
  login,
  createThread,
  getThreads,
} from './api';

class App extends Component {
  async componentDidMount() {
    console.log('initialised');
  }
  render() {
    return (
      <div>
        <button onClick={() => login()}>
          LOGIN
        </button>
        <button
          onClick={() => getThreads('ZNO5s71UJndyFxNu7alLPrVxfro1')}
        >
          GET_THREADS
        </button>
        <button
          onClick={() => createThread([
            'ZNO5s71UJndyFxNu7alLPrVxfro1', 
            'VhuzOP1UNdT7HN805d6db8eDs1e2',
          ])}
        >
          NEW_THREAD
        </button>
      </div>
    );
  }
}
export default App;
