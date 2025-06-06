import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
      <div className="p-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-700 rounded mb-8 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Tournaments</h2>
          <Link to="/tournaments" className="flex items-center text-sm text-gray-400 hover:text-white transition">
            View all tournaments
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTournaments.map(tournament => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTournaments;