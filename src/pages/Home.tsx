import React, { useState, useEffect } from 'react';
import LatestMatches from '../components/sections/LatestMatches';
import FeaturedTournaments from '../components/sections/FeaturedTournaments';
import TopPlayers from '../components/sections/TopPlayers';
import TopTeams from '../components/sections/TopTeams';
import LatestNews from '../components/sections/LatestNews';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
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
      {/* Background Image - Fixed behind all content */}
      <div 
        className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 ease-out"
        style={{ 
          backgroundImage: "url('/BACKGROUND.png')",
          transform: `scale(1.05) translate(${mousePosition.x / -100}px, ${mousePosition.y / -100}px)`,
        }}
      ></div>
      
      {/* Single, refined vignette overlay */}
      <div 
        className="fixed inset-0 z-10" 
        style={{ 
          background: 'radial-gradient(circle at center, transparent 20%, rgba(16, 16, 18, 0.8) 60%, rgba(16, 16, 18, 1) 90%)',
        }}
      ></div>
      
      {/* Animated background orbs */}
      <div className="fixed inset-0 z-20">
        {/* Large floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-full blur-3xl opacity-30" style={{animation: 'slow-float-1 15s ease-in-out infinite'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-purple-800/30 to-pink-800/30 rounded-full blur-3xl opacity-20" style={{animation: 'slow-float-2 18s ease-in-out infinite'}}></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-full blur-3xl opacity-20" style={{animation: 'slow-float-3 20s ease-in-out infinite', transform: 'translate(-50%, -50%)'}}></div>

        {/* Mouse-aware orb */}
        <div 
          className="absolute w-[150px] h-[150px] bg-gradient-to-r from-white/10 to-transparent rounded-full blur-2xl opacity-50 transition-transform duration-300 ease-out"
          style={{ 
            transform: `translate(${mousePosition.x - 75}px, ${mousePosition.y - 75}px)`
          }}
        ></div>
      </div>

      {/* Content sections starting from the top */}
      <div className="relative z-30 pt-8" style={{ backgroundColor: 'transparent' }}>
        {/* Two Column Layout: News on Left, Matches & Tournaments on Right */}
        <section className="py-16 relative">
          <div className="relative max-w-none mx-auto px-4 lg:px-8 xl:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Left Column - News (2/3 width) */}
              <div className="lg:col-span-2 space-y-12">
                {/* News Section */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8">
                  <LatestNews />
                </div>
                
                {/* Top Players Section - Now under News */}
                <div className="relative overflow-hidden group rounded-3xl"
                     style={{
                       backgroundColor: 'rgba(24, 24, 27, 0.7)',
                       backdropFilter: 'blur(12px)',
                     }}
                >
                  {/* Glare Effect */}
                  <div className="absolute inset-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                       style={{
                         maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 10%, transparent 70%)',
                       }}
                  ></div>

                  {/* Multiple glass layers for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
                  
                  {/* Content container */}
                  <div className="relative p-8">
                    <TopPlayers />
                  </div>
                </div>
                
                {/* Top Teams Section - Now under Top Players */}
                <div className="relative overflow-hidden rounded-3xl"
                     style={{
                       backgroundColor: 'rgba(24, 24, 27, 0.7)',
                       backdropFilter: 'blur(24px)',
                     }}
                >
                  {/* Multiple glass layers for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
                  
                  {/* Content container */}
                  <div className="relative p-8">
                    <TopTeams />
                  </div>
                </div>
              </div>
              
              {/* Right Column - Matches & Tournaments (1/3 width) */}
              <div className="lg:col-span-1 space-y-8">
                {/* Matches Section */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6">
                  <h3 className="text-3xl font-black text-white mb-6">Matches</h3>
                  <LatestMatches />
                </div>
                
                {/* Competitions Section */}
                <div className="relative overflow-hidden group rounded-3xl"
                     style={{
                       backgroundColor: 'rgba(24, 24, 27, 0.7)',
                       backdropFilter: 'blur(12px)',
                     }}
                >
                  {/* Glare Effect */}
                  <div className="absolute inset-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                       style={{
                         maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 10%, transparent 70%)',
                       }}
                  ></div>

                  {/* Multiple glass layers for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
                  
                  {/* Content container */}
                  <div className="relative p-6">
                    <h3 className="text-3xl font-black text-white mb-6">Competitions</h3>
                    <FeaturedTournaments />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>
        

      </div>
    </div>
  );
};

export default Home;