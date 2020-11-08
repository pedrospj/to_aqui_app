import React from 'react';
import Container from '../../components/Container/Container';
import { Text, Button, Icon } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
const selfieImage = require('../../assets/images/selfie.png');
import styles from './styles';
import ImagePicker from 'react-native-image-crop-picker';
import { ScrollView } from 'react-native';

const AddPhotoMessage = () => {
  const renderZoomIcon = (props: any) => (
    <Icon {...props} name="camera-outline" />
  );

  const handleSelectPics = async () => {
    try {
      const image = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
      });

      console.log(image);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={selfieImage}
          style={styles.selfieImage}
        />
        <Text>
          Para utilizar o é necessário cadastrar 3 a 5 fotos suas para o
          reconhecimento facial
        </Text>

        <Text style={styles.tipsLabel}>
          Para o melhor resultado possível, siga essas dicas:
        </Text>

        <Text style={styles.tip}>
          - Escolha fotos em que você esteja sozinho(a)
        </Text>

        <Text style={styles.tip}>
          - Escolha fotos com diferentes iluminações
        </Text>
        <Text style={styles.tip}>- Escolha fotos em diferentes ambientes</Text>

        <Button
          style={styles.photoButton}
          accessoryLeft={renderZoomIcon}
          onPress={handleSelectPics}>
          Selecionar fotos
        </Button>
      </ScrollView>
    </Container>
  );
};

export default AddPhotoMessage;
