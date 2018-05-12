import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import threadIds from './threadIds';
import threads from './threads';
import messages from './messages';

const rootReducer = combineReducers({
  router: routerReducer,
  user,
  threadIds,
  messages,
  threads,
});
export default rootReducer;
