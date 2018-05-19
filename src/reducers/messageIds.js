import { MESSAGE_ADDED, THREAD_REMOVED } from '../actionTypes';

// sample state
// const state = {
//   '-LC7STkh2ozgLHQvgsmO': [
//     '-LC7W2TSDJWUB31IGKUc',
//     '-LC7W5x9U-jr3sO0cccA',
//   ],
//   '-LC7STxbaNTSjdv5nBdZ': [
//     '-LC7W6Alj1cnwU7pPPYx',
//   ],
// }

const initialState = {};
const messageIds = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_ADDED: {
      const { threadId, messageId } = action.payload;
      return {
        ...state,
        [threadId]: (state[threadId] || []).concat(messageId),
      };
    }
    case THREAD_REMOVED: {
      const { threadId } = action.payload;
      const newState = { ...state };
      delete newState[threadId];
      return newState;
    }
    default:
      return state;
  }
};
export default messageIds;

export const getMessageIdsByThread = (state, threadId) => state[threadId] || [];
