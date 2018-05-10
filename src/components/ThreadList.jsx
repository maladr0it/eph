import React from 'react';

const ThreadList = ({ threadIds }) => {
  const threads = threadIds.map(id => (
    <li key={id}>
      ID: {id}
    </li>
  ));

  return (
    <ul>
      {threads}
    </ul>
  );
};

export default ThreadList;