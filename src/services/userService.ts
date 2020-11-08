// import axios from './axiosInstance';

import { auth } from '../firebase/firebase';

export const login = async (email: string, password: string) => {
  try {
    const response = await auth.signInWithEmailAndPassword(email, password);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};
