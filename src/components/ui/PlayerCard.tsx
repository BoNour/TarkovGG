import React from 'react';
import { Link } from 'react-router-dom';
import { Player } from '../../types';
import { useGameData } from '../../context/GameDataContext';
import { Trophy, Target, Shield } from 'lucide-react';

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

  const getRatingGradient = (rating: number) => {
    if (rating >= 1.2) return 'from-green-500 to-emerald-600';
    if (rating >= 1.0) return 'from-cyan-500 to-blue-600';
    if (rating >= 0.8) return 'from-yellow-500 to-orange-600';
    return 'from-orange-500 to-red-600';
  };

  const getRatingBadgeColor = (rating: number) => {
    if (rating >= 1.2) return 'bg-emerald-500/15 border-emerald-400/25 text-emerald-300';
    if (rating >= 1.0) return 'bg-cyan-500/15 border-cyan-400/25 text-cyan-300';
    if (rating >= 0.8) return 'bg-amber-500/15 border-amber-400/25 text-amber-300';
    return 'bg-orange-500/15 border-orange-400/25 text-orange-300';
  };

  return (
    <div className="group relative">
      {/* Animated background glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/8 via-purple-500/6 to-blue-500/8 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      
      {/* Main card */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 backdrop-blur-sm group-hover:shadow-cyan-500/15"
           style={{ 
             backgroundColor: 'rgba(255, 255, 255, 0.03)'
           }}>
        
        {/* Image section with enhanced styling */}
        <div className="relative h-56 overflow-hidden">
          {/* Dynamic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10"></div>
          
          {/* PMC Image with better positioning */}
          <div className="relative h-full" style={{ backgroundColor: '#1a1b1b' }}>
            <img 
              src={player.image} 
              alt={player.nickname} 
              className="w-full h-full object-contain transition-all duration-700 scale-90 group-hover:scale-105"
              style={{ 
                filter: 'contrast(1.1) brightness(1.3)',
                maxHeight: '100%',
                maxWidth: '100%',
                objectPosition: 'center 150%',
                transform: 'translateY(20px)'
              }}
            />
          </div>

          {/* Team logo with modern styling */}
          {team && (
            <div className="absolute top-4 left-4 z-20">
              <Link to={`/teams/${team.id}`} className="block group/team">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/15 to-blue-500/10 rounded-full opacity-0 group-hover/team:opacity-50 blur transition-all duration-300"></div>
                  <img 
                    src={team.logo} 
                    alt={team.name} 
                    className="relative w-12 h-12 rounded-full border-2 border-white/20 backdrop-blur-sm bg-black/30 p-0.5 transition-all duration-300 group-hover/team:border-cyan-400/40 group-hover/team:scale-110"
                  />
                </div>
              </Link>
            </div>
          )}

          {/* Enhanced rating badge */}
          <div className="absolute top-4 right-4 z-20">
            <div className={`px-4 py-2 rounded-xl border backdrop-blur-md font-bold text-sm ${getRatingBadgeColor(player.stats.rating)}`}>
              <div className="flex items-center space-x-1">
                <Trophy className="w-4 h-4" />
                <span>{player.stats.rating.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Player name overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <Link to={`/players/${player.id}`} className="block group/name">
              <h3 className="text-2xl font-black text-white mb-1 transition-all duration-300 group-hover/name:text-cyan-300">
                {player.nickname}
              </h3>
              <p className="text-sm text-gray-300/80 font-medium">{player.role}</p>
            </Link>
          </div>
        </div>
        
        {variant === 'full' && (
          <div className="p-6 space-y-6">
            {/* Stats grid with modern design */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center group/stat">
                <div className="flex items-center justify-center mb-2">
                  <Target className="w-4 h-4 text-gray-400 group-hover/stat:text-cyan-300 transition-colors duration-300" />
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">K/D</p>
                <p className="text-lg font-bold text-white">{player.stats.kdRatio.toFixed(2)}</p>
              </div>
              <div className="text-center group/stat">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="w-4 h-4 text-gray-400 group-hover/stat:text-purple-300 transition-colors duration-300" />
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">KOST</p>
                <p className="text-lg font-bold text-white">{(player.stats.kost * 100).toFixed(0)}%</p>
              </div>
              <div className="text-center group/stat">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="w-4 h-4 text-gray-400 group-hover/stat:text-amber-300 transition-colors duration-300" />
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">SRV</p>
                <p className="text-lg font-bold text-white">{(player.stats.srv * 100).toFixed(0)}%</p>
              </div>
            </div>
            
            {/* Enhanced action button */}
            <Link 
              to={`/players/${player.id}`} 
              className="group/btn relative block w-full text-center py-4 rounded-2xl font-bold text-sm transition-all duration-300 overflow-hidden border"
              style={{ 
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(168, 85, 247, 0.06) 100%)',
                borderColor: 'rgba(6, 182, 212, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(168, 85, 247, 0.12) 100%)';
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(6, 182, 212, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(168, 85, 247, 0.06) 100%)';
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10 text-white group-hover/btn:text-white transition-colors duration-300">
                View Profile
              </span>
            </Link>
          </div>
        )}
        
        {variant === 'compact' && (
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <Link to={`/players/${player.id}`} className="text-lg font-bold text-white hover:text-cyan-300 transition-colors duration-300 block mb-1">
                  {player.nickname}
                </Link>
                <p className="text-sm text-gray-400">{player.role}</p>
              </div>
                              <Link 
                  to={`/players/${player.id}`} 
                  className="px-4 py-2 rounded-xl font-semibold text-xs transition-all duration-300 border"
                  style={{ 
                    backgroundColor: 'rgba(6, 182, 212, 0.08)', 
                    color: '#06b6d4',
                    borderColor: 'rgba(6, 182, 212, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
                    e.currentTarget.style.color = '#06b6d4';
                    e.currentTarget.style.transform = 'scale(1.0)';
                  }}
                >
                Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;