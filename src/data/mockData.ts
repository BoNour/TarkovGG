import { Player, Team, Match, Tournament, News, MatchStatus, TournamentType, TournamentFormat, ExPlayer, TeamMapStats } from '../types';

// Mock Players
export const mockPlayers: Player[] = [
  {
    id: '1',
    nickname: 'Anitun',
    realName: 'Reon Sakai',
    nationality: 'JP',
    teamId: '1',
    role: 'Entry Fragger',
    image: '/fulllpmc2.png',
    stats: {
      rating: 1.01,
      kdRatio: 1.0,
      entryRatio: '22-22',
      kost: 0.65,
      kpr: 0.71,
      srv: 0.29,
      plants: 0,
      headshots: 0,
      attack: 48,
      defense: 52
    },
    socialMedia: {
      twitter: 'https://twitter.com/anitun'
    }
  },
  {
    id: '2',
    nickname: 'FelipOX',
    realName: 'Felipe Santos',
    nationality: 'BR',
    teamId: '2',
    role: 'Support',
    image: '/fulllpmc2.png',
    stats: {
      rating: 1.24,
      kdRatio: 1.5,
      entryRatio: '26-17',
      kost: 0.77,
      kpr: 0.84,
      srv: 0.45,
      plants: 1,
      headshots: 1,
      attack: 52,
      defense: 48
    },
    socialMedia: {
      twitter: 'https://twitter.com/felipox',
      twitch: 'https://twitch.tv/felipox'
    }
  },
  {
    id: '3',
    nickname: 'HerdsZ',
    realName: 'Henry Rodriguez',
    nationality: 'BR',
    teamId: '2',
    role: 'Flex',
    image: '/fulllpmc2.png',
    stats: {
      rating: 1.20,
      kdRatio: 1.6,
      entryRatio: '30-19',
      kost: 0.65,
      kpr: 0.97,
      srv: 0.39,
      plants: 0,
      headshots: 0,
      attack: 73,
      defense: 27
    },
    socialMedia: {
      twitter: 'https://twitter.com/herdsz',
      twitch: 'https://twitch.tv/herdsz'
    }
  },
  {
    id: '4',
    nickname: 'Chibisu',
    realName: 'Takuma Yoshida',
    nationality: 'JP',
    teamId: '1',
    role: 'Support',
    image: '/fulllpmc2.png',
    stats: {
      rating: 0.95,
      kdRatio: 0.9,
      entryRatio: '22-24',
      kost: 0.61,
      kpr: 0.71,
      srv: 0.23,
      plants: 1,
      headshots: 1,
      attack: 58,
      defense: 42
    }
  },
  {
    id: '5',
    nickname: 'ShuReap',
    realName: 'Shu Tanaka',
    nationality: 'JP',
    teamId: '1',
    role: 'IGL',
    image: '/fulllpmc2.png',
    stats: {
      rating: 0.94,
      kdRatio: 0.96,
      entryRatio: '24-25',
      kost: 0.58,
      kpr: 0.77,
      srv: 0.19,
      plants: 0,
      headshots: 0,
      attack: 67,
      defense: 33
    }
  },
  {
    id: '6',
    nickname: 'BlackRay',
    realName: 'Ray Johnson',
    nationality: 'US',
    teamId: '3',
    role: 'Entry Fragger',
    image: '/fulllpmc2.png',
    stats: {
      rating: 1.15,
      kdRatio: 1.2,
      entryRatio: '25-20',
      kost: 0.72,
      kpr: 0.82,
      srv: 0.35,
      plants: 0,
      headshots: 2,
      attack: 60,
      defense: 40
    }
  },
  // Additional FURIA Esports players (total 5)
  {
    id: '7',
    nickname: 'khalil',
    realName: 'Khalil Schmidt',
    nationality: 'BR',
    teamId: '2',
    role: 'IGL',
    image: '/fulllpmc2.png',
    stats: {
      rating: 1.18,
      kdRatio: 1.3,
      entryRatio: '28-21',
      kost: 0.75,
      kpr: 0.88,
      srv: 0.42,
      plants: 2,
      headshots: 3,
      attack: 58,
      defense: 42
    },
    socialMedia: {
      twitter: 'https://twitter.com/khalil',
      twitch: 'https://twitch.tv/khalil'
    }
  },
  {
    id: '8',
    nickname: 'murizzz',
    realName: 'Murilo Tebet',
    nationality: 'BR',
    teamId: '2',
    role: 'Sentinel',
    image: '/fulllpmc2.png',
    stats: {
      rating: 1.12,
      kdRatio: 1.1,
      entryRatio: '24-22',
      kost: 0.72,
      kpr: 0.79,
      srv: 0.38,
      plants: 1,
      headshots: 2,
      attack: 45,
      defense: 55
    },
    socialMedia: {
      twitch: 'https://twitch.tv/murizzz'
    }
  },
  {
    id: '9',
    nickname: 'dgzin',
    realName: 'Douglas Silva',
    nationality: 'BR',
    teamId: '2',
    role: 'Duelist',
    image: '/fulllpmc2.png',
    stats: {
      rating: 1.26,
      kdRatio: 1.7,
      entryRatio: '32-19',
      kost: 0.68,
      kpr: 1.02,
      srv: 0.44,
      plants: 0,
      headshots: 4,
      attack: 78,
      defense: 22
    },
    socialMedia: {
      twitter: 'https://twitter.com/dgzin',
      twitch: 'https://twitch.tv/dgzin'
    }
  }
];

