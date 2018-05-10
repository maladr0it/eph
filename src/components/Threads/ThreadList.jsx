import React from 'react';

import { AppContext } from '../../App';
import ThreadItem from './ThreadItem';

const ThreadList = ({ ids }) => {

  return (
    <AppContext.Consumer>
      {state => console.log(state) || (
        ids.map(id => (
          <ThreadItem
            key={id}
            id={id}
            memberIds={Object.keys(state.threads[id].members)}
            lastMessage={state.threads[id].lastMessage}
          />
        ))
      )}
    </AppContext.Consumer>
  );
};

export default ThreadList;