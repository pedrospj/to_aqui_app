import axios from './axiosInstance';
import { Image } from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { auth } from '../firebase/firebase';
import { Platform } from 'react-native';

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const response = await axios.post('/user', { email, name, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  try {
    const response = await auth.signInWithEmailAndPassword(email, password);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const uploadPhotos = async (images: Image[], uid: string) => {
  const data = new FormData();
  const l = [];
  console.log(images[0], 'imagem');
  for (const x of images) {
    l.push({
      data: RNFetchBlob.wrap(x.path),
      filename: 'qualquer.jpeg',
      type: x.mime,
      name: 'pics',
    });
  }

  l.push({ name: 'userId', data: uid });
  l.push({ name: 'userEmail', data: uid });
  try {
    RNFetchBlob.fetch(
      'POST',
      'http://192.168.0.30:5000/user-pic',
      {
        'content-type': 'multipart/form-data',
      },

      l,
    )
      .then((x) => console.log(x, 'deu'))
      .catch((er) => console.log(er, 'nao deu'));
  } catch (error) {
    console.log(Object.entries(error), 'aqui?');
    console.log('\n', error.toJSON(), 'aqui?');
  }
};
