import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';

const LoginStackComponent = createStackNavigator();

const LoginStack = () => (
  <LoginStackComponent.Navigator initialRouteName="Login" headerMode="none">
    <LoginStackComponent.Screen name="Login" component={Login} />
    <LoginStackComponent.Screen name="Signup" component={Signup} />
  </LoginStackComponent.Navigator>
);

export default () => <LoginStack />;
