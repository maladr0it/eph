import { LOGGED_IN } from '../actionTypes';

const initialState = {};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN: {
      const { userId } = action.payload;
      return {
        ...state,
        userId,
      };
    }
    default:
      return state;
  }
};
export default user;
