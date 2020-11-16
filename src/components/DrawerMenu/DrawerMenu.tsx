import React from 'react';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import { TouchableWithoutFeedback, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../store/user/actions';
import styles from './styles';
import { auth } from '../../firebase/firebase';
const DrawerMenu = (
  props: DrawerContentComponentProps<DrawerContentOptions>,
) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await auth.signOut();
    console.log('logout');
    dispatch(clearUser());
  };

  return (
    <DrawerContentScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}>
      <TouchableWithoutFeedback
        style={styles.menuItem}
        onPress={() => navigation.navigate('MeetingStack')}>
        <Text>Eventos</Text>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={handleLogout} style={styles.menuItem}>
        <Text>Logout</Text>
      </TouchableWithoutFeedback>
    </DrawerContentScrollView>
  );
};

export default DrawerMenu;
