import React from 'react';
import { Link } from 'react-router-dom';
import { Player } from '../../types';
import { useGameData } from '../../context/GameDataContext';
import { Trophy, Target, Shield } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  variant?: 'compact' | 'full';
  isHovered?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, variant = 'compact', isHovered }) => {
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
    <div className="relative">
      {/* Main card with clean box design */}
      <div 
        className="relative rounded-3xl overflow-hidden transition-all duration-500 backdrop-blur-sm transform-gpu"
        style={{ 
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
        }}
      >
        
        {/* Image section with enhanced styling */}
        <div className="relative h-56">
          
          {/* PMC Image with better positioning */}
          <div className="relative h-full">
            <img 
              src={player.image} 
              alt={player.nickname} 
              className={`w-full h-full object-contain transition-all duration-700 transform-gpu ${isHovered ? 'translate-y-0 scale-[1.5]' : 'translate-y-5 scale-90'}`}
              style={{ 
                filter: 'contrast(1) brightness(1.3)',
                maxHeight: '100%',
                maxWidth: '100%',
                objectPosition: 'center top',
                transformOrigin: 'top center',
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
                    src="/cov logo.png" 
                    alt="COV Logo" 
                    className="relative w-10 h-10 object-contain transition-all duration-300"
                  />
                </div>
              </Link>
            </div>
          )}

          {/* Enhanced rating badge */}
          <div className="absolute top-4 right-4 z-20">
            <div className={`px-3 py-1.5 rounded-xl border backdrop-blur-md font-bold text-sm ${getRatingBadgeColor(player.stats.rating)}`}>
              <div className="flex items-center space-x-1.5">
                <Trophy className="w-3.5 h-3.5" />
                <span>{player.stats.rating.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {variant === 'full' && (
          <div 
            className="relative z-10 p-6 space-y-6 border-t border-l border-r border-b rounded-b-3xl backdrop-blur-md"
            style={{ 
              background: 'linear-gradient(135deg, rgba(42, 43, 43, 0.7) 0%, rgba(38, 39, 39, 0.8) 100%)',
              borderColor: isHovered ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.08)',
              borderTopColor: isHovered ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.06)',
            }}
          >
            {/* Player name section */}
            <div className="text-center">
              <Link to={`/players/${player.id}`} className="block group/name">
                <h3 className="text-2xl font-black text-white mb-1 transition-all duration-300 group-hover/name:text-cyan-300">
                  {player.nickname}
                </h3>
                <p className="text-sm text-gray-300/80 font-medium">{player.role}</p>
              </Link>
            </div>
            
            {/* Stats grid with modern design */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center group/stat">
                <div className="flex items-center justify-center mb-2">
                  <Target className="w-4 h-4 text-cyan-400 group-hover/stat:text-cyan-300 transition-colors duration-300" />
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">K/D</p>
                <p className="text-lg font-bold text-white">{player.stats.kdRatio.toFixed(2)}</p>
              </div>
              <div className="text-center group/stat">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="w-4 h-4 text-purple-400 group-hover/stat:text-purple-300 transition-colors duration-300" />
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">KOST</p>
                <p className="text-lg font-bold text-white">{(player.stats.kost * 100).toFixed(0)}%</p>
              </div>
              <div className="text-center group/stat">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="w-4 h-4 text-amber-400 group-hover/stat:text-amber-300 transition-colors duration-300" />
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
          <div 
            className="relative z-10 p-4 border-t border-l border-r border-b rounded-b-3xl backdrop-blur-md"
            style={{ 
              background: 'linear-gradient(135deg, rgba(42, 43, 43, 0.7) 0%, rgba(38, 39, 39, 0.8) 100%)',
              borderColor: isHovered ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.08)',
              borderTopColor: isHovered ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.06)',
            }}
          >
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