import React, { useState, useEffect } from 'react';
import { useGameData } from '../context/GameDataContext';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, ChevronUp, ChevronDown, BarChart3, Grid3X3, List, RotateCcw, Users } from 'lucide-react';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#101012' }}>
        {/* Background Image - Fixed behind all content */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 ease-out"
          style={{ 
            backgroundImage: "url('/BACKGROUND.png')",
            transform: `scale(1.05) translate(${mousePosition.x / -100}px, ${mousePosition.y / -100}px)`,
          }}
        ></div>
        
        {/* Single, refined vignette overlay */}
        <div 
          className="fixed inset-0 z-10" 
          style={{ 
            background: 'radial-gradient(circle at center, transparent 20%, rgba(16, 16, 18, 0.8) 60%, rgba(16, 16, 18, 1) 90%)',
          }}
        ></div>
        
        <div className="relative z-30 max-w-none mx-[7%] px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-10 w-48 bg-white/10 rounded mb-8"></div>
            <div className="h-12 bg-white/10 rounded mb-8"></div>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-48 bg-white/10 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#101012' }}>
      {/* Background Image - Fixed behind all content */}
      <div 
        className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 ease-out"
        style={{ 
          backgroundImage: "url('/BACKGROUND.png')",
          transform: `scale(1.05) translate(${mousePosition.x / -100}px, ${mousePosition.y / -100}px)`,
        }}
      ></div>
      
      {/* Single, refined vignette overlay */}
      <div 
        className="fixed inset-0 z-10" 
        style={{ 
          background: 'radial-gradient(circle at center, transparent 20%, rgba(16, 16, 18, 0.8) 60%, rgba(16, 16, 18, 1) 90%)',
        }}
      ></div>
      
      {/* Animated background orbs */}
      <div className="fixed inset-0 z-20">
        {/* Large floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-full blur-3xl opacity-30" style={{animation: 'slow-float-1 15s ease-in-out infinite'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-purple-800/30 to-pink-800/30 rounded-full blur-3xl opacity-20" style={{animation: 'slow-float-2 18s ease-in-out infinite'}}></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-full blur-3xl opacity-20" style={{animation: 'slow-float-3 20s ease-in-out infinite', transform: 'translate(-50%, -50%)'}}></div>

        {/* Mouse-aware orb */}
        <div 
          className="absolute w-[150px] h-[150px] bg-gradient-to-r from-white/10 to-transparent rounded-full blur-2xl opacity-50 transition-transform duration-300 ease-out"
          style={{ 
            transform: `translate(${mousePosition.x - 75}px, ${mousePosition.y - 75}px)`
          }}
        ></div>
      </div>

      {/* Content sections starting from the top */}
      <div className="relative z-30 pt-8" style={{ backgroundColor: 'transparent' }}>
        
        {/* Unified Header Section */}
        <header className="py-12 relative">
          <div className="max-w-none mx-[7%] px-4">
            {/* Main Header Container - Exact same size for all pages */}
            <div className="glass-panel rounded-3xl p-16 relative overflow-hidden" style={{ minHeight: '240px' }}>
              {/* Subtle Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/3 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/2 rounded-full blur-xl pointer-events-none"></div>
              
              {/* Header Content - Exact same structure for all pages */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
                {/* Page Title */}
                <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-white leading-none mb-6">
                  Teams
                </h1>
                
                {/* Page Subtitle */}
                <p className="text-xl text-gray-300 font-medium">
                  Discover top performing teams and their statistics
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Section */}
        <section className="relative pb-16">
          <div className="max-w-none mx-[7%] px-4">
            {/* Charts View - No wrapper */}
            {viewMode === 'charts' ? (
              <div>
                {/* Charts Header with Filters */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border-b border-white/10">
                  {/* View Mode Toggle */}
                  <div className="flex justify-center lg:justify-start">
                    <div className="flex items-center bg-black/30 p-2 rounded-2xl border border-white/10 backdrop-blur-sm">
                      <button
                        onClick={() => setViewMode('table')}
                        className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                          viewMode === 'table' 
                            ? 'bg-white/12 text-white border border-white/20 shadow-xl' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <List className="w-4 h-4" />
                        <span>Table</span>
                      </button>
                      <button
                        onClick={() => setViewMode('cards')}
                        className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                          viewMode === 'cards' 
                            ? 'bg-white/12 text-white border border-white/20 shadow-xl' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Grid3X3 className="w-4 h-4" />
                        <span>Cards</span>
                      </button>
                      <button
                        onClick={() => setViewMode('charts')}
                        className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                          viewMode === 'charts' 
                            ? 'bg-white/12 text-white border border-white/20 shadow-xl' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <BarChart3 className="w-4 h-4" />
                        <span>Stats</span>
                      </button>
                    </div>
                  </div>

                  {/* Search and Filters */}
                  <div className="flex justify-center lg:justify-end">
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Search */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Search teams..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="glass-input block w-full pl-10 pr-3 py-2 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                        />
                      </div>
                      
                      {/* Region Filter */}
                      <div className="relative">
                        <select
                          value={filterRegion}
                          onChange={(e) => setFilterRegion(e.target.value)}
                          className="glass-input appearance-none px-3 py-2 pr-8 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer"
                          style={{ colorScheme: 'dark' }}
                        >
                          <option value="" style={{ backgroundColor: '#18181b', color: 'white' }}>All Regions</option>
                          {regions.map(region => (
                            <option key={region} value={region} style={{ backgroundColor: '#18181b', color: 'white' }}>{region}</option>
                          ))}
                        </select>
                        <Filter className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                      
                      {/* Clear Button */}
                      {(searchTerm || filterRegion) && (
                        <button
                          onClick={clearFilters}
                          className="glass-button flex items-center justify-center px-3 py-2 rounded-xl text-gray-400 hover:text-white transition-all duration-300"
                          title="Clear filters"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
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
                      <div key={region} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
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
            ) : (
              <div className="glass-panel rounded-3xl p-8 relative overflow-hidden">
                
                {/* Table View */}
                {viewMode === 'table' && (
                <div className="relative overflow-hidden rounded-3xl bg-black/20 border border-white/10">
                  <div className="relative overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        {/* Filters and Controls Header Row */}
                        <tr className="bg-gradient-to-r from-white/5 to-white/10 border-b border-white/10">
                          <th colSpan={8} className="px-6 py-4">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                              {/* View Mode Toggle */}
                              <div className="flex justify-center lg:justify-start">
                                <div className="flex items-center bg-black/30 p-2 rounded-2xl border border-white/10 backdrop-blur-sm">
                                  <button
                                    onClick={() => setViewMode('table')}
                                    className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                                      viewMode === 'table' 
                                        ? 'bg-white/12 text-white border border-white/20 shadow-xl' 
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                  >
                                    <List className="w-4 h-4" />
                                    <span>Table</span>
                                  </button>
                                  <button
                                    onClick={() => setViewMode('cards')}
                                    className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                                      viewMode === 'cards' 
                                        ? 'bg-white/12 text-white border border-white/20 shadow-xl' 
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                  >
                                    <Grid3X3 className="w-4 h-4" />
                                    <span>Cards</span>
                                  </button>
                                  <button
                                    onClick={() => setViewMode('charts')}
                                    className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                                      viewMode === 'charts' 
                                        ? 'bg-white/12 text-white border border-white/20 shadow-xl' 
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                  >
                                    <BarChart3 className="w-4 h-4" />
                                    <span>Stats</span>
                                  </button>
                                </div>
                              </div>

                              {/* Search and Filters */}
                              <div className="flex justify-center lg:justify-end">
                                <div className="flex flex-wrap items-center gap-3">
                                  {/* Search */}
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                      <Search className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                      type="text"
                                      placeholder="Search teams..."
                                      value={searchTerm}
                                      onChange={(e) => setSearchTerm(e.target.value)}
                                      className="glass-input block w-full pl-10 pr-3 py-2 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                                    />
                                  </div>
                                  
                                  {/* Region Filter */}
                                  <div className="relative">
                                    <select
                                      value={filterRegion}
                                      onChange={(e) => setFilterRegion(e.target.value)}
                                      className="glass-input appearance-none px-3 py-2 pr-8 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer"
                                      style={{ colorScheme: 'dark' }}
                                    >
                                      <option value="" style={{ backgroundColor: '#18181b', color: 'white' }}>All Regions</option>
                                      {regions.map(region => (
                                        <option key={region} value={region} style={{ backgroundColor: '#18181b', color: 'white' }}>{region}</option>
                                      ))}
                                    </select>
                                    <Filter className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                  </div>
                                  
                                  {/* Clear Button */}
                                  {(searchTerm || filterRegion) && (
                                    <button
                                      onClick={clearFilters}
                                      className="glass-button flex items-center justify-center px-3 py-2 rounded-xl text-gray-400 hover:text-white transition-all duration-300"
                                      title="Clear filters"
                                    >
                                      <RotateCcw className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </th>
                        </tr>
                        
                        {/* Column Headers Row */}
                        <tr className="bg-gradient-to-r from-white/10 to-white/15 border-b border-white/10">
                          <th className="px-3 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">Rank</th>
                          <th className="px-4 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-widest">
                            <button 
                              className="flex items-center space-x-1 hover:text-white transition-colors"
                              onClick={() => handleSort('name')}
                            >
                              <span>Team</span>
                              <SortIcon field="name" />
                            </button>
                          </th>
                          <th className="px-3 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">Region</th>
                          <th className="px-3 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                            <button 
                              className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                              onClick={() => handleSort('winRate')}
                            >
                              <span>Win Rate</span>
                              <SortIcon field="winRate" />
                            </button>
                          </th>
                          <th className="px-3 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                            <button 
                              className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                              onClick={() => handleSort('wins')}
                            >
                              <span>Wins</span>
                              <SortIcon field="wins" />
                            </button>
                          </th>
                          <th className="px-3 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                            <button 
                              className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                              onClick={() => handleSort('losses')}
                            >
                              <span>Losses</span>
                              <SortIcon field="losses" />
                            </button>
                          </th>
                          <th className="px-3 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">Elo</th>
                          <th className="px-3 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {sortedTeams.map((team, index) => {
                          // Calculate Elo rating based on win rate and performance
                          const baseElo = 1200;
                          const eloFromWinRate = Math.round(baseElo + (team.stats.winRate - 0.5) * 800);
                          const eloFromWins = Math.round(team.stats.wins * 5);
                          const calculatedElo = Math.max(800, Math.min(2400, eloFromWinRate + eloFromWins));
                          
                          // Get ranking colors
                          const getRankingStyle = (rank: number) => {
                            if (rank === 1) return 'bg-gradient-to-r from-yellow-500/30 to-yellow-400/30 border-yellow-500/50 text-yellow-300';
                            if (rank === 2) return 'bg-gradient-to-r from-gray-400/30 to-gray-300/30 border-gray-400/50 text-gray-300';
                            if (rank === 3) return 'bg-gradient-to-r from-orange-600/30 to-orange-500/30 border-orange-600/50 text-orange-300';
                            return 'bg-white/10 border-white/20 text-white';
                          };
                          
                          return (
                            <tr key={team.id} className="hover:bg-white/5 transition-colors duration-200">
                              <td className="px-3 py-6 text-center">
                                <div className="flex items-center justify-center">
                                  <span className={`font-bold text-lg rounded-full w-10 h-10 flex items-center justify-center border transition-all duration-200 ${getRankingStyle(index + 1)}`}>
                                    #{index + 1}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-6">
                                <div className="flex items-center space-x-4">
                                  <img
                                    src={team.logo}
                                    alt={team.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20 hover:border-white/40 transition-all duration-200"
                                  />
                                  <div>
                                    <h3 className="text-lg font-bold text-white hover:text-blue-400 transition-colors duration-200">
                                      {team.name}
                                    </h3>
                                  </div>
                                </div>
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
                                <span className="text-white font-bold text-lg">{calculatedElo}</span>
                              </td>
                              <td className="px-3 py-6 text-center">
                                <Link
                                  to={`/teams/${team.id}`}
                                  className="inline-flex items-center px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-sm font-medium rounded-lg transition-all duration-200 shadow-lg border border-blue-500/30 backdrop-blur-md"
                                >
                                  View Team
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Cards View */}
              {viewMode === 'cards' && (
                <div>
                  {/* Cards Header with Filters */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border-b border-white/10">
                    {/* View Mode Toggle */}
                    <div className="flex justify-center lg:justify-start">
                      <div className="flex items-center bg-black/30 p-2 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <button
                          onClick={() => setViewMode('table')}
                          className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                            viewMode === 'table' 
                              ? 'bg-white/12 text-white border border-white/20 shadow-xl' 
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <List className="w-4 h-4" />
                          <span>Table</span>
                        </button>
                        <button
                          onClick={() => setViewMode('cards')}
                          className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                            viewMode === 'cards' 
                              ? 'bg-white/12 text-white border border-white/20 shadow-xl' 
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Grid3X3 className="w-4 h-4" />
                          <span>Cards</span>
                        </button>
                        <button
                          onClick={() => setViewMode('charts')}
                          className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                            viewMode === 'charts' 
                              ? 'bg-white/12 text-white border border-white/20 shadow-xl' 
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <BarChart3 className="w-4 h-4" />
                          <span>Stats</span>
                        </button>
                      </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex justify-center lg:justify-end">
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Search */}
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            placeholder="Search teams..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="glass-input block w-full pl-10 pr-3 py-2 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                          />
                        </div>
                        
                        {/* Region Filter */}
                        <div className="relative">
                          <select
                            value={filterRegion}
                            onChange={(e) => setFilterRegion(e.target.value)}
                            className="glass-input appearance-none px-3 py-2 pr-8 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer"
                            style={{ colorScheme: 'dark' }}
                          >
                            <option value="" style={{ backgroundColor: '#18181b', color: 'white' }}>All Regions</option>
                            {regions.map(region => (
                              <option key={region} value={region} style={{ backgroundColor: '#18181b', color: 'white' }}>{region}</option>
                            ))}
                          </select>
                          <Filter className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        
                        {/* Clear Button */}
                        {(searchTerm || filterRegion) && (
                          <button
                            onClick={clearFilters}
                            className="glass-button flex items-center justify-center px-3 py-2 rounded-xl text-gray-400 hover:text-white transition-all duration-300"
                            title="Clear filters"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedTeams.map((team, index) => (
                    <div key={team.id} className="relative overflow-hidden rounded-3xl bg-black/20 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="relative p-6">
                        <div className="flex items-center mb-6">
                          <img
                            src={team.logo}
                            alt={team.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-white/20 mr-4"
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
                          className="block w-full text-center py-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl text-purple-300 font-medium transition-all duration-200 hover:scale-105 shadow-lg border border-purple-500/30 backdrop-blur-md"
                        >
                          View Team Details
                        </Link>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              )}

                  {sortedTeams.length === 0 && (
                    <div className="text-center py-16">
                      <p className="text-xl text-gray-400 font-medium">No teams found. Try adjusting your filters.</p>
                    </div>
                  )}
                </div>
              )}
          </div>
        </section>

        <style>{`
          @keyframes slow-float-1 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(40px, -60px); }
          }
          @keyframes slow-float-2 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-50px, 50px); }
          }
          @keyframes slow-float-3 {
            0%, 100% { transform: translate(-50%, -50%); }
            50% { transform: translate(-45%, -55%); }
          }
          
          .glass-panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 
              0 8px 32px 0 rgba(0, 0, 0, 0.37),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
          }
          
          .glass-input {
            background: rgba(255, 255, 255, 0.04);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
          }
          
          .glass-input:focus {
            background: rgba(255, 255, 255, 0.06);
            border-color: rgba(59, 130, 246, 0.4);
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
          }
          
          .glass-button {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
          }
          
          .glass-button:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.15);
            transform: translateY(-1px);
          }
        `}</style>

      </div>
    </div>
  );
};

export default Teams;