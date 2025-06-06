import React from 'react';
import { Link } from 'react-router-dom';
import { Player } from '../../types';
import { useGameData } from '../../context/GameDataContext';

interface PlayerCardProps {
  player: Player;
  variant?: 'compact' | 'full';
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, variant = 'compact' }) => {
  const { teams } = useGameData();
  
  const team = teams.find(t => t.id === player.teamId);
  
  const ratingColor = player.stats.rating > 1.1 
    ? 'text-green-400' 
    : player.stats.rating < 0.9 
      ? 'text-red-400' 
      : 'text-yellow-400';

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:transform hover:scale-[1.02] border"
         style={{ 
           backgroundColor: 'rgba(255, 255, 255, 0.03)', 
           borderColor: 'rgba(255, 255, 255, 0.1)' 
         }}>
      <div className="relative">
        <img 
          src={player.image} 
          alt={player.nickname} 
          className="w-full h-48 object-cover object-center transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
          <Link to={`/players/${player.id}`} className="text-xl font-bold text-white hover:text-cyan-400 transition-colors duration-300">
            {player.nickname}
          </Link>
          <p className="text-sm text-gray-200">{player.realName}</p>
        </div>
        <div className="absolute top-3 right-3 rounded-full px-3 py-1.5 text-xs font-semibold border"
             style={{ 
               backgroundColor: 'rgba(0, 0, 0, 0.7)', 
               borderColor: 'rgba(255, 255, 255, 0.2)' 
             }}>
          <span className={`${ratingColor}`}>{player.stats.rating.toFixed(2)}</span> <span className="text-gray-300">Rating</span>
        </div>
        {team && (
          <div className="absolute top-3 left-3">
            <Link to={`/teams/${team.id}`} className="block transition-transform duration-300 hover:scale-110">
              <img 
                src={team.logo} 
                alt={team.name} 
                className="w-10 h-10 rounded-full border-2 border-white/20"
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
              <p className="font-medium text-white">{player.stats.kdRatio.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">KOST</p>
              <p className="font-medium text-white">{(player.stats.kost * 100).toFixed(0)}%</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">SRV</p>
              <p className="font-medium text-white">{(player.stats.srv * 100).toFixed(0)}%</p>
            </div>
          </div>
          
          <div className="mt-4">
            <Link 
              to={`/players/${player.id}`} 
              className="block w-full text-center py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.15)';
              }}
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
            className="text-xs py-1.5 px-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.15)';
            }}
          >
            Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;