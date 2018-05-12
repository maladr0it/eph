import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css';

const ThreadComponent = ({ id, lastMessage }) => (
  <li>
    <p>ID: {id}</p>
    <p>lastMessage: {lastMessage}</p>
  </li>
);

const mapStateToProps = (state, ownProps) => ({
  lastMessage: state.threads[ownProps.id].lastMessage, // TODO: replace with selector
});
const Thread = connect(mapStateToProps)(ThreadComponent);
export default Thread;

ThreadComponent.propTypes = {
  id: PropTypes.string.isRequired,
  lastMessage: PropTypes.string,
};
ThreadComponent.defaultProps = {
  lastMessage: 'NONE',
};
