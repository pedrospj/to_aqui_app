import axios from './axiosInstance';
import { Image } from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { auth } from '../firebase/firebase';

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
  const body = [];
  for (const x of images) {
    body.push({
      data: RNFetchBlob.wrap(x.path),
      filename: 'qualquer.jpeg',
      type: x.mime,
      name: 'pics',
    });
  }

  body.push({ name: 'userId', data: uid });

  try {
    console.log(images[0]);

    const data = new FormData();

    data.append('pics', {
      filename: 'teste.jpg',
      uri: RNFetchBlob.wrap(images[0].path),
      type: images[0].mime,
    });

    const response = await RNFetchBlob.fetch(
      'POST',
      'http://192.168.0.30:5000/user-pic',
      {
        'Content-Type': 'multipart/form-data',
      },

      body,
    )
      .uploadProgress((written, total) => {
        console.log('uploaded', written / total);
      })
      .then((resp) => {
        console.log('then', resp);
      })
      .catch((err) => {
        console.log('err', err);
      });

    return response;
  } catch (error) {
    console.log(Object.entries(error), 'aqui?');
    console.log('\n', error.toJSON(), 'aqui?');
  }
};

export const testeMeeting = async () => {
  const response = await axios.post('/attendance-list/PAFtWz-rhUM6jZKSnHYEb');
  return response.data;
};
