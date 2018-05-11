import {
  LOGGED_IN,
} from '../actionTypes';

export const loggedIn = userId => ({
  type: LOGGED_IN,
  payload: { userId },
});
