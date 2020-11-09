import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import { Text, Button, Icon } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
const selfieImage = require('../../assets/images/selfie.png');
import styles from './styles';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { UserState } from '../../store/user/types';
import { uploadPhotos } from '../../services/userService';

const AddPhotoMessage = () => {
  const { uid } = useSelector<RootState, UserState>((state) => state.user);
  const [error, setError] = useState('');
  const [images, setImages] = useState<Image[]>([]);
  const renderZoomIcon = (props: any) => (
    <Icon {...props} name="camera-outline" />
  );

  const handleSelectPics = async () => {
    try {
      const selectedImages = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
      });
      setError('');
      setImages(selectedImages);
      console.log(selectedImages);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpload = async () => {
    try {
      if (images.length < 3) {
        setError('Selecione pelo menos 3 imagens!');
        return;
      }
      if (images.length > 5) {
        setError('Selecione no máximo 5 imagens!');
        return;
      }

      // const uris = images.map((i) => i.path.replace('file://', ''));

      await uploadPhotos(images, uid);
    } catch (err) {
      console.log(err), 'erro aqui';
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
        {console.log(images.length, 'tamanho')}

        {images.length >= 3 && images.length <= 5 ? (
          <View style={styles.sendContainer}>
            <Text>{images.length} imagens selecionadas</Text>
            <Button
              onPress={handleUpload}
              appearance="outline"
              style={styles.sendButton}>
              Enviar fotos
            </Button>
          </View>
        ) : null}
      </ScrollView>
    </Container>
  );
};

export default AddPhotoMessage;
