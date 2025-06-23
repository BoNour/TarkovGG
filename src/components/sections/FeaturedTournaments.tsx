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
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 rounded-lg bg-white/5 animate-pulse flex overflow-hidden">
            <div className="w-1/3 bg-white/5"></div>
            <div className="w-2/3 p-3 flex flex-col justify-between">
                <div>
                  <div className="h-3 bg-gray-700 rounded w-3/4 mb-1"></div>
                  <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-700 rounded w-16"></div>
                    <div className="h-2 bg-gray-700 rounded w-20"></div>
                  </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {featuredTournaments.map((tournament, index) => {
        const status = new Date(tournament.startDate) > new Date() ? 'Upcoming' : new Date(tournament.endDate) < new Date() ? 'Completed' : 'Live';
        const statusColor = status === 'Upcoming' ? 'bg-blue-500/20 text-blue-300' : status === 'Completed' ? 'bg-gray-500/20 text-gray-300' : 'bg-red-500/20 text-red-300 animate-pulse';
        
        return (
          <Link 
            to={`/tournaments/${tournament.id}`}
            key={tournament.id} 
            className="group block rounded-lg transition-all duration-300 hover:bg-white/5 overflow-hidden border border-white/10 hover:border-white/20 relative"
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 100}ms both`
            }}
          >
            <div className="flex h-24">
              <div className="w-1/3 relative bg-white/5 overflow-hidden border-r border-white/10">
                <img src="/arenapfp.webp" alt={tournament.name} className="w-full h-full object-cover scale-100 transition-transform duration-300" />
              </div>

              <div className="w-2/3 p-3 flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors mb-1 line-clamp-1">{tournament.name}</h3>
                    <div className="text-xs space-y-1">
                        <div className="flex items-center space-x-2 text-gray-400">
                            <Trophy size={12} className="text-yellow-400" />
                            <span className="font-semibold text-white text-xs">{tournament.prizePool}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                            <Calendar size={12} className="text-blue-400" />
                            <span className="text-xs">{new Date(tournament.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
                
                {/* Status badge */}
                <div className="flex justify-end">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${statusColor}`}>
                    {status}
                  </span>
                </div>
              </div>
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
       <Link 
        to="/tournaments" 
        className="group flex items-center justify-end space-x-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-300 mt-3"
      >
        <span>View All</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>
  );
};

export default FeaturedTournaments;