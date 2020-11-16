import firebase from 'firebase/app';
import 'firebase/firestore'
 
 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAAZK31lJqXQiqD1OnwbSivqeBn_xHCoWc",
    authDomain: "crud-b923d.firebaseapp.com",
    databaseURL: "https://crud-b923d.firebaseio.com",
    projectId: "crud-b923d",
    storageBucket: "crud-b923d.appspot.com",
    messagingSenderId: "1093005612041",
    appId: "1:1093005612041:web:e0d2df23fbb0846ea554d8"
  };
  // Initialize Firebase
  const fb =  firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();