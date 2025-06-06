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
              <div className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.58 16.09l-1.09-7.66A3.996 3.996 0 0 0 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66A4 4 0 0 0 6.38 21h11.24a4 4 0 0 0 3.96-4.91zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Live Matches</h3>
              <p className="text-gray-400 text-sm">Real-time match tracking</p>
            </div>
            <div className="p-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9l-5 4.87 1.18 6.88L12 17.77l-6.18 2.98L7 14.87 2 10l6.91-1.26L12 2z"/>
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Tournaments</h3>
              <p className="text-gray-400 text-sm">Championship coverage</p>
            </div>
            <div className="p-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2v-4h2v4zm0-6h-2V9h2v2zm4 6h-2V7h2v10z"/>
                </svg>
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