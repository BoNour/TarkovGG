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
            {/* Enhanced loading animation */}
            <div className="space-y-12">
              {/* Loading header */}
              <div className="glass-panel rounded-3xl p-12 relative overflow-hidden">
                <div className="animate-pulse flex items-center justify-center">
                  <div className="h-20 w-80 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-3xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>
              
              {/* Loading cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="glass-panel rounded-3xl overflow-hidden relative"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${i * 200}ms both`,
                      minHeight: '500px'
                    }}
                  >
                    <div className="animate-pulse">
                      {/* Image placeholder */}
                      <div className="h-72 bg-gradient-to-br from-white/10 via-white/5 to-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                      </div>
                      
                      {/* Content placeholder */}
                      <div className="p-10 space-y-6">
                        <div className="space-y-3">
                          <div className="h-8 bg-gradient-to-r from-white/10 to-white/5 rounded-xl w-3/4"></div>
                          <div className="h-6 bg-gradient-to-r from-white/5 to-white/10 rounded-lg w-1/2"></div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="h-4 bg-gradient-to-r from-white/5 to-white/10 rounded w-full"></div>
                          <div className="h-4 bg-gradient-to-r from-white/10 to-white/5 rounded w-5/6"></div>
                          <div className="h-4 bg-gradient-to-r from-white/5 to-white/10 rounded w-4/6"></div>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                          <div className="h-8 w-20 bg-gradient-to-r from-white/5 to-white/10 rounded-xl"></div>
                          <div className="h-8 w-24 bg-gradient-to-r from-white/10 to-white/5 rounded-xl"></div>
                          <div className="h-8 w-16 bg-gradient-to-r from-white/5 to-white/10 rounded-xl"></div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                <div className="flex flex-col items-center text-center mb-12">
                  <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-white leading-none">
                    Latest News
                  </h1>
                </div>

                {/* Category Navigation and Search Row */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Category Navigation */}
                  <div className="flex justify-center lg:justify-start">
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
                  <div className="flex justify-center lg:justify-end">
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
          </div>
        </header>

        {/* Content Section */}
        <section className="pb-6">
          <div className="max-w-[1850px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">

            {/* News Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {sortedNews.map((article, index) => (
                <article 
                  key={article.id}
                  className="group block rounded-3xl transition-all duration-700 ease-out hover:-translate-y-3 hover:bg-white/[0.08] overflow-hidden border border-white/10 hover:border-white/20 relative backdrop-blur-3xl bg-white/[0.03] hover:shadow-2xl hover:shadow-black/30 h-full cursor-pointer"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Enhanced Frosted layer with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent rounded-3xl transition-opacity duration-500 group-hover:opacity-150"></div>
                  
                  {/* Animated border glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
                  
                  {/* Enhanced Date Badge */}
                  <div className="absolute top-6 left-6 text-sm font-bold px-5 py-2 rounded-full bg-gradient-to-r from-black/40 to-black/20 text-white backdrop-blur-xl border border-white/20 z-20 transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-r group-hover:from-white/10 group-hover:to-white/5">
                    <Calendar className="w-3 h-3 inline-block mr-2" />
                    {formatDate(article.date)}
                  </div>

                  {/* Enhanced Read More indicator */}
                  <div className="absolute top-6 right-6 flex items-center space-x-2 text-white/60 group-hover:text-white transition-all z-20 opacity-0 group-hover:opacity-100 duration-500 transform translate-x-2 group-hover:translate-x-0">
                    <span className="text-sm font-medium bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">Read More</span>
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  <div className="relative flex flex-col h-full">
                    {/* Image Section */}
                    <div className="h-72 relative bg-white/[0.03] overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent z-10"></div>
                      <img 
                        src={article.image || "/News/news-placeholder.png"}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                    </div>

                    {/* Content Section */}
                    <div className="p-10 flex-1 flex flex-col relative min-h-0">
                      <div className="flex-1 flex flex-col min-h-0">
                        {/* Article Title */}
                        <div className="mb-6 flex-shrink-0">
                          <h3 className="font-black text-2xl xl:text-3xl text-white group-hover:text-white transition-all duration-300 mb-4 leading-tight line-clamp-2 group-hover:text-shadow-lg">
                            {article.title}
                          </h3>
                          {/* Subtle underline animation */}
                          <div className="w-0 h-0.5 bg-gradient-to-r from-white/40 to-transparent transition-all duration-500 group-hover:w-16"></div>
                        </div>

                        {/* Article Content Preview */}
                        <div className="flex-1 min-h-0 mb-8">
                          <p className="text-gray-300 text-lg leading-relaxed line-clamp-4 group-hover:text-gray-200 transition-colors duration-300">
                            {article.content}
                          </p>
                        </div>

                        {/* Enhanced Tags */}
                        <div className="flex-shrink-0">
                          <div className="flex flex-wrap gap-3">
                            {article.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span 
                                key={tagIndex}
                                className="group/tag px-4 py-2 text-sm font-semibold bg-gradient-to-r from-white/10 to-white/5 text-gray-200 rounded-xl backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10 cursor-pointer"
                              >
                                {tag}
                              </span>
                            ))}
                            {article.tags.length > 3 && (
                              <span className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-white/5 to-transparent text-gray-400 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
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
                </article>
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
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(40px, -60px) rotate(1deg); }
          }
          @keyframes slow-float-2 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(-50px, 50px) rotate(-1deg); }
          }
          @keyframes slow-float-3 {
            0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
            50% { transform: translate(-45%, -55%) rotate(0.5deg); }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes glow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          
          @keyframes bounce-gentle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          
          .animate-shimmer {
            animation: shimmer 2s infinite linear;
          }
          
          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }
          
          .animate-bounce-gentle {
            animation: bounce-gentle 3s ease-in-out infinite;
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
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .glass-input:focus {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.25);
            box-shadow: 
              0 0 0 4px rgba(255, 255, 255, 0.1),
              0 8px 24px rgba(0, 0, 0, 0.2);
            transform: translateY(-1px);
          }
          
          .glass-button {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }
          
          .glass-button:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          }
          
          .glass-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.1),
              transparent
            );
            transition: left 0.5s;
          }
          
          .glass-button:hover::before {
            left: 100%;
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
          
          .line-clamp-4 {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          /* Custom scrollbar for better UX */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            transition: background 0.3s ease;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
          }
          
          /* Enhanced text shadows and glows */
          .text-shadow-lg {
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }
          
          /* Responsive improvements */
          @media (max-width: 768px) {
            .glass-panel {
              backdrop-filter: blur(12px);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default News;