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
      <div className="min-h-screen" style={{ backgroundColor: '#1a1b1b' }}>
        <div className="container mx-auto px-6 py-20">
          <div className="animate-pulse">
            <div className="h-10 w-64 bg-white/10 rounded mb-8"></div>
            <div className="h-16 bg-white/10 rounded mb-8"></div>
            <div className="h-96 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1b1b' }}>
      {/* Hero Section with same styling as Home */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20 pb-20">
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
                Compete in the biggest esports tournaments worldwide
              </p>
            </div>
          </div>
        </div>
        
        {/* Additional fade overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 z-40" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(26, 27, 27, 1) 100%)' }}></div>
      </section>

      {/* Content sections with seamless connection */}
      <div className="space-y-0" style={{ backgroundColor: '#1a1b1b' }}>
        <div className="container mx-auto px-6 py-12">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div 
              className="backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:border-white/30"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
            >
              <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Total Events</h3>
              <p className="text-2xl font-bold text-white">{tournaments.length}</p>
            </div>
            <div 
              className="backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:border-white/30"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
            >
              <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Live Now</h3>
              <p className="text-2xl font-bold text-green-400">{ongoingTournaments}</p>
            </div>
            <div 
              className="backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:border-white/30"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
            >
              <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Upcoming</h3>
              <p className="text-2xl font-bold text-amber-400">{upcomingTournaments}</p>
            </div>
            <div 
              className="backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:border-white/30"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
            >
              <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Total Prize Pool</h3>
              <p className="text-2xl font-bold text-yellow-400">${(totalPrizePool / 1000000).toFixed(1)}M</p>
            </div>
          </div>

          {/* Controls */}
          <div 
            className="backdrop-blur-sm border rounded-2xl p-6 mb-12 transition-all duration-300"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="relative lg:col-span-2">
                <input
                  type="text"
                  placeholder="Search tournaments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full backdrop-blur-sm border text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              
              {/* Type filter */}
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-gray-400 mr-2" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full backdrop-blur-sm border text-white px-3 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                >
                  <option value="">All Types</option>
                  {Object.values(TournamentType).map(type => (
                    <option key={type} value={type} style={{ backgroundColor: '#1a1b1b' }}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
              </div>

              {/* Format filter */}
              <div className="flex items-center">
                <select
                  value={filterFormat}
                  onChange={(e) => setFilterFormat(e.target.value)}
                  className="w-full backdrop-blur-sm border text-white px-3 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                >
                  <option value="">All Formats</option>
                  {Object.values(TournamentFormat).map(format => (
                    <option key={format} value={format} style={{ backgroundColor: '#1a1b1b' }}>
                      {format.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode */}
              <div className="flex space-x-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-3 rounded-xl transition-all duration-200 font-medium flex items-center justify-center ${
                    viewMode === 'table' 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'backdrop-blur-sm border text-gray-300 hover:text-white'
                  }`}
                  style={viewMode !== 'table' ? { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' } : {}}
                >
                  <Table className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-3 rounded-xl transition-all duration-200 font-medium flex items-center justify-center ${
                    viewMode === 'cards' 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'backdrop-blur-sm border text-gray-300 hover:text-white'
                  }`}
                  style={viewMode !== 'cards' ? { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' } : {}}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('charts')}
                  className={`px-3 py-3 rounded-xl transition-all duration-200 font-medium flex items-center justify-center ${
                    viewMode === 'charts' 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'backdrop-blur-sm border text-gray-300 hover:text-white'
                  }`}
                  style={viewMode !== 'charts' ? { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' } : {}}
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
            <div 
              className="backdrop-blur-sm border rounded-2xl overflow-hidden"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
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
                  <tbody className="divide-y" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    {sortedTournaments.map((tournament, index) => (
                      <tr key={tournament.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-4 py-6">
                          <div className="flex items-center space-x-4">
                            <img
                              src={tournament.logo}
                              alt={tournament.name}
                              className="w-12 h-12 rounded-xl object-cover border-2" 
                              style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
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
                          <button className="px-4 py-2 backdrop-blur-sm border rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:border-white/30"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                            }}
                          >
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
              <div 
                className="backdrop-blur-sm border rounded-2xl p-6"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Tournament Analytics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Tournament Types */}
                  <div 
                    className="backdrop-blur-sm border rounded-xl p-4"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
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
                  <div 
                    className="backdrop-blur-sm border rounded-xl p-4"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
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
                  <div 
                    className="backdrop-blur-sm border rounded-xl p-4"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
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
    </div>
  );
};

export default Tournaments;