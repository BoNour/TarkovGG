import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowUpDown, ChevronUp, ChevronDown, Upload, Download, BarChart3, PieChart, TrendingUp } from 'lucide-react';

interface MatchRecord {
  gameId: string;
  date: string;
  playerName: string;
  team: string;
  vs: string;
  kills: number;
  deaths: number;
  assists: number;
  bp: number;
  bd: number;
  rWin: number;
  rLoss: number;
  gWin: number;
  gLoss: number;
  map: string;
}

interface TarkovPlayer {
  player: string;
  team: string;
  totalKills: number;
  totalDeaths: number;
  totalAssists: number;
  totalBP: number;
  totalBD: number;
  totalRoundsWon: number;
  totalRoundsLost: number;
  totalGamesWon: number;
  totalGamesLost: number;
  gamesPlayed: number;
  kd: number;
  kpr: number;
  adr: number; // Assists/Deaths Ratio
  winRate: number;
  rating: number;
}

type SortField = 'player' | 'team' | 'totalKills' | 'totalDeaths' | 'kd' | 'kpr' | 'winRate' | 'rating';
type SortDirection = 'asc' | 'desc';
type ViewMode = 'table' | 'cards' | 'charts';

const Players: React.FC = () => {
  const [players, setPlayers] = useState<TarkovPlayer[]>([]);
  const [matchRecords, setMatchRecords] = useState<MatchRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeam, setFilterTeam] = useState('');
  const [sortField, setSortField] = useState<SortField>('rating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to load CSV file
      const csvResponse = await fetch('/Ratings.csv');
      if (!csvResponse.ok) {
        throw new Error(`Failed to fetch CSV file: ${csvResponse.status}`);
      }
      
      const csvText = await csvResponse.text();
      const records = parseCSV(csvText);
      setMatchRecords(records);
      
      // Aggregate player statistics
      const aggregatedPlayers = aggregatePlayerStats(records);
      setPlayers(aggregatedPlayers);
      
    } catch (err) {
      setError('Failed to load player statistics');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const parseCSV = (csvText: string): MatchRecord[] => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        gameId: values[0] || '',
        date: values[1] || '',
        playerName: values[2] || '',
        team: values[3] || '',
        vs: values[4] || '',
        kills: parseInt(values[5]) || 0,
        deaths: parseInt(values[6]) || 0,
        assists: parseInt(values[7]) || 0,
        bp: parseInt(values[8]) || 0,
        bd: parseInt(values[9]) || 0,
        rWin: parseInt(values[10]) || 0,
        rLoss: parseInt(values[11]) || 0,
        gWin: parseInt(values[12]) || 0,
        gLoss: parseInt(values[13]) || 0,
        map: values[14] || '',
      };
    }).filter(record => record.playerName); // Filter out empty records
  };

  const aggregatePlayerStats = (records: MatchRecord[]): TarkovPlayer[] => {
    const playerMap = new Map<string, TarkovPlayer>();

    records.forEach(record => {
      const key = `${record.playerName}-${record.team}`;
      
      if (!playerMap.has(key)) {
        playerMap.set(key, {
          player: record.playerName,
          team: record.team,
          totalKills: 0,
          totalDeaths: 0,
          totalAssists: 0,
          totalBP: 0,
          totalBD: 0,
          totalRoundsWon: 0,
          totalRoundsLost: 0,
          totalGamesWon: 0,
          totalGamesLost: 0,
          gamesPlayed: 0,
          kd: 0,
          kpr: 0,
          adr: 0,
          winRate: 0,
          rating: 0,
        });
      }

      const player = playerMap.get(key)!;
      player.totalKills += record.kills;
      player.totalDeaths += record.deaths;
      player.totalAssists += record.assists;
      player.totalBP += record.bp;
      player.totalBD += record.bd;
      player.totalRoundsWon += record.rWin;
      player.totalRoundsLost += record.rLoss;
      player.totalGamesWon += record.gWin;
      player.totalGamesLost += record.gLoss;
      player.gamesPlayed += 1;
    });

    // Calculate derived statistics
    return Array.from(playerMap.values()).map(player => {
      player.kd = player.totalDeaths > 0 ? player.totalKills / player.totalDeaths : player.totalKills;
      player.kpr = player.gamesPlayed > 0 ? player.totalKills / player.gamesPlayed : 0;
      player.adr = player.totalDeaths > 0 ? player.totalAssists / player.totalDeaths : player.totalAssists;
      
      const totalGames = player.totalGamesWon + player.totalGamesLost;
      player.winRate = totalGames > 0 ? (player.totalGamesWon / totalGames) * 100 : 0;
      
      // Calculate a simple rating based on K/D, KPR, and win rate
      player.rating = (player.kd * 0.4) + (player.kpr * 0.3) + (player.winRate / 100 * 0.3);
      
      return player;
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const text = await file.text();
      const records = parseCSV(text);
      setMatchRecords(records);
      
      const aggregatedPlayers = aggregatePlayerStats(records);
      setPlayers(aggregatedPlayers);
      setError(null);
    } catch (err) {
      setError('Failed to parse CSV file');
      console.error('Error parsing CSV:', err);
    } finally {
      setLoading(false);
    }
  };

  const exportToJSON = () => {
    const exportData = {
      players,
      matchRecords,
      summary: {
        totalPlayers: players.length,
        totalTeams: uniqueTeams.length,
        totalMatches: new Set(matchRecords.map(r => r.gameId)).size,
        totalMaps: new Set(matchRecords.map(r => r.map)).size,
      }
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'tarkov-tournament-stats.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Get unique teams
  const uniqueTeams = Array.from(new Set(players.map(p => p.team))).filter(Boolean);

  // Filter players
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.player.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = filterTeam === '' || player.team === filterTeam;
    return matchesSearch && matchesTeam;
  });

  // Sort players
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    if (sortField === 'player' || sortField === 'team') {
      return direction * a[sortField].localeCompare(b[sortField]);
    }
    return direction * (a[sortField] - b[sortField]);
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

  const getRatingColor = (rating: number) => {
    if (rating >= 1.2) return 'text-green-500';
    if (rating >= 0.8) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRatingBadge = (rating: number) => {
    if (rating >= 1.2) return 'bg-green-600';
    if (rating >= 1.0) return 'bg-blue-600';
    if (rating >= 0.8) return 'bg-yellow-600';
    if (rating >= 0.6) return 'bg-orange-600';
    return 'bg-red-600';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-10 w-64 bg-gray-700 rounded mb-8"></div>
          <div className="h-16 bg-gray-700 rounded mb-8"></div>
          <div className="h-96 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-900 border border-red-700 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Data</h2>
          <p className="text-red-300 mb-4">{error}</p>
          <button 
            onClick={loadData}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Players</h1>
        <div className="flex space-x-4">
          <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer transition flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            Upload CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <button
            onClick={exportToJSON}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Total Players</h3>
          <p className="text-3xl font-bold text-white">{players.length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Total Teams</h3>
          <p className="text-3xl font-bold text-white">{uniqueTeams.length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Total Matches</h3>
          <p className="text-3xl font-bold text-white">{new Set(matchRecords.map(r => r.gameId)).size}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Average Rating</h3>
          <p className="text-3xl font-bold text-white">
            {players.length > 0 ? (players.reduce((sum, p) => sum + p.rating, 0) / players.length).toFixed(2) : '0.00'}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Top K/D</h3>
          <p className="text-3xl font-bold text-white">
            {players.length > 0 ? Math.max(...players.map(p => p.kd)).toFixed(2) : '0.00'}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 rounded-lg p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search players or teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          {/* Team filter */}
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <select
              value={filterTeam}
              onChange={(e) => setFilterTeam(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">All Teams</option>
              {uniqueTeams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>

          {/* View Mode */}
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-2 rounded-md transition ${viewMode === 'table' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-2 rounded-md transition ${viewMode === 'cards' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('charts')}
              className={`px-3 py-2 rounded-md transition ${viewMode === 'charts' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Charts
            </button>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-end">
            <span className="text-gray-400">
              Showing {sortedPlayers.length} of {players.length} players
            </span>
          </div>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr className="bg-gray-900">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1 hover:text-white"
                      onClick={() => handleSort('player')}
                    >
                      <span>Player</span>
                      <SortIcon field="player" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1 hover:text-white"
                      onClick={() => handleSort('team')}
                    >
                      <span>Team</span>
                      <SortIcon field="team" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1 hover:text-white"
                      onClick={() => handleSort('totalKills')}
                    >
                      <span>Kills</span>
                      <SortIcon field="totalKills" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1 hover:text-white"
                      onClick={() => handleSort('totalDeaths')}
                    >
                      <span>Deaths</span>
                      <SortIcon field="totalDeaths" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Games</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1 hover:text-white"
                      onClick={() => handleSort('kd')}
                    >
                      <span>K/D</span>
                      <SortIcon field="kd" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1 hover:text-white"
                      onClick={() => handleSort('kpr')}
                    >
                      <span>KPR</span>
                      <SortIcon field="kpr" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1 hover:text-white"
                      onClick={() => handleSort('winRate')}
                    >
                      <span>Win Rate</span>
                      <SortIcon field="winRate" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1 hover:text-white"
                      onClick={() => handleSort('rating')}
                    >
                      <span>Rating</span>
                      <SortIcon field="rating" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {sortedPlayers.map((player, index) => (
                  <tr key={`${player.player}-${index}`} className="hover:bg-gray-700 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${getRatingBadge(player.rating)}`}></div>
                        <span className="font-medium text-white">{player.player}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-300 font-medium">{player.team}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300 font-mono">
                      {player.totalKills}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300 font-mono">
                      {player.totalDeaths}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300 font-mono">
                      {player.gamesPlayed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono">
                      <span className={player.kd >= 1.5 ? 'text-green-500' : player.kd >= 1.0 ? 'text-yellow-500' : 'text-red-500'}>
                        {player.kd.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300 font-mono">
                      {player.kpr.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300 font-mono">
                      {player.winRate.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono">
                      <span className={`font-bold ${getRatingColor(player.rating)}`}>
                        {player.rating.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cards View */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPlayers.map((player, index) => (
            <div key={`${player.player}-${index}`} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{player.player}</h3>
                  <p className="text-gray-400">{player.team}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${getRatingBadge(player.rating)} text-white`}>
                  {player.rating.toFixed(2)}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Total Kills</p>
                  <p className="text-white font-bold text-lg">{player.totalKills}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Deaths</p>
                  <p className="text-white font-bold text-lg">{player.totalDeaths}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">K/D Ratio</p>
                  <p className={`font-bold text-lg ${player.kd >= 1.5 ? 'text-green-500' : player.kd >= 1.0 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {player.kd.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Win Rate</p>
                  <p className="text-white font-bold text-lg">{player.winRate.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Games Played</p>
                  <p className="text-white font-bold text-lg">{player.gamesPlayed}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">KPR</p>
                  <p className="text-white font-bold text-lg">{player.kpr.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Charts View */}
      {viewMode === 'charts' && (
        <div className="space-y-8">
          {/* Top performers by rating */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Top 10 Players by Rating
            </h3>
            <div className="space-y-3">
              {sortedPlayers.slice(0, 10).map((player, index) => (
                <div key={`chart-${player.player}-${index}`} className="flex items-center">
                  <div className="w-8 text-gray-400 text-sm">{index + 1}</div>
                  <div className="flex-1 flex items-center">
                    <div className="w-32 text-white font-medium truncate">{player.player}</div>
                    <div className="w-16 text-gray-400 text-sm">{player.team}</div>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getRatingBadge(player.rating)}`}
                          style={{ width: `${Math.min((player.rating / Math.max(...players.map(p => p.rating))) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className={`w-16 text-right font-bold ${getRatingColor(player.rating)}`}>
                      {player.rating.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team performance */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Team Performance
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uniqueTeams.map(team => {
                const teamPlayers = players.filter(p => p.team === team);
                const avgRating = teamPlayers.reduce((sum, p) => sum + p.rating, 0) / teamPlayers.length;
                const totalKills = teamPlayers.reduce((sum, p) => sum + p.totalKills, 0);
                const avgWinRate = teamPlayers.reduce((sum, p) => sum + p.winRate, 0) / teamPlayers.length;
                
                return (
                  <div key={team} className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-bold text-white text-lg">{team}</h4>
                    <p className="text-gray-400 text-sm">{teamPlayers.length} players</p>
                    <div className="mt-2 space-y-1">
                      <p className={`font-bold ${getRatingColor(avgRating)}`}>
                        Avg Rating: {avgRating.toFixed(2)}
                      </p>
                      <p className="text-gray-300 text-sm">
                        Total Kills: {totalKills}
                      </p>
                      <p className="text-gray-300 text-sm">
                        Win Rate: {avgWinRate.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {sortedPlayers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No players found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default Players; 