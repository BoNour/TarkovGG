import React from 'react';
import { Match, Team } from '../../types';

interface ChartProps {
  matches: Match[];
  teams: Team[];
}

// Line Chart Component
export const LineChart: React.FC<ChartProps & { type: 'basic' | 'double' | 'stepline' | 'dashed' }> = ({ 
  matches, teams, type 
}) => {
  // Generate time-based match data
  const timeData = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const matchesAtHour = matches.filter(match => 
      new Date(match.date).getHours() === hour
    ).length;
    return { hour, matches: matchesAtHour + Math.floor(Math.random() * 5) + 1 };
  });

  const maxMatches = Math.max(...timeData.map(d => d.matches), 1);

  return (
    <div className="bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 rounded-3xl p-6 border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white capitalize tracking-wide">{type}</h3>
          <p className="text-sm text-emerald-400 font-medium">↗ 41.67%</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">≡ 24</div>
        </div>
      </div>
      
      <div className="relative h-40 flex items-end justify-between px-3">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>≡ {Math.ceil(maxMatches)}</span>
          <span>≡ {Math.ceil(maxMatches * 0.75)}</span>
          <span>≡ {Math.ceil(maxMatches * 0.5)}</span>
          <span>≡ {Math.ceil(maxMatches * 0.25)}</span>
          <span>≡ 0</span>
        </div>
        
        {/* Chart area */}
        <div className="flex-1 ml-10 h-full relative">
          <svg className="w-full h-full" viewBox="0 0 200 100">
            <defs>
              <linearGradient id={`gradient-${type}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="30%" stopColor="#8b5cf6" />
                <stop offset="70%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id={`gradient-${type}-2`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            
            {type === 'basic' && (
              <path
                d={`M 0,${100 - (timeData[0].matches / maxMatches * 80)} ${timeData.map((d, i) => 
                  `L ${(i / (timeData.length - 1)) * 200},${100 - (d.matches / maxMatches * 80)}`
                ).join(' ')}`}
                fill="none"
                stroke={`url(#gradient-${type})`}
                strokeWidth="3"
                className="drop-shadow-lg"
              />
            )}
            
            {type === 'double' && (
              <>
                <path
                  d={`M 0,${100 - (timeData[0].matches / maxMatches * 80)} ${timeData.map((d, i) => 
                    `L ${(i / (timeData.length - 1)) * 200},${100 - (d.matches / maxMatches * 80)}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="3"
                  className="drop-shadow-md"
                />
                <path
                  d={`M 0,${100 - (timeData[0].matches / maxMatches * 60)} ${timeData.map((d, i) => 
                    `L ${(i / (timeData.length - 1)) * 200},${100 - ((d.matches * 0.8) / maxMatches * 60)}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="3"
                  className="drop-shadow-md"
                />
              </>
            )}
            
            {type === 'stepline' && (
              <path
                d={timeData.map((d, i) => {
                  const x = (i / (timeData.length - 1)) * 200;
                  const y = 100 - (d.matches / maxMatches * 80);
                  const nextX = ((i + 1) / (timeData.length - 1)) * 200;
                  return i === 0 ? `M ${x},${y}` : `H ${x} V ${y} ${i < timeData.length - 1 ? `H ${nextX}` : ''}`;
                }).join(' ')}
                fill="none"
                stroke={`url(#gradient-${type})`}
                strokeWidth="3"
                className="drop-shadow-lg"
              />
            )}
            
            {type === 'dashed' && (
              <path
                d={`M 0,${100 - (timeData[0].matches / maxMatches * 80)} ${timeData.map((d, i) => 
                  `L ${(i / (timeData.length - 1)) * 200},${100 - (d.matches / maxMatches * 80)}`
                ).join(' ')}`}
                fill="none"
                stroke={`url(#gradient-${type})`}
                strokeWidth="3"
                strokeDasharray="8,4"
                className="drop-shadow-lg"
              />
            )}
          </svg>
        </div>
        
        {/* X-axis labels */}
        <div className="absolute -bottom-6 left-10 right-0 flex justify-between text-xs text-gray-500">
          <span>1AM</span>
          <span>6AM</span>
          <span>12PM</span>
          <span>6PM</span>
          <span>11PM</span>
        </div>
      </div>
    </div>
  );
};

// Area Chart Component
export const AreaChart: React.FC<ChartProps & { type: 'gradient' | 'spline' | 'negative' | 'stacked' }> = ({ 
  matches, teams, type 
}) => {
  const liveData = matches.filter(m => m.status === 'live').length || 2;
  const upcomingData = matches.filter(m => m.status === 'upcoming').length || 3;
  const completedData = matches.filter(m => m.status === 'completed').length || 4;
  const total = liveData + upcomingData + completedData;

  // Generate sample data for visualization
  const timeData = Array.from({ length: 12 }, (_, i) => ({
    time: i,
    live: Math.max(1, liveData + Math.sin(i * 0.5) * 3 + Math.floor(Math.random() * 2)),
    upcoming: Math.max(1, upcomingData + Math.cos(i * 0.7) * 4 + Math.floor(Math.random() * 2)),
    completed: Math.max(1, completedData + Math.sin(i * 0.3) * 5 + Math.floor(Math.random() * 3))
  }));

  const maxValue = Math.max(...timeData.flatMap(d => [d.live, d.upcoming, d.completed]), 1);

  return (
    <div className="bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 rounded-3xl p-6 border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white capitalize tracking-wide">{type}</h3>
          <p className="text-sm text-emerald-400 font-medium">↗ 41.67%</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">≡ {total}</div>
        </div>
      </div>
      
      <div className="relative h-40 flex items-end justify-between px-3">
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>≡ {Math.ceil(maxValue)}</span>
          <span>≡ {Math.ceil(maxValue * 0.75)}</span>
          <span>≡ {Math.ceil(maxValue * 0.5)}</span>
          <span>≡ {Math.ceil(maxValue * 0.25)}</span>
          <span>≡ 0</span>
        </div>
        
        <div className="flex-1 ml-10 h-full relative">
          <svg className="w-full h-full" viewBox="0 0 200 100">
            <defs>
              <linearGradient id={`area-gradient-${type}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.9" />
                <stop offset="30%" stopColor="#8b5cf6" stopOpacity="0.7" />
                <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id={`area-gradient-${type}-live`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id={`area-gradient-${type}-upcoming`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id={`area-gradient-${type}-completed`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {type === 'stacked' ? (
              <>
                {/* Stacked areas with theme colors */}
                <path
                  d={`M 0,100 ${timeData.map((d, i) => 
                    `L ${(i / (timeData.length - 1)) * 200},${100 - (d.completed / maxValue * 80)}`
                  ).join(' ')} L 200,100 Z`}
                  fill="url(#area-gradient-stacked-completed)"
                />
                <path
                  d={`M 0,${100 - (timeData[0].completed / maxValue * 80)} ${timeData.map((d, i) => 
                    `L ${(i / (timeData.length - 1)) * 200},${100 - ((d.completed + d.upcoming) / maxValue * 80)}`
                  ).join(' ')} L 200,${100 - (timeData[timeData.length - 1].completed / maxValue * 80)} Z`}
                  fill="url(#area-gradient-stacked-upcoming)"
                />
                <path
                  d={`M 0,${100 - ((timeData[0].completed + timeData[0].upcoming) / maxValue * 80)} ${timeData.map((d, i) => 
                    `L ${(i / (timeData.length - 1)) * 200},${100 - ((d.completed + d.upcoming + d.live) / maxValue * 80)}`
                  ).join(' ')} L 200,${100 - ((timeData[timeData.length - 1].completed + timeData[timeData.length - 1].upcoming) / maxValue * 80)} Z`}
                  fill="url(#area-gradient-stacked-live)"
                />
              </>
            ) : (
              <path
                d={`M 0,100 ${timeData.map((d, i) => 
                  `L ${(i / (timeData.length - 1)) * 200},${100 - (d.live / maxValue * 80)}`
                ).join(' ')} L 200,100 Z`}
                fill={`url(#area-gradient-${type})`}
              />
            )}
            
            {/* Line on top */}
            <path
              d={`M 0,${100 - (timeData[0].live / maxValue * 80)} ${timeData.map((d, i) => 
                `L ${(i / (timeData.length - 1)) * 200},${100 - (d.live / maxValue * 80)}`
              ).join(' ')}`}
              fill="none"
              stroke="#ec4899"
              strokeWidth="3"
              className="drop-shadow-lg"
            />
          </svg>
        </div>
        
        <div className="absolute -bottom-6 left-10 right-0 flex justify-between text-xs text-gray-500">
          <span>1AM</span>
          <span>3AM</span>
          <span>6AM</span>
          <span>9AM</span>
          <span>12PM</span>
        </div>
      </div>
    </div>
  );
};

// Bar Chart Component
export const BarChart: React.FC<ChartProps & { type: 'basic' | 'grouped' | 'markers' }> = ({ 
  matches, teams, type 
}) => {
  const timeData = Array.from({ length: 6 }, (_, i) => {
    const hour = i + 1;
    const liveMatches = matches.filter(m => m.status === 'live' && new Date(m.date).getHours() === hour).length;
    const upcomingMatches = matches.filter(m => m.status === 'upcoming' && new Date(m.date).getHours() === hour).length;
    const completedMatches = matches.filter(m => m.status === 'completed' && new Date(m.date).getHours() === hour).length;
    return { 
      time: `${hour}AM`, 
      live: Math.max(2, liveMatches + Math.floor(Math.random() * 4) + 1),
      upcoming: Math.max(3, upcomingMatches + Math.floor(Math.random() * 5) + 2),
      completed: Math.max(4, completedMatches + Math.floor(Math.random() * 6) + 3)
    };
  });

  const maxValue = Math.max(...timeData.flatMap(d => [d.live, d.upcoming, d.completed]), 1);

  return (
    <div className="bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 rounded-3xl p-6 border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white capitalize tracking-wide">{type}</h3>
          <p className="text-sm text-emerald-400 font-medium">↗ 41.67%</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">≡ 24</div>
        </div>
      </div>
      
      <div className="relative h-40 flex items-end justify-between px-3">
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>≡ {Math.ceil(maxValue)}</span>
          <span>≡ {Math.ceil(maxValue * 0.75)}</span>
          <span>≡ {Math.ceil(maxValue * 0.5)}</span>
          <span>≡ {Math.ceil(maxValue * 0.25)}</span>
          <span>≡ 0</span>
        </div>
        
        <div className="flex-1 ml-10 h-full flex items-end justify-between gap-2">
          {timeData.map((data, index) => (
            <div key={index} className="flex-1 flex items-end justify-center gap-1">
              {type === 'basic' && (
                <div 
                  className="w-full bg-gradient-to-t from-cyan-500 via-purple-500 to-pink-500 rounded-t-lg shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                  style={{ height: `${(data.live / maxValue) * 90}%` }}
                />
              )}
              
              {type === 'grouped' && (
                <>
                  <div 
                    className="w-1/3 bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg shadow-lg hover:shadow-red-500/20 transition-all duration-300"
                    style={{ height: `${(data.live / maxValue) * 90}%` }}
                    title="Live Matches"
                  />
                  <div 
                    className="w-1/3 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                    style={{ height: `${(data.upcoming / maxValue) * 90}%` }}
                    title="Upcoming Matches"
                  />
                  <div 
                    className="w-1/3 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                    style={{ height: `${(data.completed / maxValue) * 90}%` }}
                    title="Completed Matches"
                  />
                </>
              )}
              
              {type === 'markers' && (
                <div className="w-full relative">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-600 via-purple-500 to-pink-400 rounded-t-lg shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                    style={{ height: `${(data.live / maxValue) * 90}%` }}
                  />
                  {/* Enhanced Markers */}
                  <div className="absolute top-0 right-0 w-3 h-3 bg-pink-300 rounded-full transform translate-x-2 -translate-y-1 shadow-lg animate-pulse" />
                  <div className="absolute top-1/2 right-0 w-3 h-3 bg-purple-300 rounded-full transform translate-x-2 -translate-y-1 shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute bottom-2 right-0 w-3 h-3 bg-cyan-300 rounded-full transform translate-x-2 translate-y-1 shadow-lg animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="absolute -bottom-6 left-10 right-0 flex justify-between text-xs text-gray-500">
          {timeData.map((data, index) => (
            <span key={index} className="flex-1 text-center font-medium">{data.time}</span>
          ))}
        </div>
      </div>
      
      {/* Legend for grouped charts */}
      {type === 'grouped' && (
        <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-700/30">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-t from-red-500 to-red-400 rounded-sm"></div>
            <span className="text-xs text-gray-400 font-medium">Live</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-t from-blue-500 to-blue-400 rounded-sm"></div>
            <span className="text-xs text-gray-400 font-medium">Upcoming</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-sm"></div>
            <span className="text-xs text-gray-400 font-medium">Completed</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Pie Chart Component
export const PieChart: React.FC<ChartProps & { type: 'basic' | 'donut' }> = ({ 
  matches, teams, type 
}) => {
  const liveCount = matches.filter(m => m.status === 'live').length || 3;
  const upcomingCount = matches.filter(m => m.status === 'upcoming').length || 5;
  const completedCount = matches.filter(m => m.status === 'completed').length || 7;
  
  const total = liveCount + upcomingCount + completedCount;
  const livePercentage = (liveCount / total) * 100;
  const upcomingPercentage = (upcomingCount / total) * 100;
  const completedPercentage = (completedCount / total) * 100;

  // Calculate stroke-dasharray for segments
  const circumference = 2 * Math.PI * 45; // radius = 45
  const liveStroke = (livePercentage / 100) * circumference;
  const upcomingStroke = (upcomingPercentage / 100) * circumference;
  const completedStroke = (completedPercentage / 100) * circumference;

  return (
    <div className="bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 rounded-3xl p-6 border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white capitalize tracking-wide">{type}</h3>
          <p className="text-sm text-emerald-400 font-medium">↗ 41.67%</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">≡ {total}</div>
        </div>
      </div>
      
      <div className="flex items-center justify-center h-40 mb-6">
        <div className="relative group">
          <svg width="140" height="140" className="transform -rotate-90 drop-shadow-2xl">
            <defs>
              <linearGradient id={`liveGradient-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
              <linearGradient id={`upcomingGradient-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>
              <linearGradient id={`completedGradient-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {type === 'donut' ? (
              <>
                {/* Background circle */}
                <circle
                  cx="70"
                  cy="70"
                  r="45"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="16"
                  opacity="0.2"
                />
                
                {/* Live segment */}
                <circle
                  cx="70"
                  cy="70"
                  r="45"
                  fill="none"
                  stroke={`url(#liveGradient-${type})`}
                  strokeWidth="16"
                  strokeDasharray={`${liveStroke} ${circumference}`}
                  strokeDashoffset="0"
                  filter="url(#glow)"
                  className="hover:stroke-width-18 transition-all duration-300"
                />
                
                {/* Upcoming segment */}
                <circle
                  cx="70"
                  cy="70"
                  r="45"
                  fill="none"
                  stroke={`url(#upcomingGradient-${type})`}
                  strokeWidth="16"
                  strokeDasharray={`${upcomingStroke} ${circumference}`}
                  strokeDashoffset={-liveStroke}
                  filter="url(#glow)"
                  className="hover:stroke-width-18 transition-all duration-300"
                />
                
                {/* Completed segment */}
                <circle
                  cx="70"
                  cy="70"
                  r="45"
                  fill="none"
                  stroke={`url(#completedGradient-${type})`}
                  strokeWidth="16"
                  strokeDasharray={`${completedStroke} ${circumference}`}
                  strokeDashoffset={-(liveStroke + upcomingStroke)}
                  filter="url(#glow)"
                  className="hover:stroke-width-18 transition-all duration-300"
                />
                
                {/* Center text for donut */}
                <text x="70" y="70" textAnchor="middle" dy="0.3em" className="fill-white text-lg font-bold transform rotate-90" style={{ transformOrigin: '70px 70px' }}>
                  {total}
                </text>
                <text x="70" y="85" textAnchor="middle" dy="0.3em" className="fill-gray-400 text-xs font-medium transform rotate-90" style={{ transformOrigin: '70px 85px' }}>
                  Total
                </text>
              </>
            ) : (
              // Basic pie chart using paths with enhanced gradients
              <>
                <path
                  d={`M 70 70 L 70 25 A 45 45 0 ${livePercentage > 50 ? 1 : 0} 1 ${70 + 45 * Math.cos(2 * Math.PI * livePercentage / 100)} ${70 + 45 * Math.sin(2 * Math.PI * livePercentage / 100)} Z`}
                  fill={`url(#liveGradient-${type})`}
                  filter="url(#glow)"
                  className="hover:opacity-90 transition-all duration-300"
                />
                <path
                  d={`M 70 70 L ${70 + 45 * Math.cos(2 * Math.PI * livePercentage / 100)} ${70 + 45 * Math.sin(2 * Math.PI * livePercentage / 100)} A 45 45 0 ${upcomingPercentage > 50 ? 1 : 0} 1 ${70 + 45 * Math.cos(2 * Math.PI * (livePercentage + upcomingPercentage) / 100)} ${70 + 45 * Math.sin(2 * Math.PI * (livePercentage + upcomingPercentage) / 100)} Z`}
                  fill={`url(#upcomingGradient-${type})`}
                  filter="url(#glow)"
                  className="hover:opacity-90 transition-all duration-300"
                />
                <path
                  d={`M 70 70 L ${70 + 45 * Math.cos(2 * Math.PI * (livePercentage + upcomingPercentage) / 100)} ${70 + 45 * Math.sin(2 * Math.PI * (livePercentage + upcomingPercentage) / 100)} A 45 45 0 ${completedPercentage > 50 ? 1 : 0} 1 70 25 Z`}
                  fill={`url(#completedGradient-${type})`}
                  filter="url(#glow)"
                  className="hover:opacity-90 transition-all duration-300"
                />
              </>
            )}
          </svg>
        </div>
      </div>
      
      {/* Enhanced Legend */}
      <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-700/30">
        <div className="flex items-center space-x-2 group cursor-pointer">
          <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg group-hover:shadow-red-500/50 transition-all duration-300"></div>
          <div className="text-center">
            <div className="text-xs text-gray-400 font-medium">Live</div>
            <div className="text-sm text-white font-bold">{liveCount}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2 group cursor-pointer">
          <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300"></div>
          <div className="text-center">
            <div className="text-xs text-gray-400 font-medium">Upcoming</div>
            <div className="text-sm text-white font-bold">{upcomingCount}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2 group cursor-pointer">
          <div className="w-4 h-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full shadow-lg group-hover:shadow-emerald-500/50 transition-all duration-300"></div>
          <div className="text-center">
            <div className="text-xs text-gray-400 font-medium">Completed</div>
            <div className="text-sm text-white font-bold">{completedCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Charts Grid Component
export const ChartsGrid: React.FC<ChartProps> = ({ matches, teams }) => {
  return (
    <div className="space-y-8">
      {/* Line Charts */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <span className="mr-3">Line Charts</span>
          <div className="h-px bg-gradient-to-r from-gray-600 to-transparent flex-1"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <LineChart matches={matches} teams={teams} type="basic" />
          <LineChart matches={matches} teams={teams} type="double" />
          <LineChart matches={matches} teams={teams} type="stepline" />
          <LineChart matches={matches} teams={teams} type="dashed" />
        </div>
      </div>

      {/* Bar Charts */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <span className="mr-3">Bar Charts</span>
          <div className="h-px bg-gradient-to-r from-gray-600 to-transparent flex-1"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BarChart matches={matches} teams={teams} type="basic" />
          <BarChart matches={matches} teams={teams} type="grouped" />
          <BarChart matches={matches} teams={teams} type="markers" />
        </div>
      </div>

      {/* Pie Charts & Area Charts */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <span className="mr-3">Pie Charts & Area Charts</span>
          <div className="h-px bg-gradient-to-r from-gray-600 to-transparent flex-1"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PieChart matches={matches} teams={teams} type="basic" />
          <PieChart matches={matches} teams={teams} type="donut" />
          <AreaChart matches={matches} teams={teams} type="gradient" />
        </div>
      </div>

      {/* Area Charts */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <span className="mr-3">Area Charts</span>
          <div className="h-px bg-gradient-to-r from-gray-600 to-transparent flex-1"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AreaChart matches={matches} teams={teams} type="gradient" />
          <AreaChart matches={matches} teams={teams} type="spline" />
          <AreaChart matches={matches} teams={teams} type="negative" />
          <AreaChart matches={matches} teams={teams} type="stacked" />
        </div>
      </div>
    </div>
  );
}; 