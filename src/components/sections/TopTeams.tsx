import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award } from 'lucide-react';
import { useGameData } from '../../context/GameDataContext';

const TopTeams: React.FC = () => {
  const { teams, isLoading } = useGameData();
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
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-16 space-y-6 lg:space-y-0">
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-white leading-tight">
              Top Teams
            </h2>
          </div>
          
          {/* Modern call to action */}
          <Link 
            to="/teams" 
            className="group relative inline-flex items-center space-x-4 overflow-hidden bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
          >
            <span className="relative z-10">View All Teams</span>
            <div className="relative z-10 w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" />
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </Link>
        </div>
        
        {/* Teams grid with enhanced layout */}
        <div className="relative">
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {topTeams.map((team, index) => (
              <div 
                key={team.id} 
                className="transition-all duration-500 ease-out"
                style={{
                  transform: hoveredTeamId && hoveredTeamId !== team.id 
                    ? 'scale(0.98) translateY(4px)' 
                    : hoveredTeamId === team.id
                      ? 'scale(1.03) translateY(-4px)'
                      : 'scale(1.0) translateY(0px)',
                  opacity: hoveredTeamId && hoveredTeamId !== team.id ? 0.8 : 1.0,
                  filter: hoveredTeamId && hoveredTeamId !== team.id ? 'brightness(0.9)' : 'brightness(1.0)',
                  animationDelay: `${index * 100}ms`
                }}
                onMouseEnter={() => setHoveredTeamId(team.id)}
                onMouseLeave={() => setHoveredTeamId(null)}
              >
                {/* Team Card with Advanced Glassmorphism */}
                <div className="h-full relative overflow-hidden group rounded-3xl"
                     style={{
                       backgroundColor: 'rgba(24, 24, 27, 0.7)',
                       backdropFilter: 'blur(24px)',
                       boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
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
                  
                  {/* Premium gradients with unique accents */}
                  <div 
                    className={`absolute inset-0 rounded-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-300 ${
                      index === 0 ? 'bg-gradient-to-tl from-purple-600/20 via-blue-500/10 to-transparent' :
                      index === 1 ? 'bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-transparent' :
                      index === 2 ? 'bg-gradient-to-tr from-cyan-500/20 via-purple-500/10 to-transparent' :
                      'bg-gradient-to-bl from-green-500/20 via-blue-500/10 to-transparent'
                    }`}
                  ></div>

                  {/* Subtle glow accents */}
                  {index === 0 && <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>}
                  {index === 1 && <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>}
                  {index === 2 && <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>}
                  {index === 3 && <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>}

                  {/* Subtle border effect */}
                  <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/20 transition-all duration-300"></div>
                  
                  {/* Content container */}
                  <div className="relative h-full transition-all duration-300">
                  
                  <div className="p-6 h-full flex flex-col">
                    {/* Team Header */}
                    <div className="flex items-start mb-6">
                      <img 
                        src={team.logo} 
                        alt={team.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-600/50 group-hover:border-purple-500/50 transition-colors duration-300"
                      />
                      <div className="ml-4 flex-1">
                        <Link to={`/teams/${team.id}`}>
                          <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300 mb-1">
                            {team.name}
                          </h3>
                        </Link>
                        <p className="text-gray-400 text-sm font-mono">{team.tag}</p>
                        <p className="text-gray-500 text-xs">{team.region}</p>
                      </div>
                    </div>
                    
                    {/* Team Stats */}
                    <div className="space-y-4 flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Win Rate</span>
                        <span className={`font-bold text-lg ${
                          team.stats.winRate >= 0.7 ? 'text-green-400' :
                          team.stats.winRate >= 0.5 ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {(team.stats.winRate * 100).toFixed(1)}%
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Wins</span>
                        <span className="text-green-400 font-semibold">{team.stats.wins}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Losses</span>
                        <span className="text-red-400 font-semibold">{team.stats.losses}</span>
                      </div>
                      
                      {/* Win Rate Progress Bar */}
                      <div className="mt-4">
                        <div className="w-full bg-gray-700/50 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-700 ${
                              team.stats.winRate >= 0.7 ? 'bg-gradient-to-r from-green-500 to-green-400' :
                              team.stats.winRate >= 0.5 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                              'bg-gradient-to-r from-red-500 to-red-400'
                            }`}
                            style={{ width: `${team.stats.winRate * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* View Details Button */}
                    <Link 
                      to={`/teams/${team.id}`}
                      className="mt-6 w-full text-center py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', color: '#a855f7' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.25)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.15)';
                      }}
                    >
                      View Details
                    </Link>
                  </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modern no teams state */}
        {topTeams.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-lg mx-auto">
              <div className="w-28 h-28 mx-auto mb-8 rounded-full flex items-center justify-center border" 
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                     borderColor: 'rgba(255, 255, 255, 0.1)'
                   }}>
                <Users className="w-14 h-14 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-200 mb-4">No teams found</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Check back soon for team statistics and rankings
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopTeams; 