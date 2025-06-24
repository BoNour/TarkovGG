import React from 'react';
import { Link } from 'react-router-dom';
import { Match } from '../../types';
import { useGameData } from '../../context/GameDataContext';
import { Clock, Play, CheckCircle } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  compact?: boolean; // Add compact prop for different layouts
}

const MatchCard: React.FC<MatchCardProps> = ({ match, compact = false }) => {
  const { teams } = useGameData();
  
  const teamOne = teams.find(team => team.id === match.teamOneId);
  const teamTwo = teams.find(team => team.id === match.teamTwoId);

  if (!teamOne || !teamTwo) {
    return (
      <div className="p-3 rounded-lg bg-gray-800 text-white text-sm">
        Match data is incomplete.
      </div>
    );
  }

  const isLive = match.status === 'live';
  const isUpcoming = match.status === 'upcoming';

  const getStatusInfo = () => {
    if (isLive) return {
      Icon: Play,
      label: 'LIVE',
      color: 'text-red-400',
      className: 'bg-red-500/10 border-red-500/20'
    };
    if (isUpcoming) return {
      Icon: Clock,
      label: 'UPCOMING',
      color: 'text-blue-400',
      className: 'bg-blue-500/10 border-blue-500/20'
    };
    return {
      Icon: CheckCircle,
      label: 'COMPLETED',
      color: 'text-green-400',
      className: 'bg-green-500/10 border-green-500/20'
    };
  };

  const status = getStatusInfo();

  if (compact) {
    return (
      <div className="relative group overflow-hidden rounded-lg p-0.5 transition-all duration-300 ease-in-out bg-gradient-to-br from-white/10 to-transparent hover:from-white/20">
        <div className="relative bg-zinc-900/60 backdrop-blur-xl rounded-[7px] p-3">
          {/* Compact Body - Horizontal Layout */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1">
              <img src={teamOne.logo} alt={teamOne.name} className="w-6 h-6 rounded-full border border-white/10"/>
              <span className="font-semibold text-sm text-white truncate">{teamOne.tag || teamOne.name}</span>
            </div>
            
            <div className="flex items-center justify-center px-2">
              {isUpcoming ? (
                <span className="text-sm font-bold text-gray-400">VS</span>
              ) : (
                <div className="flex items-center space-x-1">
                  <span className={`text-sm font-bold ${match.teamOneScore > match.teamTwoScore ? 'text-white' : 'text-gray-500'}`}>{match.teamOneScore}</span>
                  <span className="text-xs text-gray-400">-</span>
                  <span className={`text-sm font-bold ${match.teamTwoScore > match.teamOneScore ? 'text-white' : 'text-gray-500'}`}>{match.teamTwoScore}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2 flex-1 justify-end">
              <span className="font-semibold text-sm text-white truncate">{teamTwo.tag || teamTwo.name}</span>
              <img src={teamTwo.logo} alt={teamTwo.name} className="w-6 h-6 rounded-full border border-white/10"/>
            </div>
          </div>

          {/* Compact Footer */}
          <Link to={`/matches/${match.id}`} className={`block w-full text-center py-1.5 rounded-md font-semibold transition-all duration-300 text-xs mt-2
            ${isLive 
                ? 'bg-red-500/80 hover:bg-red-500 text-white shadow-lg shadow-red-500/20' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            {isLive ? 'Watch now' : 'View details'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group overflow-hidden rounded-xl p-0.5 transition-all duration-300 ease-in-out bg-gradient-to-br from-white/10 to-transparent hover:from-white/20">
      <div className="relative bg-zinc-900/60 backdrop-blur-xl rounded-[11px] p-3">
        {/* Body */}
        <div className="flex items-center justify-between my-3">
          <div className="flex-1 flex flex-col items-center text-center">
            <img src={teamOne.logo} alt={teamOne.name} className="w-10 h-10 rounded-full mb-2.5 border-2 border-white/10"/>
            <span className="font-bold text-lg text-white truncate w-full px-1">{teamOne.name}</span>
          </div>
          
          <div className="flex flex-col items-center justify-center w-20">
            {isUpcoming ? (
              <span className="text-2xl font-black text-gray-300 tracking-wider">VS</span>
            ) : (
              <div className="flex items-center space-x-2">
                <span className={`text-2xl font-black ${match.teamOneScore > match.teamTwoScore ? 'text-white' : 'text-gray-500'}`}>{match.teamOneScore}</span>
                <span className="text-lg font-bold text-gray-400">-</span>
                <span className={`text-2xl font-black ${match.teamTwoScore > match.teamOneScore ? 'text-white' : 'text-gray-500'}`}>{match.teamTwoScore}</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 flex flex-col items-center text-center">
            <img src={teamTwo.logo} alt={teamTwo.name} className="w-10 h-10 rounded-full mb-2.5 border-2 border-white/10"/>
            <span className="font-bold text-lg text-white truncate w-full px-1">{teamTwo.name}</span>
          </div>
        </div>

        {/* Footer Button */}
        <Link to={`/matches/${match.id}`} className={`block w-full text-center py-2 rounded-lg font-semibold transition-all duration-300 text-xs
          ${isLive 
              ? 'bg-red-500/80 hover:bg-red-500 text-white shadow-lg shadow-red-500/20' 
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}
        >
          {isLive ? 'Watch now' : 'View details'}
        </Link>
      </div>
    </div>
  );
};

export default MatchCard;