// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  where,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "firebase/storage";

// Désactiver les logs de Firebase
// if (import.meta.env.DEV) {
//   console.warn = () => {};
// }

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export the services
export { 
  app,
  auth, 
  db, 
  storage, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  where,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
  updateDoc,
  ref,
  uploadBytes,
  getDownloadURL
};
