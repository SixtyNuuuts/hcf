import firebase from 'firebase'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyBz2hEC2iQqpYz8uMB57zsIogCA0obFw9s",
    authDomain: "h-c-f-f6391.firebaseapp.com",
    databaseURL: "https://h-c-f-f6391.firebaseio.com",
    projectId: "h-c-f-f6391",
    storageBucket: "h-c-f-f6391.appspot.com",
    messagingSenderId: "746270363855",
    appId: "1:746270363855:web:58b99a5a53e12fe3da27ba",
    measurementId: "G-0MR3BMDJN1"
};

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();

export default db;