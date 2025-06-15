import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Home as HomeIcon } from 'lucide-react';

const NotFound: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#101012' }}>
      {/* Background Image & Effects */}
      <div 
        className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat transition-transform duration-1000 ease-out"
        style={{ 
          backgroundImage: "url('/BACKGROUND.png')",
          transform: `scale(1.02) translate(${mousePosition.x / -200}px, ${mousePosition.y / -200}px)`,
        }}
      ></div>
      <div 
        className="fixed inset-0 z-10" 
        style={{ 
          background: 'radial-gradient(circle at center, transparent 20%, rgba(16, 16, 18, 0.8) 60%, rgba(16, 16, 18, 1) 90%)',
        }}
      ></div>

      {/* Content */}
      <div className="relative z-30 flex items-center justify-center min-h-screen">
        <div className="text-center text-white px-4">
          <Trophy className="h-24 w-24 text-red-500 mx-auto mb-8" />
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-white mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
          <p className="text-lg text-gray-400 mb-10 max-w-lg mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-transform transform hover:scale-105"
          >
            <HomeIcon className="h-6 w-6 mr-3" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;