// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCk51rFVVymC1iObosJJhe6_0lrx02O__c",
  authDomain: "crwn-db-676cf.firebaseapp.com",
  databaseURL: "https://crwn-db-676cf.firebaseio.com",
  projectId: "crwn-db-676cf",
  storageBucket: "crwn-db-676cf.appspot.com",
  messagingSenderId: "565902804613",
  appId: "1:565902804613:web:a4c0280c66f5287af34bec",
  measurementId: "G-WY2W1KKHDJ",
};

firebase.initializeApp(firebaseConfig);

// store authenticated users in the firestore database
const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log(`error creating user ${err}`);
    }
  }

  return userRef;
};

// Google authentication
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
