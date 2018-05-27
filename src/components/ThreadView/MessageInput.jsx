import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { sendMessage } from '../../actions';

class MessageInputComponent extends React.Component {
  state = {
    value: '',
  };
  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  // for iOS to allow for visible keyboard
  handleFocus = () => {
    setTimeout(() => {
      document.body.scrollTop = 0;
      document.documentElement.style.height = `${window.innerHeight}px`;
      this.props.onKeyboard(true);
    }, 200);
  };
  handleBlur = () => {
    setTimeout(() => {
      // TODO: resizing window on desktop is problematic here
      // document.documentElement.style.height = `${window.innerHeight}px`;
      document.documentElement.style.height = '100%';
      this.props.onKeyboard(false);
    }, 200);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSend(this.props.threadId, this.props.userId, this.state.value);
    this.setState({
      value: '',
    });
  };
  render() {
    return (
      <form className="MessageInput" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.value}
          // onFocus={this.handleFocus}
          // onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
        <input type="submit" value="Send" />
      </form>
    );
  }
}
const mapStateToProps = state => ({
  userId: state.user.userId,
});
const mapDispatchToProps = {
  handleSend: sendMessage,
};
const MessageInput = connect(mapStateToProps, mapDispatchToProps)(MessageInputComponent);
export default MessageInput;

MessageInputComponent.propTypes = {
  threadId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  handleSend: PropTypes.func.isRequired,
  onKeyboard: PropTypes.func.isRequired,
};
