import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Player, Team, Match, Tournament, News, ExPlayer } from '../types';
import { 
  mockTournaments, 
  mockNews,
  mockExPlayers 
} from '../data/mockData';
import { CsvService } from '../utils/csvService';

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
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Load CSV data
        const csvService = CsvService.getInstance();
        await csvService.loadAllData();
        
        // Get real data from CSV files
        const csvPlayers = csvService.getPlayers();
        const csvTeams = csvService.getTeams();
        const csvMatches = csvService.getMatches();
        
        setPlayers(csvPlayers);
        setTeams(csvTeams);
        setMatches(csvMatches);
        setTournaments(mockTournaments);
        setNews(mockNews);
        setExPlayers(mockExPlayers);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load CSV data:', error);
        setError('Failed to fetch data');
        setIsLoading(false);
      }
    };

    fetchData();
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