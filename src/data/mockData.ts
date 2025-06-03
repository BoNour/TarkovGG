import { Player, Team, Match, Tournament, News, MatchStatus, TournamentType, TournamentFormat } from '../types';

// Mock Players
export const mockPlayers: Player[] = [
  {
    id: '1',
    nickname: 'Anitun',
    realName: 'Reon Sakai',
    nationality: 'JP',
    teamId: '1',
    role: 'Entry Fragger',
    image: 'https://i.pravatar.cc/150?img=1',
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
    image: 'https://i.pravatar.cc/150?img=2',
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
    }
  },
  {
    id: '3',
    nickname: 'HerdsZ',
    realName: 'Henry Rodriguez',
    nationality: 'BR',
    teamId: '2',
    role: 'Flex',
    image: 'https://i.pravatar.cc/150?img=3',
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
    }
  },
  {
    id: '4',
    nickname: 'Chibisu',
    realName: 'Takuma Yoshida',
    nationality: 'JP',
    teamId: '1',
    role: 'Support',
    image: 'https://i.pravatar.cc/150?img=4',
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
    image: 'https://i.pravatar.cc/150?img=5',
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
    image: 'https://i.pravatar.cc/150?img=6',
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
  }
];

// Mock Teams
export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'CAG Osaka',
    tag: 'CAG',
    logo: 'https://placehold.co/200x200/e74c3c/ffffff?text=CAG',
    region: 'APAC',
    players: ['1', '4', '5'],
    stats: {
      wins: 15,
      losses: 10,
      winRate: 0.6,
      roundsWon: 150,
      roundsLost: 120,
      tournamentPlacements: [
        { tournamentId: '1', placement: 3 },
        { tournamentId: '2', placement: 2 }
      ]
    }
  },
  {
    id: '2',
    name: 'FURIA Esports',
    tag: 'FURIA',
    logo: 'https://placehold.co/200x200/2c3e50/ffffff?text=FURIA',
    region: 'LATAM',
    players: ['2', '3'],
    stats: {
      wins: 20,
      losses: 5,
      winRate: 0.8,
      roundsWon: 200,
      roundsLost: 100,
      tournamentPlacements: [
        { tournamentId: '1', placement: 1 },
        { tournamentId: '3', placement: 1 }
      ]
    }
  },
  {
    id: '3',
    name: 'Team Liquid',
    tag: 'TL',
    logo: 'https://placehold.co/200x200/3498db/ffffff?text=TL',
    region: 'EU',
    players: ['6'],
    stats: {
      wins: 18,
      losses: 7,
      winRate: 0.72,
      roundsWon: 180,
      roundsLost: 110,
      tournamentPlacements: [
        { tournamentId: '2', placement: 1 },
        { tournamentId: '3', placement: 2 }
      ]
    }
  },
  {
    id: '4',
    name: 'FaZe Clan',
    tag: 'FaZe',
    logo: 'https://placehold.co/200x200/e67e22/ffffff?text=FaZe',
    region: 'NA',
    players: [],
    stats: {
      wins: 16,
      losses: 9,
      winRate: 0.64,
      roundsWon: 160,
      roundsLost: 130,
      tournamentPlacements: [
        { tournamentId: '1', placement: 2 },
        { tournamentId: '2', placement: 3 }
      ]
    }
  }
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
    status: MatchStatus.LIVE,
    maps: [
      { name: 'Border', teamOneScore: 4, teamTwoScore: 3 }
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