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
  
  // Get the first 4 tournaments to ensure they fit the container
  const featuredTournaments = sortedTournaments.slice(0, 4);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map(i => (
          <div key={i} className="h-44 rounded-2xl bg-white/5 animate-pulse flex overflow-hidden">
            <div className="w-2/5 bg-white/5"></div>
            <div className="w-3/5 p-5 flex flex-col justify-between">
                <div>
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-700 rounded w-20"></div>
                    <div className="h-3 bg-gray-700 rounded w-24"></div>
                  </div>
                  <div className="h-4 w-12 bg-gray-700 rounded"></div>
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
            className="group block rounded-2xl transition-all duration-300 hover:bg-white/5 overflow-hidden border border-white/10 hover:border-white/20 relative"
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 100}ms both`
            }}
          >
            <div className="flex h-44">
              <div className="w-2/5 relative flex items-center justify-center bg-white/5 overflow-hidden border-r border-white/10">
                <img src={tournament.logo} alt={tournament.name} className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-105" />
              </div>

              <div className="w-3/5 p-5 flex flex-col">
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors mb-2">{tournament.name}</h3>
                            <div className="text-sm space-y-1">
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <Trophy size={14} className="text-yellow-400" />
                                    <span className="font-semibold text-white">{tournament.prizePool}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <Calendar size={14} className="text-blue-400" />
                                    <span>{new Date(tournament.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                        <div className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor} flex-shrink-0 ml-2`}>
                            {status}
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <span className={`absolute bottom-2 right-3 font-black text-white/5 pointer-events-none select-none ${index === 0 ? 'text-4xl' : 'text-3xl'}`}>
              {index === 0 ? 'MAJOR' : index === 1 ? 'QUALS' : tournament.name.toUpperCase()}
            </span>
          </Link>
        )
      })}

      {featuredTournaments.length === 0 && (
        <div className="text-center py-10 h-44 flex flex-col items-center justify-center">
          <Trophy className="w-8 h-8 mx-auto text-gray-600 mb-2" />
          <h3 className="text-lg font-semibold text-white">No Tournaments</h3>
          <p className="text-sm text-gray-500">Check back soon for events.</p>
        </div>
      )}
    </div>
  );
};

export default FeaturedTournaments;