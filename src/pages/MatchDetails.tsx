import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGameData } from '../context/GameDataContext';
import { ArrowLeft } from 'lucide-react';
import StatCard from '../components/ui/StatCard';

const MatchDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { matches, teams, players, isLoading } = useGameData();
  
  // Find the match
  const match = matches.find(m => m.id === id);
  
  // Get teams
  const teamOne = match ? teams.find(t => t.id === match.teamOneId) : undefined;
  const teamTwo = match ? teams.find(t => t.id === match.teamTwoId) : undefined;
  
  // Get team players
  const teamOnePlayers = players.filter(p => p.teamId === match?.teamOneId);
  const teamTwoPlayers = players.filter(p => p.teamId === match?.teamTwoId);

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

  if (!match || !teamOne || !teamTwo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Match not found</h1>
          <p className="text-gray-400 mb-8">The match you're looking for doesn't exist or has been removed.</p>
          <Link to="/matches" className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md font-medium transition">
            Back to Matches
          </Link>
        </div>
      </div>
    );
  }

  const isLive = match.status === 'live';
  const isCompleted = match.status === 'completed';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/matches" className="inline-flex items-center text-gray-400 hover:text-white transition">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Matches
          </Link>
        </div>
        
        {/* Match header */}
        <div className="bg-gray-800 rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Team One */}
              <div className="flex-1 text-center md:text-right">
                <Link to={`/teams/${teamOne.id}`} className="inline-block">
                  <img 
                    src={teamOne.logo} 
                    alt={teamOne.name}
                    className="w-24 h-24 rounded-full mx-auto md:ml-auto md:mr-0"
                  />
                  <h2 className="text-2xl font-bold mt-2">{teamOne.name}</h2>
                  <p className="text-gray-400">{teamOne.tag}</p>
                </Link>
              </div>
              
              {/* Score */}
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold space-x-4">
                  <span className={match.teamOneScore > match.teamTwoScore ? 'text-green-500' : 'text-gray-400'}>
                    {match.teamOneScore}
                  </span>
                  <span className="text-gray-600">:</span>
                  <span className={match.teamTwoScore > match.teamOneScore ? 'text-green-500' : 'text-gray-400'}>
                    {match.teamTwoScore}
                  </span>
                </div>
                <div className="mt-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    isLive 
                      ? 'bg-red-500 text-white' 
                      : isCompleted
                        ? 'bg-gray-600 text-white'
                        : 'bg-yellow-500 text-black'
                  }`}>
                    {match.status.toUpperCase()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  {new Date(match.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              
              {/* Team Two */}
              <div className="flex-1 text-center md:text-left">
                <Link to={`/teams/${teamTwo.id}`} className="inline-block">
                  <img 
                    src={teamTwo.logo} 
                    alt={teamTwo.name}
                    className="w-24 h-24 rounded-full mx-auto md:mr-auto md:ml-0"
                  />
                  <h2 className="text-2xl font-bold mt-2">{teamTwo.name}</h2>
                  <p className="text-gray-400">{teamTwo.tag}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Overview Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Overview</h2>
          
          {/* Maps */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Maps</h3>
            <div className="space-y-4">
              {match.maps.map((map, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-lg font-medium">{map.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={map.teamOneScore > map.teamTwoScore ? 'text-green-500' : 'text-gray-400'}>
                      {map.teamOneScore}
                    </span>
                    <span className="text-gray-600">:</span>
                    <span className={map.teamTwoScore > map.teamOneScore ? 'text-green-500' : 'text-gray-400'}>
                      {map.teamTwoScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Player Stats */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Player Statistics</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-400">
                    <th className="px-4 py-2">Player</th>
                    <th className="px-4 py-2">Rating</th>
                    <th className="px-4 py-2">K</th>
                    <th className="px-4 py-2">D</th>
                    <th className="px-4 py-2">A</th>
                    <th className="px-4 py-2">+/-</th>
                    <th className="px-4 py-2">KOST</th>
                    <th className="px-4 py-2">HS%</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {/* Team One Players */}
                  <tr>
                    <td colSpan={8} className="px-4 py-2 bg-gray-700/30">
                      <div className="flex items-center">
                        <img 
                          src={teamOne.logo} 
                          alt={teamOne.name} 
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        {teamOne.name}
                      </div>
                    </td>
                  </tr>
                  {teamOnePlayers.map(player => (
                    <tr key={player.id} className="hover:bg-gray-700/30">
                      <td className="px-4 py-2">
                        <Link 
                          to={`/players/${player.id}`}
                          className="flex items-center hover:text-red-500 transition"
                        >
                          <img 
                            src={player.image} 
                            alt={player.nickname}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <div>
                            <div className="font-medium">{player.nickname}</div>
                            <div className="text-sm text-gray-400">{player.realName}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-2">
                        <span className={
                          player.stats.rating >= 1.1 
                            ? 'text-green-500' 
                            : player.stats.rating < 0.9 
                              ? 'text-red-500' 
                              : 'text-yellow-500'
                        }>
                          {player.stats.rating.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-2">{player.stats.kpr}</td>
                      <td className="px-4 py-2">{player.stats.srv}</td>
                      <td className="px-4 py-2">{player.stats.plants}</td>
                      <td className="px-4 py-2">{player.stats.headshots}</td>
                      <td className="px-4 py-2">{(player.stats.kost * 100).toFixed(0)}%</td>
                      <td className="px-4 py-2">{player.stats.attack}%</td>
                    </tr>
                  ))}
                  
                  {/* Team Two Players */}
                  <tr>
                    <td colSpan={8} className="px-4 py-2 bg-gray-700/30">
                      <div className="flex items-center">
                        <img 
                          src={teamTwo.logo} 
                          alt={teamTwo.name} 
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        {teamTwo.name}
                      </div>
                    </td>
                  </tr>
                  {teamTwoPlayers.map(player => (
                    <tr key={player.id} className="hover:bg-gray-700/30">
                      <td className="px-4 py-2">
                        <Link 
                          to={`/players/${player.id}`}
                          className="flex items-center hover:text-red-500 transition"
                        >
                          <img 
                            src={player.image} 
                            alt={player.nickname}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <div>
                            <div className="font-medium">{player.nickname}</div>
                            <div className="text-sm text-gray-400">{player.realName}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-2">
                        <span className={
                          player.stats.rating >= 1.1 
                            ? 'text-green-500' 
                            : player.stats.rating < 0.9 
                              ? 'text-red-500' 
                              : 'text-yellow-500'
                        }>
                          {player.stats.rating.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-2">{player.stats.kpr}</td>
                      <td className="px-4 py-2">{player.stats.srv}</td>
                      <td className="px-4 py-2">{player.stats.plants}</td>
                      <td className="px-4 py-2">{player.stats.headshots}</td>
                      <td className="px-4 py-2">{(player.stats.kost * 100).toFixed(0)}%</td>
                      <td className="px-4 py-2">{player.stats.attack}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Performance Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Performance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Team One Performance */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={teamOne.logo} 
                  alt={teamOne.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <h3 className="text-xl font-bold">{teamOne.name}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <StatCard 
                  title="Win Rate" 
                  value={`${(teamOne.stats.winRate * 100).toFixed(0)}%`}
                  color={teamOne.stats.winRate > 0.5 ? 'success' : 'danger'}
                />
                <StatCard 
                  title="Round Win Rate" 
                  value={`${((teamOne.stats.roundsWon / (teamOne.stats.roundsWon + teamOne.stats.roundsLost)) * 100).toFixed(0)}%`}
                />
              </div>
            </div>
            
            {/* Team Two Performance */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={teamTwo.logo} 
                  alt={teamTwo.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <h3 className="text-xl font-bold">{teamTwo.name}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <StatCard 
                  title="Win Rate" 
                  value={`${(teamTwo.stats.winRate * 100).toFixed(0)}%`}
                  color={teamTwo.stats.winRate > 0.5 ? 'success' : 'danger'}
                />
                <StatCard 
                  title="Round Win Rate" 
                  value={`${((teamTwo.stats.roundsWon / (teamTwo.stats.roundsWon + teamTwo.stats.roundsLost)) * 100).toFixed(0)}%`}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Economy Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Economy</h2>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Team One Economy */}
              <div>
                <div className="flex items-center mb-4">
                  <img 
                    src={teamOne.logo} 
                    alt={teamOne.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <h4 className="text-lg font-bold">{teamOne.name}</h4>
                </div>
                {/* Add economy stats here */}
              </div>
              
              {/* Team Two Economy */}
              <div>
                <div className="flex items-center mb-4">
                  <img 
                    src={teamTwo.logo} 
                    alt={teamTwo.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <h4 className="text-lg font-bold">{teamTwo.name}</h4>
                </div>
                {/* Add economy stats here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;