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
    <>
      {/* Clean 2025 CSS */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .tournament-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .tournament-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 32px 64px rgba(0, 0, 0, 0.3);
        }
        
        .card-number {
          transition: all 0.3s ease-out;
          font-variant-numeric: tabular-nums;
        }
        
        .glass-effect {
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #ffffff 0%, #a8a8a8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <section className="py-16 relative overflow-hidden" style={{ backgroundColor: '#1a1b1b' }}>
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.01]">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}></div>
        </div>
        
        <div className="max-w-none mx-auto px-4 lg:px-8 xl:px-12 relative">
          {/* Section header - matching LatestMatches style */}
          <div className="mb-16">
            <div className="space-y-4">
              <h2 className="text-5xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                Tournaments
              </h2>
            </div>
          </div>
          
          {/* Clean tournament list */}
          <div className="space-y-8 max-w-4xl mx-auto">
            {featuredTournaments.map((tournament, index) => (
              <div 
                key={tournament.id}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 150}ms both`
                }}
                onMouseEnter={() => setHoveredTournamentId(tournament.id)}
                onMouseLeave={() => setHoveredTournamentId(null)}
              >
                {/* Minimal card number */}
                <div className="absolute -left-16 top-6 card-number text-5xl font-black text-white/[0.03] group-hover:text-white/[0.08]">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Main card */}
                <div 
                  className="tournament-card glass-effect rounded-3xl overflow-hidden"
                  style={{
                    filter: hoveredTournamentId && hoveredTournamentId !== tournament.id 
                      ? 'blur(1px) brightness(0.8)' 
                      : 'none'
                  }}
                >
                  <TournamentCard tournament={tournament} variant="full" />
                </div>
              </div>
            ))}
          </div>
          
          {/* Clean empty state */}
          {featuredTournaments.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-6 glass-effect rounded-2xl flex items-center justify-center">
                <Trophy className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No tournaments available</h3>
              <p className="text-gray-400">Check back soon for upcoming events</p>
            </div>
          )}

          {/* View All button positioned at bottom right */}
          <div className="flex justify-end mt-8">
            <Link 
              to="/tournaments" 
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedTournaments;