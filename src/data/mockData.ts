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
  sawmill: { wins: 0, losses: 0, winRate: 0, plays: 0 },
  nakatomi_plaza: { wins: 0, losses: 0, winRate: 0, plays: 0 },
  black_site: { wins: 0, losses: 0, winRate: 0, plays: 0 },
  bowl: { wins: 0, losses: 0, winRate: 0, plays: 0 },
  equator: { wins: 0, losses: 0, winRate: 0, plays: 0 },
  air_pit: { wins: 0, losses: 0, winRate: 0, plays: 0 },
};

// Mock Teams
export const mockTeams: Team[] = [
  {
    id: 'team1',
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
    id: 'team2',
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
    id: 'team3',
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
    id: 'team4',
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
    id: 'team5',
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
    id: 'team6',
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
    id: 'team7',
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
    id: 'team8',
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
    id: 'team9',
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
    id: 'team10',
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
    id: 'team32',
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
    id: 'm1',
    teamOneId: 'team1',
    teamTwoId: 'team2',
    teamOneScore: 0,
    teamTwoScore: 0,
    status: MatchStatus.UPCOMING,
    date: '2024-05-23T15:30:00Z',
    tournamentId: 't1',
    maps: []
  },
  {
    id: 'm2',
    teamOneId: 'team3',
    teamTwoId: 'team4',
    teamOneScore: 2,
    teamTwoScore: 1,
    status: MatchStatus.LIVE,
    date: '2024-05-22T19:00:00Z',
    tournamentId: 't1',
    maps: []
  },
  {
    id: 'm3',
    teamOneId: 'team5',
    teamTwoId: 'team6',
    teamOneScore: 1,
    teamTwoScore: 0,
    status: MatchStatus.COMPLETED,
    date: '2024-05-22T18:30:00Z',
    tournamentId: 't1',
    maps: []
  },
  {
    id: 'm4',
    teamOneId: 'team7',
    teamTwoId: 'team8',
    teamOneScore: 0,
    teamTwoScore: 1,
    status: MatchStatus.COMPLETED,
    date: '2024-05-22T17:15:00Z',
    tournamentId: 't1',
    maps: []
  },
  {
    id: 'm5',
    teamOneId: 'team9',
    teamTwoId: 'team10',
    teamOneScore: 1,
    teamTwoScore: 1,
    status: MatchStatus.LIVE,
    date: '2024-05-22T16:00:00Z',
    tournamentId: 't1',
    maps: []
  },
  {
    id: 'm6',
    teamOneId: 'team1',
    teamTwoId: 'team4',
    teamOneScore: 0,
    teamTwoScore: 0,
    status: MatchStatus.COMPLETED,
    date: '2024-05-21T16:00:00Z',
    tournamentId: 't2',
    maps: []
  },
  {
    id: 'm7',
    teamOneId: 'team1',
    teamTwoId: 'team2',
    teamOneScore: 0,
    teamTwoScore: 3,
    status: MatchStatus.COMPLETED,
    date: '2024-05-18T11:30:00Z',
    tournamentId: 't1',
    maps: []
  },
  {
    id: 'm8',
    teamOneId: 'team1',
    teamTwoId: 'team3',
    teamOneScore: 1,
    teamTwoScore: 2,
    status: MatchStatus.COMPLETED,
    date: '2024-05-21T14:00:00Z',
    tournamentId: 't2',
    maps: []
  },
  {
    id: 'm9',
    teamOneId: 'team4',
    teamTwoId: 'team5',
    teamOneScore: 2,
    teamTwoScore: 0,
    status: MatchStatus.COMPLETED,
    date: '2024-05-21T16:00:00Z',
    tournamentId: 't2',
    maps: []
  },
  {
    id: 'm10',
    teamOneId: 'team6',
    teamTwoId: 'team7',
    teamOneScore: 0,
    teamTwoScore: 0,
    status: MatchStatus.UPCOMING,
    date: '2024-05-28T18:00:00Z',
    tournamentId: 't2',
    maps: []
  },
  {
    id: 'm11',
    teamOneId: 'team8',
    teamTwoId: 'team9',
    teamOneScore: 1,
    teamTwoScore: 1,
    status: MatchStatus.LIVE,
    date: '2024-05-22T20:00:00Z',
    tournamentId: 't2',
    maps: []
  },
  {
    id: 'm12',
    teamOneId: 'team10',
    teamTwoId: 'team1',
    teamOneScore: 3,
    teamTwoScore: 2,
    status: MatchStatus.COMPLETED,
    date: '2024-05-19T10:00:00Z',
    tournamentId: 't3',
    maps: []
  },
  {
    id: 'm13',
    teamOneId: 'team2',
    teamTwoId: 'team5',
    teamOneScore: 0,
    teamTwoScore: 0,
    status: MatchStatus.UPCOMING,
    date: '2024-06-01T12:00:00Z',
    tournamentId: 't3',
    maps: []
  },
  {
    id: 'm14',
    teamOneId: 'team3',
    teamTwoId: 'team6',
    teamOneScore: 2,
    teamTwoScore: 0,
    status: MatchStatus.COMPLETED,
    date: '2024-05-17T18:00:00Z',
    tournamentId: 't3',
    maps: []
  },
  {
    id: 'm15',
    teamOneId: 'team4',
    teamTwoId: 'team8',
    teamOneScore: 1,
    teamTwoScore: 2,
    status: MatchStatus.COMPLETED,
    date: '2024-05-16T22:00:00Z',
    tournamentId: 't3',
    maps: []
  },
  {
    id: 'm16',
    teamOneId: 'team7',
    teamTwoId: 'team10',
    teamOneScore: 3,
    teamTwoScore: 1,
    status: MatchStatus.COMPLETED,
    date: '2024-05-15T13:00:00Z',
    tournamentId: 't3',
    maps: []
  },
  {
    id: 'm17',
    teamOneId: 'team5',
    teamTwoId: 'team1',
    teamOneScore: 0,
    teamTwoScore: 2,
    status: MatchStatus.COMPLETED,
    date: '2024-05-14T11:00:00Z',
    tournamentId: 't3',
    maps: []
  },
  {
    id: 'm18',
    teamOneId: 'team2',
    teamTwoId: 'team8',
    teamOneScore: 2,
    teamTwoScore: 1,
    status: MatchStatus.COMPLETED,
    date: '2024-05-22T15:00:00Z',
    tournamentId: 't2',
    maps: []
  },
  {
    id: 'm19',
    teamOneId: 'team4',
    teamTwoId: 'team6',
    teamOneScore: 0,
    teamTwoScore: 2,
    status: MatchStatus.COMPLETED,
    date: '2024-05-22T13:00:00Z',
    tournamentId: 't2',
    maps: []
  },
  {
    id: 'm20',
    teamOneId: 'team9',
    teamTwoId: 'team3',
    teamOneScore: 2,
    teamTwoScore: 1,
    status: MatchStatus.COMPLETED,
    date: '2024-05-21T19:00:00Z',
    tournamentId: 't1',
    maps: []
  },
  {
    id: 'm21',
    teamOneId: 'team10',
    teamTwoId: 'team5',
    teamOneScore: 1,
    teamTwoScore: 2,
    status: MatchStatus.COMPLETED,
    date: '2024-05-21T17:00:00Z',
    tournamentId: 't1',
    maps: []
  }
];

