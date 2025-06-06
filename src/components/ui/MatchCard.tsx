import React from 'react';
import { Link } from 'react-router-dom';
import { Match, Team } from '../../types';
import { useGameData } from '../../context/GameDataContext';
import { formatDate } from '../../utils/helpers';
import { Calendar, MapPin, TrendingUp } from 'lucide-react';

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
      color: 'bg-red-500',
      text: 'LIVE',
      textColor: 'text-red-400',
      borderColor: 'border-red-500/30',
      bgGlow: 'shadow-red-500/10'
    },
    upcoming: {
      color: 'bg-blue-500',
      text: 'UPCOMING',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      bgGlow: 'shadow-blue-500/10'
    },
    completed: {
      color: 'bg-green-500',
      text: 'COMPLETED',
      textColor: 'text-green-400',
      borderColor: 'border-green-500/30',
      bgGlow: 'shadow-green-500/10'
    }
  };

  const currentStatus = isLive ? statusConfig.live : isUpcoming ? statusConfig.upcoming : statusConfig.completed;

  return (
    <div className={`bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl ${currentStatus.bgGlow} border ${currentStatus.borderColor} backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 group`}>
      {/* Enhanced header with gradient and better status indicator */}
      <div className="relative bg-gradient-to-r from-gray-700 via-gray-700 to-gray-600 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className={`${currentStatus.color} w-3 h-3 rounded-full animate-pulse shadow-lg`}></div>
            <span className={`text-sm font-bold uppercase tracking-wider ${currentStatus.textColor}`}>
              {currentStatus.text}
            </span>
            {isLive && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
                <span className="text-xs text-red-300 font-medium">ON AIR</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">{formatDate(match.date)}</span>
          </div>
        </div>
        {/* Gradient overlay for depth */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
      </div>

      {/* Team information with enhanced design */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          {/* Team One */}
          <div className="flex items-center space-x-4 flex-1">
            <Link to={`/teams/${teamOne.id}`} className="group/team">
              <div className="relative">
                <img 
                  src={teamOne.logo} 
                  alt={teamOne.name} 
                  className="w-16 h-16 rounded-2xl object-cover shadow-lg border-2 border-gray-600 group-hover/team:border-blue-400 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent to-white/10 opacity-0 group-hover/team:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
            <div className="space-y-1">
              <Link 
                to={`/teams/${teamOne.id}`} 
                className="font-bold text-white hover:text-blue-400 transition-colors duration-300 text-lg"
              >
                {teamOne.name}
              </Link>
              <p className="text-sm text-gray-400 font-medium">{teamOne.tag}</p>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-500">{teamOne.region}</span>
              </div>
            </div>
          </div>
          
          {/* Enhanced Score Display */}
          <div className="flex items-center space-x-6 mx-8">
            <div className="text-center">
              <div className={`text-3xl font-black ${match.teamOneScore > match.teamTwoScore ? 'text-green-400' : 'text-gray-300'}`}>
                {match.teamOneScore}
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-px bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600"></div>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">VS</span>
              <div className="w-12 h-px bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600"></div>
            </div>
            
            <div className="text-center">
              <div className={`text-3xl font-black ${match.teamTwoScore > match.teamOneScore ? 'text-green-400' : 'text-gray-300'}`}>
                {match.teamTwoScore}
              </div>
            </div>
          </div>
          
          {/* Team Two */}
          <div className="flex items-center justify-end space-x-4 flex-1">
            <div className="space-y-1 text-right">
              <Link 
                to={`/teams/${teamTwo.id}`} 
                className="font-bold text-white hover:text-blue-400 transition-colors duration-300 text-lg"
              >
                {teamTwo.name}
              </Link>
              <p className="text-sm text-gray-400 font-medium">{teamTwo.tag}</p>
                             <div className="flex items-center justify-end space-x-1">
                 <span className="text-xs text-gray-500">{teamTwo.region}</span>
                 <TrendingUp className="w-3 h-3 text-gray-500" />
               </div>
            </div>
            <Link to={`/teams/${teamTwo.id}`} className="group/team">
              <div className="relative">
                <img 
                  src={teamTwo.logo} 
                  alt={teamTwo.name} 
                  className="w-16 h-16 rounded-2xl object-cover shadow-lg border-2 border-gray-600 group-hover/team:border-blue-400 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent to-white/10 opacity-0 group-hover/team:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Enhanced Map information */}
        {variant === 'full' && match.maps.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-700/50">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-4 h-4 text-gray-400" />
              <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Maps Played</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {match.maps.map((map, index) => (
                <div key={index} className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30 hover:border-gray-500/50 transition-colors duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-200 font-medium text-sm">{map.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-lg font-bold ${map.teamOneScore > map.teamTwoScore ? 'text-green-400' : 'text-gray-400'}`}>
                        {map.teamOneScore}
                      </span>
                      <span className="text-gray-500 text-sm">-</span>
                      <span className={`text-lg font-bold ${map.teamTwoScore > map.teamOneScore ? 'text-green-400' : 'text-gray-400'}`}>
                        {map.teamTwoScore}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Enhanced action button */}
        <div className="mt-6">
          <Link 
            to={`/matches/${match.id}`} 
            className={`block w-full text-center py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02] ${
              isLive 
                ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-500/25' 
                : 'bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400 text-white shadow-lg'
            }`}
          >
            {isLive ? '🔴 Watch Live' : 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;