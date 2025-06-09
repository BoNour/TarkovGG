import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGameData } from '../context/GameDataContext';
import PlayerCard from '../components/ui/PlayerCard';
import MatchCard from '../components/ui/MatchCard';
import { ArrowLeft, Users, Activity, Trophy, TrendingUp, Target, Award, UserMinus, Calendar, Map } from 'lucide-react';

const TeamDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { teams, players, matches, tournaments, exPlayers, isLoading } = useGameData();
  
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
      <div className="min-h-screen" style={{ backgroundColor: '#1a1b1b' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-10 w-48 bg-gray-700 rounded mb-8"></div>
            <div className="h-32 bg-gray-700 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-48 bg-gray-700 rounded"></div>
                ))}
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-gray-700 rounded"></div>
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
      <div className="min-h-screen" style={{ backgroundColor: '#1a1b1b' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
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
    <div className="min-h-screen" style={{ backgroundColor: '#1a1b1b' }}>
      {/* Header Section */}
      <section className="relative py-2">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Back button */}
          <div className="mb-4">
            <Link 
              to="/teams" 
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Teams
            </Link>
          </div>
          
          {/* Team header */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-600/30 overflow-hidden shadow-2xl mb-4">
            <div className="px-8 py-4">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="mb-3 md:mb-0 md:mr-6">
                  <img 
                    src={team.logo} 
                    alt={team.name} 
                    className="w-14 h-14 rounded-full border-4 border-gray-600/50 shadow-xl"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h1 className="text-2xl md:text-3xl font-black text-white">{team.name}</h1>
                    <span className="bg-gray-700/50 px-3 py-1 rounded-lg text-sm font-medium text-gray-300 border border-gray-600/30">
                      {team.tag}
                    </span>
                  </div>
                  <p className="text-gray-400 font-medium">Region: {team.region}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 shadow-lg">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
                <h3 className="text-xs font-medium text-gray-400 uppercase tracking-widest">Win Rate</h3>
              </div>
              <p className={`text-2xl font-bold ${getWinRateColor(team.stats.winRate)}`}>
                {(team.stats.winRate * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 shadow-lg">
              <div className="flex items-center mb-2">
                <Target className="w-5 h-5 text-green-400 mr-2" />
                <h3 className="text-xs font-medium text-gray-400 uppercase tracking-widest">Match Record</h3>
              </div>
              <p className="text-2xl font-bold text-white">
                {team.stats.wins}-{team.stats.losses}
              </p>
              <p className="text-xs text-gray-400 mt-1">Wins-Losses</p>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 shadow-lg">
              <div className="flex items-center mb-2">
                <Award className="w-5 h-5 text-purple-400 mr-2" />
                <h3 className="text-xs font-medium text-gray-400 uppercase tracking-widest">Round Diff</h3>
              </div>
              <p className={`text-2xl font-bold ${team.stats.roundsWon > team.stats.roundsLost ? 'text-green-400' : 'text-red-400'}`}>
                {team.stats.roundsWon > team.stats.roundsLost ? '+' : ''}{team.stats.roundsWon - team.stats.roundsLost}
              </p>
              <p className="text-xs text-gray-400 mt-1">{team.stats.roundsWon}-{team.stats.roundsLost}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Line up - Full Width */}
      <section className="relative pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/2 to-transparent"></div>
        <div className="relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {/* Header */}
            <div className="mb-12">
                            <div className="mb-4">
                <h2 className="text-4xl font-bold text-white">Line up</h2>
              </div>
            </div>
            
            {/* Players */}
            {teamPlayers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {teamPlayers.map(player => {
                  const ratingColor = player.stats.rating > 1.1 
                    ? 'text-green-400' 
                    : player.stats.rating < 0.9 
                      ? 'text-red-400' 
                      : 'text-yellow-400';
                  
                  return (
                    <div key={player.id} className="group text-center hover:scale-105 transition-all duration-300">
                      {/* Player Image */}
                      <div className="relative mb-6">
                        <img
                          src={player.image}
                          alt={player.nickname}
                          className="w-32 h-32 object-cover mx-auto shadow-2xl transition-all duration-300"
                        />
                      </div>
                      
                      {/* Player Info */}
                      <div className="mb-6">
                        <Link 
                          to={`/players/${player.id}`}
                          className="text-white font-bold text-2xl hover:text-blue-400 transition-colors block mb-2"
                        >
                          {player.nickname}
                        </Link>
                        <p className="text-gray-400 text-base mb-2">{player.realName}</p>
                        <p className="text-blue-300 text-lg font-medium">{player.role}</p>
                      </div>
                      
                      {/* Stats - K/D and KOST */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">K/D</div>
                          <div className="text-2xl font-bold text-white">{player.stats.kdRatio.toFixed(1)}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">KOST</div>
                          <div className="text-2xl font-bold text-white">{(player.stats.kost * 100).toFixed(0)}%</div>
                        </div>
                      </div>
                      
                      {/* Social Media Links */}
                      <div className="flex justify-center space-x-4">
                        {player.socialMedia?.twitter && (
                          <a
                            href={player.socialMedia.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-gray-700/30 hover:bg-black/50 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                            title="Twitter/X"
                          >
                            <svg className="w-5 h-5 text-gray-300 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                          </a>
                        )}
                        {player.socialMedia?.twitch && (
                          <a
                            href={player.socialMedia.twitch}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-gray-700/30 hover:bg-purple-600/50 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                            title="Twitch"
                          >
                            <svg className="w-5 h-5 text-gray-300 hover:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                            </svg>
                          </a>
                        )}
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
      </section>

      {/* Recent Matches Section */}
      <section className="relative pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/3 to-transparent"></div>
        <div className="relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-600/30 overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600/10 to-green-500/5 p-6 border-b border-green-500/15">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-500/15 rounded-2xl flex items-center justify-center border border-green-500/20 mr-4">
                    <Activity className="w-6 h-6 text-green-300" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Recent Matches</h2>
                    <p className="text-green-200 text-sm font-medium">Latest 5 games</p>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {teamMatches.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamMatches.map(match => {
                      const opponent = teams.find(t => 
                        t.id === (match.teamOneId === id ? match.teamTwoId : match.teamOneId)
                      );
                      const isTeamOne = match.teamOneId === id;
                      const teamScore = isTeamOne ? match.teamOneScore : match.teamTwoScore;
                      const opponentScore = isTeamOne ? match.teamTwoScore : match.teamOneScore;
                      const won = teamScore > opponentScore;
                      
                      return (
                        <div key={match.id} className="bg-black/15 border border-gray-600/20 rounded-xl p-6 hover:border-gray-500/30 transition-all duration-300">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${
                                match.status === 'live' ? 'bg-red-400 animate-pulse' :
                                match.status === 'upcoming' ? 'bg-blue-400' : 
                                won ? 'bg-green-400' : 'bg-red-400'
                              }`}></div>
                              <span className="text-gray-300 text-sm font-medium capitalize">
                                {match.status === 'live' ? 'Live' : 
                                 match.status === 'upcoming' ? 'Upcoming' :
                                 won ? 'Victory' : 'Defeat'}
                              </span>
                            </div>
                            <span className="text-gray-400 text-xs">
                              {new Date(match.date).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="text-white font-medium">vs {opponent?.name || 'Unknown'}</p>
                              <p className="text-gray-400 text-sm">{opponent?.region}</p>
                            </div>
                            <div className="text-right">
                              <p className={`font-bold text-xl ${won ? 'text-green-400' : 'text-red-400'}`}>
                                {teamScore}-{opponentScore}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
        </div>
      </section>

      {/* Tournament Results Section - Full Width Below */}
      <section className="relative pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/3 to-transparent"></div>
        <div className="relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-600/30 overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600/10 to-purple-500/5 p-6 border-b border-purple-500/15">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-500/15 rounded-2xl flex items-center justify-center border border-purple-500/20 mr-4">
                    <Trophy className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Tournament Results</h2>
                    <p className="text-purple-200 text-sm font-medium">Competition history and placements</p>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {tournamentResults && tournamentResults.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-600/30">
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
                      <tbody className="divide-y divide-gray-600/20">
                        {tournamentResults.map((result, index) => (
                          <tr key={index} className="hover:bg-gray-700/20 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                {result.tournament && (
                                  <>
                                    <img 
                                      src={result.tournament.logo} 
                                      alt={result.tournament.name}
                                      className="w-10 h-10 rounded-lg mr-4 border border-gray-600/30"
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
        </div>
      </section>

      {/* Ex-Players Section - Full Width Below */}
      <section className="relative pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/3 to-transparent"></div>
        <div className="relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-600/30 overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-600/10 to-orange-500/5 p-6 border-b border-orange-500/15">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-500/15 rounded-2xl flex items-center justify-center border border-orange-500/20 mr-4">
                    <UserMinus className="w-6 h-6 text-orange-300" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Ex-Players</h2>
                    <p className="text-orange-200 text-sm font-medium">Former team members and their tenure</p>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {teamExPlayers && teamExPlayers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {teamExPlayers.map(player => {
                      const joinDate = new Date(player.joinDate);
                      const leaveDate = new Date(player.leaveDate);
                      const daysDiff = Math.floor((leaveDate.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24));
                      const monthsDiff = Math.floor(daysDiff / 30);
                      
                      const ratingColor = player.stats.rating > 1.1 
                        ? 'text-green-400' 
                        : player.stats.rating < 0.9 
                          ? 'text-red-400' 
                          : 'text-yellow-400';
                      
                      return (
                        <div key={player.id} className="bg-black/15 border border-orange-500/15 rounded-xl p-5 hover:border-orange-500/25 hover:bg-black/20 transition-all duration-300 group">
                          <div className="flex items-start space-x-4">
                            <img
                              src={player.image}
                              alt={player.nickname}
                              className="w-16 h-16 rounded-full object-cover border-2 border-gray-600/50 group-hover:border-orange-500/50 transition-colors"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h3 className="text-white font-semibold text-lg">{player.nickname}</h3>
                                  <p className="text-gray-400 text-sm">{player.realName}</p>
                                  <p className="text-orange-300 text-sm font-medium">{player.role}</p>
                                </div>
                                <div className="text-right">
                                  <div className={`text-lg font-bold ${ratingColor}`}>
                                    {player.stats.rating.toFixed(2)}
                                  </div>
                                  <div className="text-xs text-gray-400">Rating</div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-3 text-center mb-4">
                                <div>
                                  <div className="text-xs text-gray-400">K/D</div>
                                  <div className="text-sm font-medium text-white">{player.stats.kdRatio.toFixed(1)}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-400">KOST</div>
                                  <div className="text-sm font-medium text-white">{(player.stats.kost * 100).toFixed(0)}%</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-400">SRV</div>
                                  <div className="text-sm font-medium text-white">{(player.stats.srv * 100).toFixed(0)}%</div>
                                </div>
                              </div>
                              
                              <div className="border-t border-orange-500/15 pt-3">
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center text-gray-400">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>Joined: {joinDate.toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center text-gray-400">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>Left: {leaveDate.toLocaleDateString()}</span>
                                  </div>
                                </div>
                                <div className="mt-2 text-center">
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-500/15 text-orange-300 border border-orange-500/20">
                                    {monthsDiff > 0 ? `${monthsDiff} months` : `${daysDiff} days`} with team
                                  </span>
                                </div>
                              </div>
                              
                              {player.socialMedia?.twitter && (
                                <div className="mt-3 pt-3 border-t border-orange-500/15">
                                  <a 
                                    href={player.socialMedia.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-orange-300 hover:text-orange-200 transition-colors text-sm"
                                  >
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                    Follow on Twitter
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 space-y-4">
                    <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center">
                      <UserMinus className="w-8 h-8 text-orange-300" />
                    </div>
                    <div className="text-center">
                      <p className="text-gray-300 font-medium mb-1">No Ex-Players</p>
                      <p className="text-gray-500 text-sm">This team has no former players on record</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Stats Section - Full Width Below */}
      <section className="relative pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/3 to-transparent"></div>
        <div className="relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-600/30 overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600/10 to-green-500/5 p-6 border-b border-green-500/15">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-500/15 rounded-2xl flex items-center justify-center border border-green-500/20 mr-4">
                    <Map className="w-6 h-6 text-green-300" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Map Stats</h2>
                    <p className="text-green-200 text-sm font-medium">Map results from the past 3 months</p>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {team?.stats.mapStats && team.stats.mapStats.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {team.stats.mapStats.map((mapStat, index) => {
                      const winRateColor = mapStat.winRate >= 0.7 
                        ? 'text-green-400' 
                        : mapStat.winRate >= 0.4 
                          ? 'text-yellow-400' 
                          : 'text-red-400';
                      
                      const winRateBg = mapStat.winRate >= 0.7 
                        ? 'bg-green-500/20 border-green-500/30' 
                        : mapStat.winRate >= 0.4 
                          ? 'bg-yellow-500/20 border-yellow-500/30' 
                          : 'bg-red-500/20 border-red-500/30';
                      
                      return (
                        <div key={index} className="relative bg-black/20 rounded-2xl overflow-hidden border border-gray-600/30 hover:border-green-500/30 transition-all duration-300 group">
                          {/* Map Image Background */}
                          <div className="relative h-40 overflow-hidden">
                            <img 
                              src={mapStat.mapImage} 
                              alt={mapStat.mapName}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            
                            {/* Map Name */}
                            <div className="absolute bottom-4 left-4 right-4">
                              <h3 className="text-white font-bold text-lg mb-2">{mapStat.mapName}</h3>
                              
                              {/* Stats */}
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    {mapStat.plays}
                                  </span>
                                  <span className="text-gray-300 text-sm ml-2">
                                    play{mapStat.plays !== 1 ? 's' : ''}
                                  </span>
                                </div>
                                
                                <div className="flex items-center">
                                  <span className={`px-3 py-1 rounded-full text-sm font-bold border ${winRateBg} ${winRateColor}`}>
                                    {Math.round(mapStat.winRate * 100)}%
                                  </span>
                                  <span className="text-gray-300 text-sm ml-2">winrate</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Detailed Stats on Hover */}
                          <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="text-center text-white space-y-3">
                              <h3 className="text-xl font-bold">{mapStat.mapName}</h3>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center min-w-[120px]">
                                  <span className="text-gray-300">Plays:</span>
                                  <span className="font-bold">{mapStat.plays}</span>
                                </div>
                                <div className="flex justify-between items-center min-w-[120px]">
                                  <span className="text-gray-300">Wins:</span>
                                  <span className="font-bold text-green-400">{mapStat.wins}</span>
                                </div>
                                <div className="flex justify-between items-center min-w-[120px]">
                                  <span className="text-gray-300">Losses:</span>
                                  <span className="font-bold text-red-400">{mapStat.losses}</span>
                                </div>
                                <div className="flex justify-between items-center min-w-[120px]">
                                  <span className="text-gray-300">Win Rate:</span>
                                  <span className={`font-bold ${winRateColor}`}>
                                    {Math.round(mapStat.winRate * 100)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 space-y-4">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Map className="w-8 h-8 text-green-300" />
                    </div>
                    <div className="text-center">
                      <p className="text-gray-300 font-medium mb-1">No Map Statistics</p>
                      <p className="text-gray-500 text-sm">No map data available for this team</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamDetails;