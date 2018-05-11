import React from 'react';
import { connect } from 'react-redux';

import { login } from '../../actions';

const ControlPanelComponent = ({ userId, handleLogin }) => (
  <div>
    <h3>Logged in as: {userId || 'NONE'}</h3>
    <button onClick={() => handleLogin()}>LOGIN</button>
  </div>
);
const mapStateToProps = state => ({
  userId: state.user && state.user.userId, // TODO: replace with selector
});
const mapDispatchToProps = {
  handleLogin: login,
};
const ControlPanel = connect(mapStateToProps, mapDispatchToProps)(ControlPanelComponent);
export default ControlPanel;
