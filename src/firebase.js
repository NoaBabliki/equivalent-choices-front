// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAihx1WV44V2-GzGMjujkm4yfqHjWmvZAs",
  authDomain: "equivalent-choices-d0e2a.firebaseapp.com",
  projectId: "equivalent-choices-d0e2a",
  storageBucket: "equivalent-choices-d0e2a.appspot.com",
  messagingSenderId: "15211447758",
  appId: "1:15211447758:web:e47ee30d0aed615ee0179f"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
export default fire;