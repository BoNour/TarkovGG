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
    // Filter by search term (team names)
    const teamOne = teams.find(t => t.id === match.teamOneId);
    const teamTwo = teams.find(t => t.id === match.teamTwoId);
    const matchesSearch = 
      teamOne?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teamTwo?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = filterStatus === 'all' || match.status === filterStatus;
    
    // Filter by team
    const matchesTeam = filterTeam === '' || 
      match.teamOneId === filterTeam || 
      match.teamTwoId === filterTeam;
    
    return matchesSearch && matchesStatus && matchesTeam;
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
    setFilterStatus('all');
    setFilterTeam('');
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
      <div className="relative z-30 min-h-screen pt-8">
        
        {/* Header Section */}
        <section className="py-16 relative">
          <div className="max-w-[90vw] mx-auto px-4">
            
            {/* Combined Glassmorphism Container */}
            <div 
              className="relative group rounded-3xl mb-12 backdrop-blur-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-all duration-500"
              style={{
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Frosted layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-white/[0.01] rounded-3xl"></div>
              
              {/* Content container */}
              <div className="relative p-12">
                <div className="text-center space-y-8">
                  {/* Main headline */}
                  <div className="space-y-4">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white">
                      MATCH CENTER
                    </span>
                  </h1>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                    <div className="backdrop-blur-2xl bg-white/[0.05] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                      <div className="text-3xl font-black text-white mb-2">{matches.length}</div>
                      <div className="text-sm text-gray-400 uppercase tracking-widest">Total Matches</div>
                    </div>
                    <div className="backdrop-blur-2xl bg-white/[0.05] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                      <div className="text-3xl font-black text-red-400 mb-2">{liveMatches}</div>
                      <div className="text-sm text-gray-400 uppercase tracking-widest">Live Now</div>
                    </div>
                    <div className="backdrop-blur-2xl bg-white/[0.05] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                      <div className="text-3xl font-black text-blue-400 mb-2">{upcomingMatches}</div>
                      <div className="text-sm text-gray-400 uppercase tracking-widest">Upcoming</div>
                    </div>
                    <div className="backdrop-blur-2xl bg-white/[0.05] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                      <div className="text-3xl font-black text-emerald-400 mb-2">{completedMatches}</div>
                      <div className="text-sm text-gray-400 uppercase tracking-widest">Completed</div>
                  </div>
                  </div>
                </div>
                
                {/* Controls and Filters Section */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                {/* View Mode Toggle */}
                    <div className="flex backdrop-blur-2xl bg-white/[0.05] rounded-2xl p-2 border border-white/10">
                    <button
                      onClick={() => setViewMode('matches')}
                        className={`px-6 py-3 rounded-xl flex items-center space-x-2 text-sm font-medium transition-all duration-300 ${
                          viewMode === 'matches' ? 'bg-blue-500/20 text-blue-300' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <List className="w-5 h-5" />
                      <span>Matches</span>
                    </button>
                    <button
                      onClick={() => setViewMode('stats')}
                        className={`px-6 py-3 rounded-xl flex items-center space-x-2 text-sm font-medium transition-all duration-300 ${
                          viewMode === 'stats' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <BarChart3 className="w-5 h-5" />
                      <span>Analytics</span>
                    </button>
                </div>
                
                {/* Filters - Only visible in matches mode */}
                {viewMode === 'matches' && (
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Search */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search teams..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="glass-input rounded-2xl text-white px-6 py-3 pr-12 focus:outline-none placeholder:text-gray-500 text-sm w-64"
                      />
                      <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    
                    {/* Status Filter */}
                    <div className="relative">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as MatchStatus | 'all')}
                        className="glass-input rounded-2xl text-white px-6 py-3 pr-12 focus:outline-none cursor-pointer text-sm appearance-none"
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="all" style={{ backgroundColor: '#1a1a1b', color: 'white' }}>All Status</option>
                        <option value={MatchStatus.LIVE} style={{ backgroundColor: '#1a1a1b', color: 'white' }}>🔴 Live</option>
                        <option value={MatchStatus.UPCOMING} style={{ backgroundColor: '#1a1a1b', color: 'white' }}>🔵 Upcoming</option>
                        <option value={MatchStatus.COMPLETED} style={{ backgroundColor: '#1a1a1b', color: 'white' }}>🟢 Completed</option>
                      </select>
                      <Activity className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    
                    {/* Team Filter */}
                    <div className="relative">
                      <select
                        value={filterTeam}
                        onChange={(e) => setFilterTeam(e.target.value)}
                        className="glass-input rounded-2xl text-white px-6 py-3 pr-12 focus:outline-none cursor-pointer text-sm appearance-none"
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="" style={{ backgroundColor: '#1a1a1b', color: 'white' }}>All Teams</option>
                        {teams.map(team => (
                          <option key={team.id} value={team.id} style={{ backgroundColor: '#1a1a1b', color: 'white' }}>{team.name}</option>
                        ))}
                      </select>
                      <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    
                    {/* Clear Button */}
                    {(searchTerm || filterStatus !== 'all' || filterTeam) && (
                      <button
                        onClick={clearFilters}
                        className="glass-button rounded-2xl px-4 py-3 text-gray-400 hover:text-white transition-all duration-300"
                        title="Clear filters"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                   <div className="bg-gradient-to-r from-red-500/10 to-red-500/5 p-4 border-b border-red-500/10">
                     <div className="text-center">
                       <h3 className="text-3xl font-black tracking-tight text-white">
                           LIVE MATCHES
                       </h3>
                     </div>
                   </div>
                  
                  <div className="p-4 space-y-3 min-h-[300px]">
                    {matches.filter(m => m.status === 'live').length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 space-y-3">
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
                   <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 p-4 border-b border-blue-500/10">
                     <div className="text-center">
                       <h3 className="text-3xl font-black tracking-tight text-white">
                           UPCOMING MATCHES
                       </h3>
                     </div>
                   </div>
                  
                  <div className="p-4 space-y-3 min-h-[300px]">
                    {matches.filter(m => m.status === 'upcoming').length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 space-y-3">
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
                   <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 p-4 border-b border-emerald-500/10">
                     <div className="text-center">
                       <h3 className="text-3xl font-black tracking-tight text-white">
                           COMPLETED MATCHES
                       </h3>
                     </div>
                   </div>
                  
                  <div className="p-4 space-y-3 min-h-[300px]">
                    {matches.filter(m => m.status === 'completed').length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 space-y-3">
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