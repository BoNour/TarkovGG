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
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes slideInUp {
          0% {
            opacity: 0;
            transform: perspective(1000px) translateY(60px) rotateX(10deg) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: perspective(1000px) translateY(0px) rotateX(0deg) scale(1);
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 1s ease-out forwards;
          animation-fill-mode: both;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-gpu {
          transform: translateZ(0);
          will-change: transform;
        }
      `}</style>

      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#1a1b1b' }}>
        {/* Ambient background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/[0.03] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/[0.03] rounded-full blur-3xl"></div>
        </div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          {/* Section Header - Enhanced */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/[0.05] backdrop-blur-sm rounded-full border border-white/10 mb-8">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-300 tracking-wider">FEATURED EVENTS</span>
            </div>
            
            <h2 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6 leading-tight">
              Tournaments
            </h2>
            
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover the most exciting competitive events happening now
            </p>
            
            {/* Call to action button - moved to header */}
            <Link 
              to="/tournaments" 
              className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              <span>Explore All Tournaments</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          
          {/* Tournament Cards - Improved vertical layout */}
          <div className="space-y-12 max-w-5xl mx-auto">
            {featuredTournaments.map((tournament, index) => (
              <div 
                key={tournament.id} 
                className="relative group perspective-1000"
                style={{
                  animationDelay: `${index * 200}ms`
                }}
                onMouseEnter={() => setHoveredTournamentId(tournament.id)}
                onMouseLeave={() => setHoveredTournamentId(null)}
              >
                {/* Card number indicator - moved further left */}
                <div className="absolute -left-20 top-8 text-6xl font-black text-white/[0.02] select-none transition-all duration-700 group-hover:text-white/[0.06] group-hover:scale-105">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Main card with subtle 3D tilt effect */}
                <div 
                  className="transform-gpu transition-all duration-700 ease-out animate-slideInUp"
                  style={{
                    transform: hoveredTournamentId === tournament.id
                      ? 'perspective(1000px) rotateX(-1deg) rotateY(1deg) translateY(-4px) scale(1.01)'
                      : hoveredTournamentId && hoveredTournamentId !== tournament.id
                      ? 'perspective(1000px) rotateX(0.5deg) scale(0.99) translateY(2px)'
                      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)',
                    filter: hoveredTournamentId && hoveredTournamentId !== tournament.id 
                      ? 'blur(0.5px) brightness(0.85)' 
                      : 'blur(0px) brightness(1)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <TournamentCard tournament={tournament} variant="full" />
                  
                  {/* Subtle glow effect on hover - more gentle colors */}
                  <div 
                    className="absolute -inset-1 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10 rounded-3xl blur-xl opacity-0 transition-opacity duration-700 -z-10"
                    style={{
                      opacity: hoveredTournamentId === tournament.id ? 1 : 0
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Enhanced no tournaments state */}
          {featuredTournaments.length === 0 && (
            <div className="text-center py-24">
              <div className="max-w-lg mx-auto">
                <div className="w-24 h-24 mx-auto mb-8 rounded-2xl flex items-center justify-center border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm">
                  <Trophy className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">No tournaments yet</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  We're preparing some amazing tournaments for you. Check back soon for exciting competitive events.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default FeaturedTournaments;