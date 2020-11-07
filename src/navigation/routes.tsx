import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login/Login';

const LoginStackComponent = createStackNavigator();

const LoginStack = () => (
  <LoginStackComponent.Navigator initialRouteName="Login">
    <LoginStackComponent.Screen name="Login" component={Login} />
  </LoginStackComponent.Navigator>
);

export default () => <LoginStack />;
