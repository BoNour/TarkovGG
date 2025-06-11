import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Trophy, Star, Award } from 'lucide-react';
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
      <div className="relative overflow-hidden group rounded-3xl"
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
        
        {/* Content container */}
        <div className="relative p-6">
          <h3 className="text-3xl font-black text-white mb-6">Top Teams</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-white/5 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden group rounded-3xl"
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
      
      {/* Content container */}
      <div className="relative p-6">
        {/* Header with View All link */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-3xl font-black text-white">Top Teams</h3>
          <Link 
            to="/teams" 
            className="group flex items-center space-x-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-300"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
        
        {/* Teams grid - vertical cards side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topTeams.map((team, index) => {
            const rankColors = [
              'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', // 1st - Gold
              'bg-gray-400/20 text-gray-300 border-gray-400/30',       // 2nd - Silver
              'bg-orange-600/20 text-orange-300 border-orange-600/30', // 3rd - Bronze
              'bg-blue-500/20 text-blue-300 border-blue-500/30'        // 4th - Blue
            ];
            
            return (
              <div 
                key={team.id} 
                className="transition-all duration-500 ease-out"
                style={{
                  transform: hoveredTeamId && hoveredTeamId !== team.id 
                    ? 'scale(0.95) translateY(8px)' 
                    : hoveredTeamId === team.id
                      ? 'scale(1.05) translateY(-8px)'
                      : 'scale(1.0) translateY(0px)',
                  opacity: hoveredTeamId && hoveredTeamId !== team.id ? 0.6 : 1.0,
                  animationDelay: `${index * 100}ms`
                }}
                onMouseEnter={() => setHoveredTeamId(team.id)}
                onMouseLeave={() => setHoveredTeamId(null)}
              >
                {/* Vertical Team Card */}
                <div className="relative group overflow-hidden rounded-2xl transition-all duration-300 border border-white/10 hover:border-white/20 h-[520px]">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col p-6 text-white">
                    {/* Rank indicator */}
                    <div className="flex justify-between items-start mb-6">
                      {/* Clean glass-morphism rank indicators */}
                      <div className="relative">
                        {index === 0 ? (
                          // 1st Place - Premium Glass Badge
                          <div className="relative">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/25 to-white/8 backdrop-blur-xl border border-white/30 shadow-2xl flex items-center justify-center relative overflow-hidden">
                              {/* Single refined inner glow */}
                              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/12 to-amber-500/6 rounded-2xl"></div>
                              {/* Rank number */}
                              <span className="relative text-xl font-black text-white drop-shadow-xl">1</span>
                              {/* Refined light reflections */}
                              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white/60 rounded-full blur-[0.5px]"></div>
                              <div className="absolute bottom-2 left-2 w-1 h-1 bg-yellow-400/40 rounded-full"></div>
                            </div>
                            {/* Clean outer glow */}
                            <div className="absolute inset-0 bg-yellow-400/6 rounded-2xl blur-xl"></div>
                          </div>
                        ) : index === 1 ? (
                          // 2nd Place - Elegant Glass Badge
                          <div className="relative">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-white/20 to-white/6 backdrop-blur-xl border border-white/25 shadow-xl flex items-center justify-center relative overflow-hidden">
                              {/* Single inner glow */}
                              <div className="absolute inset-0 bg-gradient-to-br from-slate-300/10 to-slate-400/5 rounded-2xl"></div>
                              {/* Rank number */}
                              <span className="relative text-lg font-black text-white/95 drop-shadow-xl">2</span>
                              {/* Clean light reflections */}
                              <div className="absolute top-2 right-2 w-1 h-1 bg-white/50 rounded-full blur-[0.5px]"></div>
                              <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-slate-300/30 rounded-full"></div>
                            </div>
                            {/* Subtle outer glow */}
                            <div className="absolute inset-0 bg-white/4 rounded-2xl blur-lg"></div>
                          </div>
                        ) : index === 2 ? (
                          // 3rd Place - Refined Glass Badge
                          <div className="relative">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-white/18 to-white/6 backdrop-blur-xl border border-white/22 shadow-xl flex items-center justify-center relative overflow-hidden">
                              {/* Single inner glow */}
                              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-amber-500/5 rounded-2xl"></div>
                              {/* Rank number */}
                              <span className="relative text-lg font-black text-white/95 drop-shadow-xl">3</span>
                              {/* Clean light reflections */}
                              <div className="absolute top-2 right-2 w-1 h-1 bg-white/50 rounded-full blur-[0.5px]"></div>
                              <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-orange-400/30 rounded-full"></div>
                            </div>
                            {/* Subtle outer glow */}
                            <div className="absolute inset-0 bg-white/4 rounded-2xl blur-lg"></div>
                          </div>
                        ) : (
                          // 4th Place - Clean Glass Badge
                          <div className="relative">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg border border-white/18 shadow-lg flex items-center justify-center relative overflow-hidden">
                              {/* Single inner glow */}
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/8 to-indigo-500/4 rounded-2xl"></div>
                              {/* Rank number */}
                              <span className="relative text-base font-black text-white/90 drop-shadow-lg">4</span>
                              {/* Simple light reflection */}
                              <div className="absolute top-2 right-2 w-0.5 h-0.5 bg-white/40 rounded-full"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Team logo and name */}
                    <div className="text-center mb-6">
                      <img 
                        src={team.logo} 
                        alt={team.name}
                        className="w-20 h-20 mx-auto object-cover rounded-full shadow-lg border-2 border-white/10 group-hover:border-white/30 transition-all duration-300 mb-4 group-hover:scale-110"
                      />
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {team.name}
                      </h4>
                      <p className="text-gray-400 font-mono text-sm uppercase tracking-wider">{team.tag}</p>
                    </div>

                    {/* Stats section */}
                    <div className="flex-1 flex flex-col justify-center space-y-6 text-center">
                      {/* Win Rate - Primary Focus */}
                      <div>
                        <div className="text-4xl font-black text-white mb-2">
                          {(team.stats.winRate * 100).toFixed(0)}%
                        </div>
                        <div className="text-sm text-gray-400 uppercase tracking-widest">Win Rate</div>
                      </div>

                      {/* Record */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-center space-x-2">
                          <Trophy size={16} className="text-yellow-400" />
                          <span className="text-base text-gray-400">Record</span>
                        </div>
                        <div className="text-2xl font-bold text-white">
                          {team.stats.wins}-{team.stats.losses}
                        </div>
                      </div>
                    </div>

                    {/* View Team Button - Always at bottom */}
                    <div className="mt-auto pt-6">
                      <Link 
                        to={`/teams/${team.id}`}
                        className="block w-full text-center py-4 rounded-xl font-bold transition-all duration-300 text-base bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white shadow-lg hover:shadow-xl transform hover:scale-105 border border-white/20 hover:border-white/30"
                        style={{ backdropFilter: 'blur(8px)' }}
                      >
                        View Team
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No teams state */}
        {topTeams.length === 0 && (
          <div className="text-center py-16 flex flex-col items-center justify-center">
            <Users className="w-8 h-8 mx-auto text-gray-600 mb-2" />
            <h3 className="text-lg font-semibold text-white">No Teams</h3>
            <p className="text-sm text-gray-500">Check back soon for team rankings.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopTeams; 