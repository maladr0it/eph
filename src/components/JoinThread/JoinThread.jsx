import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { followLink } from '../../actions';

class JoinThreadComponent extends React.Component {
  state = {};
  // kick off the process of creating a thread
  async componentDidMount() {
    // create a thread using url param
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
});
const mapDispatchToProps = {
  handleMount: followLink,
};
const JoinThread = connect(mapStateToProps, mapDispatchToProps)(JoinThreadComponent);

export default JoinThread;
