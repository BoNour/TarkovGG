import React from 'react';
import { Link } from 'react-router-dom';
import { Match, Team } from '../../types';
import { useGameData } from '../../context/GameDataContext';
import { formatDate } from '../../utils/helpers';
import { Clock, MapPin, ExternalLink, Play } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  variant?: 'compact' | 'full';
}

const MatchCard: React.FC<MatchCardProps> = ({ match, variant = 'full' }) => {
  const { teams } = useGameData();
  
  const teamOne = teams.find(team => team.id === match.teamOneId) as Team;
  const teamTwo = teams.find(team => team.id === match.teamTwoId) as Team;

  const isLive = match.status === 'live';
  const isUpcoming = match.status === 'upcoming';
  const isCompleted = match.status === 'completed';

  const statusConfig = {
    live: {
      indicator: (
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          </div>
          <span className="text-red-400 font-semibold text-sm">LIVE</span>
        </div>
      ),
      borderColor: 'border-red-500/20',
      bgClass: 'from-red-950/20 to-red-900/10'
    },
    upcoming: {
      indicator: (
        <div className="flex items-center space-x-2">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-blue-400 font-semibold text-sm">UPCOMING</span>
        </div>
      ),
      borderColor: 'border-blue-500/20',
      bgClass: 'from-blue-950/20 to-blue-900/10'
    },
    completed: {
      indicator: (
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span className="text-emerald-400 font-semibold text-sm">COMPLETED</span>
        </div>
      ),
      borderColor: 'border-emerald-500/20',
      bgClass: 'from-emerald-950/20 to-emerald-900/10'
    }
  };

  const currentStatus = isLive ? statusConfig.live : isUpcoming ? statusConfig.upcoming : statusConfig.completed;

  return (
    <div className={`group relative bg-gradient-to-br ${currentStatus.bgClass} backdrop-blur-xl border ${currentStatus.borderColor} rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-black/20 cursor-pointer ${isLive ? 'animate-pulse-subtle animate-ambient-glow' : ''}`}>
      {/* Live match lighting effects */}
      {isLive && (
        <>
          {/* Animated lighting sweep */}
          <div 
            className="absolute inset-0 opacity-30 animate-lighting-sweep bg-300%"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(239, 68, 68, 0.15) 30%, rgba(239, 68, 68, 0.3) 50%, rgba(239, 68, 68, 0.15) 70%, transparent 100%)',
            }}
          ></div>
          
          {/* Ambient glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent animate-pulse-glow rounded-3xl"></div>
          
          {/* Subtle animated border glow */}
          <div className="absolute inset-0 rounded-3xl border border-red-500/30 animate-pulse" style={{ 
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.1), inset 0 0 20px rgba(239, 68, 68, 0.05)' 
          }}></div>
        </>
      )}
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      </div>
      
      {/* Header */}
      <div className="relative px-8 py-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-b border-white/5">
        <div className="flex justify-between items-center">
          {currentStatus.indicator}
          <div className="flex items-center space-x-3 text-slate-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{formatDate(match.date)}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-6">
          {/* Team One */}
          <div className="flex items-center space-x-4 flex-1 min-w-0 max-w-[40%]">
            <Link to={`/teams/${teamOne.id}`} className="group/team relative flex-shrink-0">
              <div className="relative overflow-hidden rounded-xl border-2 border-slate-600/50 group-hover/team:border-blue-400/60 transition-all duration-300 transform group-hover/team:scale-110">
                <img 
                  src={teamOne.logo} 
                  alt={teamOne.name} 
                  className="w-14 h-14 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/team:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
            <div className="space-y-1 min-w-0 flex-1">
              <Link 
                to={`/teams/${teamOne.id}`} 
                className="block text-base font-bold text-white hover:text-blue-400 transition-colors duration-300 leading-tight"
              >
                {teamOne.name}
              </Link>
              <p className="text-slate-400 font-medium text-xs uppercase tracking-wider">{teamOne.tag}</p>
              <p className="text-slate-500 text-xs">{teamOne.region}</p>
            </div>
          </div>
          
          {/* Score */}
          <div className="flex items-center space-x-4 mx-6 flex-shrink-0">
            <div className="text-center">
              <div className={`text-2xl font-black ${match.teamOneScore > match.teamTwoScore ? 'text-emerald-400' : 'text-slate-300'} transition-colors duration-300 transform group-hover:scale-110`}>
                {match.teamOneScore}
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-slate-500 to-transparent"></div>
              <span className="text-xs text-slate-500 font-bold my-1 tracking-[0.2em]">VS</span>
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-slate-500 to-transparent"></div>
            </div>
            
            <div className="text-center">
              <div className={`text-2xl font-black ${match.teamTwoScore > match.teamOneScore ? 'text-emerald-400' : 'text-slate-300'} transition-colors duration-300 transform group-hover:scale-110`}>
                {match.teamTwoScore}
              </div>
            </div>
          </div>
          
          {/* Team Two */}
          <div className="flex items-center justify-end space-x-4 flex-1 min-w-0 max-w-[40%]">
            <div className="space-y-1 text-right min-w-0 flex-1">
              <Link 
                to={`/teams/${teamTwo.id}`} 
                className="block text-base font-bold text-white hover:text-blue-400 transition-colors duration-300 leading-tight"
              >
                {teamTwo.name}
              </Link>
              <p className="text-slate-400 font-medium text-xs uppercase tracking-wider">{teamTwo.tag}</p>
              <p className="text-slate-500 text-xs">{teamTwo.region}</p>
            </div>
            <Link to={`/teams/${teamTwo.id}`} className="group/team relative flex-shrink-0">
              <div className="relative overflow-hidden rounded-xl border-2 border-slate-600/50 group-hover/team:border-blue-400/60 transition-all duration-300 transform group-hover/team:scale-110">
                <img 
                  src={teamTwo.logo} 
                  alt={teamTwo.name} 
                  className="w-14 h-14 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/team:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Maps */}
        {variant === 'full' && match.maps.length > 0 && (
          <div className="mb-8 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-slate-400" />
              </div>
              <h4 className="text-slate-300 font-semibold">Maps Played</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {match.maps.map((map, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-slate-700/20 rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:scale-[1.02]">
                  <span className="text-slate-200 font-medium">{map.name}</span>
                  <div className="flex items-center space-x-3">
                    <span className={`text-lg font-bold ${map.teamOneScore > map.teamTwoScore ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {map.teamOneScore}
                    </span>
                    <span className="text-slate-500">–</span>
                    <span className={`text-lg font-bold ${map.teamTwoScore > map.teamOneScore ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {map.teamTwoScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Modern action button */}
        <Link 
          to={`/matches/${match.id}`} 
          className={`group/button relative block w-full overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-[1.02] ${
            isLive 
              ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 shadow-lg shadow-red-500/20 hover:shadow-red-500/30' 
              : 'bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 shadow-lg shadow-black/20'
          }`}
        >
          <div className="relative px-8 py-5">
            <div className="flex items-center justify-center space-x-3">
              {isLive ? (
                <>
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <Play className="w-3 h-3 text-white fill-current" />
                  </div>
                  <span className="text-white font-semibold">Watch Live</span>
                </>
              ) : (
                <>
                  <span className="text-white font-semibold">View Details</span>
                  <ExternalLink className="w-4 h-4 text-white/80 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5 transition-transform duration-300" />
                </>
              )}
            </div>
          </div>
          {/* Subtle hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-700"></div>
        </Link>
      </div>
    </div>
  );
};

export default MatchCard;