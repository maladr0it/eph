// test IDs
// PC:    ZNO5s71UJndyFxNu7alLPrVxfro1
// PHONE: VhuzOP1UNdT7HN805d6db8eDs1e2

import React from 'react';
import { Route } from 'react-router-dom';
// import PropTypes from 'prop-types';

import ControlPanel from './components/ControlPanel';
import ThreadList from './components/ThreadList';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import './App.css';

const App = () => (
  <div>
    <ControlPanel />
    <Route path="/threads" component={ThreadList} />
    <Route path="/threads/:threadId" component={MessageList} />
    <Route path="/threads/:threadId" component={MessageInput} />
  </div>
);
export default App;
