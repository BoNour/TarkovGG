import React, { useState } from 'react';
import { useGameData } from '../context/GameDataContext';
import { Search, Filter, Calendar, Trophy, MapPin, DollarSign, Users, Clock, Star, Award, Target, Zap, Crown, Play, Eye, Sparkles, TrendingUp, Globe } from 'lucide-react';
import { TournamentType, TournamentFormat } from '../types';

type ViewMode = 'featured' | 'all';

// Color palette for tournaments
const colorPalettes = [
  {
    name: 'Ocean',
    primary: 'from-blue-600 to-cyan-500',
    secondary: 'from-blue-900/30 to-cyan-900/20',
    accent: 'blue-400',
    glow: 'shadow-blue-500/25',
    border: 'border-blue-500/30'
  },
  {
    name: 'Sunset',
    primary: 'from-orange-600 to-pink-500',
    secondary: 'from-orange-900/30 to-pink-900/20',
    accent: 'orange-400',
    glow: 'shadow-orange-500/25',
    border: 'border-orange-500/30'
  },
  {
    name: 'Forest',
    primary: 'from-emerald-600 to-teal-500',
    secondary: 'from-emerald-900/30 to-teal-900/20',
    accent: 'emerald-400',
    glow: 'shadow-emerald-500/25',
    border: 'border-emerald-500/30'
  },
  {
    name: 'Royal',
    primary: 'from-purple-600 to-indigo-500',
    secondary: 'from-purple-900/30 to-indigo-900/20',
    accent: 'purple-400',
    glow: 'shadow-purple-500/25',
    border: 'border-purple-500/30'
  },
  {
    name: 'Fire',
    primary: 'from-red-600 to-rose-500',
    secondary: 'from-red-900/30 to-rose-900/20',
    accent: 'red-400',
    glow: 'shadow-red-500/25',
    border: 'border-red-500/30'
  },
  {
    name: 'Neon',
    primary: 'from-lime-600 to-green-500',
    secondary: 'from-lime-900/30 to-green-900/20',
    accent: 'lime-400',
    glow: 'shadow-lime-500/25',
    border: 'border-lime-500/30'
  },
  {
    name: 'Arctic',
    primary: 'from-slate-600 to-gray-500',
    secondary: 'from-slate-900/30 to-gray-900/20',
    accent: 'slate-400',
    glow: 'shadow-slate-500/25',
    border: 'border-slate-500/30'
  },
  {
    name: 'Electric',
    primary: 'from-yellow-600 to-amber-500',
    secondary: 'from-yellow-900/30 to-amber-900/20',
    accent: 'yellow-400',
    glow: 'shadow-yellow-500/25',
    border: 'border-yellow-500/30'
  }
];

