import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCK9wjOn5hejkL0x_C9qpTicWhl6zMxpSg",
    authDomain: "pin-it-126df.firebaseapp.com",
    projectId: "pin-it-126df",
    storageBucket: "pin-it-126df.appspot.com",
    messagingSenderId: "1090067078147",
    appId: "1:1090067078147:web:e9df020024f0c7d422c236",
    measurementId: "G-H3CRJT2650"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore.settings({timestampsInSnapshots: true});

export default firebase;