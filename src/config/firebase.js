import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDZV0HoA6_vzNXsbwlsiBsU1cpkRWiA1ZA",
    authDomain: "fire-maps-41895.firebaseapp.com",
    databaseURL: "https://fire-maps-41895.firebaseio.com",
    projectId: "fire-maps-41895",
    storageBucket: "fire-maps-41895.appspot.com",
    messagingSenderId: "797307456674"
}

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;