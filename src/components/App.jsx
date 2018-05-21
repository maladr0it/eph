// test IDs
// PC:    ZNO5s71UJndyFxNu7alLPrVxfro1
// PHONE: VhuzOP1UNdT7HN805d6db8eDs1e2
// KAT:   xBqWv4oygUWkZQiJxrn82FUa3F02

// KAT LINK: https://24.chat/@B18P5GHAG

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
// import PropTypes from 'prop-types';

import ControlPanel from './ControlPanel';
import ThreadList from './ThreadList';
import ThreadView from './ThreadView';
import JoinThread from './JoinThread';
import './App.css';

const AppComponent = ({ loggedIn }) => (
  // don't mount anything until user is logged in
  <div className="App">
    <ControlPanel />
    {loggedIn && (
      <React.Fragment>
        <Route path="/join/:inboxToken" component={JoinThread} />
        <Route path="/threads" exact component={ThreadList} />
        <Route path="/threads/:threadId" component={ThreadView} />
      </React.Fragment>
    )}
  </div>
);
const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});
const App = withRouter(connect(mapStateToProps)(AppComponent));
export default App;

AppComponent.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};
