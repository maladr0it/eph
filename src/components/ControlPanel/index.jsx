import React from 'react';
import { connect } from 'react-redux';

import { login, createThread } from '../../actions';

// PC:    ZNO5s71UJndyFxNu7alLPrVxfro1
// PHONE: VhuzOP1UNdT7HN805d6db8eDs1e2

const ControlPanelComponent = ({ userId, handleLogin, handleCreateThread }) => (
  <div>
    <h3>Logged in as: {userId || 'NONE'}</h3>
    <button onClick={() => handleLogin()}>LOGIN</button>
    <button
      onClick={() =>
        handleCreateThread(['ZNO5s71UJndyFxNu7alLPrVxfro1', 'VhuzOP1UNdT7HN805d6db8eDs1e2'])
      }
    >
      NEW_THREAD
    </button>
  </div>
);
const mapStateToProps = state => ({
  userId: state.user && state.user.userId, // TODO: replace with selector
});
const mapDispatchToProps = {
  handleLogin: login,
  handleCreateThread: createThread,
};
const ControlPanel = connect(mapStateToProps, mapDispatchToProps)(ControlPanelComponent);
export default ControlPanel;
