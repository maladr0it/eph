import React from 'react';
import { AppContext } from '../../App';

const MessageComponent = ({ author, text }) => (
  <li>
    <p>AUTHOR: {author || 'NONE'}</p>
    <p>TEXT: {text || 'NONE'}</p>
  </li>
);

const Message = ({ id }) => (
  <AppContext.Consumer>
    {({ state }) => {
      const { author, text } = state.messages[id];
      return (
        <MessageComponent author={author} text={text} />
      );
    }}
  </AppContext.Consumer>
);

export default Message;
