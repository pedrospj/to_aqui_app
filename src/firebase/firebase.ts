import fb from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD9CACQMC8IiDa4k_Fj89CpX523TscPboY',
  authDomain: 'to-aqui-5bc11.firebaseapp.com',
  databaseURL: 'https://to-aqui-5bc11.firebaseio.com',
  projectId: 'to-aqui-5bc11',
  storageBucket: 'to-aqui-5bc11.appspot.com',
  messagingSenderId: '763222312225',
  appId: '1:763222312225:web:b2975bac782a71e6272a60',
  measurementId: 'G-CPG4BMWY7B',
};

const firebase = fb.initializeApp(firebaseConfig);
const auth = firebase.auth();

auth.setPersistence(fb.auth.Auth.Persistence.LOCAL);

export { auth };
