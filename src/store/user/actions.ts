import { ReduxAction } from '../../interfaces/ReduxAction';
import { SET_USER, UserState } from './types';

export const loginUser = (userData: UserState): ReduxAction => {
  return {
    type: SET_USER,
    payload: userData,
  };
};
