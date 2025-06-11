import React, { useState, useEffect } from 'react';
import { useGameData } from '../context/GameDataContext';
import MatchCard from '../components/ui/MatchCard';
import { ChartsGrid } from '../components/ui/Charts';
import { Search, Filter, Calendar, Users, Activity, RotateCcw, Sparkles, BarChart3, List, TrendingUp, Clock, Trophy } from 'lucide-react';
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
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0a0a0b' }}>
        {/* Enhanced Background */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/BACKGROUND.png')" }}
        ></div>
        
        {/* Modern vignette overlay */}
        <div 
          className="fixed inset-0 z-10" 
          style={{ 
            background: 'radial-gradient(ellipse 80% 50% at 50% -20%, transparent 0%, rgba(10, 10, 11, 0.4) 30%, rgba(10, 10, 11, 0.9) 70%, rgba(10, 10, 11, 1) 100%)',
          }}
        ></div>
        
        <div className="relative z-30 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
          <div className="animate-pulse space-y-8">
            {/* Header skeleton */}
            <div className="glass-panel p-8 rounded-3xl">
              <div className="h-12 w-64 bg-white/10 rounded-2xl mb-6"></div>
              <div className="h-6 w-96 bg-white/5 rounded-xl"></div>
            </div>
            
            {/* Cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-panel h-80 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0a0a0b' }}>
      {/* Enhanced Background System */}
      <div 
        className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat transition-transform duration-700 ease-out"
        style={{ 
          backgroundImage: "url('/BACKGROUND.png')",
          transform: `scale(1.02) translate(${mousePosition.x / -150}px, ${mousePosition.y / -150}px)`,
        }}
      ></div>
      
      {/* Multi-layer vignette system */}
      <div 
        className="fixed inset-0 z-10" 
        style={{ 
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, transparent 0%, rgba(10, 10, 11, 0.4) 30%, rgba(10, 10, 11, 0.9) 70%, rgba(10, 10, 11, 1) 100%)',
        }}
      ></div>
      
      {/* Enhanced floating orbs system */}
      <div className="fixed inset-0 z-20 pointer-events-none">
        {/* Primary orbs */}
        <div 
          className="absolute w-[800px] h-[800px] opacity-20"
          style={{
            top: '10%',
            left: '15%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            animation: 'float-1 25s ease-in-out infinite',
          }}
        ></div>
        
        <div 
          className="absolute w-[600px] h-[600px] opacity-15"
          style={{
            bottom: '20%',
            right: '10%',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
            animation: 'float-2 30s ease-in-out infinite',
          }}
        ></div>
        
        <div 
          className="absolute w-[400px] h-[400px] opacity-10"
          style={{
            top: '60%',
            left: '60%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            animation: 'float-3 20s ease-in-out infinite',
          }}
        ></div>

        {/* Interactive mouse orb */}
        <div 
          className="absolute w-[200px] h-[200px] transition-all duration-500 ease-out"
          style={{ 
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(30px)',
            transform: `translate(${mousePosition.x - 100}px, ${mousePosition.y - 100}px)`,
          }}
        ></div>
      </div>

      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -50px) rotate(90deg); }
          50% { transform: translate(-20px, -30px) rotate(180deg); }
          75% { transform: translate(-40px, 20px) rotate(270deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-40px, 30px) rotate(120deg); }
          66% { transform: translate(20px, -40px) rotate(240deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(25px, -25px) rotate(180deg); }
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
        <section className="pt-6 pb-4">
          <div className="max-w-[1650px] mx-auto px-6 sm:px-8 lg:px-10">
            
            {/* Combined Title and Controls Section */}
            <div className="glass-panel rounded-3xl p-6 mb-6">
              {/* Title and Stats Row */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
                
                {/* Title with modern typography */}
                <div className="space-y-2">
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">
                      MATCH CENTER
                    </span>
                  </h1>
                  <p className="text-lg text-gray-400 font-medium">
                    Track live games, upcoming events, and match results
                  </p>
                </div>
                
                {/* Quick Stats */}
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{liveMatches}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Live</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{upcomingMatches}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Upcoming</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">{completedMatches}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Completed</div>
                  </div>
                </div>
              </div>

              {/* Controls Row */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pt-4 border-t border-white/10">
                
                {/* View Mode Toggle */}
                <div className="glass-panel rounded-2xl p-2 w-fit">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('matches')}
                      className={`glass-button rounded-xl px-6 py-3 flex items-center space-x-3 text-sm font-medium transition-all duration-300 ${
                        viewMode === 'matches' ? 'active text-blue-300' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <List className="w-5 h-5" />
                      <span>Matches</span>
                    </button>
                    <button
                      onClick={() => setViewMode('stats')}
                      className={`glass-button rounded-xl px-6 py-3 flex items-center space-x-3 text-sm font-medium transition-all duration-300 ${
                        viewMode === 'stats' ? 'active text-purple-300' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <BarChart3 className="w-5 h-5" />
                      <span>Analytics</span>
                    </button>
                  </div>
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
                     <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                         <div className="w-2.5 h-2.5 bg-red-400 rounded-full animate-pulse"></div>
                       </div>
                       <div>
                         <h3 className="text-xl font-bold text-white">Live Matches</h3>
                         <p className="text-red-300 text-xs">Currently active games</p>
                       </div>
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
                     <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                         <Clock className="w-5 h-5 text-blue-400" />
                       </div>
                       <div>
                         <h3 className="text-xl font-bold text-white">Upcoming Matches</h3>
                         <p className="text-blue-300 text-xs">Scheduled future games</p>
                       </div>
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
                     <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                         <Trophy className="w-5 h-5 text-emerald-400" />
                       </div>
                       <div>
                         <h3 className="text-xl font-bold text-white">Completed Matches</h3>
                         <p className="text-emerald-300 text-xs">Finished games with results</p>
                       </div>
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