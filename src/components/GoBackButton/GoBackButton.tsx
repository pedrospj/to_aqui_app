import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Icon, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const GoBackButton = () => {
  const navigation = useNavigation();

  const renderShakeIcon = (props: any) => (
    <Icon {...props} name="arrow-back-outline" fill="black" />
  );

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={handleGoBack}
        status="basic"
        size="small"
        accessoryLeft={renderShakeIcon}
        appearance="ghost">
        Voltar
      </Button>
    </View>
  );
};

export default GoBackButton;
