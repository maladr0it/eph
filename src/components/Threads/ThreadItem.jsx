import React from 'react';

const ThreadItem = ({
  id, memberIds = [], lastMessage = 'EMPTY'
}) => (
  <div>
    <p>thread id: {id}</p>
    <p>last message: {lastMessage}</p>
    <p>members:</p>
    <ul>
      {memberIds.map(id => <li key={id}>{id}</li>)}
    </ul>
  </div>
);

export default ThreadItem;