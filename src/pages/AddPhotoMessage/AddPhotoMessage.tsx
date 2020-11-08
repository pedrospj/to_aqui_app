import React from 'react';
import Container from '../../components/Container/Container';
import { Text } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
const selfieImage = require('../../assets/images/selfie.png');
import styles from './styles';

const AddPhotoMessage = () => {
  return (
    <Container>
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        source={selfieImage}
        style={styles.selfieImage}
      />
      <Text>
        Para utilizar o é necessário cadastrar 3 a 5 fotos suas para o
        reconhecimento facial
      </Text>
    </Container>
  );
};

export default AddPhotoMessage;