// Mock Tournaments
export const mockTournaments: Tournament[] = [
  {
    id: 't1',
    name: 'Major Montreal',
    description: 'The world\'s best teams face off in Montreal for a shot at the title and a massive prize pool. Expect intense action and unforgettable moments.',
    logo: '/Tournaments/lega3.png',
    startDate: '2025-11-06T19:00:00Z',
    endDate: '2025-11-09T23:00:00Z',
    location: 'Montreal, Canada',
    type: TournamentType.MAJOR,
    format: TournamentFormat.DOUBLE_ELIMINATION,
    prizePool: '$2,500,000',
    teams: ['team1', 'team2', 'team3'],
    matches: ['m1', 'm2', 'm3']
  },
  {
    id: 't2',
    name: 'VCT Champions',
    description: 'The pinnacle of the VALORANT Champions Tour. Only one team can be crowned the undisputed world champion.',
    logo: '/Tournaments/lega3.png',
    startDate: '2025-08-11T20:00:00Z',
    endDate: '2025-08-24T23:00:00Z',
    location: 'Los Angeles, USA',
    type: TournamentType.MAJOR,
    format: TournamentFormat.SWISS,
    prizePool: '$2,250,000',
    teams: ['team4', 'team5', 'team6', 'team7', 'team8'],
    matches: ['m4', 'm5']
  },
  {
    id: 't3',
    name: 'Esports R6 RELOAD',
    description: 'High-stakes Rainbow Six Siege action returns with the RELOAD tournament. Tactical gameplay and clutch moments are guaranteed.',
    logo: '/Tournaments/lega3.png',
    startDate: '2024-05-17T15:00:00Z',
    endDate: '2024-05-19T21:00:00Z',
    location: 'Online',
    type: TournamentType.MINOR,
    format: TournamentFormat.SINGLE_ELIMINATION,
    prizePool: '$50,000',
    teams: ['team1', 'team4', 'team7'],
    matches: ['m6']
  },
  {
    id: 't4',
    name: 'Six Invitational',
    description: 'The most prestigious event in Rainbow Six Siege. The world\'s elite gather to compete for the coveted hammer.',
    logo: '/Tournaments/lega3.png',
    startDate: '2025-02-02T18:00:00Z',
    endDate: '2025-02-15T23:00:00Z',
    location: 'Boston, USA',
    type: TournamentType.MAJOR,
    format: TournamentFormat.DOUBLE_ELIMINATION,
    prizePool: '$3,500,000',
    teams: ['team2', 'team3', 'team5', 'team6'],
    matches: ['m7']
  },
  {
    id: 't5',
    name: 'Championship',
    description: 'The Fortnite Champion Series culminates in a global showdown. Duos from around the world battle for the ultimate prize.',
    logo: '/Tournaments/lega3.png',
    startDate: '2024-09-20T17:00:00Z',
    endDate: '2024-09-22T22:00:00Z',
    location: 'Copenhagen, Denmark',
    type: TournamentType.MAJOR,
    format: TournamentFormat.ROUND_ROBIN,
    prizePool: '$4,000,000',
    teams: ['team8', 'team1', 'team3'],
    matches: ['m8']
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