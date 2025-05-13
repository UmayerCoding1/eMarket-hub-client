// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyBafZO_6kg0nuDKLc94MFK04PgKvl1kLSo",
  authDomain: "emarket-hub.firebaseapp.com",
  projectId: "emarket-hub",
  storageBucket: "emarket-hub.firebasestorage.app",
  messagingSenderId: "580991466676",
  appId: "1:580991466676:web:0dab0de1d5d9a693c12be1",
  measurementId: "G-YX1ZBXE6SW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
