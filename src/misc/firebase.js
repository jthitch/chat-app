import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyAYaJ_rO924_5ckO1cQEiryc42JsN_M3Gc',
  authDomain: 'chat-app-bb6cb.firebaseapp.com',
  databaseURL:
    'https://chat-app-bb6cb-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'chat-app-bb6cb',
  storageBucket: 'chat-app-bb6cb.appspot.com',
  messagingSenderId: '971925548843',
  appId: '1:971925548843:web:ec26a449853128b0979f6e',
  measurementId: 'G-GW5VYLELZ8',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
