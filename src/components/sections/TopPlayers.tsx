import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useGameData } from '../../context/GameDataContext';
import PlayerCard from '../ui/PlayerCard';

const TopPlayers: React.FC = () => {
  const { players, isLoading } = useGameData();
  
  // Sort players by rating (highest first)
  const sortedPlayers = [...players].sort((a, b) => b.stats.rating - a.stats.rating);
  
  // Get the top 4 players
  const topPlayers = sortedPlayers.slice(0, 4);

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-700 rounded mb-8 mx-auto"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Top Players</h2>
          <Link to="/players" className="flex items-center text-sm text-gray-400 hover:text-white transition">
            View all players
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topPlayers.map(player => (
            <PlayerCard key={player.id} player={player} variant="full" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopPlayers;