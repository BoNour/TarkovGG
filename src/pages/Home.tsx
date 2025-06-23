import React, { useState, useEffect } from 'react';
import LatestMatches from '../components/sections/LatestMatches';
import FeaturedTournaments from '../components/sections/FeaturedTournaments';
import TopPlayers from '../components/sections/TopPlayers';
import TopTeams from '../components/sections/TopTeams';
import LatestNews from '../components/sections/LatestNews';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Calendar, Trophy, Users, Star } from 'lucide-react';

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
        className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat transition-transform duration-1000 ease-out"
        style={{ 
          backgroundImage: "url('/BACKGROUND.png')",
          transform: `scale(1.02) translate(${mousePosition.x / -200}px, ${mousePosition.y / -200}px)`,
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
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-full blur-3xl opacity-30" style={{animation: 'slow-float-1 25s ease-in-out infinite'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-gradient-to-r from-purple-800/15 to-pink-800/15 rounded-full blur-3xl opacity-20" style={{animation: 'slow-float-2 30s ease-in-out infinite'}}></div>

        {/* Mouse-aware orb */}
        <div 
          className="absolute w-[100px] h-[100px] bg-gradient-to-r from-white/5 to-transparent rounded-full blur-2xl opacity-50 transition-transform duration-700 ease-out"
          style={{ 
            transform: `translate(${mousePosition.x / 1.5 - 50}px, ${mousePosition.y / 1.5 - 50}px)`
          }}
        ></div>
      </div>

      {/* Main Content Layout - HLTV Style */}
      <div className="relative z-30 min-h-screen pt-8">
        {/* Main Content Grid - HLTV Layout */}
        <section className="pb-8">
          <div className="w-full px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              
              {/* Left Column - Main Content (3/5 = 60% width) */}
              <div className="lg:col-span-3">
                
                {/* Combined Players, Teams, and News Container */}
                <div 
                  className="relative overflow-hidden rounded-2xl p-4"
                  style={{
                    backgroundColor: 'rgba(24, 24, 27, 0.7)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  
                  <div className="relative space-y-4">
                    {/* Top Players Section */}
                    <div>
                      <TopPlayers />
                    </div>

                    {/* Separator Line */}
                    <div className="border-t border-white/10"></div>

                    {/* Top Teams Section */}
                    <div>
                      <TopTeams />
                    </div>

                    {/* Separator Line */}
                    <div className="border-t border-white/10"></div>

                    {/* Latest News Section */}
                    <div>
                      <LatestNews />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Tournaments & Matches (2/5 = 40% width) */}
              <div className="lg:col-span-2">
                {/* Combined Tournaments and Matches Container */}
                <div 
                  className="relative overflow-hidden rounded-2xl p-6 space-y-6"
                  style={{
                    backgroundColor: 'rgba(24, 24, 27, 0.7)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  
                  <div className="relative space-y-6">
                    {/* Tournaments Section */}
                    <div>
                      <h3 className="text-2xl font-black text-white mb-6 flex items-center">
                        <Trophy className="w-6 h-6 mr-3 text-yellow-400" />
                        Tournaments
                      </h3>
                      <FeaturedTournaments />
                    </div>

                    {/* Separator Line */}
                    <div className="border-t border-white/10"></div>

                    {/* Matches Section */}
                    <div className="sticky top-6">
                      <LatestMatches />
                    </div>
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