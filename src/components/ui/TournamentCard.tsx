import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Trophy, Users, Clock } from 'lucide-react';
import { Tournament } from '../../types';

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
  const now = new Date();
  const startDate = new Date(tournament.startDate);
  const endDate = new Date(tournament.endDate);
  
  const isUpcoming = startDate > now;
  const isOngoing = startDate <= now && endDate >= now;
  const isCompleted = endDate < now;
  
  const statusConfig = isUpcoming 
    ? { 
        bg: 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20', 
        border: 'border-amber-500/30',
        text: 'text-amber-300',
        dot: 'bg-amber-400',
        label: 'Upcoming'
      }
    : isOngoing 
      ? { 
          bg: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20',
          border: 'border-green-500/30',
          text: 'text-green-300',
          dot: 'bg-green-400',
          label: 'Live'
        }
      : { 
          bg: 'bg-gradient-to-r from-gray-500/20 to-slate-500/20',
          border: 'border-gray-500/30',
          text: 'text-gray-300',
          dot: 'bg-gray-400',
          label: 'Completed'
        };
  
  const typeConfig = 
    tournament.type === 'major' 
      ? { 
          bg: 'bg-gradient-to-r from-purple-500/20 to-violet-500/20',
          border: 'border-purple-500/30',
          text: 'text-purple-300'
        }
      : tournament.type === 'minor' 
        ? { 
            bg: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20',
            border: 'border-blue-500/30',
            text: 'text-blue-300'
          }
        : { 
            bg: 'bg-gradient-to-r from-gray-500/20 to-slate-500/20',
            border: 'border-gray-500/30',
            text: 'text-gray-300'
          };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="group relative">
      {/* Main Card */}
      <div className="relative bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-500 hover:transform hover:scale-[1.02] hover:border-gray-700/50 hover:shadow-2xl hover:shadow-purple-500/10">
        
        {/* Tournament Image */}
        <div className="relative h-56 overflow-hidden">
          <img 
            src={tournament.logo} 
            alt={tournament.name} 
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
          
          {/* Status Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <div className={`inline-flex items-center space-x-2 px-3 py-1.5 ${statusConfig.bg} ${statusConfig.border} border backdrop-blur-sm rounded-xl`}>
              <div className={`w-2 h-2 ${statusConfig.dot} rounded-full ${isOngoing ? 'animate-pulse' : ''}`}></div>
              <span className={`text-xs font-semibold ${statusConfig.text} uppercase tracking-wider`}>
                {statusConfig.label}
              </span>
            </div>
            
            <div className={`px-3 py-1.5 ${typeConfig.bg} ${typeConfig.border} border backdrop-blur-sm rounded-xl`}>
              <span className={`text-xs font-semibold ${typeConfig.text} uppercase tracking-wider`}>
                {tournament.type}
              </span>
            </div>
          </div>

          {/* Tournament Title */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl font-black text-white mb-1 leading-tight">
              {tournament.name}
            </h3>
            <p className="text-sm text-gray-300 font-medium">{tournament.game}</p>
          </div>
        </div>
        
        {/* Card Content */}
        <div className="p-6 space-y-6">
          
          {/* Tournament Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Duration</span>
              </div>
              <p className="text-sm font-semibold text-white">
                {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
              </p>
              {isUpcoming && (
                <p className="text-xs text-gray-400">
                  Starts {formatTime(tournament.startDate)}
                </p>
              )}
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Location</span>
              </div>
              <p className="text-sm font-semibold text-white truncate">
                {tournament.location}
              </p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-gray-400">
                <Trophy className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Prize Pool</span>
              </div>
              <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                {tournament.prizePool}
              </p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-gray-400">
                <Users className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Format</span>
              </div>
              <p className="text-sm font-semibold text-white capitalize">
                {tournament.format.replace('-', ' ')}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <Link 
            to={`/tournaments/${tournament.id}`} 
            className="group/btn relative block w-full overflow-hidden"
          >
            <div className="relative px-6 py-3 bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-sm border border-purple-500/30 rounded-xl text-center font-semibold text-white transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/25">
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>View Tournament</span>
                <Trophy className="w-4 h-4 transform group-hover/btn:scale-110 transition-transform duration-300" />
              </span>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-xl blur-sm"></div>
            </div>
          </Link>
        </div>
      </div>

      {/* Glow Effect on Hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>
    </div>
  );
};

export default TournamentCard;