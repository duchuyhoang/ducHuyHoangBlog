import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  startAt,
  endAt,
  runTransaction,
  connectFirestoreEmulator,
} from "firebase/firestore/lite";
import firebase, { getApps, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
const init = () => {
  try {
    let app = null;
    let auth = null,
      firestore = null;
    if (getApps().length) {
      app = getApps()[0];
      auth = getAuth();
      firestore = getFirestore();
    } else {
      app = initializeApp({
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId,
        measurementId: process.env.measurementId,
      });
	//     
      auth = getAuth();
      firestore = getFirestore();
      connectFirestoreEmulator(firestore, "localhost", 8080);
      connectAuthEmulator(auth, "http://localhost:9099");
    }

    const firestoreCollections = {
      user: collection(firestore, "user"),
      comment: collection(firestore, "comment"),
    };

    return {
      firestore,
      database: firestoreCollections,
      auth,
    };
  } catch (e) {
    console.log('e',e);
  }
};

const services = init();

export const getFirebase = () => {
  return services;
};
