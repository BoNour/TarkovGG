import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
      <div className="p-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-700 rounded mb-8 mx-auto"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96 bg-gray-700 rounded"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-700 rounded"></div>
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

  return (
    <section className="py-10 bg-gray-700/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest News</h2>
          <Link to="/news" className="flex items-center text-sm text-gray-400 hover:text-white transition">
            View all news
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured News */}
          <div className="lg:col-span-2">
            <div className="bg-gray-700/30 rounded-lg overflow-hidden shadow-md h-full">
              <Link to={`/news/${featuredNews.id}`}>
                <img 
                  src={featuredNews.image} 
                  alt={featuredNews.title}
                  className="w-full h-64 object-cover object-center"
                />
              </Link>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {featuredNews.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-600/30 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link to={`/news/${featuredNews.id}`}>
                  <h3 className="text-2xl font-bold mb-3 hover:text-gray-300 transition">
                    {featuredNews.title}
                  </h3>
                </Link>
                
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {featuredNews.content}
                </p>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    By {featuredNews.author} • {new Date(featuredNews.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  
                  <Link 
                    to={`/news/${featuredNews.id}`}
                    className="text-sm bg-gray-600/30 hover:bg-gray-600/50 py-1 px-3 rounded transition"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent News */}
          <div className="space-y-4">
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