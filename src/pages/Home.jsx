import React, { useState, useEffect } from 'react';
import { 
  db, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  where 
} from '../config/firebase';
import VideoCard from '../components/VideoCard';

const subjects = [
  { id: 'mecanique', name: 'Mécanique', icon: '🔧', color: 'blue' },
  { id: 'electricite', name: 'Électricité', icon: '⚡', color: 'blue' },
  { id: 'onde', name: 'Onde', icon: '〰️', color: 'blue' },
  { id: 'nucleaire', name: 'Nucléaire', icon: '☢️', color: 'blue' },
  { id: 'spectre', name: 'Spectre Atomique', icon: '🌈', color: 'blue' },
  { id: 'cinetique', name: 'Cinétique Chimique', icon: '⚗️', color: 'blue' },
  { id: 'acide-base', name: 'Acide Base', icon: '🧪', color: 'blue' },
  { id: 'piles', name: 'Piles Électrochimiques', icon: '🔋', color: 'blue' },
];

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('all');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosRef = collection(db, 'firestore_videos');
        
        let q;
        if (selectedSubject !== 'all') {
          q = query(videosRef, where('subject', '==', selectedSubject));
        } else {
          q = query(videosRef);
        }
        
        const querySnapshot = await getDocs(q);
        
        const videosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setVideos(videosData);
      } catch (error) {
        console.error('Erreur lors de la récupération des vidéos :', error);
      }
    };

    fetchVideos();
  }, [selectedSubject]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <div className="hero bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="hero-background opacity-20"></div>
        <div className="hero-content text-center">
          <h1 className="hero-title text-white drop-shadow-lg">Videone</h1>
          <p className="hero-subtitle text-primary-100 max-w-2xl mx-auto mb-8">
            Découvrez des vidéos éducatives de haute qualité dans les domaines scientifiques. 
            Apprenez, explorez et grandissez avec nos contenus interactifs.
          </p>
          <a 
            href="#videos" 
            className="hero-cta bg-white text-primary-700 hover:bg-primary-50 
            transition-all duration-300 transform hover:-translate-y-1 
            hover:shadow-lg px-8 py-3 rounded-full font-semibold"
          >
            Commencer à Apprendre
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {subjects.map((subject) => (
            <button 
              key={subject.id}
              onClick={() => setSelectedSubject(subject.id)}
              className={`
                px-5 py-2 rounded-full text-sm font-semibold 
                transition-all duration-300 ease-in-out
                ${selectedSubject === subject.id 
                  ? 'bg-primary-600 text-white scale-105 shadow-md' 
                  : 'bg-primary-100 text-primary-700 hover:bg-primary-200 hover:scale-105'}
              `}
            >
              <span className="mr-2">{subject.icon}</span>
              {subject.name}
            </button>
          ))}
          <button 
            onClick={() => setSelectedSubject('all')}
            className={`
              px-5 py-2 rounded-full text-sm font-semibold 
              transition-all duration-300 ease-in-out
              ${selectedSubject === 'all' 
                ? 'bg-primary-600 text-white scale-105 shadow-md' 
                : 'bg-primary-100 text-primary-700 hover:bg-primary-200 hover:scale-105'}
            `}
          >
            Tous les sujets
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {videos.map((video) => (
            <div 
              key={video.id} 
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-soft"
            >
              <VideoCard video={video} />
            </div>
          ))}
        </div>

        {videos.length === 0 && (
          <div className="text-center py-16 bg-primary-50 rounded-xl">
            <p className="text-2xl text-primary-600 font-semibold mb-4">
              Aucune vidéo disponible
            </p>
            <p className="text-primary-500">
              Revenez plus tard ou ajoutez votre première vidéo !
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
