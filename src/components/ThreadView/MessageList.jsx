import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import { getMessageIdsByThread } from '../../reducers/messageIds';
import { getCreator } from '../../reducers/threads';
import Onboarding from './Onboarding';
import Message from './Message';
import './index.css';

// TODO: some redundant re-renders here
class MessageListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.debouncedScroll = debounce((scrollPos) => {
      if (!this.messageListEl) {
        return;
      }
      const { scrollHeight, clientHeight } = this.messageListEl;
      const atBottom = scrollHeight - scrollPos === clientHeight;
      this.setState({
        atBottom,
      });
    }, 250);
  }
  state = {
    atBottom: true,
  };
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    if (this.state.atBottom) {
      this.scrollToBottom();
    }
  }
  scrollToBottom() {
    // this.bottomElement.scrollIntoView();
    this.messageListEl.scrollTop = this.messageListEl.scrollHeight;
  }
  handleScroll(scrollPos) {
    this.debouncedScroll(scrollPos);
  }
  render() {
    const { userId, creator, messageIds } = this.props;
    return (
      <React.Fragment>
        <div
          className="MessageList"
          ref={(el) => {
            this.messageListEl = el;
          }}
          onScroll={e => this.handleScroll(e.target.scrollTop)}
        >
          <ul>
            {creator === userId && <Onboarding />}
            {messageIds.map(id => <Message key={id} id={id} />)}
          </ul>
          <div
            ref={(el) => {
              this.bottomElement = el;
            }}
          />
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { threadId } = ownProps;
  return {
    userId: state.user.userId,
    creator: getCreator(state.threads, threadId),
    threadId,
    messageIds: getMessageIdsByThread(state.messageIds, threadId),
  };
};
const MessageList = connect(mapStateToProps)(MessageListComponent);
export default MessageList;

MessageListComponent.propTypes = {
  messageIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};
