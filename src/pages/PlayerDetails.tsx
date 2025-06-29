import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGameData } from '../context/GameDataContext';
import StatCard from '../components/ui/StatCard';
import { ArrowLeft, Twitter, Target, Award, Activity, TrendingUp, Calendar, Users } from 'lucide-react';

const PlayerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { players, teams, matches, isLoading } = useGameData();
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
  
  // Find the player
  const player = players.find(p => p.id === id);
  
  // Find the team
  const team = player ? teams.find(t => t.id === player.teamId) : undefined;
  
  // Find matches the player participated in
  const playerMatches = matches.filter(match => {
    return player && (
      (match.teamOneId === player.teamId) || 
      (match.teamTwoId === player.teamId)
    );
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
        
        <div className="relative z-30 max-w-none mx-[14%] px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-10 w-48 bg-white/10 rounded mb-8"></div>
            <div className="h-64 bg-white/10 rounded-3xl mb-8"></div>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-white/10 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!player) {
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
        
        <div className="relative z-30 max-w-none mx-[14%] px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Player not found</h1>
          <p className="text-gray-400 mb-8">The player you're looking for doesn't exist or has been removed.</p>
          <Link to="/players" className="inline-flex items-center px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 font-medium rounded-lg transition-all duration-200 shadow-lg border border-blue-500/30 backdrop-blur-md">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Players
          </Link>
        </div>
      </div>
    );
  }

  // Format KD ratio with colors
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
        
        {/* Back button */}
        <section className="py-8 relative">
          <div className="max-w-none mx-[14%] px-4 lg:px-8 xl:px-12">
            <Link to="/players" className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 mb-8">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="font-medium">Back to Players</span>
            </Link>
          </div>
        </section>
        
        {/* Player Header Section */}
        <section className="relative pb-8">
          <div className="relative max-w-none mx-[14%] px-4 lg:px-8 xl:px-12">
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
                {/* Player Profile Header */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 mb-8">
                  
                  {/* Player Image */}
                  <div className="flex-shrink-0">
                    <img 
                      src={player.image} 
                      alt={player.nickname} 
                      className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-white/20 shadow-xl"
                    />
                  </div>
                  
                  {/* Player Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                      <div>
                        <h1 className="text-4xl lg:text-5xl font-black text-white mb-2">{player.nickname}</h1>
                        <p className="text-xl text-gray-300 mb-2">{player.realName}</p>
                        <div className="flex items-center gap-4 text-gray-400">
                          <span className="flex items-center">
                            <img 
                              src={`https://flagcdn.com/w20/${player.nationality.toLowerCase()}.png`}
                              alt={player.nationality}
                              className="h-4 mr-2"
                            />
                            {player.nationality}
                          </span>
                          <span>•</span>
                          <span>{player.role}</span>
                        </div>
                      </div>
                      
                      {/* Social Media */}
                      <div className="flex items-center gap-4">
                        {player.socialMedia?.twitter && (
                          <a 
                            href={player.socialMedia.twitter} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all duration-200 shadow-lg border border-blue-500/30 backdrop-blur-md"
                          >
                            <Twitter className="h-4 w-4 mr-2" />
                            Twitter
                          </a>
                        )}
                      </div>
                    </div>
                    
                    {/* Team Info */}
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Team</p>
                        {team ? (
                          <Link to={`/teams/${team.id}`} className="flex items-center hover:text-blue-400 transition-colors">
                            <img src={team.logo} alt={team.name} className="w-6 h-6 rounded-full mr-2" />
                            <span className="text-white font-medium">{team.name}</span>
                          </Link>
                        ) : (
                          <span className="text-gray-500">No team</span>
                        )}
                      </div>
                      
                      {/* Rating Badge */}
                      <div className="flex items-center">
                        <p className="text-sm text-gray-400 mb-1 mr-3">Rating</p>
                        <div className={`px-4 py-2 rounded-full text-lg font-bold border ${getRatingBadge(player.stats.rating)}`}>
                          {player.stats.rating.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Statistics */}
        <section className="relative pb-8 pt-[10px]">
          <div className="max-w-none mx-auto px-4 lg:px-8 xl:px-12">
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
                <h2 className="text-3xl font-black text-white mb-8 flex items-center">
                  <TrendingUp className="h-7 w-7 mr-3 text-blue-400" />
                  Performance Statistics
                </h2>
                
                {/* Primary Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest">Rating</h3>
                      <Target className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className={`text-3xl font-bold ${getRatingColor(player.stats.rating)}`}>
                      {player.stats.rating.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest">K/D Ratio</h3>
                      <Activity className="h-5 w-5 text-green-400" />
                    </div>
                    <p className="text-3xl font-bold text-white">{player.stats.kdRatio.toFixed(2)}</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest">KOST</h3>
                      <Award className="h-5 w-5 text-purple-400" />
                    </div>
                    <p className="text-3xl font-bold text-white">{(player.stats.kost * 100).toFixed(0)}%</p>
                  </div>
                </div>
                
                {/* Detailed Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Entry</p>
                    <p className="text-xl font-bold text-white">{player.stats.entryRatio}</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">KPR</p>
                    <p className="text-xl font-bold text-white">{player.stats.kpr.toFixed(2)}</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">SRV</p>
                    <p className="text-xl font-bold text-white">{(player.stats.srv * 100).toFixed(0)}%</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Plants</p>
                    <p className="text-xl font-bold text-white">{player.stats.plants}</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Headshots</p>
                    <p className="text-xl font-bold text-white">{player.stats.headshots}</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Attack %</p>
                    <p className="text-xl font-bold text-white">{player.stats.attack}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ex Teams Section */}
        {player.teamHistory && player.teamHistory.length > 0 && (
          <section className="relative pb-8 pt-[10px]">
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
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-700/30 to-gray-600/30 rounded-2xl flex items-center justify-center border border-gray-500/30 mr-4">
                          <Users className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      </div>
                      <div>
                        <h2 className="text-4xl font-black text-white mb-1">Career Journey</h2>
                        <p className="text-gray-300 text-lg font-medium">Previous teams and career history</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{player.teamHistory.length}</div>
                      <div className="text-gray-400 text-sm font-medium">Teams</div>
                    </div>
                  </div>
                  
                  {/* Teams Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {player.teamHistory.map((teamEntry, index) => {
                      const joinDate = new Date(teamEntry.joinDate);
                      const leaveDate = new Date(teamEntry.leaveDate);
                      const daysDiff = Math.floor((leaveDate.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24));
                      const monthsDiff = Math.floor(daysDiff / 30);
                      const yearsDiff = Math.floor(daysDiff / 365);
                      
                      const formatDuration = () => {
                        if (yearsDiff > 0) {
                          const remainingMonths = Math.floor((daysDiff % 365) / 30);
                          return `${yearsDiff} year${yearsDiff > 1 ? 's' : ''}${remainingMonths > 0 ? ` ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`;
                        } else if (monthsDiff > 0) {
                          return `${monthsDiff} month${monthsDiff > 1 ? 's' : ''}`;
                        } else {
                          return `${daysDiff} day${daysDiff > 1 ? 's' : ''}`;
                        }
                      };
                      
                      const isRecent = index === 0; // Most recent team
                      
                                              return (
                          <div key={index} className="relative group overflow-hidden rounded-2xl p-0.5 transition-all duration-300 ease-in-out bg-gradient-to-br from-white/10 to-transparent hover:from-white/20">
                            <div className="relative bg-zinc-900/60 backdrop-blur-xl rounded-[15px] p-4">
                              {/* Header with Status */}
                              <div className="flex justify-between items-center mb-3">
                                <div className={`flex items-center space-x-2 px-2.5 py-1 text-xs font-bold rounded-full border ${isRecent ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-gray-500/10 border-gray-500/20 text-gray-400'}`}>
                                  <Users className="w-3 h-3" />
                                  <span>{isRecent ? 'RECENT' : 'FORMER'}</span>
                                </div>
                                <span className="text-xs text-gray-400 flex items-center">
                                  <Calendar className="w-3 h-3 mr-1.5"/>
                                  {leaveDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                              </div>

                              {/* Body */}
                              <div className="flex items-center justify-between my-4">
                                <div className="flex-1 flex flex-col items-center text-center">
                                  <div className="w-18 h-18 bg-gradient-to-br from-gray-700/20 to-gray-600/20 rounded-full border-2 border-white/10 flex items-center justify-center mb-2">
                                    <Users className="h-10 w-10 text-gray-300" />
                                  </div>
                                  <span className="font-bold text-sm text-white leading-tight truncate w-full px-2">{teamEntry.teamName}</span>
                                  <span className="text-xs text-gray-400">{teamEntry.role}</span>
                                </div>
                                
                                <div className="flex flex-col items-center justify-center w-24">
                                  <span className="text-4xl font-black text-gray-300 tracking-wider">vs</span>
                                  <span className="text-xs text-gray-400 mt-1">CAREER</span>
                                </div>
                                
                                <div className="flex-1 flex flex-col items-center text-center">
                                  <div className="w-16 h-16 rounded-full mb-2 border-2 border-white/10 bg-gradient-to-br from-blue-700/20 to-blue-600/20 flex items-center justify-center">
                                    <span className="text-lg font-bold text-white">{formatDuration().split(' ')[0]}</span>
                                  </div>
                                  <span className="font-bold text-sm text-white leading-tight">{formatDuration().split(' ').slice(1).join(' ')}</span>
                                  <span className="text-xs text-gray-400">duration</span>
                                </div>
                              </div>

                              {/* Footer with Dates */}
                              <div className="grid grid-cols-2 gap-2 mb-3">
                                <div className="bg-white/5 rounded-lg p-2 text-center">
                                  <div className="text-sm font-bold text-white">
                                    {joinDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                                  </div>
                                  <div className="text-xs text-gray-400">Joined</div>
                                </div>
                                <div className="bg-white/5 rounded-lg p-2 text-center">
                                  <div className="text-sm font-bold text-white">
                                    {leaveDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                                  </div>
                                  <div className="text-xs text-gray-400">Left</div>
                                </div>
                              </div>

                              {/* Footer Button */}
                              <div className="block w-full text-center py-2.5 rounded-lg font-semibold text-xs bg-white/10 hover:bg-white/20 text-white transition-all duration-300">
                                View Timeline
                              </div>
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

        {/* Recent Matches */}
        <section className="relative pb-16 pt-[10px]">
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
                <h2 className="text-3xl font-black text-white mb-8">Recent Matches</h2>
                
                {playerMatches.length > 0 ? (
                  <div className="space-y-4">
                    {playerMatches.slice(0, 5).map(match => {
                      const isTeamOne = match.teamOneId === player.teamId;
                      const playerTeam = teams.find(t => t.id === player.teamId);
                      const opposingTeam = teams.find(t => 
                        t.id === (isTeamOne ? match.teamTwoId : match.teamOneId)
                      );
                      const playerTeamScore = isTeamOne ? match.teamOneScore : match.teamTwoScore;
                      const opposingTeamScore = isTeamOne ? match.teamTwoScore : match.teamOneScore;
                      const isWin = playerTeamScore > opposingTeamScore;
                      const isDraw = playerTeamScore === opposingTeamScore;
                      
                      const resultBg = isWin 
                        ? 'bg-gradient-to-r from-green-500/20 to-green-400/20 border-green-500/30 text-green-300' 
                        : isDraw 
                          ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 border-yellow-500/30 text-yellow-300' 
                          : 'bg-gradient-to-r from-red-500/20 to-red-400/20 border-red-500/30 text-red-300';
                      
                      const resultText = isWin ? 'WIN' : isDraw ? 'DRAW' : 'LOSS';
                      
                      return (
                        <div key={match.id} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                              <div className={`${resultBg} w-16 h-16 rounded-full border flex items-center justify-center font-bold text-sm`}>
                                {resultText}
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                  {playerTeam && (
                                    <img 
                                      src={playerTeam.logo} 
                                      alt={playerTeam.name} 
                                      className="w-8 h-8 rounded-full mr-2"
                                    />
                                  )}
                                  <span className="font-medium text-white">{playerTeam?.name}</span>
                                </div>
                                
                                <span className="text-2xl font-bold text-white">
                                  {playerTeamScore} - {opposingTeamScore}
                                </span>
                                
                                <div className="flex items-center">
                                  {opposingTeam && (
                                    <img 
                                      src={opposingTeam.logo} 
                                      alt={opposingTeam.name} 
                                      className="w-8 h-8 rounded-full ml-2"
                                    />
                                  )}
                                  <span className="font-medium text-white ml-2">{opposingTeam?.name}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-sm text-gray-400 mb-2">
                                {new Date(match.date).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </div>
                              <Link 
                                to={`/matches/${match.id}`}
                                className="inline-flex items-center px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-sm font-medium rounded-lg transition-all duration-200 shadow-lg border border-blue-500/30 backdrop-blur-md"
                              >
                                View Match
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">No matches found for this player.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Add CSS animations */}
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
      `}</style>
    </div>
  );
};

export default PlayerDetails;