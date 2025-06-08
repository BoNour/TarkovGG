import React from 'react';
import LatestMatches from '../components/sections/LatestMatches';
import FeaturedTournaments from '../components/sections/FeaturedTournaments';
import TopPlayers from '../components/sections/TopPlayers';
import LatestNews from '../components/sections/LatestNews';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1b1b' }}>


      {/* Modern Hero Section */}
      <section className="relative min-h-[calc(100vh-400px)] flex items-start justify-center overflow-hidden pt-20 pb-0">
        {/* Background with overlay */}
        <div 
          className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat scale-90"
          style={{ 
            backgroundImage: "url('/BACKGROUND.png')" 
          }}
        ></div>
        
        {/* Strong vignette overlay for smooth edges */}
        <div 
          className="absolute inset-0 z-5" 
          style={{ 
            background: 'radial-gradient(ellipse 120% 80% at center, transparent 30%, rgba(26, 27, 27, 0.6) 60%, rgba(26, 27, 27, 0.95) 85%, rgba(26, 27, 27, 1) 100%)' 
          }}
        ></div>
        
        {/* Strong left and right edge fade */}
        <div 
          className="absolute inset-0 z-6" 
          style={{ 
            background: 'linear-gradient(90deg, rgba(26, 27, 27, 1) 0%, rgba(26, 27, 27, 0.9) 5%, rgba(26, 27, 27, 0.6) 10%, transparent 20%, transparent 80%, rgba(26, 27, 27, 0.6) 90%, rgba(26, 27, 27, 0.9) 95%, rgba(26, 27, 27, 1) 100%)' 
          }}
        ></div>
        
        {/* Extra edge blur effect */}
        <div 
          className="absolute inset-0 z-7" 
          style={{ 
            background: 'linear-gradient(90deg, rgba(26, 27, 27, 1) 0%, rgba(26, 27, 27, 0.7) 3%, transparent 8%, transparent 92%, rgba(26, 27, 27, 0.7) 97%, rgba(26, 27, 27, 1) 100%)' 
          }}
        ></div>
        
        {/* Modern gradient overlay with perfect fade */}
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(180deg, rgba(26, 27, 27, 0.6) 0%, rgba(26, 27, 27, 0.75) 40%, rgba(26, 27, 27, 0.9) 70%, rgba(26, 27, 27, 1) 85%)' }}></div>
        
        {/* Animated background orbs */}
        <div className="absolute inset-0 z-20">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/12 to-pink-500/12 rounded-full blur-2xl animate-pulse delay-1000 opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/8 to-blue-500/8 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-6 py-5 relative z-30 h-full flex flex-col">
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            {/* Main headline */}
            <div className="space-y-4 animate-fade-in-up">
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white">
                  HOME OF
                </span>
                <span className="block text-white mt-2">
                  TARKOV
                </span>
              </h1>
            </div>



          </div>
          
        </div>

        {/* CTA Buttons - positioned at bottom right of background image */}
        <div className="absolute bottom-8 right-8 z-50 flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-500">
        <Link 
          to="/players" 
          className="group px-8 py-4 backdrop-blur-sm border rounded-2xl font-semibold text-white text-lg transition-all duration-300 hover:border-white/30 min-w-[200px]"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
          }}
        >
          <span className="flex items-center justify-center space-x-2">
            <span>View Stats</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </Link>

        <Link 
          to="/tournaments" 
          className="group px-8 py-4 backdrop-blur-sm border rounded-2xl font-semibold text-white text-lg transition-all duration-300 hover:border-white/30 min-w-[200px]"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
          }}
        >
          <span className="flex items-center justify-center space-x-2">
            <span>Tournaments</span>
            <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </Link>
        </div>


        
        {/* Additional fade overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 z-40" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(26, 27, 27, 1) 100%)' }}></div>
      </section>

      {/* Content sections with seamless connection */}
      <div className="space-y-0" style={{ backgroundColor: '#1a1b1b' }}>
        {/* Live Matches Section */}
        <section id="live-matches" className="relative -mt-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/3 to-transparent"></div>
          <div className="relative">
            <LatestMatches />
          </div>
        </section>
        
        {/* Featured Tournaments Section */}
        <section id="tournaments" className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/3 to-transparent"></div>
          <div className="relative">
            <FeaturedTournaments />
          </div>
        </section>
        
        {/* Top Players Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/3 to-transparent"></div>
          <div className="relative">
            <TopPlayers />
          </div>
        </section>
        
        {/* Latest News Section */}
        <section className="relative pb-32">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/3 to-transparent"></div>
          <div className="relative">
            <LatestNews />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;