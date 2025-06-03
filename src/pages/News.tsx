import React from 'react';
import { useGameData } from '../context/GameDataContext';
import NewsCard from '../components/ui/NewsCard';
import { Search } from 'lucide-react';

const News: React.FC = () => {
  const { news, isLoading } = useGameData();
  const [searchTerm, setSearchTerm] = React.useState('');

  // Filter news based on search term
  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sort news by date (most recent first)
  const sortedNews = [...filteredNews].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-10 w-48 bg-gray-700 rounded mb-8"></div>
          <div className="h-12 bg-gray-700 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Latest News</h1>

      {/* Search bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Results count */}
      <p className="text-gray-400 mb-6">
        Showing {sortedNews.length} of {news.length} articles
      </p>

      {/* News grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedNews.map(item => (
          <NewsCard key={item.id} news={item} variant="full" />
        ))}
      </div>

      {sortedNews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No news articles found. Try adjusting your search.</p>
        </div>
      )}
    </div>
  );
};

export default News;