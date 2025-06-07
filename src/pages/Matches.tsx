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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Three Match Status Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Live Matches Card - Exact Recreation */}
                <div className="w-full max-w-md mx-auto rounded-3xl overflow-hidden"
                     style={{ backgroundColor: 'rgba(45, 45, 50, 0.95)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  
                  {/* Header with back arrow and + button */}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <h3 className="text-lg font-semibold text-white">Live</h3>
                    </div>
                    <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  {/* Match List */}
                  <div className="px-4 pb-4 space-y-2">
                    {matches.filter(m => m.status === 'live').length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-400 text-sm">No live matches</p>
                      </div>
                    ) : (
                      matches.filter(m => m.status === 'live').slice(0, 5).map((match, index) => {
                        const teamOne = teams.find(t => t.id === match.teamOneId);
                        const teamTwo = teams.find(t => t.id === match.teamTwoId);
                        const isHighlighted = index === 0;
                        
                        return (
                          <div key={match.id} 
                               className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                                 isHighlighted ? 'bg-white/10' : 'hover:bg-white/5'
                               }`}>
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 rounded-full border-2 flex-shrink-0 bg-red-500 border-red-500 animate-pulse">
                                <div className="w-2 h-2 bg-red-200 rounded-full m-0.5 animate-pulse"></div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-medium text-sm truncate">
                                  {teamOne?.name} vs {teamTwo?.name}
                                </p>
                                {isHighlighted && (
                                  <p className="text-gray-400 text-xs mt-0.5 flex items-center space-x-2">
                                    <span className="text-red-400">● LIVE</span>
                                    <span>•</span>
                                    <span>{new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            {/* Action buttons */}
                            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {index === 1 && (
                                <button className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z" />
                                  </svg>
                                </button>
                              )}
                              <button className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </button>
                              <button className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                              <button className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                                <div className="grid grid-cols-2 gap-0.5">
                                  <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                                  <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                                  <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                                  <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                                </div>
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Bottom progress section */}
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {/* Progress circle */}
                        <div className="relative w-5 h-5">
                          <svg className="w-5 h-5 transform -rotate-90" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="8" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
                            <circle 
                              cx="10" 
                              cy="10" 
                              r="8" 
                              stroke="#ef4444" 
                              strokeWidth="2" 
                              fill="none"
                              strokeDasharray={`${(matches.filter(m => m.status === 'live').length / matches.length) * 50.27} 50.27`}
                              className="transition-all duration-300"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-400 text-sm font-medium tracking-wider">LIVE</span>
                      </div>
                      <span className="text-white font-medium text-sm">
                        {matches.filter(m => m.status === 'live').length}/{matches.length}
                      </span>
                      <button className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                        <div className="space-y-0.5">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Upcoming Matches Card - Exact Recreation */}
                <div className="w-full max-w-md mx-auto rounded-3xl overflow-hidden"
                     style={{ backgroundColor: 'rgba(45, 45, 50, 0.95)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  
                  {/* Header with back arrow and + button */}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <h3 className="text-lg font-semibold text-white">Upcoming</h3>
                    </div>
                    <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  {/* Match List */}
                  <div className="px-4 pb-4 space-y-2">
                    {matches.filter(m => m.status === 'upcoming').length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-400 text-sm">No upcoming matches</p>
                      </div>
                    ) : (
                      matches.filter(m => m.status === 'upcoming').slice(0, 5).map((match, index) => {
                        const teamOne = teams.find(t => t.id === match.teamOneId);
                        const teamTwo = teams.find(t => t.id === match.teamTwoId);
                        const isHighlighted = index === 0;
                        
                        return (
                          <div key={match.id} 
                               className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                                 isHighlighted ? 'bg-white/10' : 'hover:bg-white/5'
                               }`}>
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                                match.status === 'completed' ? 'bg-white border-white' : 'border-gray-400'
                              }`}>
                                {match.status === 'completed' && (
                                  <div className="w-2 h-2 bg-gray-800 rounded-full m-0.5"></div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-medium text-sm truncate">
                                  {teamOne?.name} vs {teamTwo?.name}
                                </p>
                                {isHighlighted && (
                                  <p className="text-gray-400 text-xs mt-0.5">
                                    {new Date(match.date).toLocaleDateString()} • {new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            {/* Action buttons */}
                            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {index === 1 && (
                                <button className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z" />
                                  </svg>
                                </button>
                              )}
                              <button className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </button>
                              <button className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                              <button className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                                <div className="grid grid-cols-2 gap-0.5">
                                  <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                                  <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                                  <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                                  <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                                </div>
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Bottom progress section */}
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {/* Progress circle */}
                        <div className="relative w-5 h-5">
                          <svg className="w-5 h-5 transform -rotate-90" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="8" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
                            <circle 
                              cx="10" 
                              cy="10" 
                              r="8" 
                              stroke="white" 
                              strokeWidth="2" 
                              fill="none"
                              strokeDasharray={`${(matches.filter(m => m.status === 'completed').length / matches.length) * 50.27} 50.27`}
                              className="transition-all duration-300"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-400 text-sm font-medium tracking-wider">COMPLETED</span>
                      </div>
                      <span className="text-white font-medium text-sm">
                        {matches.filter(m => m.status === 'completed').length}/{matches.length}
                      </span>
                      <button className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                        <div className="space-y-0.5">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Completed Matches Card - Exact Recreation */}
                <div className="w-full max-w-md mx-auto rounded-3xl overflow-hidden"
                     style={{ backgroundColor: 'rgba(45, 45, 50, 0.95)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  
                  {/* Header with back arrow and + button */}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <h3 className="text-lg font-semibold text-white">Completed</h3>
                    </div>
                    <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  {/* Match List */}
                  <div className="px-4 pb-4 space-y-2">
                    {matches.filter(m => m.status === 'completed').length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-400 text-sm">No completed matches</p>
                      </div>
                    ) : (
                      matches.filter(m => m.status === 'completed').slice(0, 5).map((match, index) => {
                        const teamOne = teams.find(t => t.id === match.teamOneId);
                        const teamTwo = teams.find(t => t.id === match.teamTwoId);
                        const isHighlighted = index === 0;
                        
                        return (
                          <div key={match.id} 
                               className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                                 isHighlighted ? 'bg-white/10' : 'hover:bg-white/5'
                               }`}>
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 rounded-full border-2 flex-shrink-0 bg-emerald-500 border-emerald-500">
                                <div className="w-2 h-2 bg-emerald-200 rounded-full m-0.5"></div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-medium text-sm truncate">
                                  {teamOne?.name} vs {teamTwo?.name}
                                </p>
                                {isHighlighted && (
                                  <p className="text-gray-400 text-xs mt-0.5">
                                    {new Date(match.date).toLocaleDateString()} • Score: {match.teamOneScore}-{match.teamTwoScore}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            {/* Action buttons */}
                            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {index === 1 && (
                                <button className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z" />
                                  </svg>
                                </button>
                              )}
                              <button className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </button>
                              <button className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                              <button className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                                <div className="grid grid-cols-2 gap-0.5">
                                  <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                                  <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                                  <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                                  <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                                </div>
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Bottom progress section */}
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {/* Progress circle */}
                        <div className="relative w-5 h-5">
                          <svg className="w-5 h-5 transform -rotate-90" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="8" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
                            <circle 
                              cx="10" 
                              cy="10" 
                              r="8" 
                              stroke="#10b981" 
                              strokeWidth="2" 
                              fill="none"
                              strokeDasharray={`${(matches.filter(m => m.status === 'completed').length / matches.length) * 50.27} 50.27`}
                              className="transition-all duration-300"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-400 text-sm font-medium tracking-wider">COMPLETED</span>
                      </div>
                      <span className="text-white font-medium text-sm">
                        {matches.filter(m => m.status === 'completed').length}/{matches.length}
                      </span>
                      <button className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                        <div className="space-y-0.5">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                      </button>
                    </div>
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