import { ReduxAction } from '../../interfaces/ReduxAction';
import { SET_USER, UserState, CLEAR_USER } from './types';

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

    case CLEAR_USER:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
