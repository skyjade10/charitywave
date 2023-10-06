// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnEafOKEJVMeueAK0RotljAZGMk3UrRH0",
  authDomain: "voyte-f0620.firebaseapp.com",
  projectId: "voyte-f0620",
  storageBucket: "voyte-f0620.appspot.com",
  messagingSenderId: "86395082884",
  appId: "1:86395082884:web:398148a7fe32433c1ecad1",
  measurementId: "G-9KT8SFN4SF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);