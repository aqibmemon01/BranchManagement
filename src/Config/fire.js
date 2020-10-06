import * as firebase from 'firebase';

var Config={
    apiKey: "AIzaSyCpTZbipapbPFBtYCAA8EP_CZ-SVB3qrOE",
    authDomain: "studentsystem-5ac9f.firebaseapp.com",
    databaseURL: "https://studentsystem-5ac9f.firebaseio.com",
    projectId: "studentsystem-5ac9f",
    storageBucket: "studentsystem-5ac9f.appspot.com",
    messagingSenderId: "910625266575",
    appId: "1:910625266575:web:f1131c11f58b4872a2c9fa",
    measurementId: "G-SDSHSX2Z9P"
};

var fire = firebase.initializeApp(Config);

export default fire;