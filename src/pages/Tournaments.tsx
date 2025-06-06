import React, { useState } from 'react';
import { useGameData } from '../context/GameDataContext';
import TournamentCard from '../components/ui/TournamentCard';
import { Search, Filter, ArrowUpDown, ChevronUp, ChevronDown, BarChart3, Grid3X3, Table, Trophy, Calendar, DollarSign } from 'lucide-react';
import { TournamentType, TournamentFormat } from '../types';

type SortField = 'date' | 'prizePool' | 'name';
type SortDirection = 'asc' | 'desc';
type ViewMode = 'table' | 'cards' | 'charts';

const Tournaments: React.FC = () => {
  const { tournaments, isLoading } = useGameData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterFormat, setFilterFormat] = useState<string>('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [viewMode, setViewMode] = useState<ViewMode>('cards');

  // Filter tournaments
  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === '' || tournament.type === filterType;
    const matchesFormat = filterFormat === '' || tournament.format === filterFormat;
    return matchesSearch && matchesType && matchesFormat;
  });
  
  // Sort tournaments
  const sortedTournaments = [...filteredTournaments].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    if (sortField === 'name') {
      return direction * a.name.localeCompare(b.name);
    } else if (sortField === 'date') {
      return direction * (new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    } else if (sortField === 'prizePool') {
      const aValue = parseInt(a.prizePool.replace(/[^0-9]/g, ''));
      const bValue = parseInt(b.prizePool.replace(/[^0-9]/g, ''));
      return direction * (aValue - bValue);
    }
    return 0;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  // Get statistics
  const upcomingTournaments = tournaments.filter(t => new Date(t.startDate) > new Date()).length;
  const ongoingTournaments = tournaments.filter(t => {
    const now = new Date();
    return new Date(t.startDate) <= now && new Date(t.endDate) >= now;
  }).length;
  const totalPrizePool = tournaments.reduce((sum, t) => {
    const prize = parseInt(t.prizePool.replace(/[^0-9]/g, ''));
    return sum + (isNaN(prize) ? 0 : prize);
  }, 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (tournament: any) => {
    const now = new Date();
    const startDate = new Date(tournament.startDate);
    const endDate = new Date(tournament.endDate);
    
    if (startDate > now) return 'text-amber-400';
    if (startDate <= now && endDate >= now) return 'text-green-400';
    return 'text-gray-400';
  };

  const getStatusLabel = (tournament: any) => {
    const now = new Date();
    const startDate = new Date(tournament.startDate);
    const endDate = new Date(tournament.endDate);
    
    if (startDate > now) return 'Upcoming';
    if (startDate <= now && endDate >= now) return 'Live';
    return 'Completed';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-10 w-64 bg-gray-700 rounded mb-8"></div>
            <div className="h-16 bg-gray-700 rounded mb-8"></div>
            <div className="h-96 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 py-12">
        {/* Modern Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-300">Gaming Competitions</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-pink-400 mb-4">
            TOURNAMENTS
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Compete in the biggest esports tournaments worldwide
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-2xl">
            <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Total Events</h3>
            <p className="text-2xl font-bold text-white">{tournaments.length}</p>
          </div>
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-2xl">
            <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Live Now</h3>
            <p className="text-2xl font-bold text-green-400">{ongoingTournaments}</p>
          </div>
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-2xl">
            <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Upcoming</h3>
            <p className="text-2xl font-bold text-amber-400">{upcomingTournaments}</p>
          </div>
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-2xl">
            <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Total Prize Pool</h3>
            <p className="text-2xl font-bold text-yellow-400">${(totalPrizePool / 1000000).toFixed(1)}M</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-gray-700/50 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <input
                type="text"
                placeholder="Search tournaments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700/50 text-white pl-10 pr-4 py-3 rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            
            {/* Type filter */}
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full bg-gray-700/50 text-white px-3 py-3 rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              >
                <option value="">All Types</option>
                {Object.values(TournamentType).map(type => (
                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Format filter */}
            <div className="flex items-center">
              <select
                value={filterFormat}
                onChange={(e) => setFilterFormat(e.target.value)}
                className="w-full bg-gray-700/50 text-white px-3 py-3 rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              >
                <option value="">All Formats</option>
                {Object.values(TournamentFormat).map(format => (
                  <option key={format} value={format}>
                    {format.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode */}
            <div className="flex space-x-1">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-3 rounded-xl transition-all duration-200 font-medium flex items-center justify-center ${viewMode === 'table' ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'}`}
              >
                <Table className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-3 rounded-xl transition-all duration-200 font-medium flex items-center justify-center ${viewMode === 'cards' ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('charts')}
                className={`px-3 py-3 rounded-xl transition-all duration-200 font-medium flex items-center justify-center ${viewMode === 'charts' ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'}`}
              >
                <BarChart3 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 flex justify-between items-center">
            <span className="text-gray-400 text-sm font-medium">
              Showing {sortedTournaments.length} of {tournaments.length} tournaments
            </span>
            {ongoingTournaments > 0 && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">{ongoingTournaments} Live</span>
              </div>
            )}
          </div>
        </div>

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-b border-gray-700/50">
                    <th className="px-4 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-widest">
                      <button 
                        className="flex items-center space-x-1 hover:text-white transition-colors"
                        onClick={() => handleSort('name')}
                      >
                        <span>Tournament</span>
                        <SortIcon field="name" />
                      </button>
                    </th>
                    <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                      <button 
                        className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                        onClick={() => handleSort('date')}
                      >
                        <span>Date</span>
                        <SortIcon field="date" />
                      </button>
                    </th>
                    <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                      <button 
                        className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                        onClick={() => handleSort('prizePool')}
                      >
                        <span>Prize Pool</span>
                        <SortIcon field="prizePool" />
                      </button>
                    </th>
                    <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">Location</th>
                    <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {sortedTournaments.map((tournament, index) => (
                    <tr key={tournament.id} className="hover:bg-gray-700/30 transition-colors group">
                      <td className="px-4 py-6">
                        <div className="flex items-center space-x-4">
                          <img
                            src={tournament.logo}
                            alt={tournament.name}
                            className="w-12 h-12 rounded-xl object-cover border-2 border-gray-600 group-hover:border-gray-500 transition-colors"
                          />
                          <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                              {tournament.name}
                            </h3>
                            <p className="text-gray-400 text-sm">{tournament.game}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-6 text-center">
                        <span className={`font-bold ${getStatusColor(tournament)}`}>
                          {getStatusLabel(tournament)}
                        </span>
                      </td>
                      <td className="px-3 py-6 text-center">
                        <span className="text-gray-300 font-medium">
                          {formatDate(tournament.startDate)}
                        </span>
                      </td>
                      <td className="px-3 py-6 text-center">
                        <span className="text-yellow-400 font-bold text-lg">
                          {tournament.prizePool}
                        </span>
                      </td>
                      <td className="px-3 py-6 text-center">
                        <span className="text-gray-300 font-medium">{tournament.location}</span>
                      </td>
                      <td className="px-3 py-6 text-center">
                        <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 shadow-lg">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Cards View - Keep the original TournamentCard styling */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTournaments.map(tournament => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        )}

        {/* Charts View */}
        {viewMode === 'charts' && (
          <div className="space-y-8">
            <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Tournament Analytics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tournament Types */}
                <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/50">
                  <h4 className="font-bold text-white text-lg mb-4">Tournament Types</h4>
                  {Object.values(TournamentType).map(type => {
                    const typeCount = tournaments.filter(t => t.type === type).length;
                    const percentage = tournaments.length > 0 ? (typeCount / tournaments.length * 100).toFixed(1) : '0.0';
                    return (
                      <div key={type} className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 capitalize">{type}</span>
                        <span className="text-white font-bold">{typeCount} ({percentage}%)</span>
                      </div>
                    );
                  })}
                </div>

                {/* Status Distribution */}
                <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/50">
                  <h4 className="font-bold text-white text-lg mb-4">Status Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-green-400">Live</span>
                      <span className="text-white font-bold">{ongoingTournaments}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-400">Upcoming</span>
                      <span className="text-white font-bold">{upcomingTournaments}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Completed</span>
                      <span className="text-white font-bold">{tournaments.length - ongoingTournaments - upcomingTournaments}</span>
                    </div>
                  </div>
                </div>

                {/* Prize Pool Statistics */}
                <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/50">
                  <h4 className="font-bold text-white text-lg mb-4">Prize Pool Stats</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Total</span>
                      <span className="text-yellow-400 font-bold">${(totalPrizePool / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Average</span>
                      <span className="text-white font-bold">
                        ${tournaments.length > 0 ? ((totalPrizePool / tournaments.length) / 1000).toFixed(0) : '0'}K
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {sortedTournaments.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400 font-medium">No tournaments found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tournaments;