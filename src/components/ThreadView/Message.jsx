import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMessage } from '../../reducers/messages';

const MessageComponent = ({ author, text }) => (
  <li>
    <p>{author} says:</p>
    <p>{text}</p>
  </li>
);
const mapStateToProps = (state, ownProps) => ({
  ...getMessage(state.messages, ownProps.id),
});
const Message = connect(mapStateToProps)(MessageComponent);
export default Message;

MessageComponent.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string,
};
MessageComponent.defaultProps = {
  text: 'NO_TEXT',
};
