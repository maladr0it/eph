import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import ThreadItem from './ThreadItem';

// TODO: change to pureComponent
const ThreadListComponent = ({ ids }) => (
  <div>
    THREAD LIST:
    <ul>{ids.map(id => <li key={id}>THREAD ID: {id}</li>)}</ul>
  </div>
);

const mapStateToProps = state => ({
  ids: state.threadIds || [], // TODO: replace with a selector
});
const ThreadList = connect(mapStateToProps)(ThreadListComponent);

export default ThreadList;

ThreadListComponent.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
};
