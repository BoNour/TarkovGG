import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Trophy } from 'lucide-react';
import { Tournament } from '../../types';

interface TournamentCardProps {
  tournament: Tournament;
  variant?: 'compact' | 'full';
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament, variant = 'compact' }) => {
  const startDate = new Date(tournament.startDate);
  const endDate = new Date(tournament.endDate);
  const now = new Date();
  
  const isOngoing = startDate <= now && endDate >= now;
  const isUpcoming = startDate > now;
  const isFinished = endDate < now;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = () => {
    if (isOngoing) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30';
    if (isUpcoming) return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
    return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
  };

  const getStatusText = () => {
    if (isOngoing) return 'LIVE';
    if (isUpcoming) return 'Upcoming';
    return 'Completed';
  };

  // Modern horizontal layout for full variant
  if (variant === 'full') {
    return (
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-xl shadow-2xl">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        </div>
        
        <div className="relative flex">
          {/* Left side - Tournament Image */}
          <div className="relative w-72 h-56 flex-shrink-0 overflow-hidden">
            <img 
              src={tournament.logo} 
              alt={tournament.name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/40"></div>
            
            {/* Floating status badge */}
            <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm transition-all duration-500 ${getStatusColor()} group-hover:scale-105`}>
              {isOngoing && <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block mr-2 animate-pulse"></span>}
              {getStatusText()}
            </div>
          </div>
          
          {/* Right side - Tournament Information */}
          <div className="flex-1 p-8 flex flex-col justify-between">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight transition-all duration-500 group-hover:text-blue-200 group-hover:translate-x-0.5">
                    {tournament.name}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="px-2 py-1 bg-white/5 rounded-lg border border-white/10 font-medium transition-all duration-500 group-hover:bg-white/8 group-hover:border-white/15">
                      {tournament.type.toUpperCase()}
                    </span>
                    <span className="text-gray-300">
                      {tournament.format.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 transition-all duration-500 group-hover:translate-x-0.5" style={{ transitionDelay: '100ms' }}>
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center transition-all duration-500 group-hover:bg-blue-500/25 group-hover:scale-105">
                      <Calendar className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Duration</p>
                      <p className="text-sm text-white font-medium">{formatDate(startDate)} - {formatDate(endDate)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 transition-all duration-500 group-hover:translate-x-0.5" style={{ transitionDelay: '200ms' }}>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center transition-all duration-500 group-hover:bg-emerald-500/25 group-hover:scale-105">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Location</p>
                      <p className="text-sm text-white font-medium">{tournament.location}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 transition-all duration-500 group-hover:translate-x-0.5" style={{ transitionDelay: '300ms' }}>
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center transition-all duration-500 group-hover:bg-yellow-500/25 group-hover:scale-105">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Prize Pool</p>
                      <p className="text-sm text-white font-bold">{tournament.prizePool}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 transition-all duration-500 group-hover:translate-x-0.5" style={{ transitionDelay: '400ms' }}>
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center transition-all duration-500 group-hover:bg-purple-500/25 group-hover:scale-105">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Teams</p>
                      <p className="text-sm text-white font-medium">{tournament.teams.length} competing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="flex justify-end pt-6">
              <Link 
                to={`/tournaments/${tournament.id}`} 
                className="group inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium transition-all duration-500 hover:scale-105 hover:shadow-md hover:shadow-blue-500/15"
              >
                <span>View Details</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Modern compact layout
  return (
    <div className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-xl shadow-xl">
      {/* Image container */}
      <div className="relative overflow-hidden">
        <img 
          src={tournament.logo} 
          alt={tournament.name} 
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Status badge */}
        <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm ${getStatusColor()}`}>
          {isOngoing && <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block mr-2 animate-pulse"></span>}
          {getStatusText()}
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
            {tournament.name}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-200">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {tournament.location}
            </div>
            <div className="flex items-center">
              <Trophy className="w-4 h-4 mr-1" />
              {tournament.prizePool}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
          </div>
          <span className="text-purple-400 font-medium">{tournament.teams.length} teams</span>
        </div>
        
        <Link 
          to={`/tournaments/${tournament.id}`} 
          className="block w-full text-center py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 text-blue-300 border border-blue-500/30"
        >
          View Tournament
        </Link>
      </div>
    </div>
  );
};

export default TournamentCard;