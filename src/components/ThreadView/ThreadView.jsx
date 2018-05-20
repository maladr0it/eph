import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ThreadDetail from './ThreadDetail';

import { threadActive, threadInactive } from '../../actions';
import './index.css';

// attach lifecycle methods to listen for thread change
// on mount, set active

class ThreadViewComponent extends React.Component {
  // TODO: consider putting listeners in componentDidUpdate
  componentDidMount() {
    this.props.handleThreadActive(this.props.match.params.threadId, this.props.userId);
  }
  componentWillUnmount() {
    this.props.handleThreadInactive(this.props.match.params.threadId, this.props.userId);
  }
  render() {
    const { threadId } = this.props.match.params;
    return (
      <React.Fragment>
        <div className="ThreadView">
          <Link to="/threads">BACK</Link>
          <ThreadDetail threadId={threadId} />
          <MessageList threadId={threadId} />
          <MessageInput threadId={threadId} />
        </div>
      </React.Fragment>
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
