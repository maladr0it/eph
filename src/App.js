import React, { Component } from 'react';

// test IDs
// PC:    ZNO5s71UJndyFxNu7alLPrVxfro1
// PHONE: VhuzOP1UNdT7HN805d6db8eDs1e2 

import ThreadList from './components/ThreadList';
import MessageList from './components/MessageList';

import {
  login,
  createThread,
  listenForThreads,
  listenForMessages,
} from './api';
import './App.css';
import { isContext } from 'vm';

export const AppContext = new React.createContext();

class App extends Component {
  state = {
    userId: '',
    threadIds: [],
    selectedThread: '',
    threads: {},
    messages: {},
  }
  actions = {
    threadSelected: (id) => {
      this.setState({
        selectedThread: id,
      });
    },
  }
  // store = {
  //   state: this.state,
  //   actions: this.actions,
  // }
  async login() {
    const userId = await login();
    this.setState({
      userId,
    });
  }
  
  threadAdded(id, data) {
    this.setState({
      threadIds: this.state.threadIds.concat(id),
      threads: {
        ...this.state.threads,
        [id]: data,
      },
    });
  }
  messageAdded(threadId, messageId, messageData) {
    console.log(`adding a new message ${messageId} to thread ${threadId}`);
    this.setState({
      threads: {
        ...this.state.threads,
        [threadId]: {
          ...this.state.threads[threadId],
          messageIds: (this.state.threads[threadId].messageIds || []).concat(messageId),
        },
      },
      messages: {
        ...this.state.messages,
        [messageId]: messageData,
      },
    });
  }

  render() {
    return (
      <div>
        <h3>logged in as: {this.state.userId}</h3>
        <button onClick={() => this.login()}>
          LOGIN
        </button>
        <button
          onClick={() => listenForMessages(
            this.state.threadIds[0],
            (threadId, id, data) => this.messageAdded(threadId, id, data),
          )}
        >
          LISTEN_MESSAGES
        </button>
        <button
          onClick={() => listenForThreads(
            this.state.userId,
            (id, data) => this.threadAdded(id, data)
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
        <AppContext.Provider value={{ state: this.state, actions: this.actions }}>
          <ThreadList ids={this.state.threadIds} />
          <MessageList />
        </AppContext.Provider>
      </div>
    );
  }
}
export default App;

// example state:
const sampleState = {
  userId: 'ZNO5s71UJndyFxNu7alLPrVxfro1',
  threadIds: [
    '-LC7STkh2ozgLHQvgsmO',
    '-LC7STxbaNTSjdv5nBdZ',
    '-LC7STzWIokqsB-iYXGz',
  ],
  threads: {
    '-LC7STkh2ozgLHQvgsmO': {
      lastUpdated: '2018-05-03T14:59:55.708Z',
      messageIds: [
        '-LC7W2TSDJWUB31IGKUc',
        '-LC7W5x9U-jr3sO0cccA',
      ],
    },
    '-LC7STxbaNTSjdv5nBdZ': {
      lastUpdated: '2018-05-03T15:41:55.708Z',
      messageIds: [
        '-LC7W6Alj1cnwU7pPPYx',
      ],
    }
  },
  messages: {
    '-LC7W2TSDJWUB31IGKUc': {
      author: 'ZNO5s71UJndyFxNu7alLPrVxfro1',
      text: 'yo',
    },
    '-LC7W5x9U-jr3sO0cccA': {
      author: 'VhuzOP1UNdT7HN805d6db8eDs1e2',
      text: 'hiya',
    },
    '-LC7W6Alj1cnwU7pPPYx': {
      author: 'ZNO5s71UJndyFxNu7alLPrVxfro1',
      text: 'XD'
    },
  },
};