import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDcU15IueRv1HgZbWJt9jYBUdWRD81-zeQ',
  databaseURL: 'https://everydaywith24.firebaseio.com/',
  projectId: 'everydaywith24',
};
firebase.initializeApp(firebaseConfig);

export default firebase;
