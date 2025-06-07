import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t" style={{ backgroundColor: '#1a1b1b', borderTopColor: 'rgba(255, 255, 255, 0.1)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center group">
              <img 
                src="/OurLogo.svg" 
                alt="Tarkov.gg Logo" 
                className="h-8 w-auto transition-transform duration-300 group-hover:scale-110" 
              />
            </Link>
            <p className="mt-2 text-sm text-gray-300">
              The destination for Tarkov Arena esports statistics, and tournament coverage.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link to="/matches" className="text-gray-400 hover:text-white transition-colors duration-300">Matches</Link></li>
              <li><Link to="/tournaments" className="text-gray-400 hover:text-white transition-colors duration-300">Tournaments</Link></li>
              <li><Link to="/teams" className="text-gray-400 hover:text-white transition-colors duration-300">Teams</Link></li>
              <li><Link to="/players" className="text-gray-400 hover:text-white transition-colors duration-300">Players</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-white transition-colors duration-300">News</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Discord</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">YouTube</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Twitch</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-base text-gray-300">&copy; 2025 Tarkov.gg | All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;