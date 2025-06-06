import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Trophy } from 'lucide-react';
import { Tournament } from '../../types';

interface TournamentCardProps {
  tournament: Tournament;
  variant?: 'compact' | 'full';
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament, variant = 'compact' }) => {
  const startDate = new Date(tournament.startDate);
  const endDate = new Date(tournament.endDate);
  const now = new Date();
  
  const isOngoing = startDate <= now && endDate >= now;
  const isUpcoming = startDate > now;
  const isFinished = endDate < now;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = () => {
    if (isOngoing) return 'text-red-400 bg-red-400/10 border-red-400/20';
    if (isUpcoming) return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  };

  const getStatusText = () => {
    if (isOngoing) return 'LIVE';
    if (isUpcoming) return 'Upcoming';
    return 'Finished';
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:transform hover:scale-[1.02] border"
         style={{ 
           backgroundColor: 'rgba(255, 255, 255, 0.03)', 
           borderColor: 'rgba(255, 255, 255, 0.1)' 
         }}>
      <div className="relative">
        <img 
          src={tournament.logo} 
          alt={tournament.name} 
          className="w-full h-48 object-cover object-center transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Status badge */}
        <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusColor()}`}>
          {isOngoing && <span className="w-2 h-2 bg-red-400 rounded-full inline-block mr-2 animate-pulse"></span>}
          {getStatusText()}
        </div>

        {/* Tournament info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Link to={`/tournaments/${tournament.id}`} className="text-xl font-bold text-white hover:text-purple-400 transition-colors duration-300 line-clamp-2">
            {tournament.name}
          </Link>
          <div className="flex items-center text-sm text-gray-200 mt-2 space-x-4">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {tournament.location}
            </div>
            <div className="flex items-center">
              <Trophy className="w-4 h-4 mr-1" />
              ${tournament.prizePool.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(startDate)} - {formatDate(endDate)}
          </div>
          <span className="text-purple-400 font-medium">{tournament.teams.length} teams</span>
        </div>
        
        {variant === 'full' && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-400 text-xs">Prize Pool</p>
              <p className="font-medium text-white">${tournament.prizePool.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Teams</p>
              <p className="font-medium text-white">{tournament.teams.length}</p>
            </div>
          </div>
        )}
        
        <Link 
          to={`/tournaments/${tournament.id}`} 
          className="block w-full text-center py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', color: '#9333ea' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.15)';
          }}
        >
          View Tournament
        </Link>
      </div>
    </div>
  );
};

export default TournamentCard;