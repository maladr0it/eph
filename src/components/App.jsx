import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Switch } from 'react-router';
import { Route, Redirect } from 'react-router-dom';

import { login } from '../actions';
import LinkInfo from './LinkInfo';
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
        {loggedIn ? (
          <React.Fragment>
            <LinkInfo />
            <Switch>
              <Route path="/join/:inboxToken" component={JoinThread} />
              <Redirect from="/" to="/threads" exact />
              <Route path="/threads" exact component={ThreadList} />
              <Route path="/threads/:threadId" component={ThreadView} />
            </Switch>
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
