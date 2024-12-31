import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-video">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <Link 
              to={`/video/${video.id}`}
              className="inline-flex items-center justify-center w-full space-x-2 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors duration-300"
            >
              <span>Regarder</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {video.title}
          </h3>
          <span className="flex-shrink-0 px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-600">
            {video.subject}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-2">
          {video.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {video.timestamp?.seconds 
            ? new Date(video.timestamp.seconds * 1000).toLocaleDateString() 
            : video.timestamp 
              ? new Date(video.timestamp).toLocaleDateString() 
              : 'Date non disponible'}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
