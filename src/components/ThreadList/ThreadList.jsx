import React from 'react';
import ThreadItem from './ThreadItem';

// TODO: change to pureComponent
const ThreadList = ({ ids }) => (
  <div>
      THREAD LIST:
      <ul>
        {ids.map(id => (
          <ThreadItem key={id} id={id} />
        ))}
      </ul>
    </div>
);

export default ThreadList;
