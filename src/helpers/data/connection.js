import firebase from 'firebase/app';
import firebaseConfig from '../keys/apiKeys.json';

export const firebaseApp = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig.firebaseKeys);
  }
};
