import { combineReducers } from 'redux';
import user from './user';
import threadIds from './threadIds';
import threads from './threads';
import messages from './messages';

const rootReducer = combineReducers({
  user,
  threadIds,
  messages,
  threads,
});
export default rootReducer;
