import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGameData } from '../context/GameDataContext';
import StatCard from '../components/ui/StatCard';
import PlayerCard from '../components/ui/PlayerCard';
import MatchCard from '../components/ui/MatchCard';
import { ArrowLeft } from 'lucide-react';

const TeamDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { teams, players, matches, tournaments, isLoading } = useGameData();
  const [activeTab, setActiveTab] = useState<'overview' | 'matches' | 'players'>('overview');
  
  // Find the team
  const team = teams.find(t => t.id === id);
  
  // Get team players
  const teamPlayers = players.filter(p => team?.players.includes(p.id));
  
  // Get team matches
  const teamMatches = matches.filter(match => 
    match.teamOneId === id || match.teamTwoId === id
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-10 w-48 bg-gray-700 rounded mb-8"></div>
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <div className="h-32 bg-gray-700 rounded mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-24 bg-gray-700 rounded"></div>
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Team not found</h1>
          <p className="text-gray-400 mb-8">The team you're looking for doesn't exist or has been removed.</p>
          <Link to="/teams" className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md font-medium transition">
            Back to Teams
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/teams" className="inline-flex items-center text-gray-400 hover:text-white transition">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Teams
          </Link>
        </div>
        
        {/* Team header */}
        <div className="bg-gray-800 rounded-lg overflow-hidden mb-8">
          <div className="relative h-40 bg-gradient-to-r from-gray-900 to-gray-700">
            <div className="absolute inset-0 opacity-20 bg-pattern"></div>
          </div>
          
          <div className="relative px-6 py-4">
            <div className="flex flex-col md:flex-row items-start md:items-end">
              <div className="relative -mt-20 mb-4 md:mb-0 md:mr-6">
                <img 
                  src={team.logo} 
                  alt={team.name} 
                  className="w-24 h-24 rounded-full border-4 border-gray-800"
                />
              </div>
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold">{team.name}</h1>
                  <span className="bg-gray-700 px-2 py-1 rounded text-sm">
                    {team.tag}
                  </span>
                </div>
                <p className="text-gray-400">Region: {team.region}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Win Rate" 
            value={`${(team.stats.winRate * 100).toFixed(0)}%`}
            color={team.stats.winRate >= 0.6 ? 'success' : team.stats.winRate < 0.4 ? 'danger' : 'warning'}
            size="lg"
          />
          <StatCard 
            title="Match Record" 
            value={`${team.stats.wins}-${team.stats.losses}`}
            subtitle="Wins-Losses"
            size="lg"
          />
          <StatCard 
            title="Round Differential" 
            value={team.stats.roundsWon - team.stats.roundsLost}
            subtitle={`${team.stats.roundsWon}-${team.stats.roundsLost}`}
            color={team.stats.roundsWon > team.stats.roundsLost ? 'success' : 'danger'}
            size="lg"
          />
        </div>
        
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-700">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-red-500 text-red-500'
                    : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('players')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'players'
                    ? 'border-red-500 text-red-500'
                    : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                Players
              </button>
              <button
                onClick={() => setActiveTab('matches')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'matches'
                    ? 'border-red-500 text-red-500'
                    : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                Matches
              </button>
            </nav>
          </div>
        </div>
        
        {/* Tab content */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Tournament Results</h2>
            
            <div className="bg-gray-800 rounded-lg overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-900">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Tournament
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Placement
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {tournamentResults?.map((result, index) => (
                      <tr key={index} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {result.tournament && (
                              <>
                                <img 
                                  src={result.tournament.logo} 
                                  alt={result.tournament.name}
                                  className="w-8 h-8 rounded mr-3"
                                />
                                <Link 
                                  to={`/tournaments/${result.tournament.id}`}
                                  className="text-white hover:text-gray-300 transition"
                                >
                                  {result.tournament.name}
                                </Link>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                          {result.tournament && new Date(result.tournament.endDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-sm ${
                            result.placement === 1 
                              ? 'bg-yellow-500 text-black' 
                              : result.placement === 2 
                                ? 'bg-gray-400 text-black'
                                : result.placement === 3 
                                  ? 'bg-yellow-700 text-white'
                                  : 'bg-gray-700 text-white'
                          }`}>
                            {result.placement}
                            {result.placement === 1 ? 'st' : result.placement === 2 ? 'nd' : result.placement === 3 ? 'rd' : 'th'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'players' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Current Roster</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teamPlayers.map(player => (
                <PlayerCard key={player.id} player={player} variant="full" />
              ))}
            </div>
            
            {teamPlayers.length === 0 && (
              <p className="text-gray-400">No players currently on the roster.</p>
            )}
          </div>
        )}
        
        {activeTab === 'matches' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Matches</h2>
            
            <div className="space-y-6">
              {teamMatches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
            
            {teamMatches.length === 0 && (
              <p className="text-gray-400">No matches found for this team.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamDetails;