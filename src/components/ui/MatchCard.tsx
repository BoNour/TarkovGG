import React from 'react';
import { Link } from 'react-router-dom';
import { Match, Team } from '../../types';
import { useGameData } from '../../context/GameDataContext';
import { formatDate } from '../../utils/helpers';

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

  const statusColor = isLive 
    ? 'bg-red-500' 
    : isUpcoming 
      ? 'bg-yellow-500' 
      : 'bg-gray-500';

  const statusText = isLive 
    ? 'LIVE' 
    : isUpcoming 
      ? 'UPCOMING' 
      : 'COMPLETED';

  return (
    <div className="bg-gray-700/30 rounded-lg overflow-hidden shadow-md">
      {/* Match header with status */}
      <div className="bg-gray-600/30 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <span className={`${statusColor} w-3 h-3 rounded-full mr-2`}></span>
          <span className="text-xs font-medium uppercase">{statusText}</span>
        </div>
        <span className="text-xs text-gray-400">{formatDate(match.date)}</span>
      </div>

      {/* Team information */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center flex-1">
            <Link to={`/teams/${teamOne.id}`} className="block">
              <img 
                src={teamOne.logo} 
                alt={teamOne.name} 
                className="w-12 h-12 rounded-full object-cover"
              />
            </Link>
            <div className="ml-3">
              <Link to={`/teams/${teamOne.id}`} className="font-semibold text-white hover:text-gray-300 transition">
                {teamOne.name}
              </Link>
              <p className="text-sm text-gray-400">{teamOne.tag}</p>
            </div>
          </div>
          
          {/* Scores */}
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold">{match.teamOneScore}</span>
            <span className="text-gray-400 text-sm">vs</span>
            <span className="text-xl font-bold">{match.teamTwoScore}</span>
          </div>
          
          <div className="flex items-center justify-end flex-1">
            <div className="mr-3 text-right">
              <Link to={`/teams/${teamTwo.id}`} className="font-semibold text-white hover:text-gray-300 transition">
                {teamTwo.name}
              </Link>
              <p className="text-sm text-gray-400">{teamTwo.tag}</p>
            </div>
            <Link to={`/teams/${teamTwo.id}`} className="block">
              <img 
                src={teamTwo.logo} 
                alt={teamTwo.name} 
                className="w-12 h-12 rounded-full object-cover"
              />
            </Link>
          </div>
        </div>
        
        {/* Map information */}
        {variant === 'full' && match.maps.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-600/30">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Maps</h4>
            <div className="space-y-2">
              {match.maps.map((map, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-300">{map.name}</span>
                  <div>
                    <span className={`${map.teamOneScore > map.teamTwoScore ? 'text-green-500' : 'text-gray-400'}`}>
                      {map.teamOneScore}
                    </span>
                    <span className="text-gray-500 mx-1">-</span>
                    <span className={`${map.teamTwoScore > map.teamOneScore ? 'text-green-500' : 'text-gray-400'}`}>
                      {map.teamTwoScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* View match details button */}
        <div className="mt-4">
          <Link 
            to={`/matches/${match.id}`} 
            className="block w-full text-center py-2 bg-gray-600/30 hover:bg-gray-600/50 rounded-md text-sm font-medium transition"
          >
            {isLive ? 'Watch Now' : 'Match Details'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;