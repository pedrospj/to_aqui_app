import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import AddPhotoMessage from '../pages/AddPhotoMessage/AddPhotoMessage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { UserState } from '../store/user/types';
import { auth } from '../firebase/firebase';
import { loginUser } from '../store/user/actions';

const LoginStackComponent = createStackNavigator();
const AddPhotoStackComponent = createStackNavigator();

const LoginStack = () => (
  <LoginStackComponent.Navigator initialRouteName="Login" headerMode="none">
    <LoginStackComponent.Screen name="Login" component={Login} />
    <LoginStackComponent.Screen name="Signup" component={Signup} />
  </LoginStackComponent.Navigator>
);

const AddPhotoStack = () => (
  <AddPhotoStackComponent.Navigator
    initialRouteName="AddPhotoMessage"
    headerMode="none">
    <AddPhotoStackComponent.Screen
      name="AddPhotoMessage"
      component={AddPhotoMessage}
    />
  </AddPhotoStackComponent.Navigator>
);

const Routes = () => {
  const { uid } = useSelector<RootState, UserState>((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userData = {
          name: user.displayName || '',
          email: user.email || '',
          refreshToken: user.refreshToken || '',
          uid: user.uid || '',
        };
        dispatch(loginUser(userData));
      }
    });
  }, [dispatch]);

  return uid ? <AddPhotoStack /> : <LoginStack />;
};

export default Routes;
