import { combineReducers } from 'redux';
import user from './user';
import threadIds from './threadIds';

const rootReducer = combineReducers({
  user,
  threadIds,
});
export default rootReducer;
