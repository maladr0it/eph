import { combineReducers } from 'redux';
import user from './user';
import threadIds from './threadIds';
import threads from './threads';
import messageIds from './messageIds';
import messages from './messages';

const rootReducer = combineReducers({
  user,
  threadIds,
  threads,
  messages,
  messageIds,
});
export default rootReducer;
