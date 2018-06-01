import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { deleteThread } from '../../actions';
import { getPartnerEmoji } from '../../reducers/threads';
import Emoji from '../Emoji';
import './index.css';

const ThreadControlsComponent = ({
  threadExists, threadId, partnerEmoji, handleDelete,
}) => (
  <div className="ThreadControls">
    <div className="BackArrow">
      <Link to="/threads">inbox</Link>
    </div>
    {threadExists && (
      <React.Fragment>
        <div className="PartnerEmoji">
          <Emoji name={partnerEmoji} />
        </div>
        <div>
          <button className="DeleteButton" onClick={() => handleDelete(threadId)}>
            delete
          </button>
        </div>
      </React.Fragment>
    )}
  </div>
);
// overkill? should emoji be passes as a prop?
const mapStateToProps = (state, ownProps) => ({
  partnerEmoji: getPartnerEmoji(state.threads, ownProps.threadId, state.user.userId),
});
const mapDispatchToProps = {
  handleDelete: deleteThread,
};

const ThreadControls = connect(mapStateToProps, mapDispatchToProps)(ThreadControlsComponent);
export default ThreadControls;

ThreadControlsComponent.propTypes = {
  partnerEmoji: PropTypes.string,
};
ThreadControlsComponent.defaultProps = {
  partnerEmoji: null,
};
