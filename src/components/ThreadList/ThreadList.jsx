import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Thread from './Thread';

// TODO: change to pureComponent
const ThreadListComponent = ({ ids }) => (
  <div>
    THREAD LIST:
    <ul>{ids.map(id => <Thread key={id} id={id} />)}</ul>
  </div>
);
const mapStateToProps = state =>
  console.log('updating threadIds....') || {
    ids: state.threadIds, // TODO: replace with a selector
  };
const ThreadList = connect(mapStateToProps)(ThreadListComponent);
export default ThreadList;

ThreadListComponent.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
};
