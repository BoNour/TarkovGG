// Player types
export interface PlayerStats {
  rating: number;
  kdRatio: number;
  entryRatio: string;
  kost: number;
  kpr: number;
  srv: number;
  plants: number;
  headshots: number;
  attack: number;
  defense: number;
}

export interface Player {
  id: string;
  nickname: string;
  realName: string;
  nationality: string;
  teamId: string;
  role: string;
  image: string;
  stats: PlayerStats;
  socialMedia?: {
    twitter?: string;
    twitch?: string;
    instagram?: string;
  };
}

export interface ExPlayer {
  id: string;
  nickname: string;
  realName: string;
  nationality: string;
  role: string;
  image: string;
  stats: PlayerStats;
  joinDate: string;
  leaveDate: string;
  socialMedia?: {
    twitter?: string;
    twitch?: string;
    instagram?: string;
  };
}

// Team types
export interface TeamMapStats {
  [mapName: string]: {
    plays: number;
    wins: number;
    losses: number;
    winRate: number;
  };
}

export interface TeamStats {
  wins: number;
  losses: number;
  winRate: number;
  roundsWon: number;
  roundsPlayed: number;
  tournamentPlacements: {
    tournamentId: string;
    placement: number;
  }[];
  mapStats: TeamMapStats;
}

export interface Team {
  id: string;
  name: string;
  tag: string;
  logo: string;
  region: string;
  players: string[]; // Array of player IDs
  exPlayers?: string[]; // Array of ex-player IDs
  stats: TeamStats;
}

// Match types
export enum MatchStatus {
  UPCOMING = 'upcoming',
  LIVE = 'live',
  COMPLETED = 'completed'
}

export interface MatchMap {
  name: string;
  teamOneScore: number;
  teamTwoScore: number;
}

export interface Match {
  id: string;
  tournamentId: string;
  teamOneId: string;
  teamTwoId: string;
  teamOneScore: number;
  teamTwoScore: number;
  date: string;
  status: MatchStatus;
  maps: MatchMap[];
}

// Tournament types
export enum TournamentType {
  MAJOR = 'major',
  MINOR = 'minor',
  QUALIFIER = 'qualifier'
}

export enum TournamentFormat {
  SINGLE_ELIMINATION = 'single-elimination',
  DOUBLE_ELIMINATION = 'double-elimination',
  ROUND_ROBIN = 'round-robin',
  SWISS = 'swiss'
}

export interface Tournament {
  id: string;
  name: string;
  game: string;
  startDate: string;
  endDate: string;
  location: string;
  prizePool: string;
  type: TournamentType;
  format: TournamentFormat;
  teams: string[]; // Array of team IDs
  matches: string[]; // Array of match IDs
  logo: string;
}

// News types
export interface News {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
}

// Game types
export interface Game {
  id: string;
  name: string;
  logo: string;
}