import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { newLink } from '../actions';

const LinkInfoComponent = ({ userId, inboxToken, handleNewLink }) => (
  <div className="LinkInfo">
    <span className="LinkText">{`https://24.chat/@${inboxToken}`}</span>
    <button className="CopyButton">Copy Your Link</button>
    {/* <button onClick={() => handleNewLink(userId)}>NEW_INBOX_LINK</button> */}
  </div>
);

const mapStateToProps = state => ({
  userId: state.user.userId,
  inboxToken: state.user.inboxToken,
  inboxLink: state.user.inboxLink,
});
const mapDispatchToProps = {
  handleNewLink: newLink,
};
const LinkInfo = connect(mapStateToProps, mapDispatchToProps)(LinkInfoComponent);
export default LinkInfo;

LinkInfoComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  inboxToken: PropTypes.string.isRequired,
  handleNewLink: PropTypes.func.isRequired,
};
