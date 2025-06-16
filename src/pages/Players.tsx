import React, { useState, useEffect } from 'react';
import { useGameData } from '../context/GameDataContext';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, ChevronUp, ChevronDown, BarChart3, Grid3X3, List, RotateCcw } from 'lucide-react';

type SortField = 'nickname' | 'realName' | 'rating' | 'kdRatio' | 'kost' | 'role';
type SortDirection = 'asc' | 'desc';
type ViewMode = 'table' | 'cards' | 'charts';

const Players: React.FC = () => {
  const { players, teams, isLoading } = useGameData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterTeam, setFilterTeam] = useState('');
  const [sortField, setSortField] = useState<SortField>('rating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredPlayer, setHoveredPlayer] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Get unique roles and teams
  const roles = Array.from(new Set(players.map(player => player.role)));
  const teamNames = teams.map(team => ({ id: team.id, name: team.name }));

  // Filter players
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.realName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === '' || player.role === filterRole;
    const matchesTeam = filterTeam === '' || player.teamId === filterTeam;
    return matchesSearch && matchesRole && matchesTeam;
  });

  // Sort players
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    if (sortField === 'nickname' || sortField === 'realName' || sortField === 'role') {
      return direction * a[sortField].localeCompare(b[sortField]);
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

  const getRatingColor = (rating: number) => {
    if (rating >= 1.1) return 'text-green-400';
    if (rating >= 0.9) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRatingBadge = (rating: number) => {
    if (rating >= 1.1) return 'bg-gradient-to-r from-green-500/20 to-green-400/20 border-green-500/30 text-green-300';
    if (rating >= 1.0) return 'bg-gradient-to-r from-blue-500/20 to-blue-400/20 border-blue-500/30 text-blue-300';
    if (rating >= 0.9) return 'bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 border-yellow-500/30 text-yellow-300';
    if (rating >= 0.8) return 'bg-gradient-to-r from-orange-500/20 to-orange-400/20 border-orange-500/30 text-orange-300';
    return 'bg-gradient-to-r from-red-500/20 to-red-400/20 border-red-500/30 text-red-300';
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterRole('');
    setFilterTeam('');
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
        
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
      <div className="relative z-30" style={{ backgroundColor: 'transparent' }}>
        
        {/* Unified Header Section */}
        <header className="py-12 relative">
          <div className="max-w-[95vw] mx-auto px-4">
            {/* Main Header Container - Exact same size for all pages */}
            <div className="glass-panel rounded-3xl p-16 relative overflow-hidden" style={{ minHeight: '240px' }}>
              {/* Subtle Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/3 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/2 rounded-full blur-xl pointer-events-none"></div>
              
              {/* Header Content - Exact same structure for all pages */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
                {/* Page Title */}
                <h1 className="text-6xl lg:text-8xl font-black tracking-tight text-white leading-none mb-6">
                  PLAYERS
                </h1>
                
                {/* Page Subtitle */}
                <p className="text-xl text-gray-300 font-medium">
                  Explore top players and their performance statistics
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Section */}
        <section className="relative pb-16">
          <div className="max-w-[95vw] mx-auto px-4">
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
                        placeholder="Search players..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                                      className="glass-input block w-full pl-10 pr-3 py-2 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                      />
                    </div>
                    
                    {/* Role Filter */}
                    <div className="relative">
                      <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                                      className="glass-input appearance-none px-3 py-2 pr-8 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer"
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="" style={{ backgroundColor: '#18181b', color: 'white' }}>All Roles</option>
                        {roles.map(role => (
                          <option key={role} value={role} style={{ backgroundColor: '#18181b', color: 'white' }}>{role}</option>
                        ))}
                      </select>
                                    <Filter className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Team Filter */}
                    <div className="relative">
                      <select
                        value={filterTeam}
                        onChange={(e) => setFilterTeam(e.target.value)}
                                      className="glass-input appearance-none px-3 py-2 pr-8 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer"
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="" style={{ backgroundColor: '#18181b', color: 'white' }}>All Teams</option>
                        {teamNames.map(team => (
                          <option key={team.id} value={team.id} style={{ backgroundColor: '#18181b', color: 'white' }}>{team.name}</option>
                        ))}
                      </select>
                                    <Filter className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    
                    {/* Clear Button */}
                    {(searchTerm || filterRole || filterTeam) && (
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
                              onClick={() => handleSort('nickname')}
                            >
                              <span>Player</span>
                              <SortIcon field="nickname" />
                            </button>
                          </th>
                          <th className="px-3 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">Team</th>
                          <th className="px-3 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">Role</th>
                          <th className="px-3 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                            <button 
                              className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                              onClick={() => handleSort('rating')}
                            >
                              <span>Rating</span>
                              <SortIcon field="rating" />
                            </button>
                          </th>
                          <th className="px-3 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                            <button 
                              className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                              onClick={() => handleSort('kdRatio')}
                            >
                              <span>K/D</span>
                              <SortIcon field="kdRatio" />
                            </button>
                          </th>
                          <th className="px-3 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                            <button 
                              className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                              onClick={() => handleSort('kost')}
                            >
                              <span>KOST</span>
                              <SortIcon field="kost" />
                            </button>
                          </th>
                          <th className="px-3 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {sortedPlayers.map((player, index) => {
                          const team = teams.find(t => t.id === player.teamId);
                          
                          // Get ranking colors
                          const getRankingStyle = (rank: number) => {
                            if (rank === 1) return 'bg-gradient-to-r from-yellow-500/30 to-yellow-400/30 border-yellow-500/50 text-yellow-300';
                            if (rank === 2) return 'bg-gradient-to-r from-gray-400/30 to-gray-300/30 border-gray-400/50 text-gray-300';
                            if (rank === 3) return 'bg-gradient-to-r from-orange-600/30 to-orange-500/30 border-orange-600/50 text-orange-300';
                            return 'bg-white/10 border-white/20 text-white';
                          };
                          
                          return (
                            <tr 
                              key={player.id} 
                              className="hover:bg-white/5 transition-colors duration-200"
                              onMouseEnter={() => setHoveredPlayer(player.id)}
                              onMouseLeave={() => setHoveredPlayer(null)}
                            >
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
                                    src={player.image}
                                    alt={player.nickname}
                                    className={`w-16 h-16 rounded-full object-cover transition-all duration-700 cursor-pointer scale-120 ${
                                      hoveredPlayer === player.id ? 'scale-150' : ''
                                    }`}
                                  />
                                  <div>
                                    <h3 className="text-lg font-bold text-white hover:text-blue-400 transition-colors duration-200">
                                      {player.nickname}
                                    </h3>
                                    <p className="text-sm text-gray-400">{player.realName}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-3 py-6 text-center">
                                {team ? (
                                  <div className="flex items-center justify-center space-x-2">
                                    <img src={team.logo} alt={team.name} className="w-6 h-6 rounded-full" />
                                    <span className="text-gray-300 font-medium">{team.name}</span>
                                  </div>
                                ) : (
                                  <span className="text-gray-500">No Team</span>
                                )}
                              </td>
                              <td className="px-3 py-6 text-center">
                                <span className="text-gray-300 font-medium">{player.role}</span>
                              </td>
                              <td className="px-3 py-6 text-center">
                                <span className={`font-bold text-lg ${getRatingColor(player.stats.rating)}`}>
                                  {player.stats.rating.toFixed(2)}
                                </span>
                              </td>
                              <td className="px-3 py-6 text-center">
                                <span className="text-white font-bold text-lg">{player.stats.kdRatio.toFixed(2)}</span>
                              </td>
                              <td className="px-3 py-6 text-center">
                                <span className="text-white font-bold text-lg">{(player.stats.kost * 100).toFixed(0)}%</span>
                              </td>
                              <td className="px-3 py-6 text-center">
                                <Link
                                  to={`/players/${player.id}`}
                                  className="inline-flex items-center px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-sm font-medium rounded-lg transition-all duration-200 shadow-lg border border-blue-500/30 backdrop-blur-md"
                                >
                                  View Player
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
                            placeholder="Search players..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="glass-input block w-full pl-10 pr-3 py-2 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                          />
                        </div>
                        
                        {/* Role Filter */}
                        <div className="relative">
                          <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className="glass-input appearance-none px-3 py-2 pr-8 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer"
                            style={{ colorScheme: 'dark' }}
                          >
                            <option value="" style={{ backgroundColor: '#18181b', color: 'white' }}>All Roles</option>
                            {roles.map(role => (
                              <option key={role} value={role} style={{ backgroundColor: '#18181b', color: 'white' }}>{role}</option>
                            ))}
                          </select>
                          <Filter className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Team Filter */}
                        <div className="relative">
                          <select
                            value={filterTeam}
                            onChange={(e) => setFilterTeam(e.target.value)}
                            className="glass-input appearance-none px-3 py-2 pr-8 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer"
                            style={{ colorScheme: 'dark' }}
                          >
                            <option value="" style={{ backgroundColor: '#18181b', color: 'white' }}>All Teams</option>
                            {teamNames.map(team => (
                              <option key={team.id} value={team.id} style={{ backgroundColor: '#18181b', color: 'white' }}>{team.name}</option>
                            ))}
                          </select>
                          <Filter className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        
                        {/* Clear Button */}
                        {(searchTerm || filterRole || filterTeam) && (
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
                  {sortedPlayers.map((player, index) => {
                    const team = teams.find(t => t.id === player.teamId);
                    
                    return (
                      <div 
                        key={player.id} 
                          className="relative overflow-hidden rounded-3xl bg-black/20 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300"
                        onMouseEnter={() => setHoveredPlayer(player.id)}
                        onMouseLeave={() => setHoveredPlayer(null)}
                      >
                        <div className="relative p-6">
                          <div className="flex items-center mb-6">
                            <img
                              src={player.image}
                              alt={player.nickname}
                              className={`w-20 h-20 rounded-full object-cover mr-4 transition-all duration-700 cursor-pointer scale-120 ${
                                hoveredPlayer === player.id ? 'scale-150' : ''
                              }`}
                            />
                            <div className="flex-1">
                              <Link to={`/players/${player.id}`} className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
                                {player.nickname}
                              </Link>
                              <p className="text-gray-400">{player.realName}</p>
                              <p className="text-sm text-gray-500">{player.role}</p>
                              {team && (
                                <div className="flex items-center mt-1">
                                  <img src={team.logo} alt={team.name} className="w-4 h-4 rounded-full mr-1" />
                                  <span className="text-xs text-gray-500">{team.name}</span>
                                </div>
                              )}
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-bold border ${getRatingBadge(player.stats.rating)}`}>
                              {player.stats.rating.toFixed(2)}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                              <p className="text-gray-400 text-sm">K/D Ratio</p>
                              <p className="text-white font-bold text-2xl">{player.stats.kdRatio.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">KOST</p>
                              <p className="text-white font-bold text-2xl">{(player.stats.kost * 100).toFixed(0)}%</p>
                            </div>
                          </div>

                          <Link
                            to={`/players/${player.id}`}
                            className="block w-full text-center py-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl text-purple-300 font-medium transition-all duration-200 hover:scale-105 shadow-lg border border-purple-500/30 backdrop-blur-md"
                          >
                            View Player Details
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
          )}

          {/* Charts View */}
          {viewMode === 'charts' && (
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
                            placeholder="Search players..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="glass-input block w-full pl-10 pr-3 py-2 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                          />
                        </div>
                        
                        {/* Role Filter */}
                        <div className="relative">
                          <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className="glass-input appearance-none px-3 py-2 pr-8 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer"
                            style={{ colorScheme: 'dark' }}
                          >
                            <option value="" style={{ backgroundColor: '#18181b', color: 'white' }}>All Roles</option>
                            {roles.map(role => (
                              <option key={role} value={role} style={{ backgroundColor: '#18181b', color: 'white' }}>{role}</option>
                            ))}
                          </select>
                          <Filter className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Team Filter */}
                        <div className="relative">
                          <select
                            value={filterTeam}
                            onChange={(e) => setFilterTeam(e.target.value)}
                            className="glass-input appearance-none px-3 py-2 pr-8 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer"
                            style={{ colorScheme: 'dark' }}
                          >
                            <option value="" style={{ backgroundColor: '#18181b', color: 'white' }}>All Teams</option>
                            {teamNames.map(team => (
                              <option key={team.id} value={team.id} style={{ backgroundColor: '#18181b', color: 'white' }}>{team.name}</option>
                            ))}
                          </select>
                          <Filter className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        
                        {/* Clear Button */}
                        {(searchTerm || filterRole || filterTeam) && (
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
                  
                  <div className="relative overflow-hidden rounded-3xl bg-black/20 border border-white/10 p-8">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                      <BarChart3 className="h-6 w-6 mr-3 text-green-400" />
                      Role Distribution
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {roles.map(role => {
                        const rolePlayers = players.filter(p => p.role === role);
                        const avgRating = rolePlayers.reduce((sum, p) => sum + p.stats.rating, 0) / rolePlayers.length;
                        const avgKD = rolePlayers.reduce((sum, p) => sum + p.stats.kdRatio, 0) / rolePlayers.length;
                        
                        return (
                          <div key={role} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
                            <h4 className="font-bold text-white text-lg mb-2">{role}</h4>
                            <p className="text-gray-400 text-sm mb-4">{rolePlayers.length} players</p>
                            <div className="space-y-3">
                              <p className={`font-bold ${getRatingColor(avgRating)}`}>
                                Avg Rating: {avgRating.toFixed(2)}
                              </p>
                              <p className="text-gray-300 text-sm">
                                Avg K/D: {avgKD.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
          )}

          {sortedPlayers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-400 font-medium">No players found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Players;

const styles = `
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
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .glass-input:focus {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.25);
    box-shadow: 
      0 0 0 4px rgba(255, 255, 255, 0.1),
      0 8px 24px rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }
  
  .glass-button {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  
  .glass-button:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
  
  .glass-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s;
  }
  
  .glass-button:hover::before {
    left: 100%;
  }
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
} 