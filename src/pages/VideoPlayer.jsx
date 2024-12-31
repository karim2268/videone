import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import { 
  db, 
  doc, 
  getDoc 
} from '../config/firebase';

const formatDate = (timestamp) => {
  // Handle different timestamp formats
  if (!timestamp) return 'Date non disponible';

  let date;
  if (timestamp.seconds) {
    // Firestore Timestamp
    date = new Date(timestamp.seconds * 1000);
  } else if (typeof timestamp === 'number') {
    // Unix timestamp (seconds)
    date = new Date(timestamp * 1000);
  } else if (timestamp instanceof Date) {
    // JavaScript Date object
    date = timestamp;
  } else {
    // Try parsing as string
    date = new Date(timestamp);
  }

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Date non disponible';
  }

  // Format date in French locale
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoRef = doc(db, 'firestore_videos', id);
        const videoSnap = await getDoc(videoRef);
        
        if (videoSnap.exists()) {
          setVideo({ id: videoSnap.id, ...videoSnap.data() });
        } else {
          console.error("Aucune vidéo trouvée");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la vidéo :", error);
      }
    };

    fetchVideo();
  }, [id]);

  if (!video) {
    return <div className="container mx-auto px-4 py-8">Chargement...</div>;
  }

  // Extraire l'ID de la vidéo YouTube de l'URL
  const getYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = getYoutubeId(video.url);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="aspect-w-16 aspect-h-12 mb-6">
          <YouTube
            videoId={youtubeId}
            opts={{
              width: '100%',
              height: '500px', // Hauteur définie à 500 pixels
              playerVars: {
                autoplay: 1,
                modestbranding: 1, // Masque le logo YouTube
                showinfo: 0, // Masque les informations de la vidéo
                rel: 0, // Masque les vidéos suggérées
                iv_load_policy: 3, // Masque les annotations
                controls: 1, // Garde les contrôles de lecture
                origin: window.location.origin // Sécurité supplémentaire
              },
            }}
            onReady={(event) => {
              // Masquage programmatique du logo
              const playerElement = event.target.getIframe();
              const logoElements = playerElement.contentDocument.getElementsByClassName('ytp-logo');
              if (logoElements.length > 0) {
                logoElements[0].style.display = 'none';
              }
            }}
            className="w-full"
          />
        </div>
        <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
        <p className="text-gray-600 mb-4">{video.description}</p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Matière : {video.subject}</h2>
          <p className="text-sm text-gray-600">
            Ajouté le {formatDate(video.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
