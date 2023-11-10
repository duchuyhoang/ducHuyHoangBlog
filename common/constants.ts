import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider
} from 'firebase/auth'
import { LOGIN_METHOD } from './enum'

export const ERROR_MAP = {
  'auth/email-already-in-use': 'Email exist'
}

export const POST_FOLDER_NAME = 'posts'

export const PAGE_PREFIX = '/ducHuyHoangBlog'

export const ROUTERS = {
  HOME: '/',
  TAGS: '/tags',
  ABOUT: '/about',
  SOFTWARE: '/software',
  SEARCH: '/search'
}

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  LOGIN_METHOD: 'LOGIN_METHOD'
}

export const FIREBASE_CONFIGS = {
  // apiKey: 'AIzaSyD63hodF2l2YG1qBYA3KrG_1lP6G34nHJY',
  // authDomain: 'duchuyhoangblog-5e5df.firebaseapp.com',
  // databaseURL:
  //   'https://duchuyhoangblog-5e5df-default-rtdb.europe-west1.firebasedatabase.app',
  // projectId: 'duchuyhoangblog-5e5df',
  // storageBucket: 'duchuyhoangblog-5e5df.appspot.com',
  // messagingSenderId: '1096120152389',
  // appId: '1:1096120152389:web:a9dc5229dfdf01f9168e2c',
  // measurementId: 'G-B61M3RRE1T'

  apiKey: 'AIzaSyBm5ANUVYC-e9YsGi406IVwPdzhxHcaw18',
  authDomain: 'vd-study.web.app',
  projectId: 'vd-study',
  storageBucket: 'vd-study.appspot.com',
  messagingSenderId: '977905386474',
  appId: '1:977905386474:web:fa49932cd33e0a4ac56893',
  measurementId: 'G-BDWKFSLG0G'
}
// https://duchuyhoangblog-5e5df.firebaseapp.com/__/auth/handler
export const GOOGLE_CLIENT_ID =
  '1096120152389-dvjb0353hpoc5g13ml6dovgqkart6okb.apps.googleusercontent.com'

export const GOOGLE_PERSON_API = 'https://www.googleapis.com/userinfo/v2/me'

export const GITHUB_CLIENT_ID = 'ee8180a7c2700ed3a65b'

export const GITHUB_CLIENT_SECRET = '9a39a5cbce41667b80c8019c55a80bbdd1005a7d'

export const GITHUB_ACCESS_TOKEN_API =
  'https://github.com/login/oauth/access_token'

export const PROVIDERS = {
  [LOGIN_METHOD.FACEBOOK]: FacebookAuthProvider,
  [LOGIN_METHOD.GOOGLE]: GoogleAuthProvider,
  [LOGIN_METHOD.GITHUB]: GithubAuthProvider
}
