import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { threadActive, threadInactive } from '../../actions';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ThreadControls from './ThreadControls';
import './index.css';

// attach lifecycle methods to listen for thread change
// on mount, set active

class ThreadViewComponent extends React.Component {
  // TODO: consider putting listeners in componentDidUpdate
  state = {
    keyboardUp: false,
  };
  componentDidMount() {
    this.props.handleThreadActive(this.props.match.params.threadId, this.props.userId);
  }
  componentWillUnmount() {
    this.props.handleThreadInactive(this.props.match.params.threadId, this.props.userId);
  }
  // this is to notify the messageList that the app has resized
  // and the scrollPos needs to be adjusted
  setKeyboard(up) {
    this.setState({
      keyboardUp: up,
    });
  }
  render() {
    const { threadId } = this.props.match.params;
    const { threadExists } = this.props;
    console.log(this.state.keyboardUp);

    return (
      <div className="ThreadView">
        <ThreadControls threadId={threadId} />
        {threadExists ? (
          <React.Fragment>
            <MessageList threadId={threadId} keyboardUp={this.state.keyboardUp} />
            <MessageInput threadId={threadId} onKeyboard={up => this.setKeyboard(up)} />
          </React.Fragment>
        ) : (
          // TODO: include 24 logo here?
          <h2>We cant find this conversation, perhaps it has been removed?</h2>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  userId: state.user.userId,
  threadExists: state.threadIds.includes(ownProps.match.params.threadId),
});
const mapDispatchToProps = {
  handleThreadActive: threadActive,
  handleThreadInactive: threadInactive,
};
const ThreadView = connect(mapStateToProps, mapDispatchToProps)(ThreadViewComponent);
export default ThreadView;

ThreadViewComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  threadExists: PropTypes.bool.isRequired,
  handleThreadActive: PropTypes.func.isRequired,
  handleThreadInactive: PropTypes.func.isRequired,
};
