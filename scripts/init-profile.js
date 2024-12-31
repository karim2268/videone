import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuration pour les modules ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Configuration Firebase
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function initializeProfile() {
  try {
    const profileRef = doc(db, 'profiles', 'teacher');
    
    await setDoc(profileRef, {
      name: "Votre Nom de Professeur",
      title: "Professeur de Physique-Chimie",
      email: "professeur@exemple.com",
      photo: "https://via.placeholder.com/150",
      bio: "Passionné par l'enseignement des sciences, je partage des vidéos éducatives pour aider mes élèves à mieux comprendre la physique et la chimie.",
      contact: {
        telephone: "+33 6 00 00 00 00",
        bureau: "Salle de Physique-Chimie",
        heuresConsultation: "Lundi et Mercredi, 14h-16h"
      }
    });

    console.log('✅ Profil de professeur initialisé avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation du profil :', error);
  }
}

// Lancer l'initialisation
initializeProfile()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