// Mock Ex-Players
export const mockExPlayers: ExPlayer[] = [
  {
    id: 'ex1',
    nickname: 'qck',
    realName: 'Alexandre Fonseca',
    nationality: 'BR',
    role: 'Duelist',
    image: '/fulllpmc2.png',
    joinDate: '2023-01-15',
    leaveDate: '2024-08-20',
    stats: {
      rating: 1.08,
      kdRatio: 1.2,
      entryRatio: '26-22',
      kost: 0.69,
      kpr: 0.85,
      srv: 0.35,
      plants: 0,
      headshots: 3,
      attack: 72,
      defense: 28
    },
    socialMedia: {
      twitter: 'https://twitter.com/qck'
    }
  },
  {
    id: 'ex2',
    nickname: 'Mazin',
    realName: 'Igor Oliveira',
    nationality: 'BR',
    role: 'Controller',
    image: '/fulllpmc2.png',
    joinDate: '2022-06-10',
    leaveDate: '2024-03-15',
    stats: {
      rating: 0.98,
      kdRatio: 0.95,
      entryRatio: '20-21',
      kost: 0.64,
      kpr: 0.74,
      srv: 0.41,
      plants: 3,
      headshots: 1,
      attack: 38,
      defense: 62
    }
  }
];

const defaultMapStats: TeamMapStats = {
  sawmill: { wins: 0, losses: 0, roundsWon: 0, roundsPlayed: 0 },
  nakatomi_plaza: { wins: 0, losses: 0, roundsWon: 0, roundsPlayed: 0 },
  black_site: { wins: 0, losses: 0, roundsWon: 0, roundsPlayed: 0 },
  bowl: { wins: 0, losses: 0, roundsWon: 0, roundsPlayed: 0 },
  equator: { wins: 0, losses: 0, roundsWon: 0, roundsPlayed: 0 },
  air_pit: { wins: 0, losses: 0, roundsWon: 0, roundsPlayed: 0 },
};

