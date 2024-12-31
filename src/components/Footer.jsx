import React from 'react';

const Footer = () => {
  return (
    <footer 
      role="contentinfo" 
      className="bg-gray-800 text-white py-6"
    >
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          {new Date().getFullYear()} VideoOne. Tous droits réservés. 
          Développé par <span className="font-semibold">Abdelkrim Salem</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
