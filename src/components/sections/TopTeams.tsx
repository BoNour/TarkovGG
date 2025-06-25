import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Trophy, Star, Award } from 'lucide-react';
import { useGameData } from '../../context/GameDataContext';

const TopTeams: React.FC = () => {
  const { teams, isLoading } = useGameData();
  
  // Sort teams by win rate (highest first)
  const sortedTeams = [...teams].sort((a, b) => b.stats.winRate - a.stats.winRate);
  
  // Get the top 5 teams
  const topTeams = sortedTeams.slice(0, 5);

  if (isLoading) {
    return (
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-black text-white flex items-center">
            <Users className="w-6 h-6 mr-3 text-purple-400" />
            Top Teams
          </h3>
        </div>
        
        {/* Loading grid */}
        <div className="grid grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="relative rounded-xl overflow-hidden bg-white/5 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="absolute inset-0 rounded-xl border border-white/10"></div>
              <div className="relative px-4 py-2 text-center">
                <div className="absolute top-1 left-1">
                  <div className="w-5 h-5 bg-gray-700 rounded-lg"></div>
                </div>
                <div className="mb-2">
                  <div className="w-12 h-12 bg-gray-700 rounded-xl mx-auto"></div>
                </div>
                <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-1"></div>
                <div className="h-5 bg-gray-700 rounded w-8 mx-auto mb-1"></div>
                <div className="h-3 bg-gray-700 rounded w-6 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Header with View All link */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-black text-white flex items-center">
          <Users className="w-6 h-6 mr-3 text-purple-400" />
          Top Teams
        </h3>
        <Link 
          to="/teams" 
          className="group flex items-center space-x-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-300"
        >
          <span>View All Teams</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
      
      {/* Teams grid - compact cards side by side */}
      <div className="grid grid-cols-5 gap-6">
          {topTeams.map((team, index) => {
            // Generate a mock ELO rating based on win rate (1000-1400 range)
            const eloRating = Math.floor(1000 + (team.stats.winRate * 400));
            
            return (
              <Link
                to={`/teams/${team.id}`}
                key={team.id} 
                className="group relative block rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  background: 'linear-gradient(135deg, rgba(24, 25, 25, 0.55) 0%, rgba(15, 16, 16, 0.3) 100%)',
                  backdropFilter: 'blur(16px) saturate(150%)',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.04)'
                }}
              >
                {/* Background gradient overlay based on rank - only for #1 */}
                <div className={`absolute inset-0 ${
                  index === 0 
                    ? 'bg-gradient-to-br from-yellow-500/5 via-amber-600/3 to-orange-500/2 opacity-30' 
                    : ''
                }`}></div>

                {/* Border glow effect - only top 3 have colors */}
                <div className={`absolute inset-0 rounded-xl border transition-all duration-300 ${
                  index === 0 
                    ? 'border-yellow-400/20 group-hover:border-yellow-400/30' 
                    : index === 1
                      ? 'border-gray-300/30 group-hover:border-gray-300/40'
                      : index === 2
                        ? 'border-orange-600/30 group-hover:border-orange-600/40'
                        : 'border-white/15 group-hover:border-white/25'
                }`}></div>

                {/* Content */}
                <div className="relative px-4 py-2 text-center">
                  {/* Rank indicator - rounded square badge */}
                  <div className="absolute top-2 left-2">
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs font-bold shadow-md ${
                      index === 0 
                        ? 'bg-gradient-to-br from-yellow-400/80 to-yellow-500/80 text-black' 
                        : index === 1
                          ? 'bg-gradient-to-br from-gray-300/80 to-gray-400/80 text-black'
                          : index === 2
                            ? 'bg-gradient-to-br from-orange-500/80 to-orange-600/80 text-white'
                            : 'bg-gradient-to-br from-gray-500/80 to-gray-600/80 text-white'
                    }`}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Team logo with enhanced styling */}
                  <div className="mb-2 relative">
                    <div className="w-12 h-12 mx-auto relative">
                      <img 
                        src={team.logo} 
                        alt={team.name}
                        className="w-full h-full object-cover rounded-xl shadow-xl transition-all duration-300"
                      />
                      {/* Glow effect behind logo - only for top 3 */}
                      {index < 3 && (
                        <div className={`absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${
                          index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                        }`}></div>
                      )}
                    </div>
                  </div>

                  {/* Team name with better typography */}
                  <h4 className="text-sm font-bold text-white group-hover:text-yellow-300 transition-colors mb-1 leading-tight">
                    {team.name}
                  </h4>

                  {/* ELO Rating with enhanced styling */}
                  <div className="relative">
                    <div className="text-lg font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent group-hover:from-green-300 group-hover:to-emerald-300 transition-all duration-300">
                      {eloRating}
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">ELO</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      {/* No teams state */}
      {topTeams.length === 0 && (
        <div className="text-center py-8 flex flex-col items-center justify-center">
          <Users className="w-8 h-8 mx-auto text-gray-600 mb-2" />
          <h3 className="text-lg font-semibold text-white">No Teams</h3>
          <p className="text-sm text-gray-500">Check back soon for team rankings.</p>
        </div>
      )}
    </div>
  );
};

export default TopTeams; 