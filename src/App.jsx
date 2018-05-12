// test IDs
// PC:    ZNO5s71UJndyFxNu7alLPrVxfro1
// PHONE: VhuzOP1UNdT7HN805d6db8eDs1e2

import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ControlPanel from './components/ControlPanel';
import ThreadList from './components/ThreadList';
import MessageList from './components/MessageList';
import './App.css';

const AppComponent = ({ userId }) => (
  <div>
    <ControlPanel />
    <Route path="/" component={ThreadList} />
    <Route path="/:threadId" component={MessageList} />
  </div>
);
const mapStateToProps = state => ({
  userId: state.user.userId,
});
const App = connect(mapStateToProps)(AppComponent);
export default App;

AppComponent.propTypes = {
  userId: PropTypes.string,
};
AppComponent.defaultProps = {
  userId: '',
};
