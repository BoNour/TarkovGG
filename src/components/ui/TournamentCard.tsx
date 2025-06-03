import React from 'react';
import { Link } from 'react-router-dom';
import { Tournament } from '../../types';

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
  const now = new Date();
  const startDate = new Date(tournament.startDate);
  const endDate = new Date(tournament.endDate);
  
  const isUpcoming = startDate > now;
  const isOngoing = startDate <= now && endDate >= now;
  const isCompleted = endDate < now;
  
  const statusBadge = isUpcoming 
    ? 'bg-yellow-500' 
    : isOngoing 
      ? 'bg-green-500' 
      : 'bg-gray-500';
  
  const statusText = isUpcoming 
    ? 'Upcoming' 
    : isOngoing 
      ? 'Ongoing' 
      : 'Completed';
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const dateRange = `${formatDate(tournament.startDate)} - ${formatDate(tournament.endDate)}`;

  const typeBadgeColor = 
    tournament.type === 'major' 
      ? 'bg-purple-600' 
      : tournament.type === 'minor' 
        ? 'bg-blue-600' 
        : 'bg-gray-600';

  return (
    <div className="bg-gray-700/30 rounded-lg overflow-hidden shadow-md transition-transform hover:transform hover:scale-[1.02]">
      <div className="relative">
        <img 
          src={tournament.logo} 
          alt={tournament.name} 
          className="w-full h-48 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`${statusBadge} text-xs px-2 py-1 rounded-full font-medium`}>
              {statusText}
            </span>
            <span className={`${typeBadgeColor} text-xs px-2 py-1 rounded-full font-medium uppercase`}>
              {tournament.type}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white">{tournament.name}</h3>
          <p className="text-sm text-gray-300">{tournament.game}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-400">Dates</p>
            <p className="text-sm font-medium">{dateRange}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Location</p>
            <p className="text-sm font-medium">{tournament.location}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Prize Pool</p>
            <p className="text-sm font-medium">{tournament.prizePool}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Format</p>
            <p className="text-sm font-medium capitalize">{tournament.format.replace('-', ' ')}</p>
          </div>
        </div>
        
        <Link 
          to={`/tournaments/${tournament.id}`} 
          className="block w-full text-center py-2 bg-gray-600/30 hover:bg-gray-600/50 rounded-md text-sm font-medium transition"
        >
          Tournament Details
        </Link>
      </div>
    </div>
  );
};

export default TournamentCard;