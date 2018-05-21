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
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.value);
    this.props.handleSend(this.props.threadId, this.props.userId, this.state.value);
    this.setState({
      value: '',
    });
  };
  render() {
    return (
      <form className="MessageInput" onSubmit={this.handleSubmit}>
        <input autoFocus type="text" value={this.state.value} onChange={this.handleChange} />
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
};
