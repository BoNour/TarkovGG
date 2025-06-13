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
    if (rating >= 1.2) return 'bg-gradient-to-r from-green-600 to-green-500';
    if (rating >= 1.0) return 'bg-gradient-to-r from-blue-600 to-blue-500';
    if (rating >= 0.8) return 'bg-gradient-to-r from-yellow-600 to-yellow-500';
    if (rating >= 0.6) return 'bg-gradient-to-r from-orange-600 to-orange-500';
    return 'bg-gradient-to-r from-red-600 to-red-500';
  };

  if (loading) {
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

        <div className="relative z-30 pt-8">
          <div className="container mx-auto px-4 py-12">
            <div className="animate-pulse">
              <div className="h-10 w-64 bg-white/10 backdrop-blur-md rounded-3xl mb-8"></div>
              <div className="h-16 bg-white/10 backdrop-blur-md rounded-3xl mb-8"></div>
              <div className="h-96 bg-white/10 backdrop-blur-md rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
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

        <div className="relative z-30 pt-8">
          <div className="container mx-auto px-4 py-12">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 text-center">
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
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Players</h1>
          </div>

          {/* Statistics Summary */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="relative group">
              {/* Background container with effects */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden"
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
              </div>
              {/* Content container */}
              <div className="relative p-6">
                <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Total Players</h3>
                <p className="text-2xl font-bold text-white">{players.length}</p>
              </div>
            </div>
            
            <div className="relative group">
              {/* Background container with effects */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden"
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
              </div>
              {/* Content container */}
              <div className="relative p-6">
                <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Total Teams</h3>
                <p className="text-2xl font-bold text-white">{uniqueTeams.length}</p>
              </div>
            </div>
            
            <div className="relative group">
              {/* Background container with effects */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden"
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
              </div>
              {/* Content container */}
              <div className="relative p-6">
                <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Total Matches</h3>
                <p className="text-2xl font-bold text-white">{new Set(matchRecords.map(r => r.gameId)).size}</p>
              </div>
            </div>
            
            <div className="relative group">
              {/* Background container with effects */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden"
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
              </div>
              {/* Content container */}
              <div className="relative p-6">
                <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Avg Rating</h3>
                <p className="text-2xl font-bold text-white">
                  {players.length > 0 ? (players.reduce((sum, p) => sum + p.rating, 0) / players.length).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
            
            <div className="relative group">
              {/* Background container with effects */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden"
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
              </div>
              {/* Content container */}
              <div className="relative p-6">
                <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Top K/D</h3>
                <p className="text-2xl font-bold text-white">
                  {players.length > 0 ? Math.max(...players.map(p => p.kd)).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="relative group mb-8">
            {/* Background container with effects */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden"
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
            </div>
            {/* Content container */}
            <div className="relative p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search players or teams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-700/50 text-white pl-10 pr-4 py-3 rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  />
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
                
                {/* Team filter */}
                <div className="flex items-center">
                  <Filter className="h-5 w-5 text-gray-400 mr-2" />
                  <select
                    value={filterTeam}
                    onChange={(e) => setFilterTeam(e.target.value)}
                    className="w-full bg-gray-700/50 text-white px-3 py-3 rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
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
                    className={`px-4 py-3 rounded-xl transition-all duration-200 font-medium ${viewMode === 'table' ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'}`}
                  >
                    Table
                  </button>
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`px-4 py-3 rounded-xl transition-all duration-200 font-medium ${viewMode === 'cards' ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'}`}
                  >
                    Cards
                  </button>
                  <button
                    onClick={() => setViewMode('charts')}
                    className={`px-4 py-3 rounded-xl transition-all duration-200 font-medium ${viewMode === 'charts' ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'}`}
                  >
                    Charts
                  </button>
                </div>

                {/* Results count */}
                <div className="flex items-center justify-end">
                  <span className="text-gray-400 text-sm font-medium">
                    Showing {sortedPlayers.length} of {players.length} players
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Table View */}
          {viewMode === 'table' && (
            <div className="relative group">
              {/* Background container with effects */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden"
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
              </div>
              {/* Content container */}
              <div className="relative overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-b border-gray-700/50">
                        <th className="px-4 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-widest">
                          <button 
                            className="flex items-center space-x-1 hover:text-white transition-colors"
                            onClick={() => handleSort('player')}
                          >
                            <span>Player</span>
                            <SortIcon field="player" />
                          </button>
                        </th>
                        <th className="px-3 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-widest">
                          <button 
                            className="flex items-center space-x-1 hover:text-white transition-colors"
                            onClick={() => handleSort('team')}
                          >
                            <span>Team</span>
                            <SortIcon field="team" />
                          </button>
                        </th>
                        <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                          <button 
                            className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                            onClick={() => handleSort('totalKills')}
                          >
                            <span>Kills</span>
                            <SortIcon field="totalKills" />
                          </button>
                        </th>
                        <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                          <button 
                            className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                            onClick={() => handleSort('totalDeaths')}
                          >
                            <span>Deaths</span>
                            <SortIcon field="totalDeaths" />
                          </button>
                        </th>
                        <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 tracking-widest">Games</th>
                        <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                          <button 
                            className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                            onClick={() => handleSort('kd')}
                          >
                            <span>K/D</span>
                            <SortIcon field="kd" />
                          </button>
                        </th>
                        <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                          <button 
                            className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                            onClick={() => handleSort('kpr')}
                          >
                            <span>KPR</span>
                            <SortIcon field="kpr" />
                          </button>
                        </th>
                        <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                          <button 
                            className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                            onClick={() => handleSort('winRate')}
                          >
                            <span>Win %</span>
                            <SortIcon field="winRate" />
                          </button>
                        </th>
                        <th className="px-4 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">
                          <button 
                            className="flex items-center justify-center space-x-1 hover:text-white transition-colors w-full"
                            onClick={() => handleSort('rating')}
                          >
                            <span>Rating</span>
                            <SortIcon field="rating" />
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedPlayers.map((player, index) => (
                        <tr key={`${player.player}-${index}`} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-all duration-300">
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${getRatingBadge(player.rating)}`}></div>
                              <span className="font-medium text-white text-sm truncate max-w-32">{player.player}</span>
                            </div>
                          </td>
                          <td className="px-3 py-4">
                            <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-700/50 text-gray-300 border border-gray-600/50">
                              {player.team}
                            </span>
                          </td>
                          <td className="px-3 py-4 text-center">
                            <span className="font-mono text-sm text-gray-200">{player.totalKills}</span>
                          </td>
                          <td className="px-3 py-4 text-center">
                            <span className="font-mono text-sm text-gray-200">{player.totalDeaths}</span>
                          </td>
                          <td className="px-3 py-4 text-center">
                            <span className="font-mono text-sm text-gray-300">{player.gamesPlayed}</span>
                          </td>
                          <td className="px-3 py-4 text-center">
                            <span className={`font-mono text-sm font-medium ${player.kd >= 1.5 ? 'text-green-400' : player.kd >= 1.0 ? 'text-yellow-400' : 'text-red-400'}`}>
                              {player.kd.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-3 py-4 text-center">
                            <span className="font-mono text-sm text-gray-200">{player.kpr.toFixed(2)}</span>
                          </td>
                          <td className="px-3 py-4 text-center">
                            <span className="font-mono text-sm text-gray-200">{player.winRate.toFixed(1)}%</span>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="flex items-center justify-center">
                              <span className={`font-mono text-sm font-bold px-3 py-1.5 rounded-xl ${getRatingBadge(player.rating)} text-white shadow-lg`}>
                                {player.rating.toFixed(2)}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {sortedPlayers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-400 font-medium">No players found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Players; 