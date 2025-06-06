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
      <div className="py-24">
        <div className="container mx-auto px-6">
          <div className="animate-pulse space-y-8">
            <div className="flex justify-between items-center">
              <div className="h-10 w-64 bg-gray-800/50 rounded-xl"></div>
              <div className="h-6 w-40 bg-gray-800/50 rounded-lg"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-gray-800/30 rounded-2xl backdrop-blur-sm"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-16 space-y-6 lg:space-y-0">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-xl backdrop-blur-sm border border-purple-500/30">
                <Trophy className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">
                Tournaments
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Featured
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                Tournaments
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Compete in the most prestigious tournaments and showcase your skills on the global stage.
            </p>
          </div>
          
          <Link 
            to="/tournaments" 
            className="group flex items-center space-x-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium hover:bg-white/10 hover:border-white/30 transition-all duration-300"
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

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center space-y-4 p-8 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl">
            <div className="p-3 bg-purple-500/20 rounded-full">
              <Calendar className="w-8 h-8 text-purple-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Join the Competition</h3>
              <p className="text-gray-400">Register now for upcoming tournaments and climb the leaderboards.</p>
            </div>
            <Link 
              to="/tournaments" 
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:scale-105 transition-transform duration-300"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTournaments;