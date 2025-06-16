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

      {/* Main Content Container */}
      <div className="relative z-30 min-h-screen">
        
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
                  TOURNAMENTS
                </h1>
                
                {/* Page Subtitle */}
                <p className="text-xl text-gray-300 font-medium">
                  Compete in Tarkov's biggest tournaments and championships
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <section className="pb-6">
          <div className="max-w-[1850px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">

            {/* Tournaments Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
              {sortedTournaments.map((tournament, index) => {
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


                      
                      <div className="relative flex h-[28rem]">
                        <div className="w-2/3 relative bg-white/[0.03] overflow-hidden flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent z-10"></div>
                          <img 
                            src={tournament.logo} 
                            alt={tournament.name} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
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
            {sortedTournaments.length === 0 && (
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
          
          .glass-panel-hover {
            transition: all 0.4s ease;
          }
          
          .glass-panel-hover:hover {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.12);
            transform: translateY(-2px);
            box-shadow: 
              0 20px 50px 0 rgba(0, 0, 0, 0.5),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
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
          
          .glass-button.active {
            background: rgba(59, 130, 246, 0.15);
            border-color: rgba(59, 130, 246, 0.3);
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
          }
        `}</style>
      </div>
    </div>
  );
};

export default Tournaments;