// Mock Teams
export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'CAG Osaka',
    tag: 'CAG',
    logo: '/cov%20logo.png',
    region: 'APAC',
    players: ['1', '4', '5'],
    stats: {
      wins: 15,
      losses: 10,
      winRate: 0.6,
      roundsWon: 150,
      roundsPlayed: 500,
      tournamentPlacements: [],
      mapStats: defaultMapStats,
    }
  },
  {
    id: '2',
    name: 'FURIA Esports',
    tag: 'FURIA',
    logo: '/cov%20logo.png',
    region: 'LATAM',
    players: ['2', '3', '7', '8', '9'], // All 5 active players
    exPlayers: ['ex1', 'ex2'], // 2 ex-players
    stats: {
      wins: 20,
      losses: 5,
      winRate: 0.8,
      roundsWon: 200,
      roundsPlayed: 500,
      tournamentPlacements: [],
      mapStats: defaultMapStats,
    }
  },
  {
    id: '3',
    name: 'Team Liquid',
    tag: 'TL',
    logo: '/cov%20logo.png',
    region: 'EU',
    players: ['6'],
    stats: {
      wins: 18,
      losses: 7,
      winRate: 0.72,
      roundsWon: 180,
      roundsPlayed: 500,
      tournamentPlacements: [],
      mapStats: defaultMapStats,
    }
  },
  {
    id: '4',
    name: 'FaZe Clan',
    tag: 'FaZe',
    logo: '/cov%20logo.png',
    region: 'NA',
    players: [],
    stats: {
      wins: 16,
      losses: 9,
      winRate: 0.64,
      roundsWon: 160,
      roundsPlayed: 500,
      tournamentPlacements: [],
      mapStats: defaultMapStats,
    }
  },
  {
    id: '5',
    name: 'TSM',
    tag: 'TSM',
    logo: '/cov%20logo.png',
    region: 'NA',
    players: [],
    stats: {
      wins: 14,
      losses: 11,
      winRate: 0.56,
      roundsWon: 140,
      roundsPlayed: 500,
      tournamentPlacements: [],
      mapStats: defaultMapStats,
    }
  },
  {
    id: '6',
    name: 'G2 Esports',
    tag: 'G2',
    logo: '/cov%20logo.png',
    region: 'EU',
    players: [],
    stats: {
      wins: 22,
      losses: 3,
      winRate: 0.88,
      roundsWon: 220,
      roundsPlayed: 500,
      tournamentPlacements: [],
      mapStats: defaultMapStats,
    }
  },
  {
    id: '7',
    name: 'DWG KIA',
    tag: 'DK',
    logo: '/cov%20logo.png',
    region: 'APAC',
    players: [],
    stats: {
      wins: 19,
      losses: 6,
      winRate: 0.76,
      roundsWon: 190,
      roundsPlayed: 500,
      tournamentPlacements: [],
      mapStats: defaultMapStats,
    }
  },
  {
    id: '8',
    name: 'LOUD',
    tag: 'LOUD',
    logo: '/cov%20logo.png',
    region: 'LATAM',
    players: [],
    stats: {
      wins: 17,
      losses: 8,
      winRate: 0.68,
      roundsWon: 170,
      roundsPlayed: 500,
      tournamentPlacements: [],
      mapStats: defaultMapStats,
    }
  },
  {
    id: '9',
    name: 'NaVi',
    tag: 'NAVI',
    logo: '/cov%20logo.png',
    region: 'EU',
    players: [],
    stats: {
      wins: 21,
      losses: 4,
      winRate: 0.84,
      roundsWon: 210,
      roundsPlayed: 500,
      tournamentPlacements: [],
      mapStats: defaultMapStats,
    }
  },
  {
    id: '10',
    name: 'Spacestation',
    tag: 'SSG',
    logo: '/cov%20logo.png',
    region: 'NA',
    players: [],
    stats: {
      wins: 13,
      losses: 12,
      winRate: 0.52,
      roundsWon: 130,
      roundsPlayed: 500,
      tournamentPlacements: [],
      mapStats: defaultMapStats,
    }
  },
  {
    id: '32',
    name: 'XSET',
    tag: 'XSET',
    logo: '/cov%20logo.png',
    region: 'NA',
    players: [],
    stats: {
      winRate: 0.5,
      wins: 10,
      losses: 10,
      roundsWon: 200,
      roundsPlayed: 400,
      tournamentPlacements: [],
      mapStats: defaultMapStats,
    }
  },
];

