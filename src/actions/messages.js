import { MESSAGE_ADDED } from '../actionTypes';

export const messageAdded = (messageId, messageData) => ({
  type: MESSAGE_ADDED,
  payload: { messageId, messageData },
});
