import React from 'react';
import styles from './styles';
import Container from '../../components/Container/Container';
import { Text } from 'react-native';
import FastImage from 'react-native-fast-image';
const toAquiLogo = require('../../assets/images/to_aqui.png');

const Login = () => {
  return (
    <Container>
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        style={styles.logo}
        source={toAquiLogo}
      />

      <Text>testewdwdwd</Text>
    </Container>
  );
};

export default Login;
