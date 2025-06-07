import React, { useState } from 'react';
import { useGameData } from '../context/GameDataContext';
import MatchCard from '../components/ui/MatchCard';
import { Search, Filter, Calendar, Users, Activity, RotateCcw, Sparkles } from 'lucide-react';
import { MatchStatus } from '../types';

const Matches: React.FC = () => {
  const { matches, teams, isLoading } = useGameData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<MatchStatus | 'all'>('all');
  const [filterTeam, setFilterTeam] = useState('');
  const [hoveredMatchId, setHoveredMatchId] = useState<string | null>(null);
  
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
      {/* Hero Section */}
      <section className="relative py-20">
        {/* Animated background orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-gradient-to-r from-purple-500/8 to-pink-500/8 rounded-full blur-2xl animate-pulse delay-1000 opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/6 to-blue-500/6 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-12">
            {/* Main headline */}
            <div className="space-y-6 animate-fade-in-up">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white">
                  MATCH
                </span>
                <span className="block text-white mt-4">
                  CENTER
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 font-medium max-w-4xl mx-auto leading-relaxed">
                Follow live matches, upcoming fixtures, and recent results from the competitive scene
              </p>
            </div>

            {/* Enhanced Match Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center space-y-3">
                <div className="text-4xl md:text-5xl font-black text-red-400">{liveMatches}</div>
                <div className="text-lg text-gray-300 font-semibold">Live Now</div>
                <div className="text-sm text-gray-400">Active Matches</div>
              </div>
              <div className="text-center space-y-3">
                <div className="text-4xl md:text-5xl font-black text-blue-400">{upcomingMatches}</div>
                <div className="text-lg text-gray-300 font-semibold">Upcoming</div>
                <div className="text-sm text-gray-400">Scheduled Soon</div>
              </div>
              <div className="text-center space-y-3">
                <div className="text-4xl md:text-5xl font-black text-emerald-400">{completedMatches}</div>
                <div className="text-lg text-gray-300 font-semibold">Completed</div>
                <div className="text-sm text-gray-400">Finished Games</div>
              </div>
              <div className="text-center space-y-3">
                <div className="text-4xl md:text-5xl font-black text-purple-400">{matches.length}</div>
                <div className="text-lg text-gray-300 font-semibold">Total</div>
                <div className="text-sm text-gray-400">All Matches</div>
              </div>
            </div>

            {/* Additional Match Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="backdrop-blur-sm border rounded-2xl p-6 text-center"
                   style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}>
                <div className="text-2xl font-bold text-yellow-400 mb-2">{teams.length}</div>
                <div className="text-gray-300 font-medium">Active Teams</div>
                <div className="text-sm text-gray-400 mt-1">Competing Today</div>
              </div>
              <div className="backdrop-blur-sm border rounded-2xl p-6 text-center"
                   style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}>
                <div className="text-2xl font-bold text-cyan-400 mb-2">
                  {matches.filter(m => new Date(m.date).toDateString() === new Date().toDateString()).length}
                </div>
                <div className="text-gray-300 font-medium">Today's Matches</div>
                <div className="text-sm text-gray-400 mt-1">Scheduled Today</div>
              </div>
              <div className="backdrop-blur-sm border rounded-2xl p-6 text-center"
                   style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}>
                <div className="text-2xl font-bold text-orange-400 mb-2">
                  {matches.filter(m => new Date(m.date) > new Date()).length}
                </div>
                <div className="text-gray-300 font-medium">Future Matches</div>
                <div className="text-sm text-gray-400 mt-1">Coming Soon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content sections with modern spacing */}
      <div className="space-y-16" style={{ backgroundColor: '#1a1b1b' }}>

        
        {/* Filters Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/3 to-transparent"></div>
          <div className="relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Modern Filters */}
              <div className="relative backdrop-blur-sm border rounded-2xl p-10"
                   style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}>
                
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                    <Filter className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Filter & Search</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Modern Search */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-300 tracking-wide">Search Teams</label>
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Enter team name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full backdrop-blur-sm border text-white pl-14 pr-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder:text-gray-400"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                      />
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg flex items-center justify-center"
                           style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <Search className="w-4 h-4 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Modern Status Filter */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-300 tracking-wide">Match Status</label>
                    <div className="relative">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as MatchStatus | 'all')}
                        className="w-full appearance-none backdrop-blur-sm border text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 cursor-pointer"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                      >
                        <option value="all">All Statuses</option>
                        <option value={MatchStatus.LIVE}>🔴 Live</option>
                        <option value={MatchStatus.UPCOMING}>🔵 Upcoming</option>
                        <option value={MatchStatus.COMPLETED}>🟢 Completed</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Modern Team Filter */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-300 tracking-wide">Specific Team</label>
                    <div className="relative">
                      <select
                        value={filterTeam}
                        onChange={(e) => setFilterTeam(e.target.value)}
                        className="w-full appearance-none backdrop-blur-sm border text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 cursor-pointer"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                      >
                        <option value="">All Teams</option>
                        {teams.map(team => (
                          <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Modern Clear Filters Button */}
                {(searchTerm || filterStatus !== 'all' || filterTeam) && (
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={clearFilters}
                      className="group relative overflow-hidden backdrop-blur-sm border text-gray-300 hover:text-white px-8 py-3 rounded-2xl font-medium transition-all duration-300"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                    >
                      <div className="flex items-center space-x-3">
                        <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                        <span>Clear Filters</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Matches Section */}
        <section className="relative pb-32">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/3 to-transparent"></div>
          <div className="relative">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Match <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dashboard</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Real-time updates on all competitive matches across different stages
                </p>
              </div>

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
      </div>
    </div>
  );
};

export default Matches;