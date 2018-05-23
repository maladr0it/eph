import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import { getMessageIdsByThread } from '../../reducers/messageIds';
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
    const { messageIds } = this.props;
    return (
      <div
        className="MessageList"
        ref={(el) => {
          this.messageListEl = el;
        }}
        onScroll={e => this.handleScroll(e.target.scrollTop)}
      >
        <ul>{messageIds.map(id => <Message key={id} id={id} />)}</ul>
        <div
          ref={(el) => {
            this.bottomElement = el;
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { threadId } = ownProps;
  return {
    threadId,
    messageIds: getMessageIdsByThread(state.messageIds, threadId),
  };
};
const MessageList = connect(mapStateToProps)(MessageListComponent);
export default MessageList;

MessageListComponent.propTypes = {
  messageIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};
