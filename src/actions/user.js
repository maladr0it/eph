import { LOGGED_IN } from '../actionTypes';

export const loggedIn = (userId, userData) => ({
  type: LOGGED_IN,
  payload: { userId, userData },
});
