import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGameData } from '../context/GameDataContext';
import { ArrowLeft } from 'lucide-react';
import MatchCard from '../components/ui/MatchCard';

const TournamentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tournaments, teams, matches, isLoading } = useGameData();
  const [activeTab, setActiveTab] = useState<'overview' | 'matches' | 'teams'>('overview');
  
  // Find the tournament
  const tournament = tournaments.find(t => t.id === id);
  
  // Get tournament teams
  const tournamentTeams = teams.filter(team => tournament?.teams.includes(team.id));
  
  // Get tournament matches
  const tournamentMatches = matches.filter(match => tournament?.matches.includes(match.id))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Split matches by status
  const upcomingMatches = tournamentMatches.filter(match => match.status === 'upcoming');
  const liveMatches = tournamentMatches.filter(match => match.status === 'live');
  const completedMatches = tournamentMatches.filter(match => match.status === 'completed');

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

  if (!tournament) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Tournament not found</h1>
          <p className="text-gray-400 mb-8">The tournament you're looking for doesn't exist or has been removed.</p>
          <Link to="/tournaments" className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md font-medium transition">
            Back to Tournaments
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
          <Link to="/tournaments" className="inline-flex items-center text-gray-400 hover:text-white transition">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tournaments
          </Link>
        </div>
        
        {/* Tournament header */}
        <div className="bg-gray-800 rounded-lg overflow-hidden mb-8">
          <div className="relative h-48">
            <img 
              src={tournament.logo} 
              alt={tournament.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    tournament.type === 'major' ? 'bg-purple-600' : 'bg-blue-600'
                  }`}>
                    {tournament.type.toUpperCase()}
                  </span>
                  <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                    {tournament.format.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-3">{tournament.name}</h1>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400 font-bold">💰</span>
                    <span className="text-white font-bold text-lg">{tournament.prizePool}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400 font-bold">📅</span>
                    <span className="text-gray-300 font-semibold">
                      {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className="text-gray-400">{tournament.location}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-gray-800">
            <div>
              <p className="text-sm text-gray-400">Dates</p>
              <p className="font-medium">
                {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Location</p>
              <p className="font-medium">{tournament.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Prize Pool</p>
              <p className="font-medium">{tournament.prizePool}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Teams</p>
              <p className="font-medium">{tournamentTeams.length} Participating</p>
            </div>
          </div>
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
                onClick={() => setActiveTab('teams')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'teams'
                    ? 'border-red-500 text-red-500'
                    : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                Teams
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Live Matches */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Live Matches</h2>
                {liveMatches.length > 0 ? (
                  <div className="space-y-4">
                    {liveMatches.map(match => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No matches are currently live.</p>
                )}
              </div>
              
              {/* Participating Teams */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Teams</h2>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="space-y-4">
                    {tournamentTeams.map(team => (
                      <Link 
                        key={team.id}
                        to={`/teams/${team.id}`}
                        className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition"
                      >
                        <img 
                          src={team.logo} 
                          alt={team.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="ml-3">
                          <p className="font-medium">{team.name}</p>
                          <p className="text-sm text-gray-400">{team.region}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'teams' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Participating Teams</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tournamentTeams.map(team => (
                <Link 
                  key={team.id}
                  to={`/teams/${team.id}`}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition"
                >
                  <div className="flex flex-col items-center text-center">
                    <img 
                      src={team.logo} 
                      alt={team.name}
                      className="w-24 h-24 rounded-full object-cover mb-4"
                    />
                    <h3 className="text-lg font-bold mb-1">{team.name}</h3>
                    <p className="text-sm text-gray-400">{team.region}</p>
                    <div className="mt-4 text-sm">
                      <p>Win Rate: {(team.stats.winRate * 100).toFixed(0)}%</p>
                      <p>Record: {team.stats.wins}-{team.stats.losses}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'matches' && (
          <div className="space-y-8">
            {/* Live Matches */}
            {liveMatches.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Live Matches</h2>
                <div className="space-y-4">
                  {liveMatches.map(match => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Upcoming Matches */}
            {upcomingMatches.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Upcoming Matches</h2>
                <div className="space-y-4">
                  {upcomingMatches.map(match => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Completed Matches */}
            {completedMatches.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Completed Matches</h2>
                <div className="space-y-4">
                  {completedMatches.map(match => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            )}
            
            {tournamentMatches.length === 0 && (
              <p className="text-gray-400">No matches have been scheduled yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentDetails;