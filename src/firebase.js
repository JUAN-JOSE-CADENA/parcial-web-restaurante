import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

/**
 * Config
 */
const firebaseConfig = {
  apiKey: "AIzaSyD8zFjCeXrcTyJYqgcTTIfYCwy1qo7W7Q4",
  authDomain: "proyecto-final-web-b809b.firebaseapp.com",
  projectId: "proyecto-final-web-b809b",
  storageBucket: "proyecto-final-web-b809b.appspot.com",
  messagingSenderId: "448046014949",
  appId: "1:448046014949:web:9bbadf7a96dbfcd1e1cf0c",
  measurementId: "G-4TN4KL88XY"
};

firebase.initializeApp(firebaseConfig);

export const register = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((snap) => snap.user);
};

export const login = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((snap) => snap.user);
};

export const signOut = () => {
  firebase.auth().signOut();
};