// Mock Matches
export const mockMatches: Match[] = [
  {
    id: '1',
    tournamentId: '1',
    teamOneId: '1',
    teamTwoId: '2',
    teamOneScore: 0,
    teamTwoScore: 3,
    date: '2025-05-18T15:30:00Z',
    status: MatchStatus.COMPLETED,
    maps: [
      { name: 'Villa', teamOneScore: 5, teamTwoScore: 7 },
      { name: 'Clubhouse', teamOneScore: 3, teamTwoScore: 7 },
      { name: 'Oregon', teamOneScore: 4, teamTwoScore: 7 }
    ]
  },
  {
    id: '2',
    tournamentId: '1',
    teamOneId: '1',
    teamTwoId: '4',
    teamOneScore: 2,
    teamTwoScore: 1,
    date: '2025-05-17T14:00:00Z',
    status: MatchStatus.COMPLETED,
    maps: [
      { name: 'Kafe', teamOneScore: 7, teamTwoScore: 5 },
      { name: 'Coastline', teamOneScore: 5, teamTwoScore: 7 },
      { name: 'Bank', teamOneScore: 7, teamTwoScore: 6 }
    ]
  },
  {
    id: '3',
    tournamentId: '2',
    teamOneId: '3',
    teamTwoId: '4',
    teamOneScore: 2,
    teamTwoScore: 0,
    date: '2025-06-01T18:00:00Z',
    status: MatchStatus.UPCOMING,
    maps: []
  },
  {
    id: '4',
    tournamentId: '1',
    teamOneId: '2',
    teamTwoId: '3',
    teamOneScore: 0,
    teamTwoScore: 0,
    date: '2025-05-20T19:30:00Z',
    status: MatchStatus.UPCOMING,
    maps: [
      { name: 'Border', teamOneScore: 4, teamTwoScore: 3 }
    ]
  },
  {
    id: '5',
    tournamentId: '1',
    teamOneId: '6',
    teamTwoId: '9',
    teamOneScore: 1,
    teamTwoScore: 1,
    date: '2025-05-20T20:00:00Z',
    status: MatchStatus.LIVE,
    maps: [
      { name: 'Consulate', teamOneScore: 7, teamTwoScore: 5 },
      { name: 'Skyscraper', teamOneScore: 5, teamTwoScore: 7 },
      { name: 'Theme Park', teamOneScore: 3, teamTwoScore: 2 }
    ]
  },
  {
    id: '6',
    tournamentId: '2',
    teamOneId: '5',
    teamTwoId: '10',
    teamOneScore: 0,
    teamTwoScore: 1,
    date: '2025-05-20T21:15:00Z',
    status: MatchStatus.LIVE,
    maps: [
      { name: 'Chalet', teamOneScore: 6, teamTwoScore: 7 },
      { name: 'Villa', teamOneScore: 2, teamTwoScore: 4 }
    ]
  },
  {
    id: '7',
    tournamentId: '1',
    teamOneId: '7',
    teamTwoId: '8',
    teamOneScore: 1,
    teamTwoScore: 0,
    date: '2025-05-20T22:30:00Z',
    status: MatchStatus.LIVE,
    maps: [
      { name: 'Oregon', teamOneScore: 7, teamTwoScore: 4 },
      { name: 'Clubhouse', teamOneScore: 5, teamTwoScore: 6 }
    ]
  },
  {
    id: '8',
    tournamentId: '3',
    teamOneId: '1',
    teamTwoId: '6',
    teamOneScore: 0,
    teamTwoScore: 0,
    date: '2025-05-20T16:45:00Z',
    status: MatchStatus.LIVE,
    maps: [
      { name: 'Border', teamOneScore: 6, teamTwoScore: 6 }
    ]
  },
  {
    id: '9',
    tournamentId: '2',
    teamOneId: '4',
    teamTwoId: '9',
    teamOneScore: 2,
    teamTwoScore: 1,
    date: '2025-05-20T23:00:00Z',
    status: MatchStatus.LIVE,
    maps: [
      { name: 'Kafe', teamOneScore: 7, teamTwoScore: 3 },
      { name: 'Bank', teamOneScore: 4, teamTwoScore: 7 },
      { name: 'Coastline', teamOneScore: 6, teamTwoScore: 4 }
    ]
  },
  {
    id: '10',
    tournamentId: '2',
    teamOneId: '2',
    teamTwoId: '7',
    teamOneScore: 0,
    teamTwoScore: 0,
    date: '2025-06-02T19:00:00Z',
    status: MatchStatus.UPCOMING,
    maps: []
  },
  {
    id: '11',
    tournamentId: '3',
    teamOneId: '5',
    teamTwoId: '8',
    teamOneScore: 0,
    teamTwoScore: 0,
    date: '2025-06-03T20:30:00Z',
    status: MatchStatus.UPCOMING,
    maps: []
  },
  {
    id: '12',
    tournamentId: '1',
    teamOneId: '6',
    teamTwoId: '10',
    teamOneScore: 0,
    teamTwoScore: 0,
    date: '2025-06-04T17:15:00Z',
    status: MatchStatus.UPCOMING,
    maps: []
  },
  {
    id: '13',
    tournamentId: '2',
    teamOneId: '1',
    teamTwoId: '9',
    teamOneScore: 0,
    teamTwoScore: 0,
    date: '2025-06-05T21:45:00Z',
    status: MatchStatus.UPCOMING,
    maps: []
  },
  {
    id: '14',
    tournamentId: '3',
    teamOneId: '3',
    teamTwoId: '7',
    teamOneScore: 0,
    teamTwoScore: 0,
    date: '2025-06-06T18:30:00Z',
    status: MatchStatus.UPCOMING,
    maps: []
  },
  {
    id: '15',
    tournamentId: '1',
    teamOneId: '9',
    teamTwoId: '10',
    teamOneScore: 3,
    teamTwoScore: 1,
    date: '2025-05-16T16:00:00Z',
    status: MatchStatus.COMPLETED,
    maps: [
      { name: 'Consulate', teamOneScore: 7, teamTwoScore: 2 },
      { name: 'Chalet', teamOneScore: 4, teamTwoScore: 7 },
      { name: 'Theme Park', teamOneScore: 7, teamTwoScore: 5 },
      { name: 'Villa', teamOneScore: 7, teamTwoScore: 4 }
    ]
  },
  {
    id: '16',
    tournamentId: '2',
    teamOneId: '6',
    teamTwoId: '8',
    teamOneScore: 3,
    teamTwoScore: 0,
    date: '2025-05-15T19:30:00Z',
    status: MatchStatus.COMPLETED,
    maps: [
      { name: 'Oregon', teamOneScore: 7, teamTwoScore: 3 },
      { name: 'Clubhouse', teamOneScore: 7, teamTwoScore: 5 },
      { name: 'Bank', teamOneScore: 7, teamTwoScore: 2 }
    ]
  },
  {
    id: '17',
    tournamentId: '1',
    teamOneId: '5',
    teamTwoId: '7',
    teamOneScore: 1,
    teamTwoScore: 3,
    date: '2025-05-14T14:45:00Z',
    status: MatchStatus.COMPLETED,
    maps: [
      { name: 'Kafe', teamOneScore: 5, teamTwoScore: 7 },
      { name: 'Coastline', teamOneScore: 7, teamTwoScore: 4 },
      { name: 'Border', teamOneScore: 3, teamTwoScore: 7 },
      { name: 'Skyscraper', teamOneScore: 6, teamTwoScore: 7 }
    ]
  },
  {
    id: '18',
    tournamentId: '3',
    teamOneId: '2',
    teamTwoId: '4',
    teamOneScore: 3,
    teamTwoScore: 2,
    date: '2025-05-13T20:15:00Z',
    status: MatchStatus.COMPLETED,
    maps: [
      { name: 'Villa', teamOneScore: 7, teamTwoScore: 5 },
      { name: 'Chalet', teamOneScore: 4, teamTwoScore: 7 },
      { name: 'Oregon', teamOneScore: 6, teamTwoScore: 7 },
      { name: 'Consulate', teamOneScore: 7, teamTwoScore: 3 },
      { name: 'Theme Park', teamOneScore: 7, teamTwoScore: 5 }
    ]
  },
  {
    id: '19',
    tournamentId: '2',
    teamOneId: '3',
    teamTwoId: '1',
    teamOneScore: 3,
    teamTwoScore: 1,
    date: '2025-05-12T17:00:00Z',
    status: MatchStatus.COMPLETED,
    maps: [
      { name: 'Bank', teamOneScore: 7, teamTwoScore: 4 },
      { name: 'Clubhouse', teamOneScore: 5, teamTwoScore: 7 },
      { name: 'Kafe', teamOneScore: 7, teamTwoScore: 6 },
      { name: 'Border', teamOneScore: 7, teamTwoScore: 3 }
    ]
  }
];

