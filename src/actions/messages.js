import { MESSAGE_ADDED } from '../actionTypes';

export const messageAdded = (threadId, messageId, messageData) => ({
  type: MESSAGE_ADDED,
  payload: { threadId, messageId, messageData },
});
