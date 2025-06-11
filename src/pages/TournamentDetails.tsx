import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGameData } from '../context/GameDataContext';
import { ArrowLeft, Calendar, MapPin, Trophy, Users, Star, Target } from 'lucide-react';
import MatchCard from '../components/ui/MatchCard';

const TournamentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tournaments, teams, matches, isLoading } = useGameData();
  const [activeTab, setActiveTab] = useState<'overview' | 'matches' | 'teams' | 'brackets'>('overview');
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
  
  const tournament = tournaments.find(t => t.id === id);
  const tournamentTeams = teams.filter(team => tournament?.teams.includes(team.id));
  const tournamentMatches = matches.filter(match => tournament?.matches.includes(match.id))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const upcomingMatches = tournamentMatches.filter(match => match.status === 'upcoming');
  const liveMatches = tournamentMatches.filter(match => match.status === 'live');
  const completedMatches = tournamentMatches.filter(match => match.status === 'completed');

  if (isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#101012' }}>
        <div className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('/BACKGROUND.png')" }}></div>
        <div className="fixed inset-0 z-10" style={{ background: 'radial-gradient(circle at center, transparent 20%, rgba(16, 16, 18, 0.8) 60%, rgba(16, 16, 18, 1) 90%)' }}></div>
        <div className="relative z-30 pt-8">
          <div className="max-w-[90vw] mx-auto px-4 py-20">
            <div className="animate-pulse space-y-8">
              <div className="h-10 w-48 backdrop-blur-3xl bg-white/5 border border-white/10 rounded-2xl"></div>
              <div className="h-64 backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl"></div>
              <div className="h-12 w-full backdrop-blur-3xl bg-white/5 border border-white/10 rounded-2xl"></div>
              <div className="h-96 backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#101012' }}>
        <div className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('/BACKGROUND.png')" }}></div>
        <div className="fixed inset-0 z-10" style={{ background: 'radial-gradient(circle at center, transparent 20%, rgba(16, 16, 18, 0.8) 60%, rgba(16, 16, 18, 1) 90%)' }}></div>
        <div className="relative z-30 text-center backdrop-blur-3xl bg-white/[0.03] border border-white/10 rounded-3xl p-12 shadow-2xl shadow-purple-500/10">
          <h1 className="text-4xl font-bold mb-4">Tournament not found</h1>
          <p className="text-gray-400 mb-8">The tournament you're looking for doesn't exist or has been removed.</p>
          <Link to="/tournaments" className="px-6 py-3 backdrop-blur-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-white/10 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105">
            Back to Tournaments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#101012' }}>
      <div 
        className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 ease-out"
        style={{ 
          backgroundImage: "url('/BACKGROUND.png')",
          transform: `scale(1.05) translate(${mousePosition.x / -100}px, ${mousePosition.y / -100}px)`,
        }}
      ></div>
      
      <div className="fixed inset-0 z-10" style={{ background: 'radial-gradient(circle at center, transparent 20%, rgba(16, 16, 18, 0.8) 60%, rgba(16, 16, 18, 1) 90%)' }}></div>
      
      <div className="fixed inset-0 z-20">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-white/5 to-gray-500/5 rounded-full blur-3xl opacity-30" style={{animation: 'slow-float-1 15s ease-in-out infinite'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-gray-500/5 to-white/5 rounded-full blur-3xl opacity-20" style={{animation: 'slow-float-2 18s ease-in-out infinite'}}></div>
      </div>

      <div className="relative z-30 pt-8">
        <div className="max-w-[90vw] mx-auto px-4 py-12">
          
          <div className="mb-8">
            <Link to="/tournaments" className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 group">
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Tournaments
            </Link>
          </div>
          
          <div 
            className="relative group rounded-3xl mb-12 backdrop-blur-3xl bg-white/[0.03] border border-white/10"
            style={{ boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-white/[0.01] rounded-3xl"></div>
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <img src={tournament.logo} alt={tournament.name} className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-2xl bg-white/[0.05] p-4 border border-white/10" />
                <div className="text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">{tournament.name}</h1>
                  <p className="text-lg text-gray-400 max-w-2xl">{tournament.description}</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400 uppercase tracking-widest">Prize Pool</p>
                  <p className="text-2xl font-bold text-yellow-400">{tournament.prizePool}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400 uppercase tracking-widest">Dates</p>
                  <p className="text-lg font-semibold text-white">{new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400 uppercase tracking-widest">Location</p>
                  <p className="text-lg font-semibold text-white">{tournament.location}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400 uppercase tracking-widest">Teams</p>
                  <p className="text-lg font-semibold text-white">{tournamentTeams.length}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center backdrop-blur-2xl bg-white/[0.05] rounded-2xl p-2 border border-white/10 mb-12">
            {['overview', 'teams', 'matches', 'brackets'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 min-w-[140px] justify-center ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg backdrop-blur-xl' 
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              </button>
            ))}
          </div>

          <div 
            className="relative group rounded-3xl backdrop-blur-3xl bg-white/[0.03] border border-white/10 p-8"
            style={{ boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-white/[0.01] rounded-3xl"></div>
            <div className="relative">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-white">Live Matches</h2>
                      {liveMatches.length > 0 ? (
                        <div className="space-y-4">
                          {liveMatches.map(match => <MatchCard key={match.id} match={match} />)}
                        </div>
                      ) : <p className="text-gray-400">No matches are currently live.</p>}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-white">Upcoming Matches</h2>
                      {upcomingMatches.length > 0 ? (
                        <div className="space-y-4">
                          {upcomingMatches.map(match => <MatchCard key={match.id} match={match} />)}
                        </div>
                      ) : <p className="text-gray-400">No upcoming matches scheduled.</p>}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-white">Participating Teams</h2>
                    <div className="space-y-2">
                      {tournamentTeams.map(team => (
                        <Link key={team.id} to={`/teams/${team.id}`} className="flex items-center p-3 hover:bg-white/[0.05] rounded-lg transition-colors duration-200">
                          <img src={team.logo} alt={team.name} className="w-10 h-10 rounded-full object-cover"/>
                          <div className="ml-4">
                            <p className="font-semibold text-white">{team.name}</p>
                            <p className="text-sm text-gray-400">{team.region}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'teams' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-white">Participating Teams</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {tournamentTeams.map(team => (
                      <Link key={team.id} to={`/teams/${team.id}`} className="group relative bg-white/[0.05] rounded-xl p-4 text-center transition-all duration-300 hover:bg-white/[0.08] hover:-translate-y-1">
                        <img src={team.logo} alt={team.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-white/10"/>
                        <h3 className="text-lg font-bold text-white">{team.name}</h3>
                        <p className="text-sm text-gray-400">{team.region}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'matches' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-white">All Matches</h2>
                  <div className="space-y-4">
                    {tournamentMatches.map(match => <MatchCard key={match.id} match={match} />)}
                  </div>
                </div>
              )}

              {activeTab === 'brackets' && (
                <div className="text-center py-16">
                   <h2 className="text-3xl font-bold mb-6 text-white">Brackets</h2>
                   <p className="text-gray-400">Brackets for this tournament are not yet available. Please check back later.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;