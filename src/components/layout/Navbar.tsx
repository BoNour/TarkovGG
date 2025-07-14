import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300" 
         style={{ 
           backgroundColor: 'rgba(26, 27, 27, 0.95)', 
           borderBottomColor: 'rgba(255, 255, 255, 0.1)' 
         }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <img 
                src="/OurLogo.svg" 
                alt="Logo" 
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-110" 
              />
            </Link>
          </div>
          <div className="hidden md:flex md:justify-center md:flex-1">
            <div className="flex items-baseline space-x-1">
              <Link to="/" className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300">Home</Link>
              <Link to="/stats" className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300">Stats</Link>
              <Link to="/matches" className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300">Matches</Link>
              <Link to="/tournaments" className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300">Tournaments</Link>
              <Link to="/teams" className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300">Teams</Link>
              <Link to="/players" className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300">Players</Link>
              <Link to="/news" className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300">News</Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/20 transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden backdrop-blur-md border-t" 
             style={{ 
               backgroundColor: 'rgba(26, 27, 27, 0.95)', 
               borderTopColor: 'rgba(255, 255, 255, 0.1)' 
             }}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="text-gray-300 hover:bg-white/5 hover:text-white block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/stats" 
              className="text-gray-300 hover:bg-white/5 hover:text-white block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Stats
            </Link>
            <Link 
              to="/matches" 
              className="text-gray-300 hover:bg-white/5 hover:text-white block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Matches
            </Link>
            <Link 
              to="/tournaments" 
              className="text-gray-300 hover:bg-white/5 hover:text-white block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Tournaments
            </Link>
            <Link 
              to="/teams" 
              className="text-gray-300 hover:bg-white/5 hover:text-white block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Teams
            </Link>
            <Link 
              to="/players" 
              className="text-gray-300 hover:bg-white/5 hover:text-white block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Players
            </Link>
            <Link 
              to="/news" 
              className="text-gray-300 hover:bg-white/5 hover:text-white block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
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