import React, { useState } from 'react';
import { useGameData } from '../context/GameDataContext';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, ChevronUp, ChevronDown, BarChart3, Grid3X3, List, RotateCcw } from 'lucide-react';

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
    if (winRate >= 0.7) return 'text-green-400';
    if (winRate >= 0.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getWinRateBadge = (winRate: number) => {
    if (winRate >= 0.7) return 'bg-gradient-to-r from-green-500/20 to-green-400/20 border-green-500/30 text-green-300';
    if (winRate >= 0.6) return 'bg-gradient-to-r from-blue-500/20 to-blue-400/20 border-blue-500/30 text-blue-300';
    if (winRate >= 0.5) return 'bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 border-yellow-500/30 text-yellow-300';
    if (winRate >= 0.4) return 'bg-gradient-to-r from-orange-500/20 to-orange-400/20 border-orange-500/30 text-orange-300';
    return 'bg-gradient-to-r from-red-500/20 to-red-400/20 border-red-500/30 text-red-300';
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterRegion('');
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
      {/* Header Section */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            
            {/* Title */}
            <div className="flex-shrink-0 mb-4 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white">
                  TEAMS CENTER
                </span>
              </h1>
            </div>
            
            {/* View Mode Toggle and Filters */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-6">
              
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-800/50 rounded-xl p-2 border border-gray-600/50 order-first shadow-lg">
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 min-w-[120px] justify-center ${
                    viewMode === 'table' 
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 shadow-lg shadow-blue-500/20' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                  }`}
                >
                  <List className="w-5 h-5" />
                  <span>Table</span>
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 min-w-[120px] justify-center ${
                    viewMode === 'cards' 
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/20' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                  <span>Cards</span>
                </button>
                <button
                  onClick={() => setViewMode('charts')}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 min-w-[120px] justify-center ${
                    viewMode === 'charts' 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30 shadow-lg shadow-green-500/20' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>Stats</span>
                </button>
              </div>
              
              {/* Filters Container */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
              
                {/* Search */}
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
                
                {/* Region Filter */}
                <div className="relative">
                  <select
                    value={filterRegion}
                    onChange={(e) => setFilterRegion(e.target.value)}
                    className="appearance-none bg-gray-800/50 border border-gray-600/50 rounded-lg text-white px-4 py-3 pr-10 focus:outline-none focus:border-blue-400 focus:bg-gray-800/70 transition-all duration-300 cursor-pointer text-sm shadow-lg"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="" style={{ backgroundColor: '#1a1b1b', color: 'white' }}>All Regions</option>
                    {regions.map(region => (
                      <option key={region} value={region} style={{ backgroundColor: '#1a1b1b', color: 'white' }}>{region}</option>
                    ))}
                  </select>
                  <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                </div>
                
                {/* Clear Button */}
                {(searchTerm || filterRegion) && (
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

      {/* Stats Overview */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 shadow-lg">
              <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Total Teams</h3>
              <p className="text-2xl font-bold text-white">{teams.length}</p>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 shadow-lg">
              <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Total Regions</h3>
              <p className="text-2xl font-bold text-white">{regions.length}</p>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 shadow-lg">
              <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Avg Win Rate</h3>
              <p className="text-2xl font-bold text-white">
                {teams.length > 0 ? ((teams.reduce((sum, t) => sum + t.stats.winRate, 0) / teams.length) * 100).toFixed(1) : '0.0'}%
              </p>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 shadow-lg">
              <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Top Win Rate</h3>
              <p className="text-2xl font-bold text-white">
                {teams.length > 0 ? (Math.max(...teams.map(t => t.stats.winRate)) * 100).toFixed(1) : '0.0'}%
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content sections */}
      <div className="space-y-8" style={{ backgroundColor: '#1a1b1b' }}>
        
        {/* Table View */}
        {viewMode === 'table' && (
          <section className="relative pb-16">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/3 to-transparent"></div>
            <div className="relative">
              <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-600/30 overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-900/30 to-gray-800/30 border-b border-gray-600/30">
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
                      <tbody className="divide-y divide-gray-600/30">
                        {sortedTeams.map((team, index) => (
                          <tr key={team.id} className="hover:bg-gray-700/20 transition-colors group">
                            <td className="px-4 py-6">
                              <div className="flex items-center space-x-4">
                                <img
                                  src={team.logo}
                                  alt={team.name}
                                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-600/50 group-hover:border-gray-500/70 transition-colors"
                                />
                                <div>
                                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                                    {team.name}
                                  </h3>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-6 text-center">
                              <span className="text-gray-300 font-mono font-medium bg-gray-700/30 px-2 py-1 rounded border border-gray-600/30">
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
                                className="inline-flex items-center px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 shadow-lg border border-blue-500/30"
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
              </div>
            </div>
          </section>
        )}

        {/* Cards View */}
        {viewMode === 'cards' && (
          <section className="relative pb-16">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/3 to-transparent"></div>
            <div className="relative">
              <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedTeams.map((team, index) => (
                    <div key={team.id} className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 shadow-xl hover:scale-[1.02] transform-gpu">
                      <div className="flex items-center mb-6">
                        <img
                          src={team.logo}
                          alt={team.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-600/50 mr-4"
                        />
                        <div className="flex-1">
                          <Link to={`/teams/${team.id}`} className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
                            {team.name}
                          </Link>
                          <p className="text-gray-400 font-mono">{team.tag}</p>
                          <p className="text-sm text-gray-500">{team.region}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-bold border ${getWinRateBadge(team.stats.winRate)}`}>
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
                        className="block w-full text-center py-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl text-purple-300 font-medium transition-all duration-200 hover:scale-105 shadow-lg border border-purple-500/30"
                      >
                        View Team Details
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Charts View */}
        {viewMode === 'charts' && (
          <section className="relative pb-16">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/3 to-transparent"></div>
            <div className="relative">
              <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-600/30 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                    <BarChart3 className="h-6 w-6 mr-3 text-green-400" />
                    Regional Distribution
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {regions.map(region => {
                      const regionTeams = teams.filter(t => t.region === region);
                      const avgWinRate = regionTeams.reduce((sum, t) => sum + t.stats.winRate, 0) / regionTeams.length;
                      const totalWins = regionTeams.reduce((sum, t) => sum + t.stats.wins, 0);
                      
                      return (
                        <div key={region} className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300">
                          <h4 className="font-bold text-white text-lg mb-2">{region}</h4>
                          <p className="text-gray-400 text-sm mb-4">{regionTeams.length} teams</p>
                          <div className="space-y-3">
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
            </div>
          </section>
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