import { combineReducers, createStore } from 'redux';
import Reactotron from '../../Reactotron';
import userReducer from './user/reducer';

export const rootReducer = combineReducers({
  user: userReducer,
});

export const store = createStore(rootReducer, Reactotron.createEnhancer!());

export type RootState = ReturnType<typeof rootReducer>;
