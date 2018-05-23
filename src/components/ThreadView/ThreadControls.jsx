import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getPartnerEmoji } from '../../reducers/threads';
import Emoji from '../Emoji';
import './index.css';

const ThreadControlsComponent = ({ partnerEmoji }) => (
  <div className="ThreadControls">
    <div className="BackArrow">
      <Link to="/threads">inbox</Link>
    </div>
    <div className="PartnerEmoji">
      <Emoji name={partnerEmoji} />
    </div>
    <div />
  </div>
);
// overkill? should emoji be passes as a prop?
const mapStateToProps = (state, ownProps) => ({
  partnerEmoji: getPartnerEmoji(state.threads, ownProps.threadId, state.user.userId),
});
const ThreadControls = connect(mapStateToProps)(ThreadControlsComponent);
export default ThreadControls;

ThreadControlsComponent.propTypes = {
  partnerEmoji: PropTypes.string,
};
ThreadControlsComponent.defaultProps = {
  partnerEmoji: null,
};
