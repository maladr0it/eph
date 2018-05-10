import React from 'react';
import { AppContext } from '../../App';
import Message from './Message';

const MessageListComponent = ({ messageIds }) => console.log(messageIds) ||
(
  <ul>
    {messageIds.map(id => (
      <Message key={id} id={id} />
    ))}
  </ul>
);

const MessageList = ({ threadId }) => (
  <AppContext.Consumer>
    {({ state }) => {
      // TODO: replace this with a selector
      const { messageIds = [] } = state.threads[threadId] || { messageIds: [] };
      return (
        <MessageListComponent messageIds={messageIds} />
      );
    }}
  </AppContext.Consumer>
);

export default MessageList;
