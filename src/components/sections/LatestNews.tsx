import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Newspaper, Star } from 'lucide-react';
import { useGameData } from '../../context/GameDataContext';
import NewsCard from '../ui/NewsCard';

const LatestNews: React.FC = () => {
  const { news, isLoading } = useGameData();
  
  // Sort news by date (most recent first)
  const sortedNews = [...news].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Get featured news (most recent) - top row
  const featuredNews = sortedNews[0];
  
  // Get the rest of the news for the 3 rows (6 articles, 2 per row)
  const rowNews = sortedNews.slice(1, 7);

  if (isLoading) {
    return (
      <div className="py-24" style={{ backgroundColor: 'transparent' }}>
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-48 rounded mb-8 mx-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
            {/* Featured article skeleton */}
            <div className="h-80 rounded-2xl mb-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}></div>
            {/* Row articles skeleton */}
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-48 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}></div>
                  <div className="h-48 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!featuredNews) {
    return null;
  }

  // Group row news into pairs for the 3 rows
  const newsRows = [];
  for (let i = 0; i < rowNews.length; i += 2) {
    newsRows.push(rowNews.slice(i, i + 2));
  }

  return (
    <section className="py-0 relative" style={{ backgroundColor: 'transparent' }}>      
      <div className="max-w-none mx-auto px-0 relative">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-12 space-y-6 lg:space-y-0">
          <div className="space-y-4">
            <h2 className="text-4xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
              Latest News
            </h2>
          </div>
          
          {/* Modern call to action */}
          <Link 
            to="/news" 
            className="group relative inline-flex items-center space-x-4 overflow-hidden bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
          >
            <span className="relative z-10">View All News</span>
            <div className="relative z-10 w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center">
              <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform duration-300" />
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </Link>
        </div>
        
        {/* News Grid Layout */}
        <div className="space-y-8">
          {/* Row 1: Featured Article (Full Width) */}
          <div className="w-full">
            <div className="rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:transform hover:scale-[1.02] border" 
                 style={{ 
                   backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                   borderColor: 'rgba(255, 255, 255, 0.1)' 
                 }}>
              <Link to={`/news/${featuredNews.id}`} className="block">
                <img 
                  src={featuredNews.image} 
                  alt={featuredNews.title}
                  className="w-full h-64 object-cover object-center transition-transform duration-700 hover:scale-110"
                />
              </Link>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredNews.tags.map((tag, index) => (
                    <span key={index} className="text-xs px-3 py-1.5 rounded-full font-medium"
                          style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#10b981' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link to={`/news/${featuredNews.id}`}>
                  <h3 className="text-2xl font-bold mb-4 text-white hover:text-green-400 transition-colors duration-300">
                    {featuredNews.title}
                  </h3>
                </Link>
                
                <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                  {featuredNews.content}
                </p>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-400">
                    By {featuredNews.author} • {new Date(featuredNews.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  
                  <Link 
                    to={`/news/${featuredNews.id}`}
                    className="text-sm py-2 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#10b981' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.15)';
                    }}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Rows 2-4: Two Articles Side by Side */}
          {newsRows.map((rowPair, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rowPair.map((article, articleIndex) => (
                <div key={article.id} className="w-full">
                  <div className="rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:transform hover:scale-[1.02] border h-full" 
                       style={{ 
                         backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                         borderColor: 'rgba(255, 255, 255, 0.1)' 
                       }}>
                    <Link to={`/news/${article.id}`} className="block">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-48 object-cover object-center transition-transform duration-700 hover:scale-110"
                      />
                    </Link>
                    
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="text-xs px-2 py-1 rounded-full font-medium"
                                style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#10b981' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <Link to={`/news/${article.id}`} className="flex-grow">
                        <h4 className="text-lg font-bold mb-3 text-white hover:text-green-400 transition-colors duration-300 line-clamp-2">
                          {article.title}
                        </h4>
                      </Link>
                      
                      <p className="text-gray-300 mb-4 line-clamp-2 text-sm leading-relaxed flex-grow">
                        {article.content}
                      </p>
                      
                      <div className="flex justify-between items-center mt-auto">
                        <p className="text-xs text-gray-400">
                          By {article.author}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;