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
    <div className="min-h-screen bg-gray-950">
      {/* Modern News Ticker */}
      {news.length > 0 && (
        <div className="relative bg-gray-900/80 backdrop-blur-sm border-b border-gray-800/50">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10"></div>
          <div className="relative overflow-hidden h-12">
            <div 
              className="absolute whitespace-nowrap flex items-center animate-news-ticker"
              style={{
                animationDuration: `${newsItems.length * 12}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite'
              }}
            >
              {newsItems.map((item, index) => (
                <Link
                  key={`${item.id}-${index}`}
                  to={`/news/${item.id}`}
                  className="inline-flex items-center justify-between px-8 h-12 min-w-[500px] group hover:bg-white/5 transition-all duration-300"
                >
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                    {item.title}
                  </span>
                  <span className="text-xs text-gray-500 ml-6 font-mono">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div 
          className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat scale-105"
          style={{ 
            backgroundImage: "url('/BACKGROUND.png')" 
          }}
        ></div>
        
        {/* Modern gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/90 via-gray-950/70 to-gray-950/90 z-10"></div>
        
        {/* Animated background orbs */}
        <div className="absolute inset-0 z-20">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse opacity-60"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-2xl animate-pulse delay-1000 opacity-40"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-6 py-20 relative z-30">
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            {/* Main headline */}
            <div className="space-y-4 animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-300">Live Gaming Hub</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white">
                  HOME OF
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mt-2">
                  TARKOV
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="animate-fade-in-up delay-300">
              <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
                Experience the ultimate competitive gaming platform with real-time stats, 
                tournaments, and community features.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-up delay-500">
              <Link 
                to="/players" 
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold text-white text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 min-w-[200px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <span className="relative flex items-center justify-center space-x-2">
                  <span>View Stats</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              <Link 
                to="/tournaments" 
                className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold text-white text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30 min-w-[200px]"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Tournaments</span>
                  <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Stats preview */}
            <div className="grid grid-cols-3 gap-8 pt-16 animate-fade-in-up delay-700">
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  50K+
                </div>
                <div className="text-gray-400 text-sm font-medium">Active Players</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  1.2M+
                </div>
                <div className="text-gray-400 text-sm font-medium">Matches Played</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                  24/7
                </div>
                <div className="text-gray-400 text-sm font-medium">Live Coverage</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
            <div className="w-1 h-3 bg-white/50 rounded-full mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Content sections with modern spacing */}
      <div className="space-y-32 bg-gray-950">
        {/* Live Matches Section */}
        <section id="live-matches" className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>
          <div className="relative">
            <LatestMatches />
          </div>
        </section>
        
        {/* Featured Tournaments Section */}
        <section id="tournaments" className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>
          <div className="relative">
            <FeaturedTournaments />
          </div>
        </section>
        
        {/* Top Players Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"></div>
          <div className="relative">
            <TopPlayers />
          </div>
        </section>
        
        {/* Latest News Section */}
        <section className="relative pb-32">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent"></div>
          <div className="relative">
            <LatestNews />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;