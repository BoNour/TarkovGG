import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer 
      className="relative z-50" 
      style={{
        backgroundColor: 'rgba(24, 24, 27, 0.7)',
        backdropFilter: 'blur(24px)',
        boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center group">
              <img 
                src="/OurLogo.svg" 
                alt="Tarkov.gg Logo" 
                className="h-[100px] w-auto transition-transform duration-300 group-hover:scale-100" 
              />
            </Link>
            <p className="mt-2 text-sm text-gray-300">
              The destination for Tarkov Arena esports statistics, and tournament coverage.
            </p>
            <p className="mt-8 text-sm text-gray-400">&copy; 2025 Tarkov.gg | All rights reserved.</p>
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
          <div className="flex flex-col items-center justify-center">
            <a 
              href="https://bolt.new/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group transition-all duration-300"
            >
              <img 
                src="/bolt.png" 
                alt="Powered by Bolt" 
                className="h-24 w-auto transition-all duration-300 group-hover:scale-110 opacity-90 hover:opacity-100 group-hover:drop-shadow-lg" 
              />
            </a>
            <p className="mt-2 text-xs text-gray-400 text-center">
              Built with Bolt.new
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;