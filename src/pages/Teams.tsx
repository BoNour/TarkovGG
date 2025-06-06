import React, { useState } from 'react';
import { useGameData } from '../context/GameDataContext';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import StatCard from '../components/ui/StatCard';

const Teams: React.FC = () => {
  const { teams, isLoading } = useGameData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [sortBy, setSortBy] = useState('winRate');

  // Get unique regions
  const regions = Array.from(new Set(teams.map(team => team.region)));

  // Filter and sort teams
  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.tag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === '' || team.region === filterRegion;
    return matchesSearch && matchesRegion;
  });

  const sortedTeams = [...filteredTeams].sort((a, b) => {
    if (sortBy === 'winRate') {
      return b.stats.winRate - a.stats.winRate;
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'wins') {
      return b.stats.wins - a.stats.wins;
    }
    return 0;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-10 w-48 bg-gray-700 rounded mb-8"></div>
            <div className="h-12 bg-gray-700 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Teams</h1>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Region filter */}
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                className="bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Regions</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center">
              <label className="text-gray-400 mr-2">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="winRate">Win Rate</option>
                <option value="wins">Wins</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-gray-400 mb-6">Showing {sortedTeams.length} of {teams.length} teams</p>

        {/* Teams grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTeams.map(team => (
            <div key={team.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <Link to={`/teams/${team.id}`} className="text-xl font-bold hover:text-red-500 transition">
                      {team.name}
                    </Link>
                    <p className="text-gray-400">{team.tag}</p>
                    <p className="text-sm text-gray-500">{team.region}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <StatCard
                    title="Win Rate"
                    value={`${(team.stats.winRate * 100).toFixed(0)}%`}
                    color={team.stats.winRate > 0.6 ? 'success' : team.stats.winRate < 0.4 ? 'danger' : 'warning'}
                  />
                  <StatCard
                    title="Wins"
                    value={team.stats.wins}
                  />
                  <StatCard
                    title="Losses"
                    value={team.stats.losses}
                  />
                </div>

                <Link
                  to={`/teams/${team.id}`}
                  className="block w-full text-center py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition"
                >
                  View Team
                </Link>
              </div>
            </div>
          ))}
        </div>

        {sortedTeams.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No teams found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;