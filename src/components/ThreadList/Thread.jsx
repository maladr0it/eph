import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { getThread, getUnread, getPartnerEmoji } from '../../reducers/threads';
import Emoji from '../Emoji';
import UnreadBadge from './UnreadBadge';
import './index.css';

const ThreadComponent = ({
  threadId, unread, lastMessage, partnerEmoji, match,
}) => {
  const unreadClass = unread ? 'Unread' : '';
  return (
    <li className={`Thread ${unreadClass}`}>
      <Link to={`${match.url}/${threadId}`}>
        <div className="ThreadInfo">
          <div>
            <Emoji name={partnerEmoji} />
          </div>
          <div className="LastMessage">{lastMessage}</div>
          {unread > 0 && <UnreadBadge count={unread} />}
        </div>
      </Link>
      {/* <p>UNREAD: {unread}</p> */}
      {/* <p>lastMessage: {lastMessage}</p> */}
    </li>
  );
};
const mapStateToProps = (state, ownProps) => {
  const thread = getThread(state.threads, ownProps.threadId);
  if (!thread) {
    return {};
  }
  const { lastMessage } = thread;
  return {
    lastMessage,
    unread: getUnread(state.threads, ownProps.threadId, state.user.userId),
    partnerEmoji: getPartnerEmoji(state.threads, ownProps.threadId, state.user.userId),
  };
};
const Thread = withRouter(connect(mapStateToProps)(ThreadComponent));
export default Thread;

ThreadComponent.propTypes = {
  threadId: PropTypes.string.isRequired,
  lastMessage: PropTypes.string,
  unread: PropTypes.number.isRequired,
  partnerEmoji: PropTypes.string.isRequired,
};
ThreadComponent.defaultProps = {
  lastMessage: 'Send a message!',
};
