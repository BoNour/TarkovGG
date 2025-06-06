import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
      <div className="text-center px-8 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src="/OurLogo.svg" 
            alt="Arena TV Logo" 
            className="w-64 h-auto mx-auto mb-6"
          />
        </div>

        {/* Simple Development Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Currently in Development
        </h1>
        
        <p className="text-xl text-gray-400 mb-8">
          We're working hard to bring you something amazing.
        </p>

        {/* Progress Animation */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-sm text-white font-mono">Loading</span>
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-red-500 to-red-700 h-2 rounded-full animate-pulse w-2/3" />
          </div>
        </div>

        {/* Feature Preview */}
        <div className="bg-[#242424] rounded-2xl p-8 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(255, 0, 0, 0.25)' }}>
                <img 
                  src="/wifi-outline-svgrepo-com.svg" 
                  alt="Live Matches" 
                  className="w-8 h-8"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Live Matches</h3>
              <p className="text-gray-400 text-sm">Real-time match tracking</p>
            </div>
            <div className="p-4">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(255, 0, 0, 0.25)' }}>
                <img 
                  src="/trophy-outline-svgrepo-com.svg" 
                  alt="Tournaments" 
                  className="w-8 h-8"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Tournaments</h3>
              <p className="text-gray-400 text-sm">Championship coverage</p>
            </div>
            <div className="p-4">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(255, 0, 0, 0.25)' }}>
                <img 
                  src="/graph-svgrepo-com.svg" 
                  alt="Player Stats" 
                  className="w-8 h-8"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Player Stats</h3>
              <p className="text-gray-400 text-sm">Detailed analytics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;