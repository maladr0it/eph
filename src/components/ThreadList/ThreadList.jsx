import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Banner from './Banner';
import Thread from './Thread';
import DeleteButton from './DeleteButton';
import './index.css';

// TODO: change to pureComponent
const ThreadListComponent = ({ ids }) => (
  <React.Fragment>
    <Banner />
    <div className="ThreadList">
      <ul>{ids.map(id => <Thread key={id} threadId={id} />)}</ul>
    </div>
    <DeleteButton />
  </React.Fragment>
);
const mapStateToProps = state => ({
  ids: state.threadIds, // TODO: replace with a selector
});
const ThreadList = connect(mapStateToProps)(ThreadListComponent);
export default ThreadList;

ThreadListComponent.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
};
