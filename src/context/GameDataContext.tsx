import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Player, Team, Match, Tournament, News, ExPlayer } from '../types';
import { 
  mockPlayers, 
  mockTeams, 
  mockMatches, 
  mockTournaments, 
  mockNews,
  mockExPlayers 
} from '../data/mockData';

interface GameDataContextType {
  players: Player[];
  teams: Team[];
  matches: Match[];
  tournaments: Tournament[];
  news: News[];
  exPlayers: ExPlayer[];
  isLoading: boolean;
  error: string | null;
}

const GameDataContext = createContext<GameDataContextType | undefined>(undefined);

export const useGameData = () => {
  const context = useContext(GameDataContext);
  if (context === undefined) {
    throw new Error('useGameData must be used within a GameDataProvider');
  }
  return context;
};

interface GameDataProviderProps {
  children: ReactNode;
}

export const GameDataProvider = ({ children }: GameDataProviderProps) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [exPlayers, setExPlayers] = useState<ExPlayer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For now, we'll use mock data to simulate the API response
    const fetchData = () => {
      try {
        setPlayers(mockPlayers);
        setTeams(mockTeams);
        setMatches(mockMatches);
        setTournaments(mockTournaments);
        setNews(mockNews);
        setExPlayers(mockExPlayers);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setIsLoading(false);
      }
    };

    // Simulate network request
    setTimeout(fetchData, 1000);
  }, []);

  return (
    <GameDataContext.Provider
      value={{
        players,
        teams,
        matches,
        tournaments,
        news,
        exPlayers,
        isLoading,
        error
      }}
    >
      {children}
    </GameDataContext.Provider>
  );
};