import axios from './axiosInstance';

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
