import { FirebaseApp, initializeApp, getApps } from 'firebase/app'
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
  Firestore
} from 'firebase/firestore/lite'
import { getAuth, connectAuthEmulator, Auth } from 'firebase/auth'
const init = (): any => {
  try {
    let app: Maybe<FirebaseApp> = null
    let auth: Maybe<Auth> = null
    let firestore: Maybe<Firestore> = null
    if (getApps().length > 0) {
      app = getApps()[0]
      auth = getAuth()
      firestore = getFirestore()
    } else {
      app = initializeApp({
        apiKey: 'AIzaSyD63hodF2l2YG1qBYA3KrG_1lP6G34nHJY',
        authDomain: 'duchuyhoangblog-5e5df.firebaseapp.com',
        databaseURL:
          'https://duchuyhoangblog-5e5df-default-rtdb.europe-west1.firebasedatabase.app',
        projectId: 'duchuyhoangblog-5e5df',
        storageBucket: 'duchuyhoangblog-5e5df.appspot.com',
        messagingSenderId: '1096120152389',
        appId: '1:1096120152389:web:a9dc5229dfdf01f9168e2c',
        measurementId: 'G-B61M3RRE1T'
        // apiKey: process.env.apiKey,
        // authDomain: process.env.authDomain,
        // projectId: process.env.projectId,
        // storageBucket: process.env.storageBucket,
        // messagingSenderId: process.env.messagingSenderId,
        // appId: process.env.appId,
        // measurementId: process.env.measurementId,
      })
      //
      auth = getAuth()
      firestore = getFirestore()
      connectFirestoreEmulator(firestore, 'localhost', 8080)
      connectAuthEmulator(auth, 'http://localhost:9099')
    }

    const firestoreCollections = {
      user: collection(firestore, 'user'),
      comment: collection(firestore, 'comment')
    }

    return {
      firestore,
      database: firestoreCollections,
      auth
    }
  } catch (e) {
    console.log('e', e)
  }
}

const services = init()

export const getFirebase = (): any => {
  return services
}
