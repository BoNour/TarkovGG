import React from 'react';
import { Link } from 'react-router-dom';
import { useGameData } from '../../context/GameDataContext';
import { Trophy, Calendar, ArrowRight } from 'lucide-react';

const FeaturedTournaments: React.FC = () => {
  const { tournaments, isLoading } = useGameData();

  // Get ongoing and upcoming tournaments first
  const now = new Date();
  const sortedTournaments = [...tournaments].sort((a, b) => {
    const aStartDate = new Date(a.startDate);
    const bStartDate = new Date(b.startDate);
    const aEndDate = new Date(a.endDate);
    const bEndDate = new Date(b.endDate);
    
    // Check if tournament is ongoing
    const aIsOngoing = aStartDate <= now && aEndDate >= now;
    const bIsOngoing = bStartDate <= now && bEndDate >= now;
    
    if (aIsOngoing && !bIsOngoing) return -1;
    if (!aIsOngoing && bIsOngoing) return 1;
    
    // Then sort by upcoming tournaments
    if (aStartDate > now && bStartDate <= now) return -1;
    if (aStartDate <= now && bStartDate > now) return 1;
    
    // Sort upcoming tournaments by start date
    if (aStartDate > now && bStartDate > now) {
      return aStartDate.getTime() - bStartDate.getTime();
    }
    
    // Sort past tournaments by end date (most recent first)
    return bEndDate.getTime() - aEndDate.getTime();
  });
  
  // Get the first 3 tournaments to ensure they fit the compact container
  const featuredTournaments = sortedTournaments.slice(0, 3);

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-700 rounded w-32 animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-16 animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-4 rounded-lg bg-white/5 animate-pulse border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                <div className="h-3 bg-gray-700 rounded w-16"></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-3 bg-gray-700 rounded w-20"></div>
                <div className="h-3 bg-gray-700 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with View All button */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">Tournaments</h3>
        <Link 
          to="/tournaments" 
          className="group flex items-center space-x-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-300"
        >
          <span>View All Tournaments </span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
      
      <div className="space-y-3">
      {featuredTournaments.map((tournament, index) => {
        const status = new Date(tournament.startDate) > new Date() ? 'Upcoming' : new Date(tournament.endDate) < new Date() ? 'Completed' : 'Live';
        const statusColor = status === 'Upcoming' ? 'text-blue-400' : status === 'Completed' ? 'text-gray-400' : 'text-red-400';
        
        return (
          <Link 
            to={`/tournaments/${tournament.id}`}
            key={tournament.id} 
            className="group block p-4 rounded-lg transition-all duration-300 hover:bg-white/5 border border-white/10 hover:border-white/20 relative overflow-hidden"
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 100}ms both`
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-white group-hover:text-yellow-400 transition-colors text-sm line-clamp-1">{tournament.name}</h3>
                <span className={`text-[10px] font-semibold uppercase tracking-wide ${statusColor}`}>
                  {status}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <Trophy size={12} className="text-yellow-400" />
                  <span className="font-semibold text-yellow-400">{tournament.prizePool}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={12} className="text-gray-400" />
                  <span className="text-gray-300">{new Date(tournament.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
            
            {/* Overlay text in bottom right */}
            <div className="absolute bottom-2 right-2 text-2xl font-black text-white/10 uppercase tracking-wider pointer-events-none">
              {tournament.name.split(' ')[0]}
            </div>
          </Link>
        )
      })}

      {featuredTournaments.length === 0 && (
        <div className="text-center py-8 h-24 flex flex-col items-center justify-center">
          <Trophy className="w-6 h-6 mx-auto text-gray-600 mb-1" />
          <h3 className="text-sm font-semibold text-white">No Tournaments</h3>
          <p className="text-xs text-gray-500">Check back soon for events.</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default FeaturedTournaments;