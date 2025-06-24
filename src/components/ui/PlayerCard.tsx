import React from 'react';
import { Link } from 'react-router-dom';
import { Player } from '../../types';
import { useGameData } from '../../context/GameDataContext';
import { Trophy, Target, Shield } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  variant?: 'compact' | 'full' | 'minimal';
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
    <div className="relative" style={{ zIndex: isHovered ? -1 : 1 }}>
      {/* Card background container with proper overflow handling */}
      <div 
        className="relative rounded-3xl transition-all duration-500 backdrop-blur-sm transform-gpu"
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
        
        {/* Image area background - clipped for card shape */}
        <div className="relative h-40 rounded-t-3xl overflow-visible">
          <div className="w-full h-full bg-gradient-to-b from-transparent to-black/20"></div>
          
          {/* Sharp image for top portion */}
          <div className="absolute inset-0 flex items-start justify-center" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 99%, 0 99%)' }}>
            <img 
              src={player.image} 
              alt={player.nickname} 
              className={`object-contain transition-all duration-700 transform-gpu ${isHovered ? 'translate-y-2 scale-[1.2]' : 'translate-y-2 scale-[0.95]'}`}
              style={{ 
                filter: 'contrast(1) brightness(1.3)',
                height: '120%',
                width: 'auto',
                maxWidth: '120%',
                transformOrigin: 'center top',
                zIndex: 10,
              }}
            />
          </div>
          
          {/* Blurred image extending into bottom section - always visible */}
          <div className="absolute top-0 left-0 w-full h-full flex items-start justify-center pointer-events-none" style={{ zIndex: 1 }}>
            <img 
              src={player.image} 
              alt="" 
              className={`object-contain transition-all duration-700 transform-gpu ${isHovered ? 'translate-y-2 scale-[1.2]' : 'translate-y-2 scale-[0.95]'}`}
              style={{ 
                filter: 'contrast(1) brightness(1.3) blur(2px)',
                height: '120%',
                width: 'auto',
                maxWidth: '120%',
                transformOrigin: 'center top',
                opacity: 0.5,
                maskImage: 'linear-gradient(to bottom, transparent 85%, rgba(0,0,0,0.8) 95%, rgba(0,0,0,0.4) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 85%, rgba(0,0,0,0.8) 95%, rgba(0,0,0,0.4) 100%)',
              }}
            />
          </div>
        </div>
        
        {/* Blurred overflow image - only visible outside card bounds on hover */}
        <div className="absolute top-0 left-0 w-full h-40 flex items-start justify-center pointer-events-none" style={{ zIndex: isHovered ? -10 : -1 }}>
          <img 
            src={player.image} 
            alt="" 
            className={`object-contain transition-all duration-700 transform-gpu ${isHovered ? 'translate-y-2 scale-[1.2]' : 'translate-y-5 scale-90 opacity-0'}`}
            style={{ 
              filter: 'contrast(1) brightness(1.3) blur(3px)',
              height: '120%',
              width: 'auto',
              maxWidth: '120%',
              transformOrigin: 'center top',
              opacity: isHovered ? 0.8 : 0,
            }}
          />
        </div>

        {/* Team logo with modern styling - Always show COV logo for now */}
        <div className="absolute top-4 left-4 z-20">
          {team ? (
            <Link to={`/teams/${team.id}`} className="block group/team">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/15 to-blue-500/10 rounded-full opacity-0 group-hover/team:opacity-50 blur transition-all duration-300"></div>
                <img 
                  src="/TEAMs/cov logo.png" 
                  alt="COV Logo" 
                  className="relative w-10 h-10 object-contain transition-all duration-300 drop-shadow-lg"
                />
              </div>
            </Link>
          ) : (
            <div className="block group/team">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/15 to-blue-500/10 rounded-full opacity-0 group-hover/team:opacity-50 blur transition-all duration-300"></div>
                <img 
                  src="/TEAMs/cov logo.png" 
                  alt="COV Logo" 
                  className="relative w-12 h-12 object-contain transition-all duration-300 drop-shadow-lg"
                />
              </div>
            </div>
          )}
        </div>


        
        {variant === 'full' && (
          <div 
            className="relative z-10 p-6 space-y-6 border rounded-b-3xl backdrop-blur-lg overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, rgba(24, 25, 25, 0.55) 0%, rgba(15, 16, 16, 0.78) 100%)',
              borderColor: isHovered ? 'rgba(34, 211, 238, 0.35)' : 'rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 22px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(16px) saturate(150%)'
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
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">RATING</p>
                <p className="text-lg font-bold text-white">{player.stats.rating.toFixed(2)}</p>
              </div>
            </div>
            
            {/* Enhanced glassy action button */}
            <Link 
              to={`/players/${player.id}`} 
              className="group/btn relative block w-full text-center py-4 rounded-2xl font-bold text-sm transition-all duration-300 overflow-hidden border backdrop-blur-md"
              style={{ 
                background: 'rgba(255, 255, 255, 0.08)',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1)';
              }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10 text-white group-hover/btn:text-white transition-colors duration-300">
                View Profile
              </span>
            </Link>
          </div>
        )}
        
        {variant === 'compact' && (
          <div 
            className="relative z-10 p-4 border rounded-b-3xl backdrop-blur-lg overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, rgba(24, 25, 25, 0.55) 0%, rgba(15, 16, 16, 0.78) 100%)',
              borderColor: isHovered ? 'rgba(34, 211, 238, 0.35)' : 'rgba(255, 255, 255, 0.08)',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(16px) saturate(150%)'
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
                className="px-4 py-2 rounded-xl font-semibold text-xs transition-all duration-300 border backdrop-blur-md"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.08)', 
                  color: '#ffffff',
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'scale(1.0)';
                  e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                }}
              >
                Profile
              </Link>
            </div>
          </div>
        )}

        {variant === 'minimal' && (
          <div 
            className="relative z-10 p-3 border rounded-b-3xl backdrop-blur-lg overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, rgba(24, 25, 25, 0.55) 0%, rgba(15, 16, 16, 0.78) 100%)',
              borderColor: 'rgba(255, 255, 255, 0.08)',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(16px) saturate(150%)'
            }}
          >
            {/* Player name and rating only */}
            <div className="text-center space-y-2">
              <Link to={`/players/${player.id}`} className="block group/name">
                <h3 className="text-lg font-black text-white transition-all duration-300 group-hover/name:text-cyan-300">
                  {player.nickname}
                </h3>
              </Link>
              
              {/* Rating only */}
              <div className="text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">RATING</p>
                <p className={`text-xl font-bold ${player.stats.rating > 1.1 ? 'text-green-400' : player.stats.rating < 0.9 ? 'text-red-400' : 'text-yellow-400'}`}>
                  {player.stats.rating.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;