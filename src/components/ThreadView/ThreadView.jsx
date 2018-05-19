import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ThreadDetail from './ThreadDetail';

import { threadActive, threadInactive } from '../../actions';

// attach lifecycle methods to listen for thread change
// on mount, set active

class ThreadViewComponent extends React.Component {
  componentDidMount() {
    console.log('mounting...');
    this.props.handleThreadActive(this.props.match.params.threadId, this.props.userId);
  }
  // PUT LOGIC HERE MOST LIKELY
  componentDidUpdate(prevProps) {
    console.log('>>>');
    console.log('prevProps:', prevProps);
    console.log('props:', this.props);
  }
  componentWillUnmount() {
    this.props.handleThreadInactive(this.props.match.params.threadId, this.props.userId);
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
const mapStateToProps = state => ({
  userId: state.user.userId,
});
const mapDispatchToProps = {
  handleThreadActive: threadActive,
  handleThreadInactive: threadInactive,
};
const ThreadView = connect(mapStateToProps, mapDispatchToProps)(ThreadViewComponent);
export default ThreadView;

ThreadViewComponent.propTypes = {
  handleThreadActive: PropTypes.func.isRequired,
  handleThreadInactive: PropTypes.func.isRequired,
};
