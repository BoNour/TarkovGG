import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { SiTwitch, SiX } from 'react-icons/si';

const NewsArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Dummy data for the article
  const article = {
    title: "Tarkov GG Unveils New Arena Mode and Upcoming Tournament",
    author: "Jane Doe",
    date: "October 26, 2023",
    imageUrl: "/Tournaments/lega3.png", // Updated to correct path
    paragraphs: [
      "In a move that has sent ripples through the Escape from Tarkov community, developer Battlestate Games has officially unveiled the highly-anticipated Arena mode. This new standalone game project, linked with the main Escape from Tarkov game, will offer players a dedicated competitive experience. The developers promise a mix of intense gunplay, tactical depth, and a ranking system designed to cater to both seasoned veterans and newcomers looking to test their skills in a more structured environment. The announcement was accompanied by a gameplay trailer showcasing the frantic, close-quarters combat that will define the Arena.",
      "Alongside the Arena reveal, Tarkov GG is excited to announce the 'First Blood' tournament, an inaugural event designed to celebrate the launch. The tournament will feature a substantial prize pool and invite some of the biggest names in the streaming and competitive scene to battle for supremacy. 'We wanted to create an event that not only showcases the raw skill involved in Tarkov's combat but also brings the community together,' said a spokesperson for Tarkov GG. 'The Arena provides the perfect platform for this, and we can't wait to see the strategies and top-tier plays that emerge.' Registration for the tournament qualifiers will open next month, with more details to follow on the official Tarkov GG website."
    ],
    authorDetails: {
      name: "Alex 'The Vandal' Vance",
      avatarUrl: "/author-avatar.png", // Replace with author's avatar
      bio: "A seasoned journalist in the tactical shooter scene, Alex has been covering the highs and lows of Tarkov since its early alpha days. When not writing, he's probably lost in the Woods.",
      socials: {
        x: "https://x.com/tarkovgg",
        twitch: "https://twitch.tv/tarkovgg",
        instagram: "https://instagram.com/tarkovgg"
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#101012' }}>
      {/* Background Image & Effects */}
      <div 
        className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat transition-transform duration-1000 ease-out"
        style={{ 
          backgroundImage: "url('/BACKGROUND.png')",
          transform: `scale(1.02) translate(${mousePosition.x / -200}px, ${mousePosition.y / -200}px)`,
        }}
      ></div>
      <div 
        className="fixed inset-0 z-10" 
        style={{ 
          background: 'radial-gradient(circle at center, transparent 20%, rgba(16, 16, 18, 0.8) 60%, rgba(16, 16, 18, 1) 90%)',
        }}
      ></div>

      {/* Content */}
      <div className="relative z-30 pt-16 pb-24 text-white">
        <div className="max-w-none mx-[14%] px-4 lg:px-8">
          
          {/* Main Article Container */}
          <div 
            className="relative p-8 md:p-12 rounded-3xl mb-16"
            style={{
              backgroundColor: 'rgba(16, 16, 18, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
          >
            {/* Article Image - Now at the top */}
            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
              <img src={article.imageUrl} alt={article.title} className="w-full h-64 md:h-80 lg:h-96 object-cover" />
            </div>

            {/* Article Header - Now after image */}
            <header className="mb-16 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6 text-white">{article.title}</h1>
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <span className="text-base">Posted on</span>
                <span className="text-base font-semibold text-white">{article.date}</span>
                <span className="text-base">by</span>
                <span className="text-base font-semibold text-white">{article.author}</span>
              </div>
            </header>

            {/* Article Content */}
            <article className="max-w-none mx-auto">
              {article.paragraphs.map((p, index) => (
                <p key={index} className="text-lg md:text-xl leading-relaxed md:leading-loose text-gray-200 mb-8 font-light">
                  {p}
                </p>
              ))}
            </article>
          </div>

          {/* Divider */}
          <hr className="my-16 border-gray-800" />

          {/* Author Banner */}
          <div 
            className="relative p-8 rounded-3xl"
            style={{
              backgroundColor: 'rgba(24, 24, 27, 0.7)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="flex flex-col sm:flex-row items-center">
              <img src={article.authorDetails.avatarUrl} alt={article.authorDetails.name} className="w-24 h-24 rounded-full mr-0 sm:mr-8 mb-6 sm:mb-0 border-4 border-gray-700 shadow-lg" />
              <div className="text-center sm:text-left">
                <h4 className="text-2xl font-bold text-white mb-1">{article.authorDetails.name}</h4>
                <p className="text-gray-400 mb-4">{article.authorDetails.bio}</p>
                <div className="flex justify-center sm:justify-start space-x-4">
                  <a href={article.authorDetails.socials.x} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><SiX className="w-6 h-6" /></a>
                  <a href={article.authorDetails.socials.twitch} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><SiTwitch className="w-6 h-6" /></a>
                  <a href={article.authorDetails.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Instagram className="w-6 h-6" /></a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NewsArticle; 