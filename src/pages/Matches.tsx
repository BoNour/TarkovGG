import React, { useState, useEffect } from 'react';
import { useGameData } from '../context/GameDataContext';
import MatchCard from '../components/ui/MatchCard';
import { ChartsGrid } from '../components/ui/Charts';
import { Search, Filter, Calendar, Users, Activity, RotateCcw, Sparkles, BarChart3, List, TrendingUp, Clock, Trophy, ArrowRight } from 'lucide-react';
import { MatchStatus } from '../types';

const Matches: React.FC = () => {
  const { matches, teams, isLoading } = useGameData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<MatchStatus | 'all'>('all');
  const [filterTeam, setFilterTeam] = useState('');
  const [hoveredMatchId, setHoveredMatchId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'matches' | 'stats'>('matches');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Filter matches
  const filteredMatches = matches.filter(match => {
    if (!searchTerm.trim()) {
      return true;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const teamOne = teams.find(t => t.id === match.teamOneId);
    const teamTwo = teams.find(t => t.id === match.teamTwoId);

    const teamOneName = teamOne?.name || '';
    const teamTwoName = teamTwo?.name || '';

    return (
      teamOneName.toLowerCase().includes(lowerCaseSearchTerm) ||
      teamTwoName.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });
  
  // Enhanced sorting: Live matches first, then upcoming, then completed
  const sortedMatches = [...filteredMatches].sort((a, b) => {
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

  // Get stats
  const liveMatches = matches.filter(m => m.status === 'live').length;
  const upcomingMatches = matches.filter(m => m.status === 'upcoming').length;
  const completedMatches = matches.filter(m => m.status === 'completed').length;

  const clearFilters = () => {
    setSearchTerm('');
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'matches' ? 'stats' : 'matches');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#101012' }}>
        {/* Background Image */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: "url('/BACKGROUND.png')"
          }}
        ></div>
        
        {/* Vignette overlay */}
        <div 
          className="fixed inset-0 z-10" 
          style={{ 
            background: 'radial-gradient(circle at center, transparent 20%, rgba(16, 16, 18, 0.8) 60%, rgba(16, 16, 18, 1) 90%)',
          }}
        ></div>
        
        <div className="relative z-30 pt-8">
          <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="animate-pulse space-y-8">
              <div className="h-16 w-64 backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 backdrop-blur-3xl bg-white/5 border border-white/10 rounded-2xl"></div>
                ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#101012' }}>
      {/* Background Image - Fixed behind all content */}
      <div 
        className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 ease-out"
        style={{ 
          backgroundImage: "url('/BACKGROUND.png')",
          transform: `scale(1.05) translate(${mousePosition.x / -100}px, ${mousePosition.y / -100}px)`,
        }}
      ></div>
      
      {/* Single, refined vignette overlay */}
      <div 
        className="fixed inset-0 z-10" 
        style={{ 
          background: 'radial-gradient(circle at center, transparent 20%, rgba(16, 16, 18, 0.8) 60%, rgba(16, 16, 18, 1) 90%)',
        }}
      ></div>
      
      {/* Subtle background orbs - no colors */}
      <div className="fixed inset-0 z-20 pointer-events-none">
        {/* Neutral floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-white/5 to-gray-500/5 rounded-full blur-3xl opacity-30" style={{animation: 'slow-float-1 15s ease-in-out infinite'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-gray-500/5 to-white/5 rounded-full blur-3xl opacity-20" style={{animation: 'slow-float-2 18s ease-in-out infinite'}}></div>
        <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-gradient-to-r from-gray-400/5 to-gray-600/5 rounded-full blur-3xl opacity-15" style={{animation: 'slow-float-3 20s ease-in-out infinite', transform: 'translate(-50%, -50%)'}}></div>

        {/* Mouse-aware orb - neutral */}
        <div 
          className="absolute w-[200px] h-[200px] bg-gradient-to-r from-white/10 to-gray-400/10 rounded-full blur-2xl opacity-40 transition-transform duration-300 ease-out"
          style={{ 
            transform: `translate(${mousePosition.x - 100}px, ${mousePosition.y - 100}px)`
          }}
        ></div>
      </div>
      <style>{`
        @keyframes slow-float-1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(40px, -60px); }
        }
        @keyframes slow-float-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-50px, 50px); }
        }
        @keyframes slow-float-3 {
          0%, 100% { transform: translate(-50%, -50%); }
          50% { transform: translate(-45%, -55%); }
        }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 
            0 8px 32px 0 rgba(0, 0, 0, 0.37),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
        }
        
        .glass-panel-hover {
          transition: all 0.4s ease;
        }
        
        .glass-panel-hover:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
          box-shadow: 
            0 20px 50px 0 rgba(0, 0, 0, 0.5),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
        }
        
        .glass-input {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .glass-input:focus {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(59, 130, 246, 0.4);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        
        .glass-button {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .glass-button:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }
        
        .glass-button.active {
          background: rgba(59, 130, 246, 0.15);
          border-color: rgba(59, 130, 246, 0.3);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
        }
      `}</style>

      {/* Main Content Container */}
      <div className="relative z-30 min-h-screen">
        
        {/* Header Section */}
        <header className="py-8">
          <div className="max-w-[90vw] mx-auto px-4">
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter text-white text-center md:text-left shrink-0">
                  Match Center
                </h1>

                <div className="flex items-center justify-center md:justify-end gap-3 flex-wrap">
                  {/* View Mode Toggle */}
                  <div className="flex bg-white/[0.05] rounded-lg p-1 border border-white/10">
                    <button
                      onClick={() => setViewMode('matches')}
                      className={`px-3 py-1.5 rounded-md flex items-center space-x-2 text-xs font-medium transition-all duration-300 ${
                        viewMode === 'matches' ? 'bg-blue-500/20 text-blue-300' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <List className="w-4 h-4" />
                      <span>Matches</span>
                    </button>
                    <button
                      onClick={() => setViewMode('stats')}
                      className={`px-3 py-1.5 rounded-md flex items-center space-x-2 text-xs font-medium transition-all duration-300 ${
                        viewMode === 'stats' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>Analytics</span>
                    </button>
                  </div>
                
                  {/* Filters - Only visible in matches mode */}
                  {viewMode === 'matches' && (
                    <div className="flex items-center gap-2">
                      {/* Search */}
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search teams..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="glass-input rounded-lg text-white px-4 py-2 pr-10 focus:outline-none placeholder:text-gray-500 text-xs w-48"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    
                      {/* Clear Button */}
                      {searchTerm && (
                        <button
                          onClick={clearFilters}
                          className="glass-button rounded-lg p-2 text-gray-400 hover:text-white transition-all duration-300"
                          title="Clear filters"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <section className="pb-6">
          <div className="max-w-[1850px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
            
            {viewMode === 'stats' ? (
              /* Enhanced Stats Section */
              <div className="glass-panel glass-panel-hover rounded-3xl p-6">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">Match Analytics</h2>
                  <p className="text-gray-400 text-base">Comprehensive insights and statistical breakdowns</p>
                </div>
                <ChartsGrid matches={matches} teams={teams} />
              </div>
            ) : (
              /* Enhanced Matches Grid */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                
                                 {/* Live Matches */}
                 <div className="glass-panel glass-panel-hover rounded-3xl overflow-hidden">
                   <div className="bg-gradient-to-r from-red-500/10 to-red-500/5 p-2 border-b border-red-500/10">
                     <div className="text-center">
                       <h3 className="text-xl font-black tracking-tight text-white">
                           LIVE MATCHES
                       </h3>
                     </div>
                   </div>
                  
                  <div className="p-2 space-y-2">
                    {matches.filter(m => m.status === 'live').length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-4 space-y-2">
                        <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                          <Activity className="w-6 h-6 text-red-400" />
                        </div>
                        <div className="text-center">
                          <p className="text-gray-300 font-medium text-sm">No Live Matches</p>
                          <p className="text-gray-500 text-xs">Check back soon for live action</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {matches.filter(m => m.status === 'live').map((match) => (
                          <MatchCard key={match.id} match={match} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                                 {/* Upcoming Matches */}
                 <div className="glass-panel glass-panel-hover rounded-3xl overflow-hidden">
                   <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 p-2 border-b border-blue-500/10">
                     <div className="text-center">
                       <h3 className="text-xl font-black tracking-tight text-white">
                           UPCOMING MATCHES
                       </h3>
                     </div>
                   </div>
                  
                  <div className="p-2 space-y-2">
                    {matches.filter(m => m.status === 'upcoming').length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-4 space-y-2">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="text-center">
                          <p className="text-gray-300 font-medium text-sm">No Upcoming Matches</p>
                          <p className="text-gray-500 text-xs">New matches will appear here</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {matches.filter(m => m.status === 'upcoming').map((match) => (
                          <MatchCard key={match.id} match={match} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                                 {/* Completed Matches */}
                 <div className="glass-panel glass-panel-hover rounded-3xl overflow-hidden">
                   <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 p-2 border-b border-emerald-500/10">
                     <div className="text-center">
                       <h3 className="text-xl font-black tracking-tight text-white">
                           COMPLETED MATCHES
                       </h3>
                     </div>
                   </div>
                  
                  <div className="p-2 space-y-2">
                    {matches.filter(m => m.status === 'completed').length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-4 space-y-2">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div className="text-center">
                          <p className="text-gray-300 font-medium text-sm">No Completed Matches</p>
                          <p className="text-gray-500 text-xs">Results will appear here</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {matches.filter(m => m.status === 'completed').map((match) => (
                          <MatchCard key={match.id} match={match} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Matches;