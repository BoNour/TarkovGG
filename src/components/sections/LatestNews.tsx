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
  
  // Get the first 5 news articles to display
  const displayNews = sortedNews.slice(0, 5);

  if (isLoading) {
    return (
      <div className="py-24" style={{ backgroundColor: 'transparent' }}>
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-48 rounded mb-8 mx-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
            {/* Loading skeleton for articles */}
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-full mx-auto h-48 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}></div>
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
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-3xl font-black text-white">
              News
            </h2>
          </div>
        </div>
        
        {/* News Articles - Consistent sizing without button */}
        <div className="space-y-4">
          {displayNews.map((article, index) => (
            <div key={article.id} className="w-full">
              <Link 
                to={`/news/${article.id}`}
                className="block" 
              >
                <div className="relative group overflow-hidden rounded-xl transition-all duration-300 ease-in-out bg-gradient-to-br from-white/10 to-transparent hover:from-white/20">
                  <div className="relative bg-zinc-900/60 backdrop-blur-xl rounded-xl overflow-hidden">
                    {/* Image at top */}
                    <div className="relative">
                      <img 
                        src="/Tournaments/lega3.png" 
                        alt={article.title}
                        className="w-full h-48 object-cover object-center transition-all duration-300 group-hover:brightness-110"
                      />
                      {/* Tags overlay on image */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        {article.tags.filter(tag => !tagsToRemove.includes(tag)).slice(0, 2).map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm transition-all duration-300"
                                style={{ backgroundColor: 'rgba(34, 197, 94, 0.8)', color: 'white' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Content below image */}
                    <div className="p-4">
                      <h3 className="text-base font-bold text-white hover:text-green-400 transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Link 
          to="/news" 
          className="group flex items-center justify-end space-x-1 text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-300 mt-4"
        >
          <span>View All News</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
};

export default LatestNews;