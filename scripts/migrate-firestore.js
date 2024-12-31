import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getDatabase, ref, get } from 'firebase/database';
import env from './load-env.js';

// Afficher toutes les variables d'environnement pour le débogage
console.log('Variables Firebase :', {
  apiKey: env.VITE_FIREBASE_API_KEY ? 'PRESENT' : 'MISSING',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN ? 'PRESENT' : 'MISSING',
  databaseURL: env.VITE_FIREBASE_DATABASE_URL ? 'PRESENT' : 'MISSING',
  projectId: env.VITE_FIREBASE_PROJECT_ID ? 'PRESENT' : 'MISSING'
});

// Configuration Firebase
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: env.VITE_FIREBASE_DATABASE_URL,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const firestore = getFirestore(app);

// Fonction de migration
async function migrateVideos() {
  try {
    console.log('Tentative de récupération des vidéos...');
    const videosRef = ref(database, 'videos');
    const snapshot = await get(videosRef);
    
    console.log('Snapshot existe :', snapshot.exists());
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log('Nombre de vidéos :', Object.keys(data).length);
      
      const videosCollection = collection(firestore, 'videos');
      
      for (const [oldId, videoData] of Object.entries(data)) {
        try {
          await addDoc(videosCollection, {
            ...videoData,
            oldRealtimeDatabaseId: oldId
          });
          console.log(`Migré : ${videoData.title}`);
        } catch (error) {
          console.error(`Erreur de migration pour ${videoData.title}:`, error);
        }
      }
      
      console.log('Migration terminée');
      process.exit(0);
    } else {
      console.log('Aucune vidéo trouvée dans Realtime Database');
      process.exit(0);
    }
  } catch (error) {
    console.error('Échec de la migration :', error);
    process.exit(1);
  }
}

migrateVideos();
