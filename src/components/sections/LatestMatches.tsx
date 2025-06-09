import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Clock, ExternalLink } from 'lucide-react';
import { useGameData } from '../../context/GameDataContext';
import MatchCard from '../ui/MatchCard';
import { Match, Team } from '../../types';
import { formatDate } from '../../utils/helpers';

const UpcomingMatchCard: React.FC<{ match: Match }> = ({ match }) => {
  const { teams } = useGameData();
  const teamOne = teams.find(t => t.id === match.teamOneId) as Team;
  const teamTwo = teams.find(t => t.id === match.teamTwoId) as Team;

  if (!teamOne || !teamTwo) {
    return null; // or a loading/error state
  }

  return (
    <div 
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 shadow-lg"
      style={{
        background: 'linear-gradient(145deg, rgba(40, 42, 50, 0.8), rgba(30, 32, 40, 0.8))',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }}
    >
      <div className="flex justify-between items-center text-xs text-gray-400 mb-4 pb-3 border-b border-gray-700/50">
        <div className="flex items-center space-x-2 text-blue-400 font-bold">
          <Clock size={14} />
          <span>UPCOMING</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock size={14} />
          <span>{formatDate(match.date)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-4 text-right">
          <div className="flex flex-col items-end">
            <span className="font-bold text-lg text-white">{teamOne.name}</span>
            <span className="text-xs text-gray-400">{teamOne.region}</span>
          </div>
          <img src={teamOne.logo} alt={teamOne.name} className="w-14 h-14 rounded-full border-2 border-gray-600"/>
        </div>

        <div className="text-3xl font-black text-gray-400 mx-4">
          0 
          <span className="text-2xl font-bold text-gray-500 mx-2">VS</span> 
          0
        </div>

        <div className="flex items-center space-x-4">
          <img src={teamTwo.logo} alt={teamTwo.name} className="w-14 h-14 rounded-full border-2 border-gray-600"/>
          <div className="flex flex-col items-start">
            <span className="font-bold text-lg text-white">{teamTwo.name}</span>
            <span className="text-xs text-gray-400">{teamTwo.region}</span>
          </div>
        </div>
      </div>

      <Link 
        to={`/matches/${match.id}`} 
        className="block w-full text-center bg-gray-700/50 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 group"
      >
        View Details <ExternalLink className="inline w-4 h-4 ml-1 opacity-70 group-hover:opacity-100 transition-opacity" />
      </Link>
    </div>
  );
};

const LatestMatches: React.FC = () => {
  const { matches, isLoading, teams } = useGameData();
  const [hoveredMatchId, setHoveredMatchId] = useState<string | null>(null);
  
  // Find the soonest upcoming match to feature.
  const upcomingMatches = [...matches]
    .filter(m => m.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Ascending date order for soonest
  
  const featuredUpcomingMatch = upcomingMatches.length > 0 ? upcomingMatches[0] : null;

  // Get other matches to display, prioritizing live matches, then completed.
  const liveMatches = [...matches]
    .filter(m => m.status === 'live')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Most recent first

  const completedMatchesFromDataSource = [...matches]
    .filter(m => m.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Most recent first

  // Create the final list of other matches, ensuring the featured one isn't included.
  const otherMatches = [...liveMatches, ...completedMatchesFromDataSource]
    .filter(m => !featuredUpcomingMatch || m.id !== featuredUpcomingMatch.id);
  
  // Determine how many other matches to show.
  const remainingSlots = featuredUpcomingMatch ? 4 : 5;
  const displayMatches = otherMatches.slice(0, remainingSlots);

  if (isLoading) {
    return (
      <div className="py-16" style={{ backgroundColor: '#1a1b1b' }}>
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-48 rounded mb-8 mx-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 rounded-2xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.01]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </div>
      
      <div className="relative">
        {/* Section header */}
        <div className="mb-6">
          <div className="space-y-4">
            <h2 className="text-5xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
              Latest Matches
            </h2>
          </div>
        </div>
        
        {/* Vertical matches list */}
        <div className="space-y-4">
          {featuredUpcomingMatch && (
            <UpcomingMatchCard match={featuredUpcomingMatch} />
          )}

          {displayMatches.map((match) => (
            <div 
              key={match.id} 
              className="relative transition-transform duration-700 ease-in-out"
              style={{
                transform: hoveredMatchId && hoveredMatchId !== match.id 
                  ? 'scale(0.96)' 
                  : 'scale(1.0)'
              }}
              onMouseEnter={() => setHoveredMatchId(match.id)}
              onMouseLeave={() => setHoveredMatchId(null)}
            >
              <MatchCard match={match} variant="compact" />
            </div>
          ))}
        </div>
        
        {/* Compact no matches state */}
        {displayMatches.length === 0 && !featuredUpcomingMatch && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center border" 
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                     borderColor: 'rgba(255, 255, 255, 0.1)'
                   }}>
                <Activity className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-200 mb-3">No recent matches</h3>
              <p className="text-gray-300 leading-relaxed">
                Check back soon for upcoming matches and live events
              </p>
            </div>
          </div>
        )}

        {/* View All button positioned at bottom right */}
        <div className="flex justify-end mt-8">
          <Link 
            to="/matches" 
            className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestMatches;