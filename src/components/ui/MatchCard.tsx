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
      cardStyle: 'from-red-950/20 via-red-900/10 to-transparent border-red-500/20',
      bgOverlay: 'bg-gradient-to-br from-red-500/5 to-transparent'
    },
    upcoming: {
      indicator: (
        <div className="flex items-center space-x-2">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-blue-400 font-semibold text-sm">UPCOMING</span>
        </div>
      ),
      cardStyle: 'from-blue-950/20 via-blue-900/10 to-transparent border-blue-500/20',
      bgOverlay: 'bg-gradient-to-br from-blue-500/5 to-transparent'
    },
    completed: {
      indicator: (
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span className="text-emerald-400 font-semibold text-sm">COMPLETED</span>
        </div>
      ),
      cardStyle: 'from-emerald-950/20 via-emerald-900/10 to-transparent border-emerald-500/20',
      bgOverlay: 'bg-gradient-to-br from-emerald-500/5 to-transparent'
    }
  };

  const currentStatus = isLive ? statusConfig.live : isUpcoming ? statusConfig.upcoming : statusConfig.completed;

  return (
    <div className={`group relative bg-gradient-to-br ${currentStatus.cardStyle} backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer`}
         style={{ 
           backgroundColor: 'rgba(255, 255, 255, 0.03)',
           animation: isLive ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
         }}
         onMouseEnter={(e) => {
           e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
           e.currentTarget.style.borderColor = isLive ? 'rgba(239, 68, 68, 0.6)' : 'rgba(59, 130, 246, 0.4)';
           e.currentTarget.style.animation = 'none'; // Stop pulse animation on hover
         }}
         onMouseLeave={(e) => {
           e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
           e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
           e.currentTarget.style.animation = isLive ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none';
         }}>
      
      {/* Live match effects */}
      {isLive && (
        <div className={`absolute inset-0 ${currentStatus.bgOverlay} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>
      )}
      
      {/* Header */}
      <div className="relative px-6 py-4 border-b" style={{ borderBottomColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="flex justify-between items-center">
          {currentStatus.indicator}
          <div className="flex items-center space-x-3 text-gray-400">
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
              <div className="relative overflow-hidden rounded-xl border-2 transition-all duration-300 transform group-hover/team:scale-125 group-hover/team:rotate-3 group-hover/team:shadow-lg group-hover/team:shadow-blue-500/30" 
                   style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.8)';
                     e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                     e.currentTarget.style.boxShadow = 'none';
                   }}>
                <img 
                  src={teamOne.logo} 
                  alt={teamOne.name} 
                  className="w-14 h-14 object-cover transition-all duration-300 group-hover/team:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover/team:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
            <div className="space-y-1 min-w-0 flex-1">
              <Link 
                to={`/teams/${teamOne.id}`} 
                className="block text-base font-bold text-white hover:text-blue-400 transition-colors duration-300 leading-tight"
              >
                {teamOne.name}
              </Link>
              <p className="text-gray-500 text-xs">{teamOne.region}</p>
            </div>
          </div>
          
          {/* Score */}
          <div className="flex items-center space-x-4 mx-6 flex-shrink-0">
            <div className="text-center">
              <div className={`text-2xl font-black ${match.teamOneScore > match.teamTwoScore ? 'text-emerald-400' : 'text-gray-300'} transition-all duration-300 transform group-hover:scale-125 group-hover:drop-shadow-lg`}
                   style={{
                     filter: 'none'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.color = '#00FF7F'; // Pure saturated green
                     e.currentTarget.style.filter = 'saturate(5) brightness(1.5) contrast(1.8) drop-shadow(0 0 8px #00FF7F)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.color = '';
                     e.currentTarget.style.filter = 'none';
                   }}>
                {match.teamOneScore}
              </div>
            </div>
            
            <div className="flex flex-col items-center transition-all duration-300 group-hover:scale-110">
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent transition-colors duration-300"
                   style={{ background: 'linear-gradient(to right, transparent, rgb(107, 114, 128), transparent)' }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.background = 'linear-gradient(to right, transparent, #0080FF, transparent)';
                     e.currentTarget.style.filter = 'saturate(4) brightness(1.4) drop-shadow(0 0 4px #0080FF)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.background = 'linear-gradient(to right, transparent, rgb(107, 114, 128), transparent)';
                     e.currentTarget.style.filter = 'none';
                   }}></div>
              <span className="text-xs text-gray-500 font-bold my-1 tracking-[0.2em] transition-colors duration-300"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#0080FF'; // Pure saturated blue
                      e.currentTarget.style.filter = 'saturate(4) brightness(1.4) drop-shadow(0 0 4px #0080FF)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '';
                      e.currentTarget.style.filter = 'none';
                    }}>VS</span>
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent transition-colors duration-300"
                   style={{ background: 'linear-gradient(to right, transparent, rgb(107, 114, 128), transparent)' }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.background = 'linear-gradient(to right, transparent, #0080FF, transparent)';
                     e.currentTarget.style.filter = 'saturate(4) brightness(1.4) drop-shadow(0 0 4px #0080FF)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.background = 'linear-gradient(to right, transparent, rgb(107, 114, 128), transparent)';
                     e.currentTarget.style.filter = 'none';
                   }}></div>
            </div>
            
            <div className="text-center">
              <div className={`text-2xl font-black ${match.teamTwoScore > match.teamOneScore ? 'text-emerald-400' : 'text-gray-300'} transition-all duration-300 transform group-hover:scale-125 group-hover:drop-shadow-lg`}
                   style={{
                     filter: 'none'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.color = '#00FF7F'; // Pure saturated green
                     e.currentTarget.style.filter = 'saturate(5) brightness(1.5) contrast(1.8) drop-shadow(0 0 8px #00FF7F)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.color = '';
                     e.currentTarget.style.filter = 'none';
                   }}>
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
              <p className="text-gray-500 text-xs">{teamTwo.region}</p>
            </div>
            <Link to={`/teams/${teamTwo.id}`} className="group/team relative flex-shrink-0">
              <div className="relative overflow-hidden rounded-xl border-2 transition-all duration-300 transform group-hover/team:scale-125 group-hover/team:-rotate-3 group-hover/team:shadow-lg group-hover/team:shadow-blue-500/30"
                   style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.8)';
                     e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                     e.currentTarget.style.boxShadow = 'none';
                   }}>
                <img 
                  src={teamTwo.logo} 
                  alt={teamTwo.name} 
                  className="w-14 h-14 object-cover transition-all duration-300 group-hover/team:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover/team:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Maps */}
        {variant === 'full' && match.maps.length > 0 && (
          <div className="mb-8 p-6 rounded-2xl border" 
               style={{ 
                 backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                 borderColor: 'rgba(255, 255, 255, 0.1)' 
               }}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center border"
                   style={{ 
                     backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                     borderColor: 'rgba(255, 255, 255, 0.1)' 
                   }}>
                <MapPin className="w-4 h-4 text-gray-400" />
              </div>
              <h4 className="text-gray-300 font-semibold">Maps Played</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {match.maps.map((map, index) => (
                <div key={index} 
                     className="flex justify-between items-center p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02]"
                     style={{ 
                       backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                       borderColor: 'rgba(255, 255, 255, 0.1)' 
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                     }}>
                  <span className="text-gray-200 font-medium">{map.name}</span>
                  <div className="flex items-center space-x-3">
                    <span className={`text-lg font-bold ${map.teamOneScore > map.teamTwoScore ? 'text-emerald-400' : 'text-gray-400'}`}>
                      {map.teamOneScore}
                    </span>
                    <span className="text-gray-500">–</span>
                    <span className={`text-lg font-bold ${map.teamTwoScore > map.teamOneScore ? 'text-emerald-400' : 'text-gray-400'}`}>
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
              ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 shadow-lg shadow-red-500/25 hover:shadow-red-500/40' 
              : 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 shadow-lg shadow-black/20'
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