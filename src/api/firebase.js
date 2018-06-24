import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// apiKey: "AIzaSyBa10Ngl--VGFzCz8ZpQpALSFLfT1-TKnA",
// authDomain: "ephemeral-22ae7.firebaseapp.com",
// databaseURL: "https://ephemeral-22ae7.firebaseio.com",
// projectId: "ephemeral-22ae7",
// storageBucket: "ephemeral-22ae7.appspot.com",
// messagingSenderId: "262050906976"

const firebaseConfig = {
  apiKey: 'AIzaSyBa10Ngl--VGFzCz8ZpQpALSFLfT1-TKnA',
  authDomain: 'ephemeral-22ae7.firebaseapp.com',
  projectId: 'ephemeral-22ae7',
};
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
