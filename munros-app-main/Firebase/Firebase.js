
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import {getFirestore} from '@firebase/firestore'

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAbahaHemykkdVcCiUBVbFu91wv7lJ3sWc",

  authDomain: "munro-login.firebaseapp.com",

  projectId: "munro-login",

  storageBucket: "munro-login.appspot.com",

  messagingSenderId: "532672447651",

  appId: "1:532672447651:web:d577f0f05bdb02b58bab16",

  measurementId: "G-XDRGP87NF0"

};


// Initialize Firebase if not already 

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const authentication = getAuth(app);

