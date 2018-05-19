import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { getThread, getUnread } from '../../reducers/threads';
import './index.css';

const ThreadComponent = ({
  threadId, unread, lastMessage, match,
}) => (
  <li>
    <p>ID: {threadId}</p>
    {/* <p>USERID: {userId}</p> */}
    <p>UNREAD: {unread}</p>
    <p>lastMessage: {lastMessage}</p>
    <Link to={`${match.url}/${threadId}`}>SELECT</Link>
  </li>
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
const Thread = withRouter(connect(mapStateToProps)(ThreadComponent));
export default Thread;

ThreadComponent.propTypes = {
  threadId: PropTypes.string.isRequired,
  lastMessage: PropTypes.string,
  unread: PropTypes.number,
};
ThreadComponent.defaultProps = {
  lastMessage: 'NONE',
  unread: 'NONE',
};
