import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { getThread } from '../../reducers/threads';
import './index.css';

const ThreadComponent = ({
  userId, unread, id, lastMessage, match,
}) => (
  <li>
    <p>ID: {id}</p>
    <p>USERID: {userId}</p>
    <p>UNREAD: {unread[userId] || 'ZERO'}</p>
    <p>lastMessage: {lastMessage}</p>
    <Link to={`${match.url}/${id}`}>SELECT</Link>
  </li>
);
const mapStateToProps = (state, ownProps) => ({
  userId: state.user.userId,
  ...getThread(state.threads, ownProps.id),
});
const Thread = withRouter(connect(mapStateToProps)(ThreadComponent));
export default Thread;

ThreadComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  lastMessage: PropTypes.string,
  unread: PropTypes.objectOf(PropTypes.number).isRequired,
};
ThreadComponent.defaultProps = {
  lastMessage: 'NONE',
};
