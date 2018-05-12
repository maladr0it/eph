import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectThread } from '../../actions';
import './index.css';

const ThreadComponent = ({ id, lastMessage, handleSelect }) => (
  <li>
    <p>ID: {id}</p>
    <p>lastMessage: {lastMessage}</p>
    <button onClick={() => handleSelect(id)}>SELECT</button>
  </li>
);
const mapStateToProps = (state, ownProps) => ({
  lastMessage: state.threads[ownProps.id].lastMessage, // TODO: replace with selector
});
const mapDispatchToProps = {
  handleSelect: selectThread,
};
const Thread = connect(mapStateToProps, mapDispatchToProps)(ThreadComponent);
export default Thread;

ThreadComponent.propTypes = {
  id: PropTypes.string.isRequired,
  lastMessage: PropTypes.string,
};
ThreadComponent.defaultProps = {
  lastMessage: 'NONE',
};
