import React, { useState } from 'react';
import { useGameData } from '../context/GameDataContext';
import MatchCard from '../components/ui/MatchCard';
import { ChartsGrid } from '../components/ui/Charts';
import { Search, Filter, Calendar, Users, Activity, RotateCcw, Sparkles, BarChart3, List } from 'lucide-react';
import { MatchStatus } from '../types';

const Matches: React.FC = () => {
  const { matches, teams, isLoading } = useGameData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<MatchStatus | 'all'>('all');
  const [filterTeam, setFilterTeam] = useState('');
  const [hoveredMatchId, setHoveredMatchId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'matches' | 'stats'>('matches');
  
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
      <div className="min-h-screen" style={{ backgroundColor: '#1a1b1b' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-10 w-48 bg-gray-700 rounded mb-8"></div>
            <div className="h-12 bg-gray-700 rounded mb-8"></div>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-48 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1b1b' }}>
            {/* Header Section with Title and Filters */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            
            {/* Title - Top Left */}
            <div className="flex-shrink-0 mb-4 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white">
                  MATCH CENTER
                </span>
              </h1>
            </div>
            
            {/* Clean Inline Filters and View Toggle */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-6">
              
              {/* View Mode Toggle - Fixed Position */}
              <div className="flex items-center bg-gray-800/50 rounded-xl p-2 border border-gray-600/50 order-first shadow-lg">
                <button
                  onClick={() => setViewMode('matches')}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 min-w-[120px] justify-center ${
                    viewMode === 'matches' 
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 shadow-lg shadow-blue-500/20' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                  }`}
                >
                  <List className="w-5 h-5" />
                  <span>Matches</span>
                </button>
                <button
                  onClick={() => setViewMode('stats')}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 min-w-[120px] justify-center ${
                    viewMode === 'stats' 
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/20' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>Stats</span>
                </button>
              </div>
              
              {/* Filters Container - Only visible in matches mode */}
              <div className={`flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 transition-opacity duration-300 ${
                viewMode === 'matches' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}>
              
                {/* Search - Only show in matches view */}
                {viewMode === 'matches' && (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search teams..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-800/50 border border-gray-600/50 rounded-lg text-white px-4 py-3 pr-10 focus:outline-none focus:border-blue-400 focus:bg-gray-800/70 transition-all duration-300 placeholder:text-gray-500 text-sm w-48 shadow-lg"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                )}
                
                {/* Status Filter - Only show in matches view */}
                {viewMode === 'matches' && (
                  <div className="relative">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as MatchStatus | 'all')}
                      className="appearance-none bg-gray-800/50 border border-gray-600/50 rounded-lg text-white px-4 py-3 pr-10 focus:outline-none focus:border-blue-400 focus:bg-gray-800/70 transition-all duration-300 cursor-pointer text-sm shadow-lg"
                      style={{ 
                        colorScheme: 'dark'
                      }}
                    >
                      <option value="all" style={{ backgroundColor: '#1a1b1b', color: 'white' }}>All Status</option>
                      <option value={MatchStatus.LIVE} style={{ backgroundColor: '#1a1b1b', color: 'white' }}>🔴 Live</option>
                      <option value={MatchStatus.UPCOMING} style={{ backgroundColor: '#1a1b1b', color: 'white' }}>🔵 Upcoming</option>
                      <option value={MatchStatus.COMPLETED} style={{ backgroundColor: '#1a1b1b', color: 'white' }}>🟢 Completed</option>
                    </select>
                    <Activity className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                  </div>
                )}
                
                {/* Team Filter - Only show in matches view */}
                {viewMode === 'matches' && (
                  <div className="relative">
                    <select
                      value={filterTeam}
                      onChange={(e) => setFilterTeam(e.target.value)}
                      className="appearance-none bg-gray-800/50 border border-gray-600/50 rounded-lg text-white px-4 py-3 pr-10 focus:outline-none focus:border-blue-400 focus:bg-gray-800/70 transition-all duration-300 cursor-pointer text-sm shadow-lg"
                      style={{ 
                        colorScheme: 'dark'
                      }}
                    >
                      <option value="" style={{ backgroundColor: '#1a1b1b', color: 'white' }}>All Teams</option>
                      {teams.map(team => (
                        <option key={team.id} value={team.id} style={{ backgroundColor: '#1a1b1b', color: 'white' }}>{team.name}</option>
                      ))}
                    </select>
                    <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                  </div>
                )}
                
                {/* Clear Button - Only show in matches view with active filters */}
                {viewMode === 'matches' && (searchTerm || filterStatus !== 'all' || filterTeam) && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center justify-center bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300 shadow-lg"
                    title="Clear filters"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content sections with reduced spacing */}
      <div className="space-y-8" style={{ backgroundColor: '#1a1b1b' }}>
        
        {viewMode === 'stats' ? (
          /* Stats Section */
          <section className="relative pb-16">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/3 to-transparent"></div>
            <div className="relative">
              <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <ChartsGrid matches={matches} teams={teams} />
              </div>
            </div>
          </section>
        ) : (
          /* Matches Section */
          <section className="relative pb-16">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/3 to-transparent"></div>
            <div className="relative">
              <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
              


              {/* Full-width 3-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                
                {/* LIVE MATCHES SECTION */}
                <div className="bg-gradient-to-br from-red-900/10 via-red-800/5 to-red-900/10 rounded-3xl border border-red-500/20 backdrop-blur-sm overflow-hidden">
                  
                  {/* Header */}
                  <div className="bg-gradient-to-r from-red-600/10 to-red-500/5 p-6 border-b border-red-500/15">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-500/15 rounded-2xl flex items-center justify-center border border-red-500/20">
                          <div className="w-6 h-6 bg-red-400 rounded-full animate-pulse">
                            <div className="w-3 h-3 bg-red-100 rounded-full m-1.5 animate-pulse"></div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">Live Matches</h3>
                          <p className="text-red-200 text-sm font-medium">● {matches.filter(m => m.status === 'live').length} active now</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-red-300">{matches.filter(m => m.status === 'live').length}</div>
                        <div className="text-xs text-red-200 uppercase tracking-wider">Ongoing</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4 min-h-[400px]">
                    {matches.filter(m => m.status === 'live').length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 space-y-4">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                          <Activity className="w-8 h-8 text-red-300" />
                        </div>
                        <div className="text-center">
                          <p className="text-gray-300 font-medium mb-1">No Live Matches</p>
                          <p className="text-gray-500 text-sm">Check back soon for live action</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {matches.filter(m => m.status === 'live').map((match, index) => {
                          const teamOne = teams.find(t => t.id === match.teamOneId);
                          const teamTwo = teams.find(t => t.id === match.teamTwoId);
                          const isHovered = hoveredMatchId === match.id;
                          const isOtherHovered = hoveredMatchId && hoveredMatchId !== match.id;
                          
                          return (
                            <div 
                              key={match.id} 
                              className={`bg-black/15 border border-red-500/15 rounded-2xl p-5 hover:border-red-500/25 hover:bg-black/20 transition-all duration-300 group relative transform-gpu hover:scale-[1.03] hover:z-10 ${
                                isOtherHovered ? 'opacity-95 brightness-95' : ''
                              }`}
                              onMouseEnter={() => setHoveredMatchId(match.id)}
                              onMouseLeave={() => setHoveredMatchId(null)}
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                                  <span className="text-red-200 text-sm font-semibold uppercase tracking-wider">Live</span>
                                </div>
                                <span className="text-gray-400 text-sm">
                                  {new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <p className="text-white font-semibold text-lg">{teamOne?.name}</p>
                                    <p className="text-gray-400 text-sm">{teamOne?.region}</p>
                                  </div>
                                  <div className="px-4 py-2 bg-red-500/15 rounded-lg border border-red-500/20">
                                    <span className="text-red-200 font-bold text-lg">{match.teamOneScore}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-center">
                                  <div className="text-gray-500 font-medium text-sm">VS</div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <p className="text-white font-semibold text-lg">{teamTwo?.name}</p>
                                    <p className="text-gray-400 text-sm">{teamTwo?.region}</p>
                                  </div>
                                  <div className="px-4 py-2 bg-red-500/15 rounded-lg border border-red-500/20">
                                    <span className="text-red-200 font-bold text-lg">{match.teamTwoScore}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-4 pt-4 border-t border-red-500/15">
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-400 text-sm">Match #{index + 1}</span>
                                  <button className="px-4 py-2 bg-red-500/15 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-red-200 text-sm font-medium transition-all duration-300 group-hover:border-red-500/30">
                                    Watch Live
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* UPCOMING MATCHES SECTION */}
                <div className="bg-gradient-to-br from-blue-900/10 via-blue-800/5 to-blue-900/10 rounded-3xl border border-blue-500/20 backdrop-blur-sm overflow-hidden">
                  
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600/10 to-blue-500/5 p-6 border-b border-blue-500/15">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-500/15 rounded-2xl flex items-center justify-center border border-blue-500/20">
                          <Calendar className="w-6 h-6 text-blue-300" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">Upcoming Matches</h3>
                          <p className="text-blue-200 text-sm font-medium">⏰ {matches.filter(m => m.status === 'upcoming').length} scheduled</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-blue-300">{matches.filter(m => m.status === 'upcoming').length}</div>
                        <div className="text-xs text-blue-200 uppercase tracking-wider">Scheduled</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4 min-h-[400px]">
                    {matches.filter(m => m.status === 'upcoming').length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 space-y-4">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                          <Calendar className="w-8 h-8 text-blue-300" />
                        </div>
                        <div className="text-center">
                          <p className="text-gray-300 font-medium mb-1">No Upcoming Matches</p>
                          <p className="text-gray-500 text-sm">New matches will appear here</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {matches.filter(m => m.status === 'upcoming').map((match, index) => {
                          const teamOne = teams.find(t => t.id === match.teamOneId);
                          const teamTwo = teams.find(t => t.id === match.teamTwoId);
                          const isHovered = hoveredMatchId === match.id;
                          const isOtherHovered = hoveredMatchId && hoveredMatchId !== match.id;
                          
                          return (
                            <div 
                              key={match.id} 
                              className={`bg-black/15 border border-blue-500/15 rounded-2xl p-5 hover:border-blue-500/25 hover:bg-black/20 transition-all duration-300 group relative transform-gpu hover:scale-[1.03] hover:z-10 ${
                                isOtherHovered ? 'opacity-95 brightness-95' : ''
                              }`}
                              onMouseEnter={() => setHoveredMatchId(match.id)}
                              onMouseLeave={() => setHoveredMatchId(null)}
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                                  <span className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Upcoming</span>
                                </div>
                                <span className="text-gray-400 text-sm">
                                  {new Date(match.date).toLocaleDateString()}
                                </span>
                              </div>
                              
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <p className="text-white font-semibold text-lg">{teamOne?.name}</p>
                                    <p className="text-gray-400 text-sm">{teamOne?.region}</p>
                                  </div>
                                  <div className="px-3 py-1 bg-blue-500/15 rounded-lg border border-blue-500/20">
                                    <span className="text-blue-200 text-sm font-medium">TBD</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-center">
                                  <div className="text-gray-500 font-medium text-sm">VS</div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <p className="text-white font-semibold text-lg">{teamTwo?.name}</p>
                                    <p className="text-gray-400 text-sm">{teamTwo?.region}</p>
                                  </div>
                                  <div className="px-3 py-1 bg-blue-500/15 rounded-lg border border-blue-500/20">
                                    <span className="text-blue-200 text-sm font-medium">TBD</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-4 pt-4 border-t border-blue-500/15">
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-400 text-sm">
                                    {new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                  <button className="px-4 py-2 bg-blue-500/15 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-blue-200 text-sm font-medium transition-all duration-300 group-hover:border-blue-500/30">
                                    Set Reminder
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* COMPLETED MATCHES SECTION */}
                <div className="bg-gradient-to-br from-emerald-900/10 via-emerald-800/5 to-emerald-900/10 rounded-3xl border border-emerald-500/20 backdrop-blur-sm overflow-hidden">
                  
                  {/* Header */}
                  <div className="bg-gradient-to-r from-emerald-600/10 to-emerald-500/5 p-6 border-b border-emerald-500/15">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-emerald-500/15 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                          <Sparkles className="w-6 h-6 text-emerald-300" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">Completed Matches</h3>
                          <p className="text-emerald-200 text-sm font-medium">✓ {matches.filter(m => m.status === 'completed').length} finished</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-emerald-300">{matches.filter(m => m.status === 'completed').length}</div>
                        <div className="text-xs text-emerald-200 uppercase tracking-wider">Results</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4 min-h-[400px]">
                    {matches.filter(m => m.status === 'completed').length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 space-y-4">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center">
                          <Sparkles className="w-8 h-8 text-emerald-300" />
                        </div>
                        <div className="text-center">
                          <p className="text-gray-300 font-medium mb-1">No Completed Matches</p>
                          <p className="text-gray-500 text-sm">Results will appear here</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {matches.filter(m => m.status === 'completed').map((match, index) => {
                          const teamOne = teams.find(t => t.id === match.teamOneId);
                          const teamTwo = teams.find(t => t.id === match.teamTwoId);
                          const winner = match.teamOneScore > match.teamTwoScore ? teamOne : teamTwo;
                          const isHovered = hoveredMatchId === match.id;
                          const isOtherHovered = hoveredMatchId && hoveredMatchId !== match.id;
                          
                          return (
                            <div 
                              key={match.id} 
                              className={`bg-black/15 border border-emerald-500/15 rounded-2xl p-5 hover:border-emerald-500/25 hover:bg-black/20 transition-all duration-300 group relative transform-gpu hover:scale-[1.03] hover:z-10 ${
                                isOtherHovered ? 'opacity-95 brightness-95' : ''
                              }`}
                              onMouseEnter={() => setHoveredMatchId(match.id)}
                              onMouseLeave={() => setHoveredMatchId(null)}
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                                  <span className="text-emerald-200 text-sm font-semibold uppercase tracking-wider">Completed</span>
                                </div>
                                <span className="text-gray-400 text-sm">
                                  {new Date(match.date).toLocaleDateString()}
                                </span>
                              </div>
                              
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <p className={`font-semibold text-lg ${winner?.id === teamOne?.id ? 'text-emerald-200' : 'text-white'}`}>
                                      {teamOne?.name}
                                      {winner?.id === teamOne?.id && <span className="ml-2 text-yellow-400">👑</span>}
                                    </p>
                                    <p className="text-gray-400 text-sm">{teamOne?.region}</p>
                                  </div>
                                  <div className={`px-4 py-2 rounded-lg border ${
                                    winner?.id === teamOne?.id 
                                      ? 'bg-emerald-500/20 border-emerald-500/25 text-emerald-100' 
                                      : 'bg-emerald-500/15 border-emerald-500/20 text-emerald-200'
                                  }`}>
                                    <span className="font-bold text-lg">{match.teamOneScore}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-center">
                                  <div className="text-gray-500 font-medium text-sm">FINAL</div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <p className={`font-semibold text-lg ${winner?.id === teamTwo?.id ? 'text-emerald-200' : 'text-white'}`}>
                                      {teamTwo?.name}
                                      {winner?.id === teamTwo?.id && <span className="ml-2 text-yellow-400">👑</span>}
                                    </p>
                                    <p className="text-gray-400 text-sm">{teamTwo?.region}</p>
                                  </div>
                                  <div className={`px-4 py-2 rounded-lg border ${
                                    winner?.id === teamTwo?.id 
                                      ? 'bg-emerald-500/20 border-emerald-500/25 text-emerald-100' 
                                      : 'bg-emerald-500/15 border-emerald-500/20 text-emerald-200'
                                  }`}>
                                    <span className="font-bold text-lg">{match.teamTwoScore}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-4 pt-4 border-t border-emerald-500/15">
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-400 text-sm">
                                    Winner: <span className="text-emerald-200 font-medium">{winner?.name}</span>
                                  </span>
                                  <button className="px-4 py-2 bg-emerald-500/15 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-emerald-200 text-sm font-medium transition-all duration-300 group-hover:border-emerald-500/30">
                                    View Details
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}
      </div>
    </div>
  );
};

export default Matches;