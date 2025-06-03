import React from 'react';
import { Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <Trophy className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-xl font-bold text-white">EsportsHQ</span>
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              Your ultimate destination for esports statistics, player profiles, and tournament coverage.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/matches" className="text-gray-300 hover:text-white">Matches</Link></li>
              <li><Link to="/tournaments" className="text-gray-300 hover:text-white">Tournaments</Link></li>
              <li><Link to="/teams" className="text-gray-300 hover:text-white">Teams</Link></li>
              <li><Link to="/players" className="text-gray-300 hover:text-white">Players</Link></li>
              <li><Link to="/news" className="text-gray-300 hover:text-white">News</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Twitter</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Discord</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">YouTube</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Twitch</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-base text-gray-400">&copy; 2025 EsportsHQ. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-gray-300">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-gray-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;