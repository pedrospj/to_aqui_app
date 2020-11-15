import React from 'react';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import { TouchableWithoutFeedback, Text } from 'react-native';

const DrawerMenu = (
  props: DrawerContentComponentProps<DrawerContentOptions>,
) => {
  const { navigation } = props;

  return (
    <DrawerContentScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('MeetingStack')}>
        <Text>Eventos</Text>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('MeetingStack')}>
        <Text>Grupos</Text>
      </TouchableWithoutFeedback>
    </DrawerContentScrollView>
  );
};

export default DrawerMenu;
