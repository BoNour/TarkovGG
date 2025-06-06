import React, { useState } from 'react';
import { useGameData } from '../context/GameDataContext';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, ChevronUp, ChevronDown, BarChart3, Grid3X3, Table } from 'lucide-react';
import StatCard from '../components/ui/StatCard';

type SortField = 'name' | 'tag' | 'winRate' | 'wins' | 'losses';
type SortDirection = 'asc' | 'desc';
type ViewMode = 'table' | 'cards' | 'charts';

const Teams: React.FC = () => {
  const { teams, isLoading } = useGameData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [sortField, setSortField] = useState<SortField>('winRate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  // Get unique regions
  const regions = Array.from(new Set(teams.map(team => team.region)));

  // Filter teams
  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.tag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === '' || team.region === filterRegion;
    return matchesSearch && matchesRegion;
  });

  // Sort teams
  const sortedTeams = [...filteredTeams].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    if (sortField === 'name' || sortField === 'tag') {
      return direction * a[sortField].localeCompare(b[sortField]);
    }
    if (sortField === 'winRate') {
      return direction * (a.stats.winRate - b.stats.winRate);
    }
    return direction * (a.stats[sortField] - b.stats[sortField]);
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

  const getWinRateColor = (winRate: number) => {
    if (winRate >= 0.7) return 'text-green-500';
    if (winRate >= 0.5) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getWinRateBadge = (winRate: number) => {
    if (winRate >= 0.7) return 'bg-gradient-to-r from-green-600 to-green-500';
    if (winRate >= 0.6) return 'bg-gradient-to-r from-blue-600 to-blue-500';
    if (winRate >= 0.5) return 'bg-gradient-to-r from-yellow-600 to-yellow-500';
    if (winRate >= 0.4) return 'bg-gradient-to-r from-orange-600 to-orange-500';
    return 'bg-gradient-to-r from-red-600 to-red-500';
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
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-300">Competitive Teams</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 to-purple-400 mb-4">
            TEAMS
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Discover the best teams in competitive gaming
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-2xl">
            <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Total Teams</h3>
            <p className="text-2xl font-bold text-white">{teams.length}</p>
          </div>
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-2xl">
            <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Total Regions</h3>
            <p className="text-2xl font-bold text-white">{regions.length}</p>
          </div>
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-2xl">
            <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Avg Win Rate</h3>
            <p className="text-2xl font-bold text-white">
              {teams.length > 0 ? ((teams.reduce((sum, t) => sum + t.stats.winRate, 0) / teams.length) * 100).toFixed(1) : '0.0'}%
            </p>
          </div>
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-2xl">
            <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Top Win Rate</h3>
            <p className="text-2xl font-bold text-white">
              {teams.length > 0 ? (Math.max(...teams.map(t => t.stats.winRate)) * 100).toFixed(1) : '0.0'}%
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-gray-700/50 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700/50 text-white pl-10 pr-4 py-3 rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            
            {/* Region filter */}
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                className="w-full bg-gray-700/50 text-white px-3 py-3 rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
              >
                <option value="">All Regions</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* View Mode */}
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center space-x-2 ${viewMode === 'table' ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'}`}
              >
                <Table className="h-4 w-4" />
                <span>Table</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center space-x-2 ${viewMode === 'cards' ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'}`}
              >
                <Grid3X3 className="h-4 w-4" />
                <span>Cards</span>
              </button>
              <button
                onClick={() => setViewMode('charts')}
                className={`px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center space-x-2 ${viewMode === 'charts' ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'}`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Charts</span>
              </button>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-end">
              <span className="text-gray-400 text-sm font-medium">
                Showing {sortedTeams.length} of {teams.length} teams
              </span>
            </div>
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
                        <span>Team</span>
                        <SortIcon field="name" />
                      </button>
                    </th>
                    <th className="px-3 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-widest">
                      <button 
                        className="flex items-center space-x-1 hover:text-white transition-colors"
                        onClick={() => handleSort('tag')}
                      >
                        <span>Tag</span>
                        <SortIcon field="tag" />
                      </button>
                    </th>
                    <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">Region</th>
                    <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                      <button 
                        className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                        onClick={() => handleSort('winRate')}
                      >
                        <span>Win Rate</span>
                        <SortIcon field="winRate" />
                      </button>
                    </th>
                    <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                      <button 
                        className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                        onClick={() => handleSort('wins')}
                      >
                        <span>Wins</span>
                        <SortIcon field="wins" />
                      </button>
                    </th>
                    <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                      <button 
                        className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                        onClick={() => handleSort('losses')}
                      >
                        <span>Losses</span>
                        <SortIcon field="losses" />
                      </button>
                    </th>
                    <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {sortedTeams.map((team, index) => (
                    <tr key={team.id} className="hover:bg-gray-700/30 transition-colors group">
                      <td className="px-4 py-6">
                        <div className="flex items-center space-x-4">
                          <img
                            src={team.logo}
                            alt={team.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-600 group-hover:border-gray-500 transition-colors"
                          />
                          <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                              {team.name}
                            </h3>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-6 text-center">
                        <span className="text-gray-300 font-mono font-medium bg-gray-700/50 px-2 py-1 rounded">
                          {team.tag}
                        </span>
                      </td>
                      <td className="px-3 py-6 text-center">
                        <span className="text-gray-300 font-medium">{team.region}</span>
                      </td>
                      <td className="px-3 py-6 text-center">
                        <span className={`font-bold text-lg ${getWinRateColor(team.stats.winRate)}`}>
                          {(team.stats.winRate * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-3 py-6 text-center">
                        <span className="text-white font-bold text-lg">{team.stats.wins}</span>
                      </td>
                      <td className="px-3 py-6 text-center">
                        <span className="text-white font-bold text-lg">{team.stats.losses}</span>
                      </td>
                      <td className="px-3 py-6 text-center">
                        <Link
                          to={`/teams/${team.id}`}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
                        >
                          View Team
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Cards View */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTeams.map((team, index) => (
              <div key={team.id} className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-2xl hover:scale-105">
                <div className="flex items-center mb-6">
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-600 mr-4"
                  />
                  <div className="flex-1">
                    <Link to={`/teams/${team.id}`} className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
                      {team.name}
                    </Link>
                    <p className="text-gray-400 font-mono">{team.tag}</p>
                    <p className="text-sm text-gray-500">{team.region}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${getWinRateBadge(team.stats.winRate)} text-white`}>
                    {(team.stats.winRate * 100).toFixed(1)}%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-400 text-sm">Total Wins</p>
                    <p className="text-white font-bold text-2xl">{team.stats.wins}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Losses</p>
                    <p className="text-white font-bold text-2xl">{team.stats.losses}</p>
                  </div>
                </div>

                <Link
                  to={`/teams/${team.id}`}
                  className="block w-full text-center py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-white font-medium transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  View Team Details
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Charts View */}
        {viewMode === 'charts' && (
          <div className="space-y-8">
            <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Regional Distribution
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {regions.map(region => {
                  const regionTeams = teams.filter(t => t.region === region);
                  const avgWinRate = regionTeams.reduce((sum, t) => sum + t.stats.winRate, 0) / regionTeams.length;
                  const totalWins = regionTeams.reduce((sum, t) => sum + t.stats.wins, 0);
                  
                  return (
                    <div key={region} className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/50">
                      <h4 className="font-bold text-white text-lg">{region}</h4>
                      <p className="text-gray-400 text-sm">{regionTeams.length} teams</p>
                      <div className="mt-3 space-y-2">
                        <p className={`font-bold ${getWinRateColor(avgWinRate)}`}>
                          Avg Win Rate: {(avgWinRate * 100).toFixed(1)}%
                        </p>
                        <p className="text-gray-300 text-sm">
                          Total Wins: {totalWins}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {sortedTeams.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400 font-medium">No teams found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;