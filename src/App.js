import React, { Component } from 'react';

// test IDs
// PC:    ZNO5s71UJndyFxNu7alLPrVxfro1
// PHONE: VhuzOP1UNdT7HN805d6db8eDs1e2 

import ThreadList from './components/ThreadList'

import {
  login,
  createThread,
  listenForThreads,
} from './api';
import './App.css';

class App extends Component {
  state = {
    userId: '',
    threads: [],
    messages: [],
  }
  async login() {
    const userId = await login();
    this.setState({
      userId,
    });
  }

  addThread(threadId) {
    this.setState({
      threads: this.state.threads.concat(threadId),
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h3>logged in as: {this.state.userId}</h3>
        <button onClick={() => this.login()}>
          LOGIN
        </button>
        <button
          onClick={() => listenForThreads(
            this.state.userId,
            threadId => this.addThread(threadId)
          )}
        >
          LISTEN_THREADS
        </button>
        <button
          onClick={() => createThread([
            'ZNO5s71UJndyFxNu7alLPrVxfro1', 
            'VhuzOP1UNdT7HN805d6db8eDs1e2',
          ])}
        >
          NEW_THREAD
        </button>
        <ThreadList threadIds={this.state.threads} />
      </div>
    );
  }
}
export default App;

/* <button
  onClick={() => getThreads('ZNO5s71UJndyFxNu7alLPrVxfro1')}
>
  GET_THREADS
</button> */
