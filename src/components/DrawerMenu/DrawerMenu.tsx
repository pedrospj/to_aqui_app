import React from 'react';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import { TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../store/user/actions';
import { auth } from '../../firebase/firebase';
import styles from './styles';
import { Text, Button } from '@ui-kitten/components';

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
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      bounces={false}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('MeetingStack')}>
        <Text style={styles.menuItem}>Eventos</Text>
      </TouchableWithoutFeedback>

      <Button
        onPress={handleLogout}
        status="danger"
        style={styles.logoutContainer}>
        Logout
      </Button>
    </DrawerContentScrollView>
  );
};

export default DrawerMenu;