// Mock Tournaments
export const mockTournaments: Tournament[] = [
  {
    id: '1',
    name: 'RE:LOAD 2025',
    game: 'Rainbow Six Siege',
    startDate: '2025-05-10',
    endDate: '2025-05-18',
    location: 'Rio De Janeiro, Brazil',
    prizePool: '$3,000,000',
    type: TournamentType.MAJOR,
    format: TournamentFormat.DOUBLE_ELIMINATION,
    teams: ['1', '2', '3', '4'],
    matches: ['1', '2', '4'],
    logo: 'https://placehold.co/200x200/9b59b6/ffffff?text=RELOAD'
  },
  {
    id: '2',
    name: 'Six Invitational 2025',
    game: 'Rainbow Six Siege',
    startDate: '2025-02-03',
    endDate: '2025-02-16',
    location: 'Boston, USA',
    prizePool: '$3,500,000',
    type: TournamentType.MAJOR,
    format: TournamentFormat.DOUBLE_ELIMINATION,
    teams: ['1', '2', '3', '4'],
    matches: ['3'],
    logo: 'https://placehold.co/200x200/f1c40f/ffffff?text=SI2025'
  },
  {
    id: '3',
    name: 'Major Montreal',
    game: 'Rainbow Six Siege',
    startDate: '2025-11-07',
    endDate: '2025-11-17',
    location: 'Montreal, Canada',
    prizePool: '$2,500,000',
    type: TournamentType.MAJOR,
    format: TournamentFormat.DOUBLE_ELIMINATION,
    teams: ['2', '3', '4'],
    matches: [],
    logo: 'https://placehold.co/200x200/27ae60/ffffff?text=Montreal'
  }
];