const Tournaments: React.FC = () => {
  const { tournaments, isLoading } = useGameData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterFormat, setFilterFormat] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('featured');
  const [hoveredTournamentId, setHoveredTournamentId] = useState<string | null>(null);

  // Get unique color for each tournament
  const getTournamentColor = (tournament: any, index: number) => {
    return colorPalettes[index % colorPalettes.length];
  };

  // Filter tournaments
  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === '' || tournament.type === filterType;
    const matchesFormat = filterFormat === '' || tournament.format === filterFormat;
    return matchesSearch && matchesType && matchesFormat;
  });

  // Get tournament status
  const getTournamentStatus = (tournament: any) => {
    const now = new Date();
    const startDate = new Date(tournament.startDate);
    const endDate = new Date(tournament.endDate);
    
    if (startDate > now) return 'upcoming';
    if (startDate <= now && endDate >= now) return 'live';
    return 'completed';
  };

  // Sort tournaments by status and date
  const sortedTournaments = [...filteredTournaments].sort((a, b) => {
    const aStatus = getTournamentStatus(a);
    const bStatus = getTournamentStatus(b);
    
    // Priority: live > upcoming > completed
    const statusPriority = { 'live': 0, 'upcoming': 1, 'completed': 2 };
    const aPriority = statusPriority[aStatus] ?? 3;
    const bPriority = statusPriority[bStatus] ?? 3;
    
    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }
    
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const getStatusInfo = (tournament: any) => {
    const status = getTournamentStatus(tournament);
    switch (status) {
      case 'live':
        return {
          label: 'LIVE NOW',
          icon: <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />,
          textColor: 'text-red-300'
        };
      case 'upcoming':
        return {
          label: 'UPCOMING',
          icon: <Clock className="w-4 h-4" />,
          textColor: 'text-blue-300'
        };
      case 'completed':
        return {
          label: 'COMPLETED',
          icon: <Award className="w-4 h-4" />,
          textColor: 'text-green-300'
        };
      default:
        return {
          label: 'UNKNOWN',
          icon: <Trophy className="w-4 h-4" />,
          textColor: 'text-gray-300'
        };
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('');
    setFilterFormat('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#1a1b1b' }}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-16 w-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const featuredTournaments = sortedTournaments.slice(0, 12);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1b1b' }}>
      {/* Hero Section with same styling as Home */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div 
          className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat scale-105"
          style={{ 
            backgroundImage: "url('/BACKGROUND.png')" 
          }}
        ></div>
        
        {/* Modern gradient overlay with perfect fade */}
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(180deg, rgba(26, 27, 27, 0.6) 0%, rgba(26, 27, 27, 0.75) 40%, rgba(26, 27, 27, 0.9) 70%, rgba(26, 27, 27, 1) 85%)' }}></div>
        
        {/* Animated background orbs */}
        <div className="absolute inset-0 z-20">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/12 to-pink-500/12 rounded-full blur-2xl animate-pulse delay-1000 opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/8 to-blue-500/8 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-6 py-20 relative z-30 h-full flex flex-col">
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            {/* Main headline */}
            <div className="space-y-4 animate-fade-in-up">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white">
                  TOURNAMENTS
                </span>
              </h1>
              <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
                Compete in the biggest esports tournaments worldwide and claim your victory
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div 
                className="backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:border-white/30"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <div className="text-3xl font-black text-white mb-2">{tournaments.length}</div>
                <div className="text-sm text-gray-400 uppercase tracking-widest">Total Events</div>
              </div>
              <div 
                className="backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:border-white/30"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <div className="text-3xl font-black text-red-400 mb-2">
                  {tournaments.filter(t => getTournamentStatus(t) === 'live').length}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-widest">Live Now</div>
              </div>
              <div 
                className="backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:border-white/30"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <div className="text-3xl font-black text-blue-400 mb-2">
                  {tournaments.filter(t => getTournamentStatus(t) === 'upcoming').length}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-widest">Upcoming</div>
              </div>
              <div 
                className="backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:border-white/30"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <div className="text-3xl font-black text-yellow-400 mb-2">
                  ${(tournaments.reduce((sum, t) => {
                    const prize = parseInt(t.prizePool.replace(/[^0-9]/g, ''));
                    return sum + (isNaN(prize) ? 0 : prize);
                  }, 0) / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-widest">Total Prizes</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional fade overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 z-40" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(26, 27, 27, 1) 100%)' }}></div>
      </section>

      {/* Content sections with seamless connection */}
      <div className="space-y-0" style={{ backgroundColor: '#1a1b1b' }}>
        {/* Filters Section */}
        <section className="relative py-12">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/3 to-transparent"></div>
          <div className="relative">
            <div className="container mx-auto px-6">
              <div 
                className="backdrop-blur-sm border rounded-3xl p-8 transition-all duration-300"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  {/* View Mode Toggle */}
                  <div className="flex bg-white/5 rounded-2xl p-2 border border-white/10">
                    <button
                      onClick={() => setViewMode('featured')}
                      className={`flex items-center space-x-3 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 min-w-[140px] justify-center ${
                        viewMode === 'featured' 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Star className="w-4 h-4" />
                      <span>Featured</span>
                    </button>
                    <button
                      onClick={() => setViewMode('all')}
                      className={`flex items-center space-x-3 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 min-w-[120px] justify-center ${
                        viewMode === 'all' 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Trophy className="w-4 h-4" />
                      <span>All</span>
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
                    {/* Search */}
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Search tournaments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full backdrop-blur-sm border text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                      />
                      <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                    
                    {/* Type filter */}
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="backdrop-blur-sm border text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                    >
                      <option value="">All Types</option>
                      {Object.values(TournamentType).map(type => (
                        <option key={type} value={type} style={{ backgroundColor: '#1a1b1b' }}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>

                    {/* Format filter */}
                    <select
                      value={filterFormat}
                      onChange={(e) => setFilterFormat(e.target.value)}
                      className="backdrop-blur-sm border text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                    >
                      <option value="">All Formats</option>
                      {Object.values(TournamentFormat).map(format => (
                        <option key={format} value={format} style={{ backgroundColor: '#1a1b1b' }}>
                          {format.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </option>
                      ))}
                    </select>

                    {/* Clear Filters */}
                    {(searchTerm || filterType || filterFormat) && (
                      <button
                        onClick={clearFilters}
                        className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 rounded-xl text-red-300 hover:text-red-200 transition-all duration-300"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Results count */}
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-gray-400 text-sm font-medium">
                    Showing {viewMode === 'featured' ? featuredTournaments.length : sortedTournaments.length} tournaments
                  </span>
                  {tournaments.filter(t => getTournamentStatus(t) === 'live').length > 0 && (
                    <div className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-300 text-sm font-medium">
                        {tournaments.filter(t => getTournamentStatus(t) === 'live').length} Live
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tournaments Grid */}
        <section className="relative pb-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/3 to-transparent"></div>
          <div className="relative">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {(viewMode === 'featured' ? featuredTournaments : sortedTournaments).map((tournament, index) => {
                  const statusInfo = getStatusInfo(tournament);
                  const colorPalette = getTournamentColor(tournament, index);
                  const isHovered = hoveredTournamentId === tournament.id;
                  const isOtherHovered = hoveredTournamentId && hoveredTournamentId !== tournament.id;
                  
                  return (
                    <div 
                      key={tournament.id}
                      className={`group relative transition-all duration-700 hover:scale-105 ${
                        isOtherHovered ? 'opacity-60 scale-95' : ''
                      }`}
                      onMouseEnter={() => setHoveredTournamentId(tournament.id)}
                      onMouseLeave={() => setHoveredTournamentId(null)}
                    >
                      {/* Glow effect */}
                      <div className={`absolute -inset-1 bg-gradient-to-r ${colorPalette.primary} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700`}></div>
                      
                      {/* Tournament Card */}
                      <div 
                        className={`relative bg-gradient-to-br ${colorPalette.secondary} backdrop-blur-xl border ${colorPalette.border} rounded-3xl overflow-hidden transition-all duration-700 ${colorPalette.glow} hover:shadow-2xl`}
                        style={{ 
                          filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
                          transform: isHovered ? 'translateY(-8px)' : 'translateY(0px)'
                        }}
                      >
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                          <div className={`absolute inset-0 bg-gradient-to-br ${colorPalette.primary} transform rotate-45 translate-x-16 -translate-y-16 rounded-3xl`}></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 opacity-5">
                          <div className={`absolute inset-0 bg-gradient-to-tr ${colorPalette.primary} transform -rotate-45 -translate-x-12 translate-y-12 rounded-full`}></div>
                        </div>

                        {/* Header */}
                        <div className="relative p-8 pb-6">
                          {/* Background pattern */}
                          <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-0" style={{ 
                              backgroundImage: `radial-gradient(circle at 50% 50%, ${colorPalette.accent.replace('400', '100')} 1px, transparent 1px)`,
                              backgroundSize: '20px 20px'
                            }}></div>
                          </div>
                          
                          <div className="relative flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="relative group">
                                <div className={`absolute -inset-2 bg-gradient-to-r ${colorPalette.primary} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300`}></div>
                                <img
                                  src={tournament.logo}
                                  alt={tournament.name}
                                  className="relative w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-xl"
                                />
                                <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${colorPalette.primary} rounded-full flex items-center justify-center shadow-lg`}>
                                  <Crown className="w-3 h-3 text-white" />
                                </div>
                              </div>
                              <div>
                                <h3 className="text-2xl font-black text-white mb-1 group-hover:text-blue-100 transition-colors">
                                  {tournament.name}
                                </h3>
                                <p className="text-gray-300 font-semibold flex items-center gap-2">
                                  <Globe className="w-4 h-4" />
                                  {tournament.game}
                                </p>
                              </div>
                            </div>
                            
                            {/* Status Badge */}
                            <div className={`flex items-center space-x-2 px-4 py-2 bg-black/30 border ${colorPalette.border} rounded-full backdrop-blur-sm`}>
                              {statusInfo.icon}
                              <span className={`text-xs font-black uppercase tracking-wider ${statusInfo.textColor}`}>
                                {statusInfo.label}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Tournament Details */}
                        <div className="px-8 pb-8 space-y-6">
                          {/* Prize Pool - Featured */}
                          <div className={`bg-gradient-to-r ${colorPalette.primary} bg-opacity-20 backdrop-blur-sm border ${colorPalette.border} rounded-2xl p-6 relative overflow-hidden`}>
                            <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                              <Sparkles className="w-full h-full" />
                            </div>
                            <div className="relative flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 bg-gradient-to-r ${colorPalette.primary} rounded-xl`}>
                                  <DollarSign className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <span className="text-gray-300 font-semibold text-sm block">Prize Pool</span>
                                  <span className="text-3xl font-black text-white">{tournament.prizePool}</span>
                                </div>
                              </div>
                              <TrendingUp className={`w-8 h-8 text-${colorPalette.accent}`} />
                            </div>
                          </div>

                          {/* Tournament Info Grid */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                              <div className="flex items-center space-x-2 mb-3">
                                <Calendar className={`w-5 h-5 text-${colorPalette.accent}`} />
                                <span className="text-gray-400 text-sm font-semibold">Start Date</span>
                              </div>
                              <div className="text-white font-bold text-lg">{formatDate(tournament.startDate)}</div>
                              <div className="text-gray-400 text-sm">{formatTime(tournament.startDate)}</div>
                            </div>
                            
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                              <div className="flex items-center space-x-2 mb-3">
                                <MapPin className={`w-5 h-5 text-${colorPalette.accent}`} />
                                <span className="text-gray-400 text-sm font-semibold">Location</span>
                              </div>
                              <div className="text-white font-bold text-lg">{tournament.location}</div>
                            </div>
                            
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                              <div className="flex items-center space-x-2 mb-3">
                                <Trophy className={`w-5 h-5 text-${colorPalette.accent}`} />
                                <span className="text-gray-400 text-sm font-semibold">Type</span>
                              </div>
                              <div className="text-white font-bold text-lg capitalize">{tournament.type}</div>
                            </div>
                            
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                              <div className="flex items-center space-x-2 mb-3">
                                <Target className={`w-5 h-5 text-${colorPalette.accent}`} />
                                <span className="text-gray-400 text-sm font-semibold">Format</span>
                              </div>
                              <div className="text-white font-bold text-lg">
                                {tournament.format.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                              </div>
                            </div>
                          </div>

                          {/* Additional Info */}
                          <div className="flex items-center justify-between pt-6 border-t border-white/10">
                            <div className="flex items-center space-x-6">
                              <div className="flex items-center space-x-2 bg-white/5 px-3 py-2 rounded-lg">
                                <Users className="w-5 h-5 text-gray-400" />
                                <span className="text-white font-semibold">{tournament.teams.length}</span>
                                <span className="text-gray-400 text-sm">Teams</span>
                              </div>
                              <div className="flex items-center space-x-2 bg-white/5 px-3 py-2 rounded-lg">
                                <Zap className="w-5 h-5 text-gray-400" />
                                <span className="text-white font-semibold">{tournament.matches.length}</span>
                                <span className="text-gray-400 text-sm">Matches</span>
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex space-x-2">
                              {getTournamentStatus(tournament) === 'live' && (
                                <button className="flex items-center space-x-2 px-4 py-2 bg-red-500/30 hover:bg-red-500/50 border border-red-500/50 hover:border-red-500/70 rounded-xl text-red-200 hover:text-red-100 transition-all duration-300 backdrop-blur-sm">
                                  <Play className="w-4 h-4" />
                                  <span className="text-sm font-bold">LIVE</span>
                                </button>
                              )}
                              <button className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${colorPalette.primary} bg-opacity-30 hover:bg-opacity-50 border ${colorPalette.border} hover:border-opacity-70 rounded-xl text-white transition-all duration-300 backdrop-blur-sm font-semibold`}>
                                <Eye className="w-4 h-4" />
                                <span className="text-sm">Details</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Empty State */}
              {(viewMode === 'featured' ? featuredTournaments : sortedTournaments).length === 0 && (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">No tournaments found</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    {searchTerm || filterType || filterFormat 
                      ? "Try adjusting your search criteria or filters to find tournaments."
                      : "Check back soon for exciting new tournaments to join."
                    }
                  </p>
                  {(searchTerm || filterType || filterFormat) && (
                    <button
                      onClick={clearFilters}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tournaments;