import React from 'react';
import { AppContext } from '../../App';
import './index.css';

const ThreadItemComponent = ({
  id, lastMessage, memberIds, selected, handleSelect,
}) => (
  <li
    onClick={() => handleSelect()}
    className={`ThreadItem ${selected ? 'Selected' : ''}`}
  >
    <p>thread id: {id}</p>
    <p>last message: {lastMessage}</p>
    <p>members:</p>
    <ul>
      {memberIds.map(id => <li key={id}>{id}</li>)}
    </ul>
  </li>
);

const ThreadItem = ({ id }) => (
  // need to memoize this
  // compare state and actions?
  <AppContext.Consumer>
    {({ state, actions }) => {
      const { lastMessage } = state.threads[id];
      const memberIds = Object.keys(state.threads[id].members);
      const selected = (state.selectedThread === id);
      
      return (
        <ThreadItemComponent
          id={id}
          lastMessage={lastMessage}
          memberIds={memberIds}
          selected={selected}
          handleSelect={() => actions.selectThread(id)}
        />
      );
    }}
  </AppContext.Consumer>
);

export default ThreadItem;