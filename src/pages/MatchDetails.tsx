import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGameData } from '../context/GameDataContext';
import { ArrowLeft, Map, BarChart2 } from 'lucide-react';

const MatchDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { matches, teams, players, isLoading } = useGameData();
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
  
  const match = matches.find(m => m.id === id);
  
  const teamOne = match ? teams.find(t => t.id === match.teamOneId) : undefined;
  const teamTwo = match ? teams.find(t => t.id === match.teamTwoId) : undefined;
  
  const teamOnePlayers = players.filter(p => p.teamId === match?.teamOneId);
  const teamTwoPlayers = players.filter(p => p.teamId === match?.teamTwoId);

  if (isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#101012' }}>
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: "url('/BACKGROUND.png')"
          }}
        ></div>
        <div 
          className="fixed inset-0 z-10" 
          style={{ 
            background: 'radial-gradient(circle at center, transparent 20%, rgba(16, 16, 18, 0.8) 60%, rgba(16, 16, 18, 1) 90%)',
          }}
        ></div>
        <div className="relative z-30 pt-8">
          <div className="max-w-none mx-[14%] px-6 py-20">
          <div className="animate-pulse space-y-8">
              <div className="h-10 w-48 backdrop-blur-3xl bg-white/5 border border-white/10 rounded-xl mb-8"></div>
              <div className="h-48 backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl mb-8"></div>
              <div className="h-64 backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl mb-8"></div>
              <div className="h-96 backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!match || !teamOne || !teamTwo) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#101012' }}>
         <div className="relative z-30 flex items-center justify-center min-h-screen">
          <div className="glass-panel text-center p-12 rounded-3xl">
            <h1 className="text-4xl font-bold mb-4 text-white">Match Not Found</h1>
            <p className="text-gray-400 mb-8 max-w-md">
              The match you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/matches" 
              className="glass-button inline-flex items-center text-white px-6 py-3 rounded-xl font-semibold transition group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to All Matches
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isLive = match.status === 'live';
  const isCompleted = match.status === 'completed';

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#101012' }}>
      <div 
        className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 ease-out"
        style={{ 
          backgroundImage: "url('/BACKGROUND.png')",
          transform: `scale(1.05) translate(${mousePosition.x / -100}px, ${mousePosition.y / -100}px)`,
        }}
      ></div>
      <div 
        className="fixed inset-0 z-10" 
        style={{ 
          background: 'radial-gradient(circle at center, transparent 20%, rgba(16, 16, 18, 0.8) 60%, rgba(16, 16, 18, 1) 90%)',
        }}
      ></div>
      <div className="fixed inset-0 z-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-white/5 to-gray-500/5 rounded-full blur-3xl opacity-30" style={{animation: 'slow-float-1 15s ease-in-out infinite'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-gray-500/5 to-white/5 rounded-full blur-3xl opacity-20" style={{animation: 'slow-float-2 18s ease-in-out infinite'}}></div>
        <div 
          className="absolute w-[200px] h-[200px] bg-gradient-to-r from-white/10 to-gray-400/10 rounded-full blur-2xl opacity-40 transition-transform duration-300 ease-out"
          style={{ 
            transform: `translate(${mousePosition.x - 100}px, ${mousePosition.y - 100}px)`
          }}
        ></div>
      </div>
      
      <style>{`
        @keyframes slow-float-1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(40px, -60px); } }
        @keyframes slow-float-2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-50px, 50px); } }
        .glass-panel { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.05); }
        .glass-button { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s ease; }
        .glass-button:hover { background: rgba(255, 255, 255, 0.08); border-color: rgba(255, 255, 255, 0.15); transform: translateY(-1px); }
      `}</style>
      
      <div className="relative z-30 max-w-none mx-[14%] px-4 py-12">
        <div className="mb-8">
          <Link to="/matches" className="glass-button inline-flex items-center text-gray-300 hover:text-white transition group px-4 py-2 rounded-xl">
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Matches
          </Link>
        </div>
        
        <div className="glass-panel rounded-3xl overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 flex flex-col items-center md:items-end">
                <Link to={`/teams/${teamOne.id}`} className="flex flex-col items-center text-center group">
                  <img 
                    src={teamOne.logo} 
                    alt={teamOne.name}
                    className="w-32 h-32 rounded-full border-4 border-white/10 group-hover:border-white/20 transition-all duration-300"
                  />
                  <h2 className="text-3xl font-bold mt-4 text-white group-hover:text-purple-300 transition-colors">{teamOne.name}</h2>
                  <p className="text-gray-400">{teamOne.tag}</p>
                </Link>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="text-7xl font-black tracking-tighter space-x-4">
                  <span className={match.teamOneScore >= match.teamTwoScore ? 'text-white' : 'text-gray-500'}>
                    {match.teamOneScore}
                  </span>
                  <span className="text-gray-600">:</span>
                  <span className={match.teamTwoScore >= match.teamOneScore ? 'text-white' : 'text-gray-500'}>
                    {match.teamTwoScore}
                  </span>
                </div>
                <div className="mt-3">
                  <span className={`px-3 py-1 text-sm font-bold rounded-full ${
                    isLive 
                      ? 'bg-red-500/20 text-red-300 animate-pulse' 
                      : isCompleted
                        ? 'bg-gray-500/20 text-gray-300'
                        : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    {match.status.toUpperCase()}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-400">
                  {new Date(match.date).toLocaleString('en-US', {
                    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </p>
              </div>
              
              <div className="flex-1 flex flex-col items-center md:items-start">
                 <Link to={`/teams/${teamTwo.id}`} className="flex flex-col items-center text-center group">
                  <img 
                    src={teamTwo.logo} 
                    alt={teamTwo.name}
                    className="w-32 h-32 rounded-full border-4 border-white/10 group-hover:border-white/20 transition-all duration-300"
                  />
                  <h2 className="text-3xl font-bold mt-4 text-white group-hover:text-purple-300 transition-colors">{teamTwo.name}</h2>
                  <p className="text-gray-400">{teamTwo.tag}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Twitch Stream/VOD Embed */}
        <div className="glass-panel rounded-3xl overflow-hidden mb-8">
          <div className={`p-4 border-b ${
            isCompleted 
              ? 'bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border-emerald-500/10' 
              : 'bg-gradient-to-r from-purple-500/10 to-purple-500/5 border-purple-500/10'
          }`}>
            <div className="text-center">
              <h3 className="text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
                {isCompleted ? (
                  <>
                    <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    MATCH VOD
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    LIVE STREAM
                  </>
                )}
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="aspect-video rounded-lg overflow-hidden bg-black/20 border border-white/10">
              <iframe
                src="https://player.twitch.tv/?channel=justlock_tv&parent=localhost&parent=www.example.com&autoplay=true&muted=false"
                height="100%"
                width="100%"
                allowFullScreen
                allow="autoplay; fullscreen"
                className="w-full h-full"
                title={isCompleted ? `Match VOD for ${teamOne.name} vs ${teamTwo.name}` : `Live stream for ${teamOne.name} vs ${teamTwo.name}`}
              />
            </div>
            <div className="mt-4 text-center">
              <a 
                href="https://www.twitch.tv/justlock_tv" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`glass-button inline-flex items-center text-white px-6 py-3 rounded-xl font-semibold transition group ${
                  isCompleted ? 'hover:bg-emerald-500/20' : 'hover:bg-purple-500/20'
                }`}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
                {isCompleted ? 'Watch VOD on Twitch' : 'Watch on Twitch'}
              </a>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <h2 className="text-4xl font-black tracking-tighter text-white">Overview</h2>
          
          <div className="glass-panel rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3"><Map className="text-blue-400" /> Maps</h3>
            <div className="space-y-4">
              {match.maps.map((map, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-white">{map.name}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-2xl font-bold">
                    <span className={map.teamOneScore >= map.teamTwoScore ? 'text-white' : 'text-gray-500'}>
                      {map.teamOneScore}
                    </span>
                    <span className="text-gray-600">:</span>
                    <span className={map.teamTwoScore >= map.teamOneScore ? 'text-white' : 'text-gray-500'}>
                      {map.teamTwoScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-panel rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3"><BarChart2 className="text-green-400" /> Player Statistics</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-400 border-b border-white/10">
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider">Player</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider">Rating</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider">K</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider">D</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider">A</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider">+/-</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider">KOST</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider">HS%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td colSpan={8} className="px-4 py-3">
                      <div className="flex items-center font-bold text-white">
                        <img 
                          src={teamOne.logo} 
                          alt={teamOne.name} 
                          className="w-8 h-8 rounded-full mr-3 border-2 border-white/10"
                        />
                        {teamOne.name}
                      </div>
                    </td>
                  </tr>
                  {teamOnePlayers.map(player => (
                    <tr key={player.id} className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <Link 
                          to={`/players/${player.id}`}
                          className="flex items-center group"
                        >
                          <img 
                            src={player.image} 
                            alt={player.nickname}
                            className="w-10 h-10 rounded-full mr-4 border-2 border-white/10 group-hover:border-purple-400/50 transition-colors"
                          />
                          <div>
                            <div className="font-bold text-white group-hover:text-purple-300 transition-colors">{player.nickname}</div>
                            <div className="text-sm text-gray-400">{player.realName}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        <span className={
                          player.stats.rating >= 1.1 
                            ? 'text-green-400' 
                            : player.stats.rating < 0.9 
                              ? 'text-red-400' 
                              : 'text-yellow-400'
                        }>
                          {player.stats.rating.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white">{player.stats.kpr}</td>
                      <td className="px-4 py-3 text-white">{player.stats.srv}</td>
                      <td className="px-4 py-3 text-white">{player.stats.plants}</td>
                      <td className="px-4 py-3 text-white">{player.stats.headshots}</td>
                      <td className="px-4 py-3 text-white">{(player.stats.kost * 100).toFixed(0)}%</td>
                      <td className="px-4 py-3 text-white">{player.stats.attack}%</td>
                    </tr>
                  ))}
                  
                  <tr className="border-b border-white/10">
                    <td colSpan={8} className="px-4 py-3">
                      <div className="flex items-center font-bold text-white">
                        <img 
                          src={teamTwo.logo} 
                          alt={teamTwo.name} 
                          className="w-8 h-8 rounded-full mr-3 border-2 border-white/10"
                        />
                        {teamTwo.name}
                      </div>
                    </td>
                  </tr>
                  {teamTwoPlayers.map(player => (
                     <tr key={player.id} className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <Link 
                          to={`/players/${player.id}`}
                          className="flex items-center group"
                        >
                          <img 
                            src={player.image} 
                            alt={player.nickname}
                            className="w-10 h-10 rounded-full mr-4 border-2 border-white/10 group-hover:border-purple-400/50 transition-colors"
                          />
                          <div>
                            <div className="font-bold text-white group-hover:text-purple-300 transition-colors">{player.nickname}</div>
                            <div className="text-sm text-gray-400">{player.realName}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        <span className={
                          player.stats.rating >= 1.1 
                            ? 'text-green-400' 
                            : player.stats.rating < 0.9 
                              ? 'text-red-400' 
                              : 'text-yellow-400'
                        }>
                          {player.stats.rating.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white">{player.stats.kpr}</td>
                      <td className="px-4 py-3 text-white">{player.stats.srv}</td>
                      <td className="px-4 py-3 text-white">{player.stats.plants}</td>
                      <td className="px-4 py-3 text-white">{player.stats.headshots}</td>
                      <td className="px-4 py-3 text-white">{(player.stats.kost * 100).toFixed(0)}%</td>
                      <td className="px-4 py-3 text-white">{player.stats.attack}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails; 