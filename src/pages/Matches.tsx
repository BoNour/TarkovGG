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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-12">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-12">
        {/* Modern Header */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-6xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Match Center
              </h1>
            </div>
            <p className="text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
              Follow live matches, upcoming fixtures, and recent results from the competitive scene
            </p>
          </div>
          
          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden bg-gradient-to-br from-red-950/20 via-red-900/10 to-transparent border border-red-500/20 rounded-3xl p-8 backdrop-blur-xl hover:border-red-500/40 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center border border-red-500/30">
                  <Activity className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <p className="text-3xl font-black text-red-400">{liveMatches}</p>
                  <p className="text-slate-400 font-medium">Live Matches</p>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden bg-gradient-to-br from-blue-950/20 via-blue-900/10 to-transparent border border-blue-500/20 rounded-3xl p-8 backdrop-blur-xl hover:border-blue-500/40 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                  <Calendar className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <p className="text-3xl font-black text-blue-400">{upcomingMatches}</p>
                  <p className="text-slate-400 font-medium">Upcoming</p>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-950/20 via-emerald-900/10 to-transparent border border-emerald-500/20 rounded-3xl p-8 backdrop-blur-xl hover:border-emerald-500/40 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
                  <Users className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <p className="text-3xl font-black text-emerald-400">{completedMatches}</p>
                  <p className="text-slate-400 font-medium">Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modern Filters */}
        <div className="relative bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 rounded-3xl p-10 mb-12 border border-slate-700/50 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-3xl"></div>
          
          <div className="relative">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                <Filter className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-200">Filter & Search</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Modern Search */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-300 tracking-wide">Search Teams</label>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Enter team name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-700/50 text-white pl-14 pr-6 py-4 rounded-2xl border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder:text-slate-400"
                  />
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-600/50 rounded-lg flex items-center justify-center">
                    <Search className="w-4 h-4 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                  </div>
                </div>
              </div>
              
              {/* Modern Status Filter */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-300 tracking-wide">Match Status</label>
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as MatchStatus | 'all')}
                    className="w-full appearance-none bg-slate-700/50 text-white px-6 py-4 rounded-2xl border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 cursor-pointer"
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
                <label className="block text-sm font-semibold text-slate-300 tracking-wide">Specific Team</label>
                <div className="relative">
                  <select
                    value={filterTeam}
                    onChange={(e) => setFilterTeam(e.target.value)}
                    className="w-full appearance-none bg-slate-700/50 text-white px-6 py-4 rounded-2xl border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 cursor-pointer"
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
                  className="group relative overflow-hidden bg-slate-600/30 hover:bg-slate-600/50 border border-slate-500/30 hover:border-slate-400/50 text-slate-300 hover:text-white px-8 py-3 rounded-2xl font-medium transition-all duration-300"
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
        
        {/* Modern Results section */}
        <div className="mb-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <p className="text-slate-400 font-medium">
                Showing <span className="text-white font-bold">{sortedMatches.length}</span> of <span className="text-white font-bold">{matches.length}</span> matches
              </p>
              {liveMatches > 0 && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-400 text-sm font-medium">{liveMatches} Live</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-400 font-medium">Real-time updates</span>
            </div>
          </div>
        </div>
        
        {/* Matches grid */}
        <div className="grid grid-cols-1 gap-10">
          {sortedMatches.map((match, index) => (
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
        
        {/* Modern No results state */}
        {sortedMatches.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-lg mx-auto">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-slate-700/30 to-slate-800/30 rounded-full flex items-center justify-center border border-slate-600/30">
                <Search className="w-16 h-16 text-slate-500" />
              </div>
              <h3 className="text-3xl font-bold text-slate-300 mb-4">No matches found</h3>
              <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                We couldn't find any matches matching your current filters. Try adjusting your search criteria.
              </p>
              <button
                onClick={clearFilters}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
              >
                <div className="flex items-center space-x-3">
                  <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Reset All Filters</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;