import { ReduxAction } from '../../interfaces/ReduxAction';
import { SET_USER, UserState, CLEAR_USER } from './types';

export const loginUser = (userData: UserState): ReduxAction => {
  return {
    type: SET_USER,
    payload: userData,
  };
};

export const setUserHasDesc = (hasDesc: boolean): ReduxAction => {
  return {
    type: SET_USER,
    payload: {
      hasDesc,
    },
  };
};

export const clearUser = (): ReduxAction => {
  return {
    type: CLEAR_USER,
  };
};
