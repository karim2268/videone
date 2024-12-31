import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header 
      role="banner" 
      className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <Link 
          to="/" 
          className="flex items-center space-x-3 group"
        >
          <div className="bg-primary-600 text-white p-2 rounded-lg transition-all duration-300 group-hover:rotate-12">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              alt="VideoOne Logo"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
              />
            </svg>
          </div>
          <span className="text-2xl font-bold text-primary-800 tracking-tight">
            VideoOne
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-primary-700 font-medium hover:text-primary-600 
            transition-colors duration-300 relative group"
          >
            <span>Accueil</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 
            transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            to="/videos" 
            className="text-primary-700 font-medium hover:text-primary-600 
            transition-colors duration-300 relative group"
          >
            <span>Vidéos</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 
            transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-primary-800 focus:outline-none"
          >
            {isMenuOpen ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
            <div className="flex flex-col p-4 space-y-2">
              <Link 
                to="/" 
                className="text-primary-700 font-medium py-2 hover:bg-primary-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/videos" 
                className="text-primary-700 font-medium py-2 hover:bg-primary-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Vidéos
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
