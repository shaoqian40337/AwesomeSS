import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCc2AghAK7dVGehqQE4Z4SMylu6-hulm7o",
    authDomain: "awesomess-2d412.firebaseapp.com",
    databaseURL: "https://awesomess-2d412.firebaseio.com",
    projectId: "awesomess-2d412",
    storageBucket: "",
    messagingSenderId: "915629513330"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export {
  auth,
  firestore,
};