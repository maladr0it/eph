import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ThreadDetail from './ThreadDetail';

import { threadActive, threadInactive } from '../../actions';

// attach lifecycle methods to listen for thread change
// on mount, set active

class ThreadViewComponent extends React.Component {
  componentDidMount() {
    this.props.handleThreadActive(this.props.match.params.threadId, this.props.userId);
  }
  componentWillUnmount() {
    this.props.handleThreadInactive(this.props.match.params.threadId, this.props.userId);
  }
  // PUT LOGIC HERE MOST LIKELY
  componentDidUpdate(prevProps, prevState) {
    console.log('>>>');
    console.log('prevProps:', prevProps);
    console.log('props:', this.props);
  }
  render() {
    const { threadId } = this.props.match.params;
    return (
      <div>
        <Link to="/threads">BACK</Link>
        <ThreadDetail threadId={threadId} />
        <MessageList threadId={threadId} />
        <MessageInput threadId={threadId} />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  userId: state.user.userId,
});
const mapDispatchToProps = {
  handleThreadActive: threadActive,
  handleThreadInactive: threadInactive,
};
const ThreadView = connect(mapStateToProps, mapDispatchToProps)(ThreadViewComponent);
export default ThreadView;
