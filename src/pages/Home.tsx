import React, { useState, useEffect } from 'react';
import LatestMatches from '../components/sections/LatestMatches';
import FeaturedTournaments from '../components/sections/FeaturedTournaments';
import TopPlayers from '../components/sections/TopPlayers';
import LatestNews from '../components/sections/LatestNews';
import { useGameData } from '../context/GameDataContext';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { news } = useGameData();
  const [newsItems, setNewsItems] = useState<typeof news>([]);

  useEffect(() => {
    if (news.length === 0) return;
    setNewsItems([...news, ...news]);
  }, [news]);

  return (
    <div>
      {/* Sliding News Banner */}
      {news.length > 0 && (
        <div className="bg-[#1a1a1a] border-b border-[#333333]">
          <div className="relative overflow-hidden h-10">
            <div 
              className="absolute whitespace-nowrap flex animate-news-ticker"
              style={{
                animationDuration: `${newsItems.length * 10}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite'
              }}
            >
              {newsItems.map((item, index) => (
                <Link
                  key={`${item.id}-${index}`}
                  to={`/news/${item.id}`}
                  className="inline-flex items-center justify-between px-8 h-10 min-w-[400px]"
                >
                  <span className="text-sm text-gray-300 truncate">{item.title}</span>
                  <span className="text-xs text-gray-500 ml-4">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-[#1a1a1a] text-white">
        <div 
          className="absolute inset-0 z-0 opacity-30 bg-center bg-cover"
          style={{ 
            backgroundImage: "url('https://placehold.co/1920x1080/1a1a1a/333333?text=Esports+Background')" 
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a]/70 to-[#1a1a1a]"></div>
        <div className="container mx-auto px-4 py-48 relative z-10">
          <div className="flex items-center justify-center">
            <div className="h-32"></div>
          </div>
        </div>
      </section>

      {/* Live Matches Section */}
      <div id="live-matches" className="bg-[#1a1a1a]">
        <LatestMatches />
      </div>
      
      {/* Featured Tournaments Section */}
      <div id="tournaments" className="bg-[#242424]">
        <FeaturedTournaments />
      </div>
      
      {/* Top Players Section */}
      <div className="bg-[#1a1a1a]">
        <TopPlayers />
      </div>
      
      {/* Latest News Section */}
      <div className="bg-[#242424]">
        <LatestNews />
      </div>
    </div>
  );
};

export default Home;