// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase, ref} from 'firebase/database'
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
const app = initializeApp(firebaseConfig);
// Get a reference to the database service
const database = getDatabase(app);

export default database;

export function useConcertTickets(){
  let value;
  const starCountRef = ref('0');
  starCountRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data !== value){
      value = data
    }
  })
  return value
}