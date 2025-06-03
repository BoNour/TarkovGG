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
    <div className="bg-gray-700/30 rounded-lg overflow-hidden shadow-md transition-transform hover:transform hover:scale-[1.02]">
      <div className="relative">
        <img 
          src={news.image} 
          alt={news.title} 
          className={`w-full ${variant === 'full' ? 'h-48' : 'h-32'} object-cover object-center`}
        />
        {variant === 'compact' && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-3">
            <h3 className="text-sm font-bold text-white line-clamp-2">{news.title}</h3>
            <p className="text-xs text-gray-300">{formatDate(news.date)}</p>
          </div>
        )}
      </div>
      
      {variant === 'full' && (
        <div className="p-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {news.tags.map((tag, index) => (
              <span key={index} className="bg-gray-600/30 text-xs px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="text-lg font-bold mb-2">{news.title}</h3>
          
          <p className="text-sm text-gray-400 mb-3 line-clamp-3">
            {news.content}
          </p>
          
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">
              By {news.author} • {formatDate(news.date)}
            </p>
            
            <Link 
              to={`/news/${news.id}`} 
              className="text-xs bg-gray-600/30 hover:bg-gray-600/50 py-1 px-3 rounded transition"
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