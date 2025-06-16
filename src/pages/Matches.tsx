import React, { useState, useEffect } from 'react';
import { useGameData } from '../context/GameDataContext';
import MatchCard from '../components/ui/MatchCard';
import { ChartsGrid } from '../components/ui/Charts';
import { Search, Filter, Calendar, Users, Activity, RotateCcw, Sparkles, BarChart3, List, TrendingUp, Clock, Trophy, ArrowRight } from 'lucide-react';
import { MatchStatus } from '../types';

const Matches: React.FC = () => {
  const { matches, teams, isLoading } = useGameData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<MatchStatus | 'all'>('all');
  const [filterTeam, setFilterTeam] = useState('');
  const [hoveredMatchId, setHoveredMatchId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'matches' | 'stats'>('matches');
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
  
  // Filter matches
  const filteredMatches = matches.filter(match => {
    if (!searchTerm.trim()) {
      return true;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const teamOne = teams.find(t => t.id === match.teamOneId);
    const teamTwo = teams.find(t => t.id === match.teamTwoId);

    const teamOneName = teamOne?.name || '';
    const teamTwoName = teamTwo?.name || '';

    return (
      teamOneName.toLowerCase().includes(lowerCaseSearchTerm) ||
      teamTwoName.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });
  
  // Enhanced sorting: Live matches first, then upcoming, then completed
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    // Priority order: live > upcoming > completed
    const statusPriority = {
      'live': 0,
      'upcoming': 1,
      'completed': 2
    };
    
    const aPriority = statusPriority[a.status] ?? 3;
    const bPriority = statusPriority[b.status] ?? 3;
    
    // First sort by status priority
    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }
    
    // Then sort by date (most recent first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Get stats
  const liveMatches = matches.filter(m => m.status === 'live').length;
  const upcomingMatches = matches.filter(m => m.status === 'upcoming').length;
  const completedMatches = matches.filter(m => m.status === 'completed').length;

  const clearFilters = () => {
    setSearchTerm('');
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'matches' ? 'stats' : 'matches');
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
      <div className="fixed inset-0 z-20 pointer-events-none">
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
                  MATCH CENTER
                </h1>
                
                {/* Page Subtitle */}
                <p className="text-xl text-gray-300 font-medium">
                  Live matches, upcoming games, and tournament results
                </p>
              </div>

              {/* View Mode Buttons - Bottom Right */}
              <div className="absolute bottom-6 right-6 z-20">
                <div className="flex items-center bg-black/30 p-2 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <button
                    onClick={() => setViewMode('matches')}
                    className={`px-6 py-3 rounded-xl flex items-center gap-3 text-sm font-bold transition-all duration-300 ${
                      viewMode === 'matches' 
                        ? 'bg-white/12 text-white border border-white/20 shadow-xl' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <List className="w-4 h-4" />
                    <span>Live Matches</span>
                  </button>
                  <button
                    onClick={() => setViewMode('stats')}
                    className={`px-6 py-3 rounded-xl flex items-center gap-3 text-sm font-bold transition-all duration-300 ${
                      viewMode === 'stats' 
                        ? 'bg-white/12 text-white border border-white/20 shadow-xl' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Analytics</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <section className="pb-6">
          <div className="max-w-[1850px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
            
            {viewMode === 'stats' ? (
              /* Analytics Dashboard with Graphs & Numbers */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                
                {/* Performance Metrics */}
                <div className="glass-panel glass-panel-hover rounded-3xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 p-2 border-b border-blue-500/10">
                    <div className="text-center">
                      <h3 className="text-xl font-black tracking-tight text-white">
                        PERFORMANCE METRICS
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    {/* Win Rate Chart */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">Average Win Rate</span>
                        <span className="text-2xl font-bold text-white">73.2%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3">
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full" style={{width: '73.2%'}}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    {/* Match Duration */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">Avg Match Duration</span>
                        <span className="text-2xl font-bold text-white">24:33</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-3 bg-white/5 rounded-xl">
                          <div className="text-lg font-bold text-white">18:45</div>
                          <div className="text-xs text-gray-400">Shortest</div>
                        </div>
                        <div className="p-3 bg-white/5 rounded-xl">
                          <div className="text-lg font-bold text-white">24:33</div>
                          <div className="text-xs text-gray-400">Average</div>
                        </div>
                        <div className="p-3 bg-white/5 rounded-xl">
                          <div className="text-lg font-bold text-white">31:22</div>
                          <div className="text-xs text-gray-400">Longest</div>
                        </div>
                      </div>
                    </div>

                    {/* Score Distribution */}
                    <div className="space-y-3">
                      <span className="text-white font-medium block">Score Distribution</span>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">0-5 Points</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-white/10 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{width: '25%'}}></div>
                            </div>
                            <span className="text-sm text-white">25%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">6-10 Points</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-white/10 rounded-full h-2">
                              <div className="bg-yellow-500 h-2 rounded-full" style={{width: '45%'}}></div>
                            </div>
                            <span className="text-sm text-white">45%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">11+ Points</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-white/10 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '30%'}}></div>
                            </div>
                            <span className="text-sm text-white">30%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tournament Analytics */}
                <div className="glass-panel glass-panel-hover rounded-3xl overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 p-2 border-b border-emerald-500/10">
                    <div className="text-center">
                      <h3 className="text-xl font-black tracking-tight text-white">
                        TOURNAMENT ANALYTICS
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-white/5 rounded-2xl">
                        <div className="text-3xl font-black text-white">
                          {matches.filter(m => m.status === 'completed').length}
                        </div>
                        <div className="text-sm text-gray-400">Total Matches</div>
                        <div className="text-xs text-green-400 mt-1">+12% vs last week</div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-2xl">
                        <div className="text-3xl font-black text-white">{teams.length}</div>
                        <div className="text-sm text-gray-400">Active Teams</div>
                        <div className="text-xs text-blue-400 mt-1">+3 new teams</div>
                      </div>
                    </div>

                    {/* Daily Activity Chart */}
                    <div className="space-y-3">
                      <span className="text-white font-medium block">Daily Match Activity</span>
                      <div className="flex items-end justify-between h-24 gap-1">
                        {[3, 7, 5, 9, 4, 8, 6].map((height, index) => (
                          <div key={index} className="flex flex-col items-center gap-1">
                            <div 
                              className="w-6 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t"
                              style={{height: `${(height / 9) * 100}%`}}
                            ></div>
                            <span className="text-xs text-gray-400">
                              {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Peak Hours */}
                    <div className="space-y-3">
                      <span className="text-white font-medium block">Peak Activity Hours</span>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">18:00 - 20:00</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-white/10 rounded-full h-2">
                              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '85%'}}></div>
                            </div>
                            <span className="text-sm text-white">85%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">20:00 - 22:00</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-white/10 rounded-full h-2">
                              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '92%'}}></div>
                            </div>
                            <span className="text-sm text-white">92%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">14:00 - 16:00</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-white/10 rounded-full h-2">
                              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '67%'}}></div>
                            </div>
                            <span className="text-sm text-white">67%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Statistics */}
                <div className="glass-panel glass-panel-hover rounded-3xl overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500/10 to-purple-500/5 p-2 border-b border-purple-500/10">
                    <div className="text-center">
                      <h3 className="text-xl font-black tracking-tight text-white">
                        LIVE STATISTICS
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    {/* Real-time Metrics */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div>
                          <div className="text-2xl font-bold text-white">1,247</div>
                          <div className="text-sm text-gray-400">Active Players</div>
                        </div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div>
                          <div className="text-2xl font-bold text-white">43.2ms</div>
                          <div className="text-sm text-gray-400">Avg Latency</div>
                        </div>
                        <div className="text-green-400 text-sm font-medium">Good</div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div>
                          <div className="text-2xl font-bold text-white">99.7%</div>
                          <div className="text-sm text-gray-400">Server Uptime</div>
                        </div>
                        <div className="text-green-400 text-sm font-medium">Excellent</div>
                      </div>
                    </div>

                    {/* Tournament Progression */}
                    <div className="space-y-3">
                      <span className="text-white font-medium block">Tournament Progress</span>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">Quarter Finals</span>
                            <span className="text-sm text-white">100%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full w-full"></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">Semi Finals</span>
                            <span className="text-sm text-white">75%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">Finals</span>
                            <span className="text-sm text-white">0%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div className="bg-gray-500 h-2 rounded-full w-0"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Performance Score */}
                    <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
                      <div className="text-4xl font-black text-white mb-1">8.7</div>
                      <div className="text-sm text-gray-300">Overall Performance Score</div>
                      <div className="text-xs text-purple-400 mt-1">Based on 15 factors</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Enhanced Matches Grid */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                
                                 {/* Live Matches */}
                 <div className="glass-panel glass-panel-hover rounded-3xl overflow-hidden">
                   <div className="bg-gradient-to-r from-red-500/10 to-red-500/5 p-2 border-b border-red-500/10">
                     <div className="text-center">
                       <h3 className="text-xl font-black tracking-tight text-white">
                           LIVE MATCHES
                       </h3>
                     </div>
                   </div>
                  
                  <div className="p-2 space-y-2">
                    {matches.filter(m => m.status === 'live').length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-4 space-y-2">
                        <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                          <Activity className="w-6 h-6 text-red-400" />
                        </div>
                        <div className="text-center">
                          <p className="text-gray-300 font-medium text-sm">No Live Matches</p>
                          <p className="text-gray-500 text-xs">Check back soon for live action</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {matches.filter(m => m.status === 'live').map((match) => (
                          <MatchCard key={match.id} match={match} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                                 {/* Upcoming Matches */}
                 <div className="glass-panel glass-panel-hover rounded-3xl overflow-hidden">
                   <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 p-2 border-b border-blue-500/10">
                     <div className="text-center">
                       <h3 className="text-xl font-black tracking-tight text-white">
                           UPCOMING MATCHES
                       </h3>
                     </div>
                   </div>
                  
                  <div className="p-2 space-y-2">
                    {matches.filter(m => m.status === 'upcoming').length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-4 space-y-2">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="text-center">
                          <p className="text-gray-300 font-medium text-sm">No Upcoming Matches</p>
                          <p className="text-gray-500 text-xs">New matches will appear here</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {matches.filter(m => m.status === 'upcoming').map((match) => (
                          <MatchCard key={match.id} match={match} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                                 {/* Completed Matches */}
                 <div className="glass-panel glass-panel-hover rounded-3xl overflow-hidden">
                   <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 p-2 border-b border-emerald-500/10">
                     <div className="text-center">
                       <h3 className="text-xl font-black tracking-tight text-white">
                           COMPLETED MATCHES
                       </h3>
                     </div>
                   </div>
                  
                  <div className="p-2 space-y-2">
                    {matches.filter(m => m.status === 'completed').length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-4 space-y-2">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div className="text-center">
                          <p className="text-gray-300 font-medium text-sm">No Completed Matches</p>
                          <p className="text-gray-500 text-xs">Results will appear here</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {matches.filter(m => m.status === 'completed').map((match) => (
                          <MatchCard key={match.id} match={match} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Matches;