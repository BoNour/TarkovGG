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
        <div className="bg-gray-800 border-b border-gray-700">
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
      <section className="relative bg-gray-800 text-white h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: "url('/BACKGROUND.png')" 
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-transparent to-black/90"></div>
        
        {/* Smooth single gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-800 via-gray-800/95 via-gray-800/75 via-gray-800/45 via-gray-800/20 to-transparent z-20"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-2/3 left-1/3 w-48 h-48 bg-red-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10 h-full flex">
          {/* Bottom Right Content */}
          <div className="flex items-end justify-end w-full pb-40 pr-8">
            <div className="text-right space-y-6 animate-fade-in-up">
              {/* Main Title */}
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-wider leading-none">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-white animate-text-shimmer">
                    HOME OF
                  </span>
                </h1>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-wider leading-none">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 animate-text-shimmer delay-300">
                    TARKOV
                  </span>
                </h1>
              </div>
              
              {/* Subtitle */}

              {/* Action Button */}
              <div className="animate-fade-in-up delay-700">
                <Link 
                  to="/players" 
                  className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></span>
                  <span className="relative flex items-center space-x-2">
                    <span>CHECK STATS</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </div>

              {/* Decorative Elements */}
              <div className="flex justify-end space-x-4 mt-8 animate-fade-in-up delay-1000">
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                <div className="w-4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Matches Section */}
      <div id="live-matches" className="bg-gray-800">
        <LatestMatches />
      </div>
      
      {/* Featured Tournaments Section */}
      <div id="tournaments" className="bg-gray-800">
        <FeaturedTournaments />
      </div>
      
      {/* Top Players Section */}
      <div className="bg-gray-800">
        <TopPlayers />
      </div>
      
      {/* Latest News Section */}
      <div className="bg-gray-800">
        <LatestNews />
      </div>
    </div>
  );
};

export default Home;