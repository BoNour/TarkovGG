import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Newspaper, Star } from 'lucide-react';
import { useGameData } from '../../context/GameDataContext';
import NewsCard from '../ui/NewsCard';

const LatestNews: React.FC = () => {
  const { news, isLoading } = useGameData();
  const tagsToRemove = ['APAC', 'Stage 1', 'Tournament', 'R6 Siege', 'Season', 'Update', 'NAL', 'Warzone', 'Loadout', 'FFAR', 'FFAR 1'];
  
  // Sort news by date (most recent first)
  const sortedNews = [...news].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Get the first 8 news articles to display
  const displayNews = sortedNews.slice(0, 8);

  if (isLoading) {
    return (
      <div className="py-12" style={{ backgroundColor: 'transparent' }}>
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-6 w-32 rounded mb-6 mx-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
            {/* Loading skeleton for articles */}
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-full h-[90px] rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!displayNews.length) {
    return null;
  }

  return (
    <section className="py-0 relative" style={{ backgroundColor: 'transparent' }}>      
      <div className="max-w-none mx-auto relative">
        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black text-white flex items-center">
            <Newspaper className="w-6 h-6 mr-3 text-blue-400" />
            Latest News
          </h2>
          <Link 
            to="/news" 
            className="group flex items-center space-x-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-300"
          >
            <span>View All News</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
        
        {/* News Articles - Single Column Layout with consistent heights */}
        <div className="space-y-3">
          {displayNews.map((article, index) => (
            <div key={article.id} className="w-full">
              <Link 
                to={`/news/${article.id}`}
                className="block" 
              >
                <div className="relative group overflow-hidden rounded-lg transition-all duration-300 ease-in-out bg-gradient-to-br from-white/10 to-transparent hover:from-white/20">
                  <div className="relative bg-zinc-900/60 backdrop-blur-xl rounded-lg overflow-hidden">
                    {/* Horizontal layout with image on left - consistent height */}
                    <div className="flex h-[91px]">
                      <div className="w-1/3 flex-shrink-0">
                        <img 
                          src={index % 2 === 0 ? "/Tournaments/lega3.png" : "/Tournaments/hpl.png"} 
                          alt={article.title}
                          className={`w-full h-full transition-all duration-300 group-hover:brightness-110 ${
                            index % 2 === 0 ? 'object-cover' : 'object-contain'
                          }`}
                        />
                      </div>
                      
                      {/* Content on right */}
                      <div className="w-2/3 p-3 flex flex-col justify-center">
                        <div>
                          <h3 className="text-sm font-bold text-white hover:text-green-400 transition-colors duration-300 line-clamp-2 leading-tight">
                            {article.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LatestNews;