import React from 'react';
import { useGameData } from '../context/GameDataContext';

const Stats: React.FC = () => {
  const { players, teams, matches, isLoading, error } = useGameData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Loading CSV data...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error loading data:</div>
          <div className="text-white">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Live Tarkov Stats
          </h1>
          <p className="text-xl text-gray-400">
            Real data from CSV files • {players.length} players • {teams.length} teams • {matches.length} matches
          </p>
        </div>

        {/* Top Teams */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Teams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div key={team.id} className="bg-[#242424] rounded-lg p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <img src={team.logo} alt={team.name} className="w-12 h-12 rounded mr-4" />
                  <div>
                    <h3 className="text-white font-bold text-lg">{team.name}</h3>
                    <p className="text-gray-400">{team.tag}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Win Rate:</span>
                    <span className="text-green-400 ml-2">{(team.stats.winRate * 100).toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Wins:</span>
                    <span className="text-white ml-2">{team.stats.wins}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Losses:</span>
                    <span className="text-white ml-2">{team.stats.losses}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Rounds:</span>
                    <span className="text-white ml-2">{team.stats.roundsWon}/{team.stats.roundsPlayed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Matches */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Recent Matches</h2>
          <div className="space-y-4">
            {matches.slice(0, 10).map((match) => {
              const teamOne = teams.find(t => t.id === match.teamOneId);
              const teamTwo = teams.find(t => t.id === match.teamTwoId);
              
              return (
                <div key={match.id} className="bg-[#242424] rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <img src={teamOne?.logo} alt={teamOne?.name} className="w-8 h-8 rounded" />
                        <span className="text-white font-medium">{teamOne?.name || 'Unknown'}</span>
                      </div>
                      <div className="text-lg font-bold text-white">
                        {match.teamOneScore} - {match.teamTwoScore}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-white font-medium">{teamTwo?.name || 'Unknown'}</span>
                        <img src={teamTwo?.logo} alt={teamTwo?.name} className="w-8 h-8 rounded" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        match.status === 'live' ? 'bg-red-500 text-white' :
                        match.status === 'upcoming' ? 'bg-blue-500 text-white' :
                        'bg-green-500 text-white'
                      }`}>
                        {match.status.toUpperCase()}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {new Date(match.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {match.maps.length > 0 && (
                    <div className="mt-2 text-gray-400 text-sm">
                      Map: {match.maps[0].name} ({match.maps[0].teamOneScore}-{match.maps[0].teamTwoScore})
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Players */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Players</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-[#242424] rounded-lg">
              <thead className="bg-[#333] border-b border-gray-700">
                <tr>
                  <th className="text-left py-4 px-6 text-white font-bold">Player</th>
                  <th className="text-left py-4 px-6 text-white font-bold">Team</th>
                  <th className="text-left py-4 px-6 text-white font-bold">K/D</th>
                  <th className="text-left py-4 px-6 text-white font-bold">KPR</th>
                  <th className="text-left py-4 px-6 text-white font-bold">Entry Ratio</th>
                  <th className="text-left py-4 px-6 text-white font-bold">Attack%</th>
                  <th className="text-left py-4 px-6 text-white font-bold">Defense%</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => {
                  const team = teams.find(t => t.id === player.teamId);
                  return (
                    <tr key={player.id} className={index % 2 === 0 ? 'bg-[#242424]' : 'bg-[#2a2a2a]'}>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <img src={player.image} alt={player.nickname} className="w-8 h-8 rounded-full mr-3" />
                          <span className="text-white font-medium">{player.nickname}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-300">{team?.name || 'No Team'}</td>
                      <td className="py-4 px-6 text-white">{player.stats.kdRatio.toFixed(2)}</td>
                      <td className="py-4 px-6 text-white">{player.stats.kpr.toFixed(2)}</td>
                      <td className="py-4 px-6 text-white">{player.stats.entryRatio}</td>
                      <td className="py-4 px-6 text-white">{player.stats.attack.toFixed(0)}%</td>
                      <td className="py-4 px-6 text-white">{player.stats.defense.toFixed(0)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6">
          <h3 className="text-white font-bold mb-4">Debug Info</h3>
          <div className="text-gray-300 text-sm space-y-2">
            <div>Total Players: {players.length}</div>
            <div>Total Teams: {teams.length}</div>
            <div>Total Matches: {matches.length}</div>
            <div>Live Matches: {matches.filter(m => m.status === 'live').length}</div>
            <div>Upcoming Matches: {matches.filter(m => m.status === 'upcoming').length}</div>
            <div>Completed Matches: {matches.filter(m => m.status === 'completed').length}</div>
            <div>CSV Data Source: Tarkov.GG Stats</div>
            <div>Last Updated: {new Date().toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats; 