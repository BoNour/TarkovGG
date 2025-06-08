import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award } from 'lucide-react';
import { useGameData } from '../../context/GameDataContext';
import PlayerCard from '../ui/PlayerCard';

const TopPlayers: React.FC = () => {
  const { players, isLoading } = useGameData();
  const [hoveredPlayerId, setHoveredPlayerId] = useState<string | null>(null);
  
  // Sort players by rating (highest first)
  const sortedPlayers = [...players].sort((a, b) => b.stats.rating - a.stats.rating);
  
  // Get the top 4 players
  const topPlayers = sortedPlayers.slice(0, 4);

  if (isLoading) {
    return (
      <div className="py-24" style={{ backgroundColor: '#1a1b1b' }}>
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-48 rounded mb-8 mx-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 rounded-2xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 relative" style={{ backgroundColor: '#1a1b1b' }}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/3 to-transparent"></div>
      
      <div className="max-w-none mx-auto px-4 lg:px-8 xl:px-12 relative">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-16 space-y-6 lg:space-y-0">
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-white leading-tight">
              Top Players
            </h2>
          </div>
          
          {/* Modern call to action */}
          <Link 
            to="/players" 
            className="group relative inline-flex items-center space-x-4 overflow-hidden bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
          >
            <span className="relative z-10">View All Players</span>
            <div className="relative z-10 w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" />
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </Link>
        </div>
        
        {/* Players grid with enhanced layout */}
        <div className="relative">
          {/* Decorative background elements */}
          <div className="absolute -inset-x-4 inset-y-0 bg-gradient-to-r from-transparent via-cyan-500/3 to-transparent rounded-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-cyan-500/8 to-transparent rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-radial from-purple-500/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {topPlayers.map((player, index) => (
              <div 
                key={player.id} 
                className="transition-all duration-500 ease-out"
                style={{
                  transform: hoveredPlayerId && hoveredPlayerId !== player.id 
                    ? 'scale(0.95) translateY(8px)' 
                    : hoveredPlayerId === player.id
                      ? 'scale(1.05) translateY(-8px)'
                      : 'scale(1.0) translateY(0px)',
                  opacity: hoveredPlayerId && hoveredPlayerId !== player.id ? 0.6 : 1.0,
                  filter: hoveredPlayerId && hoveredPlayerId !== player.id ? 'brightness(0.7) blur(1px)' : 'brightness(1.0) blur(0px)',
                  animationDelay: `${index * 100}ms`
                }}
                onMouseEnter={() => setHoveredPlayerId(player.id)}
                onMouseLeave={() => setHoveredPlayerId(null)}
              >
                <PlayerCard player={player} variant="full" />
              </div>
            ))}
          </div>
        </div>

        {/* Modern no players state */}
        {topPlayers.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-lg mx-auto">
              <div className="w-28 h-28 mx-auto mb-8 rounded-full flex items-center justify-center border" 
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                     borderColor: 'rgba(255, 255, 255, 0.1)'
                   }}>
                <Users className="w-14 h-14 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-200 mb-4">No players found</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Check back soon for player statistics and rankings
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopPlayers;