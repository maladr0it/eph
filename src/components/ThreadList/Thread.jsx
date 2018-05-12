import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import './index.css';

const ThreadComponent = ({ id, lastMessage, match }) => (
  <li>
    <p>ID: {id}</p>
    <p>lastMessage: {lastMessage}</p>
    <Link to={`${match.url}/${id}`}>SELECT</Link>
  </li>
);
const mapStateToProps = (state, ownProps) => ({
  lastMessage: state.threads[ownProps.id].lastMessage, // TODO: replace with selector
});
const Thread = withRouter(connect(mapStateToProps)(ThreadComponent));
export default Thread;

ThreadComponent.propTypes = {
  id: PropTypes.string.isRequired,
  lastMessage: PropTypes.string,
};
ThreadComponent.defaultProps = {
  lastMessage: 'NONE',
};
