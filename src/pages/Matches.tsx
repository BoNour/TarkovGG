import React, { useState } from 'react';
import { useGameData } from '../context/GameDataContext';
import MatchCard from '../components/ui/MatchCard';
import { Search, Filter, Calendar, Users, Activity } from 'lucide-react';
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
  
  // Sort matches by date (most recent first)
  const sortedMatches = [...filteredMatches].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get stats
  const liveMatches = matches.filter(m => m.status === 'live').length;
  const upcomingMatches = matches.filter(m => m.status === 'upcoming').length;
  const completedMatches = matches.filter(m => m.status === 'completed').length;

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Enhanced Header */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
              Match Center
            </h1>
            <p className="text-xl text-gray-400 font-medium">
              Follow live matches, upcoming fixtures, and recent results
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-red-500/20 rounded-xl">
                  <Activity className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-400">{liveMatches}</p>
                  <p className="text-sm text-gray-400 font-medium">Live Matches</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-400">{upcomingMatches}</p>
                  <p className="text-sm text-gray-400 font-medium">Upcoming</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-400">{completedMatches}</p>
                  <p className="text-sm text-gray-400 font-medium">Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Filters */}
        <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl p-8 mb-8 border border-gray-700/50 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-6">
            <Filter className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-gray-200">Filter Matches</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Enhanced Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Search Teams</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter team name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-700/50 text-white pl-12 pr-4 py-3 rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            {/* Enhanced Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Match Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as MatchStatus | 'all')}
                className="w-full bg-gray-700/50 text-white px-4 py-3 rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
              >
                <option value="all">All Statuses</option>
                <option value={MatchStatus.LIVE}>🔴 Live</option>
                <option value={MatchStatus.UPCOMING}>🔵 Upcoming</option>
                <option value={MatchStatus.COMPLETED}>🟢 Completed</option>
              </select>
            </div>
            
            {/* Enhanced Team Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Specific Team</label>
              <select
                value={filterTeam}
                onChange={(e) => setFilterTeam(e.target.value)}
                className="w-full bg-gray-700/50 text-white px-4 py-3 rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
              >
                <option value="">All Teams</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Clear Filters Button */}
          {(searchTerm || filterStatus !== 'all' || filterTeam) && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                  setFilterTeam('');
                }}
                className="px-6 py-2 bg-gray-600/50 hover:bg-gray-600/70 text-gray-300 rounded-xl text-sm font-medium transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Enhanced Results section */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-400 font-medium">
              Showing <span className="text-white font-bold">{sortedMatches.length}</span> of <span className="text-white font-bold">{matches.length}</span> matches
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-sm text-gray-400">Real-time updates</span>
            </div>
          </div>
        </div>
        
        {/* Enhanced Matches grid */}
        <div className="grid grid-cols-1 gap-8">
          {sortedMatches.map(match => (
            <MatchCard key={match.id} match={match} variant="full" />
          ))}
        </div>
        
        {/* Enhanced No results state */}
        {sortedMatches.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-700/30 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">No matches found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters to see more results</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                  setFilterTeam('');
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors duration-300"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;