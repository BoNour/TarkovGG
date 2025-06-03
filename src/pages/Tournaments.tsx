import React, { useState } from 'react';
import { useGameData } from '../context/GameDataContext';
import TournamentCard from '../components/ui/TournamentCard';
import { Search, Filter } from 'lucide-react';
import { TournamentType, TournamentFormat } from '../types';

const Tournaments: React.FC = () => {
  const { tournaments, isLoading } = useGameData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterFormat, setFilterFormat] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date' | 'prizePool' | 'name'>('date');

  // Filter and sort tournaments
  const filteredTournaments = tournaments.filter(tournament => {
    // Filter by search term
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by type
    const matchesType = filterType === '' || tournament.type === filterType;
    
    // Filter by format
    const matchesFormat = filterFormat === '' || tournament.format === filterFormat;
    
    return matchesSearch && matchesType && matchesFormat;
  });
  
  // Sort tournaments
  const sortedTournaments = [...filteredTournaments].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    } else if (sortBy === 'prizePool') {
      const aValue = parseInt(a.prizePool.replace(/[^0-9]/g, ''));
      const bValue = parseInt(b.prizePool.replace(/[^0-9]/g, ''));
      return bValue - aValue;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-10 w-48 bg-gray-700 rounded mb-8"></div>
          <div className="h-12 bg-gray-700 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Tournaments</h1>
      
      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search tournaments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          {/* Sort */}
          <div className="flex items-center">
            <label className="text-gray-400 mr-2">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'prizePool' | 'name')}
              className="bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="date">Date</option>
              <option value="prizePool">Prize Pool</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Filter by type */}
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <label className="text-gray-400 mr-2">Type:</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">All Types</option>
              {Object.values(TournamentType).map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
          </div>
          
          {/* Filter by format */}
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <label className="text-gray-400 mr-2">Format:</label>
            <select
              value={filterFormat}
              onChange={(e) => setFilterFormat(e.target.value)}
              className="bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">All Formats</option>
              {Object.values(TournamentFormat).map(format => (
                <option key={format} value={format}>
                  {format.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Results count */}
      <p className="text-gray-400 mb-6">
        Showing {sortedTournaments.length} of {tournaments.length} tournaments
      </p>
      
      {/* Tournaments grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTournaments.map(tournament => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))}
      </div>
      
      {sortedTournaments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No tournaments found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default Tournaments;