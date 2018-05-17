import React from 'react';
import { Link } from 'react-router-dom';

import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ThreadView = ({ match }) => {
  const { threadId } = match.params;
  return (
    <div>
      <Link to="/threads">BACK</Link>
      <MessageList threadId={threadId} />
      <MessageInput threadId={threadId} />
    </div>
  );
};
export default ThreadView;
