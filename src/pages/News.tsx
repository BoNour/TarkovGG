import React from 'react';
import { useGameData } from '../context/GameDataContext';
import NewsCard from '../components/ui/NewsCard';
import { Search, Newspaper, Filter } from 'lucide-react';

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
      <div className="min-h-screen" style={{ backgroundColor: '#1a1b1b' }}>
        {/* Animated background orbs for loading */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-green-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/12 to-pink-500/12 rounded-full blur-2xl animate-pulse delay-1000 opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-6 py-20 relative z-20">
          <div className="animate-pulse">
            <div className="h-16 w-80 rounded-2xl mb-12 mx-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
            <div className="h-16 rounded-2xl mb-12 max-w-md mx-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 rounded-2xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1b1b' }}>
      {/* Modern Hero Section */}
      <section className="relative min-h-[calc(50vh-100px)] flex items-center justify-center overflow-hidden pt-20">
        {/* Background with overlay */}
        <div 
          className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat scale-105"
          style={{ 
            backgroundImage: "url('/BACKGROUND.png')" 
          }}
        ></div>
        
        {/* Modern gradient overlay */}
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(135deg, rgba(26, 27, 27, 0.95) 0%, rgba(26, 27, 27, 0.85) 50%, rgba(26, 27, 27, 0.95) 100%)' }}></div>
        
        {/* Animated background orbs */}
        <div className="absolute inset-0 z-20">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-green-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-blue-500/12 to-purple-500/12 rounded-full blur-2xl animate-pulse delay-1000 opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-500/8 to-green-500/8 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-6 py-20 relative z-30 h-full flex flex-col">
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            {/* Main headline */}
            <div className="space-y-4 animate-fade-in-up">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white">
                  LATEST
                </span>
                <span className="block text-white mt-2">
                  NEWS
                </span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content sections with modern spacing */}
      <div className="relative" style={{ backgroundColor: '#1a1b1b' }}>
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/3 to-transparent"></div>
        
        <div className="max-w-none mx-auto px-4 lg:px-8 xl:px-12 py-16 relative">
          {/* Modern Search Section */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-16 space-y-6 lg:space-y-0">
            <div className="space-y-4">
              <h2 className="text-5xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                Browse Articles
              </h2>
              <p className="text-xl text-gray-400 font-light max-w-2xl">
                Stay updated with the latest news, updates, and announcements
              </p>
            </div>
            
            {/* Modern search bar */}
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
                             <input
                 type="text"
                 placeholder="Search articles..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="block w-full pl-12 pr-4 py-4 rounded-2xl border text-white text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                  borderColor: 'rgba(255, 255, 255, 0.15)' 
                }}
                onFocus={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.4)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                }}
              />
            </div>
          </div>

          {/* Results count with modern styling */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-300 text-lg font-medium">
                  Showing {sortedNews.length} of {news.length} articles
                </p>
                <p className="text-gray-500 text-sm">
                  Updated news and announcements
                </p>
              </div>
            </div>
          </div>

          {/* News grid with modern spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedNews.map(item => (
              <div key={item.id} className="relative">
                <NewsCard news={item} variant="full" />
              </div>
            ))}
          </div>

          {/* Enhanced no results state */}
          {sortedNews.length === 0 && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center border" 
                     style={{ 
                       background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                       borderColor: 'rgba(255, 255, 255, 0.1)'
                     }}>
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-200 mb-4">No articles found</h3>
                <p className="text-gray-300 leading-relaxed mb-8">
                  Try adjusting your search terms or browse all available articles
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="group px-8 py-4 backdrop-blur-sm border rounded-2xl font-semibold text-white text-lg transition-all duration-300 hover:border-white/30"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                  }}
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;