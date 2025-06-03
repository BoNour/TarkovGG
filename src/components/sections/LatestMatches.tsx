import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useGameData } from '../../context/GameDataContext';
import MatchCard from '../ui/MatchCard';

const LatestMatches: React.FC = () => {
  const { matches, isLoading } = useGameData();
  
  // Sort matches by date (most recent first)
  const sortedMatches = [...matches].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Get the latest 3 matches
  const latestMatches = sortedMatches.slice(0, 3);

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-700 rounded mb-8 mx-auto"></div>
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Matches</h2>
          <Link to="/matches" className="flex items-center text-sm text-gray-400 hover:text-white transition">
            View all matches
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestMatches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestMatches;