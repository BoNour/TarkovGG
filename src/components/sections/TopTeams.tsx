import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Trophy } from 'lucide-react';
import { useGameData } from '../../context/GameDataContext';

const TopTeams: React.FC = () => {
  const { teams, isLoading, players } = useGameData();
  const [hoveredTeamId, setHoveredTeamId] = useState<string | null>(null);
  
  // Sort teams by win rate (highest first)
  const sortedTeams = [...teams].sort((a, b) => b.stats.winRate - a.stats.winRate);
  
  // Get the top 4 teams
  const topTeams = sortedTeams.slice(0, 4);

  if (isLoading) {
    return (
      <div className="relative">
        <div className="container mx-auto">
          <div className="animate-pulse">
            <div className="h-8 w-48 rounded mb-8 mx-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 rounded-2xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="max-w-none mx-auto relative">
        {/* Section header - Matching other sections */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-4xl font-black text-white">
            Top Teams
          </h2>
          <Link 
            to="/teams" 
            className="group flex items-center space-x-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-300"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
        
        {/* Teams grid - cleaner layout */}
        <div className="relative">
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topTeams.map((team, index) => (
              <div 
                key={team.id} 
                className="transition-all duration-300 ease-out"
                style={{
                  transform: hoveredTeamId && hoveredTeamId !== team.id 
                    ? 'scale(0.98)' 
                    : hoveredTeamId === team.id
                      ? 'scale(1.02)'
                      : 'scale(1.0)',
                  opacity: hoveredTeamId && hoveredTeamId !== team.id ? 0.7 : 1.0,
                }}
                onMouseEnter={() => setHoveredTeamId(team.id)}
                onMouseLeave={() => setHoveredTeamId(null)}
              >
                {/* Clean Team Card - Matching page style */}
                <div className="relative group overflow-hidden rounded-2xl p-0.5 transition-all duration-300 ease-in-out bg-gradient-to-br from-white/10 to-transparent hover:from-white/20">
                  <div className="relative bg-zinc-900/60 backdrop-blur-xl rounded-[15px] p-6 h-96">
                    
                    {/* Subtle gradient overlays - reduced to 10% opacity */}
                    <div 
                      className={`absolute inset-0 rounded-[15px] opacity-10 group-hover:opacity-15 transition-opacity duration-300 ${
                        index === 0 ? 'bg-gradient-to-tl from-purple-600/50 via-blue-500/25 to-transparent' :
                        index === 1 ? 'bg-gradient-to-br from-pink-500/50 via-purple-500/25 to-transparent' :
                        index === 2 ? 'bg-gradient-to-tr from-cyan-500/50 via-purple-500/25 to-transparent' :
                        'bg-gradient-to-bl from-green-500/50 via-blue-500/25 to-transparent'
                      }`}
                    ></div>

                    {/* Content container */}
                    <div className="relative h-full flex flex-col text-white">
                      {/* Header - Logo and Team Name */}
                      <div className="text-center mb-8">
                        <img 
                          src={team.logo} 
                          alt={team.name}
                          className="w-16 h-16 mx-auto object-cover rounded-full shadow-lg border-2 border-white/10 group-hover:border-white/30 transition-all mb-3"
                        />
                        <h3 className="text-lg font-bold text-white mb-1">
                          {team.name}
                        </h3>
                        <p className="text-gray-400 font-mono text-xs uppercase tracking-wider">{team.tag}</p>
                      </div>

                      {/* Clean Stats Section */}
                      <div className="flex-grow flex flex-col justify-center space-y-8 text-center">
                        {/* Win Rate - Primary Focus */}
                        <div>
                          <div className="text-3xl font-black text-white mb-1">
                            {(team.stats.winRate * 100).toFixed(0)}%
                          </div>
                          <div className="text-xs text-gray-400 uppercase tracking-widest">Win Rate</div>
                        </div>

                        {/* Stats Row - Bigger fonts */}
                        <div className="grid grid-cols-2 gap-6 text-center">
                          <div>
                            <div className="text-3xl font-black text-white">{team.stats.wins}</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Wins</div>
                          </div>
                          <div>
                            <div className="text-3xl font-black text-white">{team.stats.losses}</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Losses</div>
                          </div>
                        </div>
                      </div>

                      {/* View Team Button */}
                      <div className="mt-4 mb-2">
                        <Link 
                          to={`/teams/${team.id}`}
                          className="block w-full text-center py-2.5 rounded-lg font-semibold transition-all duration-300 text-xs bg-white/10 hover:bg-white/20 text-white"
                        >
                          View Team
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No teams state */}
        {topTeams.length === 0 && (
          <div className="text-center py-16 px-6 rounded-2xl" style={{background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)'}}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-white/5 border border-white/10">
              <Users className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-bold text-white">No Teams Found</h3>
            <p className="text-gray-400 text-sm">Check back later for team rankings.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopTeams; 