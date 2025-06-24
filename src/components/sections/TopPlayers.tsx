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
    <section className="relative">
      {/* Background gradient */}
      
      <div className="max-w-none mx-auto relative">
        {/* Section header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-white leading-tight flex items-center">
            <Award className="w-6 h-6 mr-3 text-yellow-400" />
            Top Players
          </h2>
          <Link 
            to="/players" 
            className="group flex items-center space-x-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-300"
          >
            <span>View All Players</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
        
        {/* Players grid with enhanced layout */}
        <div className="relative">
          {/* Decorative background elements */}
          
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {topPlayers.map((player, index) => (
              <div 
                key={player.id} 
                className="transition-all duration-500 ease-out"
                style={{
                  opacity: hoveredPlayerId && hoveredPlayerId !== player.id ? 0.6 : 1.0,
                  animationDelay: `${index * 100}ms`
                }}
                onMouseEnter={() => setHoveredPlayerId(player.id)}
                onMouseLeave={() => setHoveredPlayerId(null)}
              >
                <PlayerCard player={player} variant="minimal" isHovered={hoveredPlayerId === player.id} />
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