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

import { login } from '../actions';
import ThreadList from './ThreadList';
import ThreadView from './ThreadView';
import JoinThread from './JoinThread';
import './App.css';

class AppComponent extends React.Component {
  componentDidMount() {
    this.props.handleLogin();
  }
  render() {
    const { loggedIn } = this.props;
    return (
      <div className="App">
        {/* <ControlPanel /> */}
        {loggedIn ? (
          <React.Fragment>
            <Route path="/join/:inboxToken" component={JoinThread} />
            <Route path="/threads" exact component={ThreadList} />
            <Route path="/threads/:threadId" component={ThreadView} />
          </React.Fragment>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});
const mapDispatchToProps = {
  handleLogin: login,
};
const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppComponent));
export default App;

AppComponent.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
};
