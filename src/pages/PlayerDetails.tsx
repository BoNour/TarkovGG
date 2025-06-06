import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGameData } from '../context/GameDataContext';
import StatCard from '../components/ui/StatCard';
import { ArrowLeft, Twitter } from 'lucide-react';

const PlayerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { players, teams, matches, isLoading } = useGameData();
  
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

  if (!player) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Player not found</h1>
          <p className="text-gray-400 mb-8">The player you're looking for doesn't exist or has been removed.</p>
          <Link to="/players" className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md font-medium transition">
            Back to Players
          </Link>
        </div>
      </div>
    );
  }

  // Format KD ratio with colors
  const kdRatioColor = player.stats.kdRatio >= 1.1 
    ? 'success' 
    : player.stats.kdRatio < 0.9 
      ? 'danger' 
      : 'warning';

  // Format KOST with colors
  const kostColor = player.stats.kost >= 0.7 
    ? 'success' 
    : player.stats.kost < 0.6 
      ? 'danger' 
      : 'warning';

  // Format rating with colors
  const ratingColor = player.stats.rating >= 1.1 
    ? 'success' 
    : player.stats.rating < 0.9 
      ? 'danger' 
      : 'warning';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/players" className="inline-flex items-center text-gray-400 hover:text-white transition">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Players
          </Link>
        </div>
        
        {/* Player header */}
        <div className="bg-gray-800 rounded-lg overflow-hidden mb-8">
          <div className="relative h-40 bg-gradient-to-r from-gray-900 to-gray-700">
            <div className="absolute inset-0 opacity-20 bg-pattern"></div>
            {team && (
              <div className="absolute top-4 right-4">
                <Link to={`/teams/${team.id}`}>
                  <img 
                    src={team.logo} 
                    alt={team.name} 
                    className="h-16 w-16 rounded-full border-2 border-gray-800"
                  />
                </Link>
              </div>
            )}
          </div>
          
          <div className="relative px-6 py-4">
            <div className="flex flex-col md:flex-row items-start md:items-end">
              <div className="relative -mt-20 mb-4 md:mb-0 md:mr-6">
                <img 
                  src={player.image} 
                  alt={player.nickname} 
                  className="w-24 h-24 rounded-full border-4 border-gray-800"
                />
              </div>
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold">{player.nickname}</h1>
                  <div className="flex items-center">
                    <img 
                      src={`https://flagcdn.com/w20/${player.nationality.toLowerCase()}.png`}
                      alt={player.nationality}
                      className="h-4 mr-2"
                    />
                    <span className="text-gray-400">{player.nationality}</span>
                  </div>
                </div>
                <p className="text-gray-400">{player.realName}</p>
              </div>
              <div className="mt-4 md:mt-0">
                {player.socialMedia?.twitter && (
                  <a 
                    href={player.socialMedia.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                  >
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 px-6 py-4">
            <div className="flex flex-wrap">
              <div className="mr-8">
                <p className="text-sm text-gray-400">Team</p>
                {team ? (
                  <Link to={`/teams/${team.id}`} className="text-white hover:text-gray-300 transition">
                    {team.name}
                  </Link>
                ) : (
                  <span className="text-gray-500">No team</span>
                )}
              </div>
              <div className="mr-8">
                <p className="text-sm text-gray-400">Role</p>
                <p>{player.role}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Statistics */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard 
              title="Rating" 
              value={player.stats.rating.toFixed(2)} 
              color={ratingColor}
              size="lg"
            />
            <StatCard 
              title="K/D Ratio" 
              value={player.stats.kdRatio.toFixed(2)} 
              color={kdRatioColor}
              size="lg"
            />
            <StatCard 
              title="KOST" 
              value={`${(player.stats.kost * 100).toFixed(0)}%`} 
              color={kostColor}
              size="lg"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            <StatCard 
              title="Entry" 
              value={player.stats.entryRatio} 
            />
            <StatCard 
              title="KPR" 
              value={player.stats.kpr.toFixed(2)} 
            />
            <StatCard 
              title="SRV" 
              value={`${(player.stats.srv * 100).toFixed(0)}%`} 
            />
            <StatCard 
              title="Plants" 
              value={player.stats.plants} 
            />
            <StatCard 
              title="Headshots" 
              value={player.stats.headshots} 
            />
            <StatCard 
              title="Attack %" 
              value={`${player.stats.attack}%`} 
            />
            <StatCard 
              title="Defense %" 
              value={`${player.stats.defense}%`} 
            />
          </div>

          {/* Recent Matches */}
          <h2 className="text-2xl font-bold mb-6">Recent Matches</h2>
          
          {playerMatches.length > 0 ? (
            <div className="space-y-4">
              {playerMatches.map(match => {
                const isTeamOne = match.teamOneId === player.teamId;
                const playerTeam = teams.find(t => t.id === player.teamId);
                const opposingTeam = teams.find(t => 
                  t.id === (isTeamOne ? match.teamTwoId : match.teamOneId)
                );
                const playerTeamScore = isTeamOne ? match.teamOneScore : match.teamTwoScore;
                const opposingTeamScore = isTeamOne ? match.teamTwoScore : match.teamOneScore;
                const isWin = playerTeamScore > opposingTeamScore;
                const isDraw = playerTeamScore === opposingTeamScore;
                const isLoss = playerTeamScore < opposingTeamScore;
                
                const resultBg = isWin 
                  ? 'bg-green-500' 
                  : isDraw 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500';
                
                const resultText = isWin 
                  ? 'WIN' 
                  : isDraw 
                    ? 'DRAW' 
                    : 'LOSS';
                
                return (
                  <div key={match.id} className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="flex items-center p-4">
                      <div className="flex-shrink-0 mr-4">
                        <div className={`${resultBg} w-16 h-16 rounded-full flex items-center justify-center font-bold`}>
                          {resultText}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {playerTeam && (
                              <img 
                                src={playerTeam.logo} 
                                alt={playerTeam.name} 
                                className="w-8 h-8 rounded-full mr-2"
                              />
                            )}
                            <span className="font-medium">{playerTeam?.name}</span>
                            <span className="mx-2 text-gray-400">vs</span>
                            {opposingTeam && (
                              <img 
                                src={opposingTeam.logo} 
                                alt={opposingTeam.name} 
                                className="w-8 h-8 rounded-full mr-2"
                              />
                            )}
                            <span className="font-medium">{opposingTeam?.name}</span>
                          </div>
                          <div className="text-xl font-bold">
                            {playerTeamScore} - {opposingTeamScore}
                          </div>
                        </div>
                        <div className="text-sm text-gray-400">
                          {new Date(match.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <Link 
                          to={`/matches/${match.id}`}
                          className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400">No matches found for this player.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;