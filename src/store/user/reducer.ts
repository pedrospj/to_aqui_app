import { ReduxAction } from '../../interfaces/ReduxAction';
import { SET_USER, UserState } from './types';

const initialState: UserState = {
  name: '',
  email: '',
  uid: '',
  refreshToken: '',
};

const reducer = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
