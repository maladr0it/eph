import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getThread, getUnread } from '../../reducers/threads';

const ThreadDetailComponent = ({ threadId, unread, lastMessage }) => (
  <div>
    <p>Thread Id: {threadId}</p>
    <p>Last Message: {lastMessage}</p>
    <p>Unread: {unread}</p>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  const thread = getThread(state.threads, ownProps.threadId);
  if (!thread) {
    return {};
  }
  const { lastMessage } = thread;
  return {
    lastMessage,
    unread: getUnread(state.threads, ownProps.threadId, state.user.userId),
  };
};
const ThreadDetail = connect(mapStateToProps)(ThreadDetailComponent);
export default ThreadDetail;

ThreadDetailComponent.propTypes = {
  threadId: PropTypes.string.isRequired,
  lastMessage: PropTypes.string,
  unread: PropTypes.number,
};
ThreadDetailComponent.defaultProps = {
  lastMessage: 'NONE',
  unread: 'NONE',
};
