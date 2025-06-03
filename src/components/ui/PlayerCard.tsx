import React from 'react';
import { Link } from 'react-router-dom';
import { Player, Team } from '../../types';
import { useGameData } from '../../context/GameDataContext';

interface PlayerCardProps {
  player: Player;
  variant?: 'compact' | 'full';
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, variant = 'compact' }) => {
  const { teams } = useGameData();
  
  const team = teams.find(t => t.id === player.teamId) as Team;
  
  const ratingColor = player.stats.rating > 1.1 
    ? 'text-green-500' 
    : player.stats.rating < 0.9 
      ? 'text-red-500' 
      : 'text-yellow-500';

  return (
    <div className="bg-gray-700/30 rounded-lg overflow-hidden shadow-md transition-transform hover:transform hover:scale-[1.02]">
      <div className="relative">
        <img 
          src={player.image} 
          alt={player.nickname} 
          className="w-full h-48 object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <Link to={`/players/${player.id}`} className="text-xl font-bold text-white hover:text-gray-300 transition">
            {player.nickname}
          </Link>
          <p className="text-sm text-gray-300">{player.realName}</p>
        </div>
        <div className="absolute top-3 right-3 bg-gray-900/80 rounded-full px-2 py-1 text-xs font-semibold">
          <span className={`${ratingColor}`}>{player.stats.rating.toFixed(2)}</span> Rating
        </div>
        {team && (
          <div className="absolute top-3 left-3">
            <Link to={`/teams/${team.id}`}>
              <img 
                src={team.logo} 
                alt={team.name} 
                className="w-10 h-10 rounded-full border-2 border-gray-800"
              />
            </Link>
          </div>
        )}
      </div>
      
      {variant === 'full' && (
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gray-400 text-xs">K/D</p>
              <p className="font-medium">{player.stats.kdRatio.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">KOST</p>
              <p className="font-medium">{(player.stats.kost * 100).toFixed(0)}%</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">SRV</p>
              <p className="font-medium">{(player.stats.srv * 100).toFixed(0)}%</p>
            </div>
          </div>
          
          <div className="mt-4">
            <Link 
              to={`/players/${player.id}`} 
              className="block w-full text-center py-2 bg-gray-600/30 hover:bg-gray-600/50 rounded-md text-sm font-medium transition"
            >
              View Profile
            </Link>
          </div>
        </div>
      )}
      
      {variant === 'compact' && (
        <div className="p-3 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">{player.role}</p>
          </div>
          <Link 
            to={`/players/${player.id}`} 
            className="text-xs bg-gray-600/30 hover:bg-gray-600/50 py-1 px-2 rounded transition"
          >
            Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;