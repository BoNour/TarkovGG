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
  
  // Get featured news (most recent)
  const featuredNews = sortedNews[0];
  
  // Get the rest of the recent news
  const recentNews = sortedNews.slice(1, 4);

  if (isLoading) {
    return (
      <div className="py-24" style={{ backgroundColor: '#1a1b1b' }}>
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-48 rounded mb-8 mx-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-96 rounded-2xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!featuredNews) {
    return null;
  }

  return (
    <section className="py-24 relative" style={{ backgroundColor: '#1a1b1b' }}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/3 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative">
        {/* Modern section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-4 mb-8">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <Newspaper className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <h2 className="text-5xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
              Latest News
            </h2>
          </div>
          <p className="text-xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed mb-10">
            Stay informed with the latest updates, announcements, and stories from the gaming world
          </p>
          
          {/* Modern call to action */}
          <Link 
            to="/news" 
            className="group relative inline-flex items-center space-x-4 overflow-hidden bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
          >
            <span className="relative z-10">View All News</span>
            <div className="relative z-10 w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" />
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Featured News */}
          <div className="lg:col-span-2">
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
              
              <div className="p-8">
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
          
          {/* Recent News */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white mb-6">Recent Articles</h4>
            {recentNews.map(item => (
              <NewsCard key={item.id} news={item} variant="compact" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;