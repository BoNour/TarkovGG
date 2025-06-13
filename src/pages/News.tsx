import React, { useState, useEffect } from 'react';
import { useGameData } from '../context/GameDataContext';
import NewsCard from '../components/ui/NewsCard';
import { Search, Newspaper, Filter, Globe, Calendar, Tag, Eye, ArrowRight } from 'lucide-react';

const News: React.FC = () => {
  const { news, isLoading } = useGameData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'updates', name: 'Game Updates' },
    { id: 'tournaments', name: 'Tournaments' },
    { id: 'esports', name: 'Esports' },
    { id: 'community', name: 'Community' }
  ];

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Filter news based on search term and category
  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           item.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    return matchesSearch && matchesCategory;
  });

  // Sort news by date (most recent first)
  const sortedNews = [...filteredNews].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#101012' }}>
        {/* Background Image */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: "url('/BACKGROUND.png')"
          }}
        ></div>
        
        {/* Vignette overlay */}
        <div 
          className="fixed inset-0 z-10" 
          style={{ 
            background: 'radial-gradient(circle at center, transparent 20%, rgba(16, 16, 18, 0.8) 60%, rgba(16, 16, 18, 1) 90%)',
          }}
        ></div>

        <div className="relative z-30 pt-8">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="animate-pulse space-y-8">
              <div className="h-16 w-64 backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 backdrop-blur-3xl bg-white/5 border border-white/10 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#101012' }}>
      {/* Background Image - Fixed behind all content */}
      <div 
        className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 ease-out"
        style={{ 
          backgroundImage: "url('/BACKGROUND.png')",
          transform: `scale(1.05) translate(${mousePosition.x / -100}px, ${mousePosition.y / -100}px)`,
        }}
      ></div>
      
      {/* Single, refined vignette overlay */}
      <div 
        className="fixed inset-0 z-10" 
        style={{ 
          background: 'radial-gradient(circle at center, transparent 20%, rgba(16, 16, 18, 0.8) 60%, rgba(16, 16, 18, 1) 90%)',
        }}
      ></div>
      
      {/* Subtle background orbs - no colors */}
      <div className="fixed inset-0 z-20">
        {/* Neutral floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-white/5 to-gray-500/5 rounded-full blur-3xl opacity-30" style={{animation: 'slow-float-1 15s ease-in-out infinite'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-gray-500/5 to-white/5 rounded-full blur-3xl opacity-20" style={{animation: 'slow-float-2 18s ease-in-out infinite'}}></div>
        <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-gradient-to-r from-gray-400/5 to-gray-600/5 rounded-full blur-3xl opacity-15" style={{animation: 'slow-float-3 20s ease-in-out infinite', transform: 'translate(-50%, -50%)'}}></div>

        {/* Mouse-aware orb - neutral */}
        <div 
          className="absolute w-[200px] h-[200px] bg-gradient-to-r from-white/10 to-gray-400/10 rounded-full blur-2xl opacity-40 transition-transform duration-300 ease-out"
          style={{ 
            transform: `translate(${mousePosition.x - 100}px, ${mousePosition.y - 100}px)`
          }}
        ></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-30 min-h-screen">
        
        {/* Minimalist Header Section */}
        <header className="py-12 relative">
          <div className="max-w-[95vw] mx-auto px-4">
            {/* Main Header Container */}
            <div className="glass-panel rounded-3xl p-12 relative overflow-hidden">
              {/* Subtle Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/3 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/2 rounded-full blur-xl"></div>
              
              {/* Header Content */}
              <div className="relative z-10">
                {/* Centered Title Section */}
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-white leading-none">
                    Latest News
                  </h1>
                </div>

                {/* Centered Category Navigation */}
                <div className="flex justify-center mt-12">
                  <div className="flex items-center bg-black/30 p-2 rounded-2xl border border-white/10 backdrop-blur-sm overflow-x-auto">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                          selectedCategory === category.id 
                            ? 'bg-white/12 text-white border border-white/20 shadow-xl' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Newspaper className="w-4 h-4" />
                        <span>{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Section */}
                <div className="flex justify-center mt-8">
                  <div className="relative max-w-md w-full">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="glass-input block w-full pl-12 pr-4 py-4 rounded-2xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <section className="pb-6">
          <div className="max-w-[1850px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">

            {/* News Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {sortedNews.map((article, index) => (
                <div 
                  key={article.id}
                  className="group block rounded-3xl transition-all duration-500 ease-in-out hover:-translate-y-2 hover:bg-white/[0.08] overflow-hidden border border-white/10 hover:border-purple-400/30 relative backdrop-blur-3xl bg-white/[0.03] hover:shadow-2xl hover:shadow-purple-500/10 h-full"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 50}ms both`,
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Frosted layer */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-white/[0.01] rounded-3xl"></div>
                  
                  {/* Date Badge - top left */}
                  <div className="absolute top-6 left-6 text-sm font-semibold px-4 py-2 rounded-full bg-black/30 text-white backdrop-blur-xl border border-white/10 z-10">
                    {formatDate(article.date)}
                  </div>

                  {/* Read More - top right */}
                  <div className="absolute top-6 right-6 flex items-center space-x-2 text-blue-400 group-hover:text-blue-300 transition-colors z-10 opacity-0 group-hover:opacity-100 duration-300">
                    <span className="text-sm font-medium">Read More</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  
                  <div className="relative flex flex-col h-full">
                    {/* Image Section */}
                    <div className="h-48 relative bg-white/[0.03] overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent z-10"></div>
                      <img 
                        src={article.image || "/News/news-placeholder.png"}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                    </div>

                    {/* Content Section */}
                    <div className="p-8 flex-1 flex flex-col relative min-h-0">
                      <div className="flex-1 flex flex-col min-h-0">
                        {/* Article Title */}
                        <div className="mb-4 flex-shrink-0">
                          <h3 className="font-bold text-xl text-white group-hover:text-purple-300 transition-colors mb-3 leading-tight line-clamp-2">
                            {article.title}
                          </h3>
                        </div>

                        {/* Article Content Preview */}
                        <div className="flex-1 min-h-0 mb-6">
                          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                            {article.content}
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="flex-shrink-0">
                          <div className="flex flex-wrap gap-2">
                            {article.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span 
                                key={tagIndex}
                                className="px-3 py-1 text-xs font-medium bg-white/10 text-gray-300 rounded-full backdrop-blur-sm border border-white/10"
                              >
                                {tag}
                              </span>
                            ))}
                            {article.tags.length > 3 && (
                              <span className="px-3 py-1 text-xs font-medium bg-white/10 text-gray-300 rounded-full backdrop-blur-sm border border-white/10">
                                +{article.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Article ID Watermark */}
                      <span className="absolute bottom-4 right-6 font-black text-white/[0.05] pointer-events-none select-none text-2xl transition-all duration-500 group-hover:text-white/[0.08] group-hover:scale-105">
                        {article.title.split(' ')[0].toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {sortedNews.length === 0 && (
              <div 
                className="relative group rounded-3xl backdrop-blur-3xl bg-white/[0.03] border border-white/10"
                style={{
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Frosted layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-white/[0.01] rounded-3xl"></div>
                
                {/* Content container */}
                <div className="relative text-center py-20 px-8">
                  <div className="w-24 h-24 backdrop-blur-2xl bg-white/[0.05] border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Newspaper className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">No articles found</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    {searchTerm || selectedCategory !== 'all'
                      ? "Try adjusting your search criteria or category filters to find articles."
                      : "Check back soon for the latest news and updates."
                    }
                  </p>
                  {(searchTerm || selectedCategory !== 'all') && (
                    <button
                      onClick={clearFilters}
                      className="px-6 py-3 backdrop-blur-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-white/10 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        <style>{`
          @keyframes slow-float-1 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(40px, -60px); }
          }
          @keyframes slow-float-2 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-50px, 50px); }
          }
          @keyframes slow-float-3 {
            0%, 100% { transform: translate(-50%, -50%); }
            50% { transform: translate(-45%, -55%); }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .glass-panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 
              0 8px 32px 0 rgba(0, 0, 0, 0.37),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
          }
          
          .glass-input {
            background: rgba(255, 255, 255, 0.04);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
          }
          
          .glass-input:focus {
            background: rgba(255, 255, 255, 0.06);
            border-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
          }
          
          .glass-button {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
          }
          
          .glass-button:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.15);
            transform: translateY(-1px);
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </div>
  );
};

export default News;