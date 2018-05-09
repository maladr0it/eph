import firebase from './firebase';

export const login = async () => {
  const resp = await firebase.auth().signInAnonymously()
  console.log(resp);
};