import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuration pour les modules ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Configuration du compte de service Firebase
const serviceAccountPath = path.resolve(__dirname, '../firebase-service-account.json');

// Initialiser Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath)
});

// Initialiser Firestore
const db = admin.firestore();

async function initTeacherProfile() {
  try {
    const profileRef = db.collection('users').doc('teacher_profile');
    
    await profileRef.set({
      name: "Votre Nom",
      title: "Professeur de Physique-Chimie",
      email: "votre.email@exemple.com",
      photo: "https://via.placeholder.com/150",
      bio: "Passionné par l'enseignement des sciences, je partage des vidéos éducatives pour aider mes élèves à mieux comprendre la physique et la chimie.",
      contact: {
        telephone: "Votre numéro",
        bureau: "Numéro de salle",
        heuresConsultation: "Horaires de consultation"
      }
    }, { merge: true });

    console.log('✅ Profil enseignant initialisé avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation du profil :', error);
  } finally {
    await admin.app().delete();
  }
}

// Lancer l'initialisation
initTeacherProfile()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
