import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Message from './Message';

import { getMessageIdsByThread } from '../../reducers/messageIds';

const MessageListComponent = ({ messageIds }) => (
  <div>
    <ul>{messageIds.map(id => <Message key={id} id={id} />)}</ul>
  </div>
);
const mapStateToProps = (state, ownProps) => {
  const { threadId } = ownProps;
  return {
    threadId,
    messageIds: getMessageIdsByThread(state.messageIds, threadId),
  };
};
const MessageList = connect(mapStateToProps)(MessageListComponent);
export default MessageList;

MessageListComponent.propTypes = {
  messageIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};
