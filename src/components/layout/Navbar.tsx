import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-darker border-b border-lighter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Trophy className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-xl font-bold text-white">EsportsHQ</span>
            </Link>
          </div>
          <div className="hidden md:flex md:justify-center md:flex-1">
            <div className="flex items-baseline space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/matches" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Matches</Link>
              <Link to="/tournaments" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tournaments</Link>
              <Link to="/teams" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Teams</Link>
              <Link to="/players" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Players</Link>
              <Link to="/tarkov" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tarkov Stats</Link>
              <Link to="/news" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">News</Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-lighter focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="text-gray-300 hover:bg-lighter hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/matches" 
              className="text-gray-300 hover:bg-lighter hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Matches
            </Link>
            <Link 
              to="/tournaments" 
              className="text-gray-300 hover:bg-lighter hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Tournaments
            </Link>
            <Link 
              to="/teams" 
              className="text-gray-300 hover:bg-lighter hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Teams
            </Link>
            <Link 
              to="/players" 
              className="text-gray-300 hover:bg-lighter hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Players
            </Link>
            <Link 
              to="/tarkov" 
              className="text-gray-300 hover:bg-lighter hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Tarkov Stats
            </Link>
            <Link 
              to="/news" 
              className="text-gray-300 hover:bg-lighter hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              News
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;