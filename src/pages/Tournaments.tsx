import React, { useState, useEffect } from 'react';
import { useGameData } from '../context/GameDataContext';
import { Search, Filter, Calendar, Trophy, MapPin, DollarSign, Users, Clock, Star, Award, Target, Zap, Crown, Play, Eye, Sparkles, TrendingUp, Globe, ArrowRight } from 'lucide-react';
import { TournamentType, TournamentFormat } from '../types';
import { Link } from 'react-router-dom';

type ViewMode = 'featured' | 'all';

const Tournaments: React.FC = () => {
  const { tournaments, isLoading } = useGameData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterFormat, setFilterFormat] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('featured');
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
          label: 'Live',
          bgColor: 'bg-red-500/20 text-red-300 animate-pulse'
        };
      case 'upcoming':
        return {
          label: 'Upcoming',
          bgColor: 'bg-blue-500/20 text-blue-300'
        };
      case 'completed':
        return {
          label: 'Completed',
          bgColor: 'bg-gray-500/20 text-gray-300'
        };
      default:
        return {
          label: 'Unknown',
          bgColor: 'bg-gray-500/20 text-gray-300'
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
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#101012' }}>
        {/* Background Image */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: "url('/BACKGROUND.png')"
          }}
        ></div>
        
        {/* Vignette overlay */}
        <div 
          className="fixed inset-0 z-10" 
          style={{ 
            background: 'radial-gradient(circle at center, transparent 20%, rgba(16, 16, 18, 0.8) 60%, rgba(16, 16, 18, 1) 90%)',
          }}
        ></div>

        <div className="relative z-30 pt-8">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="animate-pulse space-y-8">
              <div className="h-16 w-64 backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 backdrop-blur-3xl bg-white/5 border border-white/10 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const featuredTournaments = sortedTournaments.slice(0, 12);

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
      
      {/* Subtle background orbs - no colors */}
      <div className="fixed inset-0 z-20">
        {/* Neutral floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-white/5 to-gray-500/5 rounded-full blur-3xl opacity-30" style={{animation: 'slow-float-1 15s ease-in-out infinite'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-gray-500/5 to-white/5 rounded-full blur-3xl opacity-20" style={{animation: 'slow-float-2 18s ease-in-out infinite'}}></div>
        <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-gradient-to-r from-gray-400/5 to-gray-600/5 rounded-full blur-3xl opacity-15" style={{animation: 'slow-float-3 20s ease-in-out infinite', transform: 'translate(-50%, -50%)'}}></div>

        {/* Mouse-aware orb - neutral */}
        <div 
          className="absolute w-[200px] h-[200px] bg-gradient-to-r from-white/10 to-gray-400/10 rounded-full blur-2xl opacity-40 transition-transform duration-300 ease-out"
          style={{ 
            transform: `translate(${mousePosition.x - 100}px, ${mousePosition.y - 100}px)`
          }}
        ></div>
      </div>

      {/* Content sections starting from the top */}
      <div className="relative z-30 pt-8">
        {/* Combined Header and Filters Section */}
        <section className="py-16 relative">
          <div className="max-w-[90vw] mx-auto px-4">
            {/* Combined Glassmorphism Container */}
            <div 
              className="relative group rounded-3xl mb-12 backdrop-blur-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-all duration-500"
              style={{
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Frosted layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-white/[0.01] rounded-3xl"></div>
              
              {/* Content container */}
              <div className="relative p-12">
                <div className="text-center space-y-8">
                  {/* Main headline */}
                  <div className="space-y-4">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white">
                        TOURNAMENTS
                      </span>
                    </h1>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                    <div className="backdrop-blur-2xl bg-white/[0.05] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                      <div className="text-3xl font-black text-white mb-2">{tournaments.length}</div>
                      <div className="text-sm text-gray-400 uppercase tracking-widest">Total Events</div>
                    </div>
                    <div className="backdrop-blur-2xl bg-white/[0.05] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                      <div className="text-3xl font-black text-red-400 mb-2">
                        {tournaments.filter(t => getTournamentStatus(t) === 'live').length}
                      </div>
                      <div className="text-sm text-gray-400 uppercase tracking-widest">Live Now</div>
                    </div>
                    <div className="backdrop-blur-2xl bg-white/[0.05] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                      <div className="text-3xl font-black text-blue-400 mb-2">
                        {tournaments.filter(t => getTournamentStatus(t) === 'upcoming').length}
                      </div>
                      <div className="text-sm text-gray-400 uppercase tracking-widest">Upcoming</div>
                    </div>
                    <div className="backdrop-blur-2xl bg-white/[0.05] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
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

                {/* Filters Section */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                    {/* View Mode Toggle */}
                    <div className="flex backdrop-blur-2xl bg-white/[0.05] rounded-2xl p-2 border border-white/10">
                      <button
                        onClick={() => setViewMode('featured')}
                        className={`flex items-center space-x-3 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 min-w-[140px] justify-center ${
                          viewMode === 'featured' 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg backdrop-blur-xl' 
                            : 'text-gray-400 hover:text-white hover:bg-white/[0.08]'
                        }`}
                      >
                        <Star className="w-4 h-4" />
                        <span>Featured</span>
                      </button>
                      <button
                        onClick={() => setViewMode('all')}
                        className={`flex items-center space-x-3 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 min-w-[120px] justify-center ${
                          viewMode === 'all' 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg backdrop-blur-xl' 
                            : 'text-gray-400 hover:text-white hover:bg-white/[0.08]'
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
                          className="w-full backdrop-blur-2xl bg-white/[0.05] border border-white/10 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-white/20 transition-all placeholder-gray-500 hover:bg-white/[0.08]"
                        />
                        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
                      </div>
                      
                      {/* Type filter */}
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="backdrop-blur-2xl bg-white/[0.05] border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-white/20 transition-all hover:bg-white/[0.08]"
                      >
                        <option value="" style={{ backgroundColor: '#1a1b1b' }}>All Types</option>
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
                        className="backdrop-blur-2xl bg-white/[0.05] border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-white/20 transition-all hover:bg-white/[0.08]"
                      >
                        <option value="" style={{ backgroundColor: '#1a1b1b' }}>All Formats</option>
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
                          className="px-4 py-3 backdrop-blur-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-400/30 hover:border-red-400/50 rounded-xl text-red-300 hover:text-red-200 transition-all duration-300"
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
                      <div className="flex items-center space-x-2 px-4 py-2 backdrop-blur-2xl bg-red-500/10 border border-red-400/20 rounded-full">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="text-red-300 text-sm font-medium">
                          {tournaments.filter(t => getTournamentStatus(t) === 'live').length} Live
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tournaments Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {(viewMode === 'featured' ? featuredTournaments : sortedTournaments).map((tournament, index) => {
                const statusInfo = getStatusInfo(tournament);
                
                return (
                  <Link to={`/tournaments/${tournament.id}`} key={tournament.id}>
                    <div 
                      className="group block rounded-3xl transition-all duration-500 ease-in-out hover:-translate-y-2 hover:bg-white/[0.08] overflow-hidden border border-white/10 hover:border-purple-400/30 relative backdrop-blur-3xl bg-white/[0.03] hover:shadow-2xl hover:shadow-purple-500/10 h-full"
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${index * 50}ms both`,
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      {/* Frosted layer */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-white/[0.01] rounded-3xl"></div>
                      
                      {/* Status Tag - top left */}
                      <div className={`absolute top-6 left-6 text-sm font-semibold px-4 py-2 rounded-full ${statusInfo.bgColor} backdrop-blur-xl border border-white/10 z-10`}>
                        {statusInfo.label}
                      </div>

                      {/* View Details - top right */}
                      <div className="absolute top-6 right-6 flex items-center space-x-2 text-blue-400 group-hover:text-blue-300 transition-colors z-10 opacity-0 group-hover:opacity-100 duration-300">
                        <span className="text-sm font-medium">View Details</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                      
                      <div className="relative flex h-[28rem]">
                        <div className="w-2/3 relative flex items-center justify-center bg-white/[0.03] overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent"></div>
                          <img 
                            src={tournament.logo} 
                            alt={tournament.name} 
                            className="relative h-48 w-48 object-contain transition-transform duration-300 group-hover:scale-105" 
                          />
                        </div>

                        <div className="w-1/3 p-8  flex flex-col relative min-h-0 border-l border-white/10">
                          <div className="flex-1 flex flex-col min-h-0">
                            {/* Tournament Title */}
                            <div className="mb-6 flex-shrink-0">
                              <h3 className="font-bold text-2xl text-white group-hover:text-purple-300 transition-colors mb-3 leading-tight">
                                {tournament.name}
                              </h3>
                              <div className="flex items-center space-x-3 text-gray-400">
                                <Trophy size={18} className="text-yellow-400 flex-shrink-0" />
                                <span className="font-bold text-xl text-white">{tournament.prizePool}</span>
                              </div>
                            </div>

                            {/* Tournament Details Grid */}
                            <div className="flex-1 min-h-0 space-y-4">
                                <div className="flex items-start space-x-3 text-gray-400">
                                  <Calendar size={16} className="text-blue-400 flex-shrink-0 mt-1" />
                                  <div className="flex-1">
                                    <div className="text-sm text-gray-500 uppercase tracking-wide">Date</div>
                                    <div className="text-white font-medium text-base">{formatDate(tournament.startDate)}</div>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-3 text-gray-400">
                                  <MapPin size={16} className="text-green-400 flex-shrink-0 mt-1" />
                                  <div className="flex-1">
                                    <div className="text-sm text-gray-500 uppercase tracking-wide">Location</div>
                                    <div className="text-white font-medium text-base">{tournament.location}</div>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-3 text-gray-400">
                                  <Target size={16} className="text-purple-400 flex-shrink-0 mt-1" />
                                  <div className="flex-1">
                                    <div className="text-sm text-gray-500 uppercase tracking-wide">Format</div>
                                    <div className="text-white font-medium text-base">{tournament.format.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</div>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-3 text-gray-400">
                                  <Users size={16} className="text-cyan-400 flex-shrink-0 mt-1" />
                                  <div className="flex-1">
                                    <div className="text-sm text-gray-500 uppercase tracking-wide">Teams</div>
                                    <div className="text-white font-medium text-base">{tournament.teams.length} registered</div>
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className={`absolute bottom-4 right-6 font-black text-white/[0.05] pointer-events-none select-none text-3xl transition-all duration-500 group-hover:text-white/[0.08] group-hover:scale-105`}>
                        {tournament.name.split(' ')[0].toUpperCase()}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Empty State */}
            {(viewMode === 'featured' ? featuredTournaments : sortedTournaments).length === 0 && (
              <div 
                className="relative group rounded-3xl backdrop-blur-3xl bg-white/[0.03] border border-white/10"
                style={{
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Frosted layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-white/[0.01] rounded-3xl"></div>
                
                {/* Content container */}
                <div className="relative text-center py-20 px-8">
                  <div className="w-24 h-24 backdrop-blur-2xl bg-white/[0.05] border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
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
                      className="px-6 py-3 backdrop-blur-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-white/10 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tournaments;