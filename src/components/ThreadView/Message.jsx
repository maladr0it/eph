import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMessage } from '../../reducers/messages';

import './index.css';

const MessageComponent = ({ author, text, userId }) => {
  const youClass = author === userId ? 'You' : '';
  return (
    <li className={`MessageContainer ${youClass}`}>
      <div className={`Message ${youClass}`}>{text}</div>
    </li>
  );
};
const mapStateToProps = (state, ownProps) => ({
  ...getMessage(state.messages, ownProps.id),
  userId: state.user.userId,
});
const Message = connect(mapStateToProps)(MessageComponent);
export default Message;

MessageComponent.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};
