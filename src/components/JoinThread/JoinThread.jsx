import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { followLink } from '../../actions';

class JoinThreadComponent extends React.Component {
  // kick off the process of creating a thread
  async componentDidMount() {
    // if you clicked your own link, go to your inbox
    if (this.props.inboxToken === this.props.match.params.inboxToken) {
      this.props.history.push('/threads');
      return;
    }
    const threadId = await this.props.handleMount(
      this.props.userId,
      this.props.match.params.inboxToken,
    );
    this.props.history.push(`/threads/${threadId}`);
  }
  render() {
    const { inboxToken } = this.props.match.params;
    return <h1>Creating a chat with @{inboxToken}...</h1>;
  }
}
const mapStateToProps = state => ({
  userId: state.user.userId,
  inboxToken: state.user.inboxToken,
});
const mapDispatchToProps = {
  handleMount: followLink,
};
const JoinThread = connect(mapStateToProps, mapDispatchToProps)(JoinThreadComponent);
export default JoinThread;

JoinThreadComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  inboxToken: PropTypes.string.isRequired,
  handleMount: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      inboxToken: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
