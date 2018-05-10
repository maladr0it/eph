import React from 'react';
import { AppContext } from '../../App';
import './index.css';

const ThreadItem = ({ id }) => (
  <AppContext.Consumer>
    {({ state, actions }) => {
      const { lastMessage } = state.threads[id];
      const memberIds = Object.keys(state.threads[id].members);
      const selected = (state.selectedThread === id) ? 'Selected' : '';
      return (
        <li
          onClick={() => actions.threadSelected(id)}
          className={`ThreadItem ${selected}`}
        >
          <p>thread id: {id}</p>
          <p>last message: {lastMessage}</p>
          <p>members:</p>
          <ul>
            {memberIds.map(id => <li key={id}>{id}</li>)}
          </ul>
        </li>
      );
    }}
  </AppContext.Consumer>
);

export default ThreadItem;