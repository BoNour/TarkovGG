import React from 'react';
import { Link } from 'react-router-dom';
import { Match } from '../../types';
import { useGameData } from '../../context/GameDataContext';
import { Clock, Play, CheckCircle } from 'lucide-react';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const { teams } = useGameData();
  
  const teamOne = teams.find(team => team.id === match.teamOneId);
  const teamTwo = teams.find(team => team.id === match.teamTwoId);

  if (!teamOne || !teamTwo) {
    return (
      <div className="p-4 rounded-lg bg-gray-800 text-white">
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
  const date = new Date(match.date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="relative group overflow-hidden rounded-2xl p-0.5 transition-all duration-300 ease-in-out bg-gradient-to-br from-white/10 to-transparent hover:from-white/20">
      <div className="relative bg-zinc-900/60 backdrop-blur-xl rounded-[15px] p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className={`flex items-center space-x-2 px-2.5 py-1 text-xs font-bold rounded-full border ${status.className} ${status.color}`}>
            <status.Icon className="w-3 h-3" />
            <span>{status.label}</span>
          </div>
          <span className="text-xs text-gray-400 flex items-center"><Clock className="w-3 h-3 mr-1.5"/>{date}</span>
        </div>

        {/* Body */}
        <div className="flex items-center justify-between my-4">
          <div className="flex-1 flex flex-col items-center text-center">
            <img src={teamOne.logo} alt={teamOne.name} className="w-14 h-14 rounded-full mb-2 border-2 border-white/10 group-hover:border-white/30 transition-all"/>
            <span className="font-bold text-sm text-white leading-tight truncate w-full px-2">{teamOne.name}</span>
          </div>
          
          <div className="flex flex-col items-center justify-center w-24">
            {isUpcoming ? (
              <span className="text-lg font-bold text-gray-500">VS</span>
            ) : (
              <div className="flex items-center space-x-3">
                <span className={`text-4xl font-black ${match.teamOneScore > match.teamTwoScore ? 'text-white' : 'text-gray-500'}`}>{match.teamOneScore}</span>
                <span className="text-xl font-bold text-gray-400">-</span>
                <span className={`text-4xl font-black ${match.teamTwoScore > match.teamOneScore ? 'text-white' : 'text-gray-500'}`}>{match.teamTwoScore}</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 flex flex-col items-center text-center">
            <img src={teamTwo.logo} alt={teamTwo.name} className="w-14 h-14 rounded-full mb-2 border-2 border-white/10 group-hover:border-white/30 transition-all"/>
            <span className="font-bold text-sm text-white leading-tight truncate w-full px-2">{teamTwo.name}</span>
          </div>
        </div>

        {/* Footer Button */}
        <Link to={`/matches/${match.id}`} className={`block w-full text-center py-2.5 rounded-lg font-semibold transition-all duration-300 text-xs
          ${isLive 
              ? 'bg-red-500/80 hover:bg-red-500 text-white shadow-lg shadow-red-500/20' 
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}
        >
          {isLive ? 'Watch Now' : 'View Details'}
        </Link>
      </div>
    </div>
  );
};

export default MatchCard;