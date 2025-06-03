import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <Trophy className="h-20 w-20 text-red-500 mx-auto mb-6" />
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
      <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-medium transition"
      >
        <Home className="h-5 w-5 mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;