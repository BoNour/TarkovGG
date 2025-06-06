import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Calendar, MapPin } from 'lucide-react';
import { useGameData } from '../../context/GameDataContext';
import TournamentCard from '../ui/TournamentCard';

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
  
  // Get the first 3 tournaments after sorting
  const featuredTournaments = sortedTournaments.slice(0, 3);

  if (isLoading) {
    return (
      <div className="py-24" style={{ backgroundColor: '#1a1b1b' }}>
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
    <section className="py-24 relative" style={{ backgroundColor: '#1a1b1b' }}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/3 to-transparent"></div>
      
      <div className="max-w-none mx-auto px-4 lg:px-8 xl:px-12 relative">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-16 space-y-6 lg:space-y-0">
          <div className="space-y-4">
            <h2 className="text-5xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
              Featured Tournaments
            </h2>
          </div>
          
          <Link 
            to="/tournaments" 
            className="group flex items-center space-x-2 px-6 py-3 backdrop-blur-sm border rounded-xl text-white font-medium transition-all duration-300"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            <span>View All Tournaments</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
        
        {/* Tournament Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTournaments.map((tournament, index) => (
            <div 
              key={tournament.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <TournamentCard tournament={tournament} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTournaments;