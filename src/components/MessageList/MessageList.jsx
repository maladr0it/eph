import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Message from './Message';

import { getMessageIdsByThread } from '../../reducers/threads';

const MessageListComponent = ({ threadId, messageIds }) => (
  <div>
    <p>SELECTED THREAD: {threadId}</p>
    <p>MESSAGES:</p>
    <ul>{messageIds.map(id => <li key={id}>{id}</li>)}</ul>
  </div>
);
const mapStateToProps = (state, ownProps) => {
  const { threadId } = ownProps.match.params;
  return {
    threadId,
    messageIds: getMessageIdsByThread(threadId),
  };
};
const MessageList = connect(mapStateToProps)(MessageListComponent);
export default MessageList;

MessageListComponent.propTypes = {
  threadId: PropTypes.string.isRequired,
  messageIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};
