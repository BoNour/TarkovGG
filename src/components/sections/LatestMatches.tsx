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
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-slate-700 rounded mb-8 mx-auto"></div>
            <div className="grid grid-cols-1 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-slate-700/30 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Modern section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-4 mb-8">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Zap className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <h2 className="text-5xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Latest Matches
            </h2>
            {liveMatchCount > 0 && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full animate-pulse">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <span className="text-red-400 text-sm font-bold">{liveMatchCount} LIVE</span>
              </div>
            )}
          </div>
          <p className="text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed mb-10">
            Stay updated with the most recent competitive matches and live events from the professional scene
          </p>
          
          {/* Modern call to action */}
          <Link 
            to="/matches" 
            className="group relative inline-flex items-center space-x-4 overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
          >
            <span className="relative z-10">Explore All Matches</span>
            <div className="relative z-10 w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" />
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </Link>
        </div>
        
        {/* Modern matches grid */}
        <div className="grid grid-cols-1 gap-10 max-w-5xl mx-auto">
          {latestMatches.map((match, index) => (
            <div key={match.id} className="relative">
              {/* Live match indicator */}
              {match.status === 'live' && (
                <div className="absolute -top-2 left-6 z-10">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-full shadow-lg animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                    <span>LIVE NOW</span>
                  </div>
                </div>
              )}
              <MatchCard match={match} variant="full" />
            </div>
          ))}
        </div>
        
        {/* Modern no matches state */}
        {latestMatches.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-lg mx-auto">
              <div className="w-28 h-28 mx-auto mb-8 bg-gradient-to-br from-slate-700/30 to-slate-800/30 rounded-full flex items-center justify-center border border-slate-600/30">
                <Activity className="w-14 h-14 text-slate-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-300 mb-4">No recent matches</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Check back soon for upcoming matches and live events from the competitive scene
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestMatches;