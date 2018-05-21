import React from 'react';
import { connect } from 'react-redux';

import { followLink } from '../../actions';

class JoinThreadComponent extends React.Component {
  state = {};
  // kick off the process of creating a thread
  componentDidMount() {
    // create a thread using url param
    this.props.handleMount(this.props.userId, this.props.match.params.inboxToken);
  }
  render() {
    const { inboxToken } = this.props.match.params;
    return <div>The inbox token is: {inboxToken}</div>;
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
