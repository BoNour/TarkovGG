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
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: '#1a1b1b' }}>
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.01]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </div>
      
      <div className="max-w-none mx-auto px-4 lg:px-8 xl:px-12 relative">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-16 space-y-6 lg:space-y-0">
          <div className="space-y-4">
            <h2 className="text-5xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
              Featured Tournaments
            </h2>
          </div>
          
          {/* Compact call to action */}
          <Link 
            to="/tournaments" 
            className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" />
          </Link>
        </div>
        
        {/* Tournament Cards Grid - improved for better space utilization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-none">
          {featuredTournaments.map((tournament, index) => (
            <div 
              key={tournament.id} 
              className="relative transition-transform duration-700 ease-in-out"
              style={{
                transform: hoveredTournamentId && hoveredTournamentId !== tournament.id 
                  ? 'scale(0.96)' 
                  : 'scale(1.0)'
              }}
              onMouseEnter={() => setHoveredTournamentId(tournament.id)}
              onMouseLeave={() => setHoveredTournamentId(null)}
            >
              <TournamentCard tournament={tournament} />
            </div>
          ))}
        </div>
        
        {/* Compact no tournaments state */}
        {featuredTournaments.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center border" 
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                     borderColor: 'rgba(255, 255, 255, 0.1)'
                   }}>
                <Trophy className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-200 mb-3">No featured tournaments</h3>
              <p className="text-gray-300 leading-relaxed">
                Check back soon for upcoming tournaments and events
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedTournaments;