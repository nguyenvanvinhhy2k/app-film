import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getDatabase, ref, push, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBzxpjRUx37893DCE6gyuRhQ4TcYrJFV4s",
  authDomain: "app-film-1795d.firebaseapp.com",
  projectId: "app-film-1795d",
  storageBucket: "app-film-1795d.appspot.com",
  messagingSenderId: "546147520442",
  appId: "1:546147520442:web:cf4f30d85c63a9b7929783",
  databaseURL:
    "https://app-film-1795d-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);
export { database, ref, push, onValue };
export const commentsColRef = collection(db, "comments");
export const favouritesColRef = collection(db, "favourites");
export const discoveriesColRef = collection(db, "discoveries");
export const moviesColRef = collection(db, "movies");
