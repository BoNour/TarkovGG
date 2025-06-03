import React, { useState } from 'react';
import { useGameData } from '../context/GameDataContext';
import MatchCard from '../components/ui/MatchCard';
import { Search, Filter } from 'lucide-react';
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

  if (isLoading) {
    return (
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
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Matches</h1>
      
      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          {/* Filter by status */}
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <label className="text-gray-400 mr-2">Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as MatchStatus | 'all')}
              className="bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Matches</option>
              <option value={MatchStatus.LIVE}>Live</option>
              <option value={MatchStatus.UPCOMING}>Upcoming</option>
              <option value={MatchStatus.COMPLETED}>Completed</option>
            </select>
          </div>
        </div>
        
        {/* Filter by team */}
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-400 mr-2" />
          <label className="text-gray-400 mr-2">Team:</label>
          <select
            value={filterTeam}
            onChange={(e) => setFilterTeam(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Teams</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Results count */}
      <p className="text-gray-400 mb-6">
        Showing {sortedMatches.length} of {matches.length} matches
      </p>
      
      {/* Matches list */}
      <div className="space-y-6">
        {sortedMatches.map(match => (
          <MatchCard key={match.id} match={match} variant="full" />
        ))}
      </div>
      
      {sortedMatches.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No matches found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default Matches;