import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGameData } from '../context/GameDataContext';
import PlayerCard from '../components/ui/PlayerCard';
import MatchCard from '../components/ui/MatchCard';
import { ArrowLeft, Users, Activity, Trophy, TrendingUp, Target, Award, UserMinus, Calendar, Map } from 'lucide-react';

const TeamDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { teams, players, matches, tournaments, exPlayers, isLoading } = useGameData();
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
  
  // Find the team
  const team = teams.find(t => t.id === id);
  
  // Get team players
  const teamPlayers = players.filter(p => team?.players.includes(p.id));
  
  // Get team ex-players
  const teamExPlayers = exPlayers.filter(p => team?.exPlayers?.includes(p.id));
  
  // Get team matches (limit to recent 5 for the sidebar)
  const teamMatches = matches.filter(match => 
    match.teamOneId === id || match.teamTwoId === id
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  
  // Get tournament placements
  const tournamentResults = team?.stats.tournamentPlacements.map(placement => {
    const tournament = tournaments.find(t => t.id === placement.tournamentId);
    return {
      tournament,
      placement: placement.placement
    };
  }).sort((a, b) => {
    if (!a.tournament || !b.tournament) return 0;
    return new Date(b.tournament.endDate).getTime() - new Date(a.tournament.endDate).getTime();
  });

  const getWinRateColor = (winRate: number) => {
    if (winRate >= 0.7) return 'text-green-400';
    if (winRate >= 0.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPlacementColor = (placement: number) => {
    if (placement === 1) return 'bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 border-yellow-500/30 text-yellow-300';
    if (placement === 2) return 'bg-gradient-to-r from-gray-400/20 to-gray-300/20 border-gray-400/30 text-gray-300';
    if (placement === 3) return 'bg-gradient-to-r from-orange-500/20 to-orange-400/20 border-orange-500/30 text-orange-300';
    return 'bg-gradient-to-r from-blue-500/20 to-blue-400/20 border-blue-500/30 text-blue-300';
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
            <div className="h-32 bg-white/10 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-48 bg-white/10 rounded"></div>
                ))}
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-white/10 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!team) {
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
        
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">Team not found</h1>
          <p className="text-gray-400 mb-8">The team you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/teams" 
            className="inline-flex items-center px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg font-medium transition-all duration-200 border border-blue-500/30"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Teams
          </Link>
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
        
        {/* Header Section */}
        <section className="py-16 relative">
          <div className="relative max-w-none mx-auto px-4 lg:px-8 xl:px-12">
            {/* Back button */}
            <div className="mb-8">
              <Link 
                to="/teams" 
                className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Teams
              </Link>
            </div>
            
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
                {/* Team header */}
                <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
                  <div className="mb-6 md:mb-0 md:mr-6">
                    <img 
                      src={team.logo} 
                      alt={team.name} 
                      className="w-20 h-20 rounded-full border-4 border-white/20 shadow-xl"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h1 className="text-4xl md:text-5xl font-black text-white">{team.name}</h1>
                    </div>
                    <p className="text-gray-400 font-medium text-lg">Region: {team.region}</p>
                  </div>
                </div>
                
                {/* Stats overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
                      <h3 className="text-xs font-medium text-gray-400 uppercase tracking-widest">Win Rate</h3>
                    </div>
                    <p className={`text-3xl font-bold ${getWinRateColor(team.stats.winRate)}`}>
                      {(team.stats.winRate * 100).toFixed(1)}%
                    </p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <Target className="w-5 h-5 text-green-400 mr-2" />
                      <h3 className="text-xs font-medium text-gray-400 uppercase tracking-widest">Match Record</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">
                      {team.stats.wins}-{team.stats.losses}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Wins-Losses</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <Award className="w-5 h-5 text-purple-400 mr-2" />
                      <h3 className="text-xs font-medium text-gray-400 uppercase tracking-widest">Total Games</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">
                      {team.stats.wins + team.stats.losses}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Matches Played</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Active Line up - Full Width */}
        <section className="relative pb-16">
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
                {/* Header */}
                <div className="mb-12">
                  <h2 className="text-4xl font-bold text-white mb-2">Line up</h2>
                  <p className="text-gray-400">Current active roster</p>
                </div>
                
                {/* Players */}
                {teamPlayers.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    {teamPlayers.map((player, index) => {
                      const ratingColor = player.stats.rating > 1.1 
                        ? 'text-green-400' 
                        : player.stats.rating < 0.9 
                          ? 'text-red-400' 
                          : 'text-yellow-400';
                      
                      return (
                        <div 
                          key={player.id} 
                          className="group transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2"
                        >
                          {/* Player Card - Exact same as TopPlayers */}
                          <div className="relative rounded-3xl transition-all duration-500 backdrop-blur-sm transform-gpu"
                               style={{ 
                                 boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                               }}
                               onMouseEnter={(e) => {
                                 e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                               }}
                               onMouseLeave={(e) => {
                                 e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
                               }}
                          >
                            {/* Image area */}
                            <div className="relative h-56 rounded-t-3xl overflow-hidden">
                              <div className="w-full h-full bg-gradient-to-b from-transparent to-black/20"></div>
                              
                              <div className="absolute inset-0 flex items-start justify-center">
                                <img 
                                  src={player.image} 
                                  alt={player.nickname} 
                                  className="object-contain transition-all duration-700 transform-gpu group-hover:translate-y-0 group-hover:scale-[1.2] translate-y-5 scale-90"
                                  style={{ 
                                    filter: 'contrast(1) brightness(1.3)',
                                    height: '120%',
                                    width: 'auto',
                                    maxWidth: '120%',
                                    transformOrigin: 'center top',
                                    zIndex: 10,
                                  }}
                                />
                              </div>
                            </div>
                            
                            {/* Team logo */}
                            <div className="absolute top-4 left-4 z-20">
                              <Link to={`/teams/${team.id}`} className="block group/team">
                                <div className="relative">
                                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/15 to-blue-500/10 rounded-full opacity-0 group-hover/team:opacity-50 blur transition-all duration-300"></div>
                                  <img 
                                    src="/cov logo.png" 
                                    alt="COV Logo" 
                                    className="relative w-10 h-10 object-contain transition-all duration-300"
                                  />
                                </div>
                              </Link>
                            </div>

                            {/* Card content */}
                            <div 
                              className="relative z-10 p-6 space-y-6 border-t border-l border-r border-b rounded-b-3xl backdrop-blur-md overflow-hidden"
                              style={{ 
                                background: 'linear-gradient(135deg, rgba(42, 43, 43, 0.7) 0%, rgba(38, 39, 39, 0.8) 100%)',
                                borderColor: 'rgba(255, 255, 255, 0.08)',
                                borderTopColor: 'rgba(255, 255, 255, 0.06)',
                              }}
                            >
                              {/* Player name section */}
                              <div className="text-center">
                                <Link to={`/players/${player.id}`} className="block group/name">
                                  <h3 className="text-2xl font-black text-white mb-1 transition-all duration-300 group-hover/name:text-cyan-300">
                                    {player.nickname}
                                  </h3>
                                  <p className="text-sm text-gray-300/80 font-medium">{player.role}</p>
                                </Link>
                              </div>
                              
                              {/* Stats grid with icons */}
                              <div className="grid grid-cols-3 gap-4">
                                <div className="text-center group/stat">
                                  <div className="flex items-center justify-center mb-2">
                                    <svg className="w-4 h-4 text-cyan-400 group-hover/stat:text-cyan-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <circle cx="12" cy="12" r="3"></circle>
                                      <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"></path>
                                    </svg>
                                  </div>
                                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">K/D</p>
                                  <p className="text-lg font-bold text-white">{player.stats.kdRatio.toFixed(2)}</p>
                                </div>
                                <div className="text-center group/stat">
                                  <div className="flex items-center justify-center mb-2">
                                    <svg className="w-4 h-4 text-purple-400 group-hover/stat:text-purple-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                  </div>
                                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">KOST</p>
                                  <p className="text-lg font-bold text-white">{(player.stats.kost * 100).toFixed(0)}%</p>
                                </div>
                                <div className="text-center group/stat">
                                  <div className="flex items-center justify-center mb-2">
                                    <svg className="w-4 h-4 text-amber-400 group-hover/stat:text-amber-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                  </div>
                                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">RATING</p>
                                  <p className="text-lg font-bold text-white">{player.stats.rating.toFixed(2)}</p>
                                </div>
                              </div>
                              
                              {/* View Profile button */}
                              <Link 
                                to={`/players/${player.id}`} 
                                className="group/btn relative block w-full text-center py-4 rounded-2xl font-bold text-sm transition-all duration-300 overflow-hidden border"
                                style={{ 
                                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(168, 85, 247, 0.06) 100%)',
                                  borderColor: 'rgba(6, 182, 212, 0.2)'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(168, 85, 247, 0.12) 100%)';
                                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                                  e.currentTarget.style.transform = 'translateY(-2px)';
                                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(6, 182, 212, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(168, 85, 247, 0.06) 100%)';
                                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
                                  e.currentTarget.style.transform = 'translateY(0)';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                              >
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                                <span className="relative z-10 text-white group-hover/btn:text-white transition-colors duration-300">
                                  View Profile
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 space-y-6">
                    <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <Users className="w-10 h-10 text-blue-300" />
                    </div>
                    <div className="text-center">
                      <p className="text-gray-300 font-medium text-xl mb-2">No Players</p>
                      <p className="text-gray-500">No players currently on the roster</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Matches Section */}
        <section className="relative pb-16">
          <div className="relative max-w-none mx-auto px-4 lg:px-8 xl:px-12">
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
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-green-500/15 rounded-2xl flex items-center justify-center border border-green-500/20 mr-4">
                    <Activity className="w-6 h-6 text-green-300" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold text-white">Recent Matches</h2>
                    <p className="text-green-200 text-lg font-medium">Latest 5 games</p>
                  </div>
                </div>
                {/* Matches Grid */}
                {teamMatches.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMatches.map(match => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 space-y-4">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Activity className="w-8 h-8 text-green-300" />
                    </div>
                    <div className="text-center">
                      <p className="text-gray-300 font-medium mb-1">No Recent Matches</p>
                      <p className="text-gray-500 text-sm">No matches found for this team</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Tournament Results Section */}
        <section className="relative pb-16">
          <div className="relative max-w-none mx-auto px-4 lg:px-8 xl:px-12">
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
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-purple-500/15 rounded-2xl flex items-center justify-center border border-purple-500/20 mr-4">
                    <Trophy className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold text-white">Tournament Results</h2>
                    <p className="text-purple-200 text-lg font-medium">Competition history and placements</p>
                  </div>
                </div>
                
                {/* Content */}
                {tournamentResults && tournamentResults.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Tournament
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Placement
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {tournamentResults.map((result, index) => (
                          <tr key={index} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                {result.tournament && (
                                  <>
                                    <img 
                                      src={result.tournament.logo} 
                                      alt={result.tournament.name}
                                      className="w-10 h-10 rounded-lg mr-4 border border-white/20"
                                    />
                                    <div>
                                      <Link 
                                        to={`/tournaments/${result.tournament.id}`}
                                        className="text-white hover:text-blue-400 transition-colors font-medium"
                                      >
                                        {result.tournament.name}
                                      </Link>
                                      <p className="text-gray-400 text-sm">{result.tournament.location}</p>
                                    </div>
                                  </>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-300">
                              {result.tournament && new Date(result.tournament.endDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getPlacementColor(result.placement)}`}>
                                {result.placement}
                                {result.placement === 1 ? 'st' : result.placement === 2 ? 'nd' : result.placement === 3 ? 'rd' : 'th'} Place
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 space-y-4">
                    <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-purple-300" />
                    </div>
                    <div className="text-center">
                      <p className="text-gray-300 font-medium mb-1">No Tournament Results</p>
                      <p className="text-gray-500 text-sm">This team hasn't participated in any tournaments yet</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Ex-Players Section */}
        <section className="relative pb-16">
          <div className="relative max-w-none mx-auto px-4 lg:px-8 xl:px-12">
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
                        <UserMinus className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <h2 className="text-4xl font-black text-white mb-1">Ex-Players</h2>
                      <p className="text-gray-300 text-lg font-medium">Former team members</p>
                    </div>
                  </div>
                  {teamExPlayers && teamExPlayers.length > 0 && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{teamExPlayers.length}</div>
                      <div className="text-gray-400 text-sm font-medium">Departed</div>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                {teamExPlayers && teamExPlayers.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {teamExPlayers.map((player, index) => {
                      const joinDate = new Date(player.joinDate);
                      const leaveDate = new Date(player.leaveDate);
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
                      
                      const ratingColor = player.stats.rating > 1.1 
                        ? 'text-green-400' 
                        : player.stats.rating < 0.9 
                          ? 'text-red-400' 
                          : 'text-yellow-400';
                      
                      const ratingBg = player.stats.rating > 1.1 
                        ? 'bg-gradient-to-r from-green-600/20 to-green-500/20 border-green-500/40' 
                        : player.stats.rating < 0.9 
                          ? 'bg-gradient-to-r from-red-600/20 to-red-500/20 border-red-500/40' 
                          : 'bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border-yellow-500/40';
                      
                                              return (
                          <div key={player.id} className="relative group overflow-hidden rounded-2xl p-0.5 transition-all duration-300 ease-in-out bg-gradient-to-br from-white/10 to-transparent hover:from-white/20">
                            <div className="relative bg-zinc-900/60 backdrop-blur-xl rounded-[15px] p-4">
                              {/* Twitter X Icon - Positioned as overlay */}
                              {player.socialMedia?.twitter && (
                                <a 
                                  href={player.socialMedia.twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="absolute top-2 right-2 z-10 w-6 h-6 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                  title="Follow on Twitter"
                                >
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                  </svg>
                                </a>
                              )}

                              {/* Body */}
                              <div className="flex items-center justify-between my-4">
                                <div className="flex-1 flex flex-col items-center text-center">
                                  <img 
                                    src={player.image} 
                                    alt={player.nickname} 
                                    className="w-20 h-20 rounded-full mb-2 border-2 border-white/10 grayscale group-hover:grayscale-0 transition-all duration-300"
                                  />
                                  <span className="font-bold text-sm text-white leading-tight truncate w-full px-2">{player.nickname}</span>
                                  <span className="text-xs text-gray-400">{player.role}</span>
                                </div>
                                
                                <div className="flex flex-col items-center justify-center w-24">
                                  <div className="flex items-center space-x-3">
                                    <span className={`text-2xl font-black ${ratingColor}`}>{player.stats.rating.toFixed(2)}</span>
                                  </div>
                                  <span className="text-xs text-gray-400 mt-1">RATING</span>
                                </div>
                                
                                <div className="flex-1 flex flex-col items-center text-center">
                                  <div className="w-16 h-16 rounded-full mb-2 border-2 border-white/10 bg-gradient-to-br from-gray-700/20 to-gray-600/20 flex items-center justify-center">
                                    <span className="text-lg font-bold text-white">{formatDuration().split(' ')[0]}</span>
                                  </div>
                                  <span className="font-bold text-sm text-white leading-tight">{formatDuration().split(' ').slice(1).join(' ')}</span>
                                  <span className="text-xs text-gray-400">with team</span>
                                </div>
                              </div>

                              {/* Footer with Dates and Stats */}
                              <div className="grid grid-cols-2 gap-2 mb-3">
                                <div className="bg-white/5 rounded-lg p-2 text-center">
                                  <div className="text-sm font-bold text-white">
                                    {joinDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                  </div>
                                  <div className="text-xs text-gray-400">Joined</div>
                                </div>
                                <div className="bg-white/5 rounded-lg p-2 text-center">
                                  <div className="text-sm font-bold text-white">
                                    {leaveDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                  </div>
                                  <div className="text-xs text-gray-400">Left</div>
                                </div>
                              </div>
                              
                              {/* Stats Row */}
                              <div className="grid grid-cols-2 gap-2 mb-3">
                                <div className="bg-white/5 rounded-lg p-2 text-center">
                                  <div className="text-sm font-bold text-white">{player.stats.kdRatio.toFixed(1)}</div>
                                  <div className="text-xs text-gray-400">K/D</div>
                                </div>
                                <div className="bg-white/5 rounded-lg p-2 text-center">
                                  <div className="text-sm font-bold text-white">{(player.stats.kost * 100).toFixed(0)}%</div>
                                  <div className="text-xs text-gray-400">KOST</div>
                                </div>
                              </div>

                              {/* Footer Button */}
                              <Link 
                                to={`/players/${player.id}`}
                                className="block w-full text-center py-2.5 rounded-lg font-semibold transition-all duration-300 text-xs bg-white/10 hover:bg-white/20 text-white"
                              >
                                View Player
                              </Link>
                            </div>
                          </div>
                        );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 space-y-4">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-500/10 to-gray-600/10 rounded-full flex items-center justify-center border-2 border-gray-500/20">
                        <UserMinus className="w-12 h-12 text-gray-400" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">Perfect Retention</h3>
                      <p className="text-gray-400 mb-3">This team has maintained its roster without any departures</p>
                      <div className="px-4 py-2 bg-green-600/20 text-green-300 rounded-lg border border-green-500/30 inline-block">
                        <span className="font-medium text-sm">Team Loyalty: 100%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeamDetails;