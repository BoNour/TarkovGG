import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Calendar, MapPin } from 'lucide-react';
import { useGameData } from '../../context/GameDataContext';
import TournamentCard from '../ui/TournamentCard';

const FeaturedTournaments: React.FC = () => {
  const { tournaments, isLoading } = useGameData();
  const [hoveredTournamentId, setHoveredTournamentId] = useState<string | null>(null);
  
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
  
  // Get the first 3 tournaments after sorting
  const featuredTournaments = sortedTournaments.slice(0, 3);

  if (isLoading) {
    return (
      <div className="py-16" style={{ backgroundColor: '#1a1b1b' }}>
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-48 rounded mb-8 mx-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 rounded-2xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}></div>
              ))}
            </div>
          </div>
        </div>
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
            className="group block p-4 rounded-2xl transition-all duration-300 hover:bg-white/10"
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 100}ms both`
            }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center">
                <img src={tournament.logo} alt={tournament.name} className="w-10 h-10 object-contain" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                      {tournament.name}
                    </h4>
                    <p className="text-sm text-gray-400">{tournament.game}</p>
                  </div>
                  <div className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor}`}>
                    {status}
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{new Date(tournament.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy size={14} />
                    <span>{tournament.prizePool}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      })}

      {featuredTournaments.length === 0 && (
        <div className="text-center py-10">
          <Trophy className="w-8 h-8 mx-auto text-gray-600 mb-2" />
          <h3 className="text-lg font-semibold text-white">No Tournaments</h3>
          <p className="text-sm text-gray-500">Check back soon for events.</p>
        </div>
      )}
    </div>
  );
};

export default FeaturedTournaments;