import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity } from 'lucide-react';
import { useGameData } from '../../context/GameDataContext';
import MatchCard from '../ui/MatchCard';

const LatestMatches: React.FC = () => {
  const { matches, isLoading } = useGameData();

  const liveMatches = matches.filter(m => m.status === 'live').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const upcomingMatches = matches.filter(m => m.status === 'upcoming').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const completedMatches = matches.filter(m => m.status === 'completed').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (isLoading) {
    return (
      <div>
        <div className="h-8 w-48 rounded mb-8 bg-gray-700 animate-pulse"></div>
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-24 rounded-lg bg-gray-800 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  const allMatches = [...liveMatches, ...upcomingMatches, ...completedMatches];
  const displayedMatches = allMatches.slice(0, 8);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-white flex items-center">
          <Activity className="w-6 h-6 mr-3 text-green-400" />
          Matches
        </h3>
        <Link 
          to="/matches" 
          className="group flex items-center space-x-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-300"
        >
          <span>View All Matches</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {displayedMatches.length > 0 ? (
        <div className="space-y-3">
          {displayedMatches.map((match) => (
            <MatchCard key={match.id} match={match} compact={true} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 rounded-2xl" style={{background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)'}}>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-white/5 border border-white/10">
            <Activity className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-bold text-white">No Matches Found</h3>
          <p className="text-gray-400 text-sm">Check back later for scheduled games.</p>
        </div>
      )}
    </section>
  );
};

export default LatestMatches;