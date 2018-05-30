import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { newLink } from '../../actions';

const LinkInfoComponent = ({
  userId, inboxToken, inboxLink, handleNewLink,
}) => (
  <div>
    <p>USERID: {userId}</p>
    <p>INBOX_TOKEN: {inboxToken}</p>
    <p>INBOX_LINK: {inboxLink}</p>
    <button onClick={() => handleNewLink(userId)}>NEW_INBOX_LINK</button>
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

LinkInfoComponent.propTypes = {};
