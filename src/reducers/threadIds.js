import { THREAD_ADDED } from '../actionTypes';

// sample state
// const state = [
//   '-LC7STkh2ozgLHQvgsmO',
//   '-LC7STxbaNTSjdv5nBdZ',
//   '-LC7STzWIokqsB-iYXGz',
// ];

const initialState = [];
const threadIds = (state = initialState, action) => {
  switch (action.type) {
    case THREAD_ADDED: {
      const { threadId } = action.payload;
      return state.concat(threadId);
    }
    default:
      return state;
  }
};
export default threadIds;
