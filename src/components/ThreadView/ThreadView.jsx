import React from 'react';

import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ThreadView = ({ match }) => {
  const { threadId } = match.params;
  return (
    <div>
      <MessageList threadId={threadId} />
      <MessageInput threadId={threadId} />
    </div>
  );
};
export default ThreadView;
