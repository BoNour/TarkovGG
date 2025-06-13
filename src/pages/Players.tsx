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
      <div className="relative z-30 pt-8" style={{ backgroundColor: 'transparent' }}>
        
        {/* Header Section with Stats Overview Combined */}
        <section className="py-16 relative">
          <div className="relative max-w-none mx-auto px-4 lg:px-8 xl:px-12">
            <div className="relative overflow-hidden group rounded-3xl mb-8"
                 style={{
                   backgroundColor: 'rgba(24, 24, 27, 0.7)',
                   backdropFilter: 'blur(12px)',
                 }}
            >
              {/* Glare Effect */}
              <div className="absolute inset-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{
                     maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 10%, transparent 70%)',
                   }}
              ></div>

              {/* Multiple glass layers for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
              
              <div className="relative p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-8">
                  
                  {/* Title */}
                  <div className="flex-shrink-0 mb-4 lg:mb-0">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white">
                        PLAYERS
                      </span>
                    </h1>
                  </div>
                  
                  {/* View Mode Toggle and Filters */}
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-6">
                    
                    {/* View Mode Toggle */}
                    <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/20 shadow-lg">
                      <button
                        onClick={() => setViewMode('table')}
                        className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 min-w-[120px] justify-center ${
                          viewMode === 'table' 
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 shadow-lg shadow-blue-500/20' 
                            : 'text-gray-400 hover:text-white hover:bg-white/10'
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
                            : 'text-gray-400 hover:text-white hover:bg-white/10'
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
                            : 'text-gray-400 hover:text-white hover:bg-white/10'
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
                          placeholder="Search players..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white px-4 py-3 pr-10 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 placeholder:text-gray-500 text-sm w-48 shadow-lg"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      </div>
                      
                      {/* Role Filter */}
                      <div className="relative">
                        <select
                          value={filterRole}
                          onChange={(e) => setFilterRole(e.target.value)}
                          className="appearance-none bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white px-4 py-3 pr-10 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 cursor-pointer text-sm shadow-lg"
                          style={{ colorScheme: 'dark' }}
                        >
                          <option value="" style={{ backgroundColor: '#18181b', color: 'white' }}>All Roles</option>
                          {roles.map(role => (
                            <option key={role} value={role} style={{ backgroundColor: '#18181b', color: 'white' }}>{role}</option>
                          ))}
                        </select>
                        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                      </div>

                      {/* Team Filter */}
                      <div className="relative">
                        <select
                          value={filterTeam}
                          onChange={(e) => setFilterTeam(e.target.value)}
                          className="appearance-none bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white px-4 py-3 pr-10 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 cursor-pointer text-sm shadow-lg"
                          style={{ colorScheme: 'dark' }}
                        >
                          <option value="" style={{ backgroundColor: '#18181b', color: 'white' }}>All Teams</option>
                          {teamNames.map(team => (
                            <option key={team.id} value={team.id} style={{ backgroundColor: '#18181b', color: 'white' }}>{team.name}</option>
                          ))}
                        </select>
                        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                      </div>
                      
                      {/* Clear Button */}
                      {(searchTerm || filterRole || filterTeam) && (
                        <button
                          onClick={clearFilters}
                          className="flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
                          title="Clear filters"
                        >
                          <RotateCcw className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats Overview integrated within the header */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Players', value: players.length },
                    { label: 'Total Roles', value: roles.length },
                    { label: 'Avg Rating', value: `${players.length > 0 ? (players.reduce((sum, p) => sum + p.stats.rating, 0) / players.length).toFixed(2) : '0.00'}` },
                    { label: 'Top Rating', value: `${players.length > 0 ? Math.max(...players.map(p => p.stats.rating)).toFixed(2) : '0.00'}` }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                      <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">{stat.label}</h3>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content sections */}
        <div className="space-y-8">
          
          {/* Table View */}
          {viewMode === 'table' && (
            <section className="relative pb-16">
              <div className="max-w-none mx-auto px-4 lg:px-8 xl:px-12">
                <div className="relative overflow-hidden group rounded-3xl"
                     style={{
                       backgroundColor: 'rgba(24, 24, 27, 0.7)',
                       backdropFilter: 'blur(12px)',
                     }}
                >
                  {/* Glare Effect */}
                  <div className="absolute inset-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                       style={{
                         maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 10%, transparent 70%)',
                       }}
                  ></div>

                  {/* Multiple glass layers for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
                  
                  <div className="relative overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-white/5 to-white/10 border-b border-white/10">
                          <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">Rank</th>
                          <th className="px-4 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-widest">
                            <button 
                              className="flex items-center space-x-1 hover:text-white transition-colors"
                              onClick={() => handleSort('nickname')}
                            >
                              <span>Player</span>
                              <SortIcon field="nickname" />
                            </button>
                          </th>
                          <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">Team</th>
                          <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">Role</th>
                          <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                            <button 
                              className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                              onClick={() => handleSort('rating')}
                            >
                              <span>Rating</span>
                              <SortIcon field="rating" />
                            </button>
                          </th>
                          <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                            <button 
                              className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                              onClick={() => handleSort('kdRatio')}
                            >
                              <span>K/D</span>
                              <SortIcon field="kdRatio" />
                            </button>
                          </th>
                          <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                            <button 
                              className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                              onClick={() => handleSort('kost')}
                            >
                              <span>KOST</span>
                              <SortIcon field="kost" />
                            </button>
                          </th>
                          <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">Actions</th>
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
              </div>
            </section>
          )}

          {/* Cards View */}
          {viewMode === 'cards' && (
            <section className="relative pb-16">
              <div className="max-w-none mx-auto px-4 lg:px-8 xl:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedPlayers.map((player, index) => {
                    const team = teams.find(t => t.id === player.teamId);
                    
                    return (
                      <div 
                        key={player.id} 
                        className="relative overflow-hidden rounded-3xl"
                        style={{
                          backgroundColor: 'rgba(24, 24, 27, 0.7)',
                          backdropFilter: 'blur(12px)',
                        }}
                        onMouseEnter={() => setHoveredPlayer(player.id)}
                        onMouseLeave={() => setHoveredPlayer(null)}
                      >
                        {/* Glare Effect */}
                        <div className="absolute inset-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                             style={{
                               maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 10%, transparent 70%)',
                             }}
                        ></div>

                        {/* Multiple glass layers for depth */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
                        
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
            </section>
          )}

          {/* Charts View */}
          {viewMode === 'charts' && (
            <section className="relative pb-16">
              <div className="max-w-none mx-auto px-4 lg:px-8 xl:px-12">
                <div className="relative overflow-hidden group rounded-3xl"
                     style={{
                       backgroundColor: 'rgba(24, 24, 27, 0.7)',
                       backdropFilter: 'blur(12px)',
                     }}
                >
                  {/* Glare Effect */}
                  <div className="absolute inset-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                       style={{
                         maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 10%, transparent 70%)',
                       }}
                  ></div>

                  {/* Multiple glass layers for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
                  
                  <div className="relative p-8">
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
              </div>
            </section>
          )}

          {sortedPlayers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-400 font-medium">No players found. Try adjusting your filters.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Players; 