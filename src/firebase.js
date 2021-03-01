import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBPRczqnsD6VO8Yodf_BDxEC5O-jgLtUgs",
    authDomain: "laneshaylacs493.firebaseapp.com",
    projectId: "laneshaylacs493",
    storageBucket: "laneshaylacs493.appspot.com",
    messagingSenderId: "211600659922",
    appId: "1:211600659922:web:09502f5544d2e537e8e40b",
    measurementId: "G-ZXQB773L4M"
}

firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();