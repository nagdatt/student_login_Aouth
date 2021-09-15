import firebase from "firebase";
import 'firebase/auth';
const fireStore=firebase.initializeApp(
  {
    apiKey: "AIzaSyBLKw-8ZZr4Ht5mvNVmObl-JFedRuep9fI",
    authDomain: "oauth-c20e7.firebaseapp.com",
    projectId: "oauth-c20e7",

    storageBucket: "oauth-c20e7.appspot.com",
    messagingSenderId: "260065403229",
    appId: "1:260065403229:web:a8fc4490cf182257af88b4"


    
  }

);
export  const auth=firebase.auth();
export const provider= new firebase.auth.GoogleAuthProvider();
export const db=fireStore.firestore();
export const storage=fireStore.storage();
//
