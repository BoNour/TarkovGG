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
        <div className="space-y-6 px-8">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="h-48 rounded-2xl bg-gray-800 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  const allMatches = [...liveMatches, ...upcomingMatches, ...completedMatches];
  const displayedMatches = allMatches.slice(0, 14);

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-black text-white">
          Matches
        </h2>
      </div>

      {displayedMatches.length > 0 ? (
        <div className="space-y-5">
          {displayedMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
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
      <Link 
        to="/matches" 
        className="group flex items-center justify-end space-x-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-300 mt-4"
      >
        <span>View All Matches</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </section>
  );
};

export default LatestMatches;