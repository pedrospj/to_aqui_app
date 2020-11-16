import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import AddPhotoMessage from '../pages/AddPhotoMessage/AddPhotoMessage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { UserState } from '../store/user/types';
import { auth } from '../firebase/firebase';
import { loginUser } from '../store/user/actions';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Meetings from '../pages/Meetings/Meetings';
import MeetingDetail from '../pages/MeetingDetail/MeetingDetail';
import Container from '../components/Container/Container';
import { ActivityIndicator } from 'react-native';
import DrawerMenu from '../components/DrawerMenu/DrawerMenu';

const LoginStackComponent = createStackNavigator();
const MainStackComponent = createStackNavigator();
const AddPhotoStackComponent = createStackNavigator();
const MeetingStackComponent = createStackNavigator();
const DrawerStackComponent = createDrawerNavigator();

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

const MeetingStack = () => (
  <MeetingStackComponent.Navigator
    initialRouteName="Meetings"
    headerMode="none">
    <MeetingStackComponent.Screen name="Meetings" component={Meetings} />
    <MeetingStackComponent.Screen
      name="MeetingDetail"
      component={MeetingDetail}
    />
  </MeetingStackComponent.Navigator>
);

const DrawerStack = () => (
  <DrawerStackComponent.Navigator
    screenOptions={{ unmountOnBlur: true, swipeEnabled: false }}
    drawerContent={(props) => <DrawerMenu {...props} />}>
    <DrawerStackComponent.Screen name="MeetingStack" component={MeetingStack} />
  </DrawerStackComponent.Navigator>
);

const MainStack = () => (
  <MainStackComponent.Navigator
    headerMode="none"
    initialRouteName="DrawerStack">
    <MainStackComponent.Screen
      name="AddPhotoMessage"
      component={AddPhotoMessage}
    />

    <MainStackComponent.Screen name="DrawerStack" component={DrawerStack} />
  </MainStackComponent.Navigator>
);

const states = {
  idle: 'IDLE',
  loading: 'LOADING',
  error: 'ERROR',
};

const Routes = () => {
  const { uid } = useSelector<RootState, UserState>((state) => state.user);
  const dispatch = useDispatch();
  const [dataState, setDataState] = useState(states.loading);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setDataState(states.loading);
      if (user) {
        const userData = {
          name: user.displayName || '',
          email: user.email || '',
          refreshToken: user.refreshToken || '',
          uid: user.uid || '',
        };
        dispatch(loginUser(userData));
        setDataState(states.idle);
      }
      setDataState(states.idle);
    });
  }, [dispatch]);

  if (dataState === states.loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#1890ff" />
      </Container>
    );
  }

  return uid ? <MainStack /> : <LoginStack />;
};

export type StackParamList = {
  MeetingDetail: {
    meetingId: string;
  };
};

export default Routes;
