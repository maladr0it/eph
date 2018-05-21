import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MessageList from './MessageList';
import MessageInput from './MessageInput';
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
    const { threadExists } = this.props;
    return (
      <div className="ThreadView">
        <Link to="/threads">BACK</Link>
        {threadExists ? (
          <React.Fragment>
            <MessageList threadId={threadId} />
            <MessageInput threadId={threadId} />
          </React.Fragment>
        ) : (
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
