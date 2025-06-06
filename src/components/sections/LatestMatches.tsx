import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Zap } from 'lucide-react';
import { useGameData } from '../../context/GameDataContext';
import MatchCard from '../ui/MatchCard';

const LatestMatches: React.FC = () => {
  const { matches, isLoading } = useGameData();
  
  // Enhanced sorting: Live matches first, then by date (most recent first)
  const sortedMatches = [...matches].sort((a, b) => {
    // Priority order: live > upcoming > completed
    const statusPriority = {
      'live': 0,
      'upcoming': 1,
      'completed': 2
    };
    
    const aPriority = statusPriority[a.status] ?? 3;
    const bPriority = statusPriority[b.status] ?? 3;
    
    // First sort by status priority
    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }
    
    // Then sort by date (most recent first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  // Get the latest 3 matches (with live matches prioritized)
  const latestMatches = sortedMatches.slice(0, 3);
  const liveMatchCount = latestMatches.filter(match => match.status === 'live').length;

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
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-16 space-y-6 lg:space-y-0">
          <div className="space-y-4">
            <h2 className="text-5xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
              Latest Matches
            </h2>

          </div>
          
          {/* Compact call to action */}
          <Link 
            to="/matches" 
            className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" />
          </Link>
        </div>
        
        {/* Horizontal matches grid - improved for better space utilization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-none">
          {latestMatches.map((match, index) => (
            <div key={match.id} className="relative">

              <MatchCard match={match} variant="compact" />
            </div>
          ))}
        </div>
        
        {/* Compact no matches state */}
        {latestMatches.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center border" 
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                     borderColor: 'rgba(255, 255, 255, 0.1)'
                   }}>
                <Activity className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-200 mb-3">No recent matches</h3>
              <p className="text-gray-300 leading-relaxed">
                Check back soon for upcoming matches and live events
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestMatches;