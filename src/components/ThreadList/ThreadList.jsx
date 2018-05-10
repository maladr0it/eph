import React from 'react';
import ThreadItem from './ThreadItem';

const ThreadList = ({ ids }) => {

  return (
    <div>
      THREAD LIST:
      <ul>
        {ids.map(id => (
          <ThreadItem key={id} id={id} />
        ))}
      </ul>
    </div>
  );
};

export default ThreadList;
