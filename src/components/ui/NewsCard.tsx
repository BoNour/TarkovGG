import React from 'react';
import { Link } from 'react-router-dom';
import { News } from '../../types';

interface NewsCardProps {
  news: News;
  variant?: 'compact' | 'full';
}

const NewsCard: React.FC<NewsCardProps> = ({ news, variant = 'full' }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:transform hover:scale-[1.02] border" 
         style={{ 
           backgroundColor: 'rgba(255, 255, 255, 0.03)', 
           borderColor: 'rgba(255, 255, 255, 0.1)' 
         }}>
      <div className="relative">
        <img 
          src={news.image} 
          alt={news.title} 
          className={`w-full ${variant === 'full' ? 'h-48' : 'h-32'} object-cover object-center transition-transform duration-700 hover:scale-110`}
        />
        {variant === 'compact' && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-3">
            <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight">{news.title}</h3>
            <p className="text-xs text-gray-200 mt-1">{formatDate(news.date)}</p>
          </div>
        )}
      </div>
      
      {variant === 'full' && (
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {news.tags.map((tag, index) => (
              <span key={index} className="text-xs px-3 py-1.5 rounded-full font-medium"
                    style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#10b981' }}>
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="text-lg font-bold mb-3 text-white hover:text-green-400 transition-colors duration-300">{news.title}</h3>
          
          <p className="text-sm text-gray-300 mb-4 line-clamp-3 leading-relaxed">
            {news.content}
          </p>
          
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400">
              By {news.author} • {formatDate(news.date)}
            </p>
            
            <Link 
              to={`/news/${news.id}`} 
              className="text-xs py-1.5 px-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
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
      )}
    </div>
  );
};

export default NewsCard;