import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import App from './App';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';

const history = createHistory();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, routerMiddleware(history))),
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
// registerServiceWorker();
