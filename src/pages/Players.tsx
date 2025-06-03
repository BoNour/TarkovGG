import React, { useState } from 'react';
import { useGameData } from '../context/GameDataContext';
import { Search, Filter, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

type SortField = 'rating' | 'kdRatio' | 'kost' | 'kpr' | 'srv' | 'nickname';
type SortDirection = 'asc' | 'desc';

const Players: React.FC = () => {
  const { players, teams, isLoading } = useGameData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeam, setFilterTeam] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [sortField, setSortField] = useState<SortField>('rating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  // Get unique roles from players
  const uniqueRoles = Array.from(new Set(players.map(player => player.role)));
  
  // Filter players
  const filteredPlayers = players.filter(player => {
    const matchesSearch = 
      player.nickname.toLowerCase().includes(searchTerm.toLowerCase()) || 
      player.realName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = filterTeam === '' || player.teamId === filterTeam;
    const matchesRole = filterRole === '' || player.role === filterRole;
    return matchesSearch && matchesTeam && matchesRole;
  });
  
  // Sort players
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    if (sortField === 'nickname') {
      return direction * a.nickname.localeCompare(b.nickname);
    }
    if (sortField === 'rating') {
      return direction * (b.stats.rating - a.stats.rating);
    }
    return direction * (b.stats[sortField] - a.stats[sortField]);
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-10 w-48 bg-gray-700 rounded mb-8"></div>
          <div className="h-12 bg-gray-700 rounded mb-8"></div>
          <div className="h-96 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Players</h1>
      
      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search players..."
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
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
          </div>
          
          {/* Role filter */}
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">All Roles</option>
              {uniqueRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Results count */}
      <p className="text-gray-400 mb-6">
        Showing {sortedPlayers.length} of {players.length} players
      </p>
      
      {/* Players table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr className="bg-gray-900">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1 hover:text-white"
                    onClick={() => handleSort('nickname')}
                  >
                    <span>Player</span>
                    <SortIcon field="nickname" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1 hover:text-white"
                    onClick={() => handleSort('rating')}
                  >
                    <span>Rating</span>
                    <SortIcon field="rating" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1 hover:text-white"
                    onClick={() => handleSort('kdRatio')}
                  >
                    <span>K/D</span>
                    <SortIcon field="kdRatio" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Entry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1 hover:text-white"
                    onClick={() => handleSort('kost')}
                  >
                    <span>KOST</span>
                    <SortIcon field="kost" />
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
                    onClick={() => handleSort('srv')}
                  >
                    <span>SRV</span>
                    <SortIcon field="srv" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Maps</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sortedPlayers.map(player => {
                const team = teams.find(t => t.id === player.teamId);
                const ratingColor = player.stats.rating >= 1.1 
                  ? 'text-green-500' 
                  : player.stats.rating < 0.9 
                    ? 'text-red-500' 
                    : 'text-yellow-500';
                
                return (
                  <tr key={player.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={player.image} 
                          alt={player.nickname}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="ml-3">
                          <Link 
                            to={`/players/${player.id}`}
                            className="text-white hover:text-gray-300 transition font-medium"
                          >
                            {player.nickname}
                          </Link>
                          <div className="text-sm text-gray-400">{player.realName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {team && (
                        <Link 
                          to={`/teams/${team.id}`}
                          className="flex items-center text-gray-300 hover:text-white transition"
                        >
                          <img 
                            src={team.logo} 
                            alt={team.name}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          {team.name}
                        </Link>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {player.role}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap font-medium ${ratingColor}`}>
                      {player.stats.rating.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {player.stats.kdRatio.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {player.stats.entryRatio}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {(player.stats.kost * 100).toFixed(0)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {player.stats.kpr.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {(player.stats.srv * 100).toFixed(0)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {player.stats.attack + player.stats.defense}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {sortedPlayers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No players found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default Players;