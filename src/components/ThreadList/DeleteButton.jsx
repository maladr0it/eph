import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteAllThreads } from '../../actions';

const DeleteButtonComponent = ({ threadIds, handleDeleteAll }) => (
  <button className="DeleteAllButton" onClick={() => handleDeleteAll(threadIds)}>
    Delete All Conversations
  </button>
);
const mapStateToProps = state => ({
  threadIds: state.threadIds,
});
const mapDispatchToProps = {
  handleDeleteAll: deleteAllThreads,
};
const DeleteButton = connect(mapStateToProps, mapDispatchToProps)(DeleteButtonComponent);
export default DeleteButton;

DeleteButtonComponent.propTypes = {
  threadIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleDeleteAll: PropTypes.func.isRequired,
};