// Mock News
export const mockNews: News[] = [
  {
    id: '1',
    title: 'APAC North 2025 Stage 1: Everything you need to know',
    content: 'The APAC North 2025 Stage 1 is set to begin next week with 10 teams competing for a spot in the Major...',
    author: 'John Smith',
    date: '2025-04-28',
    image: 'https://placehold.co/800x400/e74c3c/ffffff?text=APAC+North',
    tags: ['APAC', 'Stage 1', 'Tournament']
  },
  {
    id: '2',
    title: 'When is the next Rainbow Six Siege season?',
    content: 'Ubisoft has announced that the next season of Rainbow Six Siege will begin in June 2025...',
    author: 'Jane Doe',
    date: '2025-04-25',
    image: 'https://placehold.co/800x400/3498db/ffffff?text=R6+Season',
    tags: ['R6 Siege', 'Season', 'Update']
  },
  {
    id: '3',
    title: 'North America League 2025 Stage 1: Everything you need to know',
    content: 'The North America League 2025 Stage 1 starts next month with 10 teams competing...',
    author: 'Michael Johnson',
    date: '2025-04-20',
    image: 'https://placehold.co/800x400/2ecc71/ffffff?text=NAL',
    tags: ['NAL', 'Stage 1', 'Tournament']
  },
  {
    id: '4',
    title: 'Best FFAR 1 loadout in Warzone Season 4',
    content: 'The FFAR 1 has become one of the most powerful weapons in Warzone Season 4...',
    author: 'Chris Williams',
    date: '2025-04-15',
    image: 'https://placehold.co/800x400/f39c12/ffffff?text=Warzone',
    tags: ['Warzone', 'Loadout', 'FFAR 1']
  }
];