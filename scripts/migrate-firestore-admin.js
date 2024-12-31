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

async function migrateVideos() {
  try {
    console.log('🚀 Début de la migration des vidéos...');

    // Récupérer tous les documents de la collection Realtime Database
    const realtimeRef = db.collection('videos');
    const snapshot = await realtimeRef.get();

    if (snapshot.empty) {
      console.log('❌ Aucune vidéo trouvée dans la base de données.');
      return;
    }

    console.log(`📊 Nombre de vidéos à migrer : ${snapshot.size}`);

    // Batch pour écriture Firestore
    const batch = db.batch();

    // Parcourir et migrer chaque vidéo
    snapshot.forEach(doc => {
      const videoData = doc.data();
      const newDocRef = db.collection('firestore_videos').doc(); // Nouvelle collection

      batch.set(newDocRef, {
        ...videoData,
        oldRealtimeDatabaseId: doc.id,
        migratedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    });

    // Exécuter le batch
    await batch.commit();

    console.log('✅ Migration terminée avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la migration :', error);
  } finally {
    // Fermer l'application Firebase Admin
    await admin.app().delete();
  }
}

// Lancer la migration
migrateVideos()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
