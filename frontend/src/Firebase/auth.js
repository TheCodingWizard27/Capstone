import { auth } from './firebaseConfig';
import { storeUser } from '../api/user';

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification,
  signInWithPopup,
} from 'firebase/auth';

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  const response = await createUserWithEmailAndPassword(auth, email, password); //Frebase function
  const userData = response.user; //Get response
  const token = await userData.getIdToken(); //Get token from response for validation in backend
  await storeUser(token); //Call the backend API
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider); //Frebase function
  const userData = result.user; //Get response
  const token = await userData.getIdToken(); //Get token from response for validation in backend
  await storeUser(token); //Call the backend API
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
