// test IDs
// PC:    ZNO5s71UJndyFxNu7alLPrVxfro1
// PHONE: VhuzOP1UNdT7HN805d6db8eDs1e2
// KAT:   xBqWv4oygUWkZQiJxrn82FUa3F02

// KAT LINK: https://24.chat/@B18P5GHAG

import React from 'react';
import { Route } from 'react-router-dom';
// import PropTypes from 'prop-types';

import ControlPanel from './components/ControlPanel';
import ThreadList from './components/ThreadList';
import ThreadView from './components/ThreadView';
import './App.css';

const App = () => (
  <div className="App">
    <ControlPanel />
    <Route path="/threads" exact component={ThreadList} />
    <Route path="/threads/:threadId/" component={ThreadView} />
  </div>
);
export default App;
