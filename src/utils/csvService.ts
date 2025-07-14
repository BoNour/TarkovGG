import { Player, Team, Match, PlayerStats, TeamStats, MatchStatus } from '../types';

interface CsvPlayerData {
  Player: string;
  Team: string;
  K: string;
  D: string;
  A: string;
  RP: string;
  KD: string;
  KPR: string;
  Won: string;
  Lost: string;
  WinRate: string;
  'A%': string;
  'D%': string;
  'T%': string;
  // Map specific data
  [key: string]: string;
}

interface CsvTeamData {
  TEAM: string;
  K: string;
  D: string;
  A: string;
  KD: string;
  KPR: string;
  RP: string;
  RW: string;
  RL: string;
  RD: string;
  GW: string;
  GL: string;
  'GWR%': string;
  // Map specific data
  [key: string]: string;
}

interface CsvMatchupData {
  Map: string;
  Team: string;
  Opponent: string;
  'Attack Win%': string;
  'Defense Win%': string;
  'Game Win%': string;
}

interface CsvMapData {
  MAP: string;
  A: string;
  D: string;
  'A%': string;
  'D%': string;
}

export class CsvService {
  private static instance: CsvService;
  private playerData: CsvPlayerData[] = [];
  private teamData: CsvTeamData[] = [];
  private matchupData: CsvMatchupData[] = [];
  private mapData: CsvMapData[] = [];

  static getInstance(): CsvService {
    if (!CsvService.instance) {
      CsvService.instance = new CsvService();
    }
    return CsvService.instance;
  }

  private async loadCsvFile(filename: string): Promise<string> {
    try {
      // Fetch the CSV file from public directory
      const response = await fetch(`/${filename}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${filename}: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.error(`Error loading CSV file ${filename}:`, error);
      throw error;
    }
  }

  private parseCsv(csvText: string): any[] {
    const lines = csvText.trim().split('\n');
    if (lines.length < 3) return [];

    // For these CSV files, the actual headers are on the second line
    const headers = lines[1].split(',').map(h => h.trim());
    const data = [];

    for (let i = 2; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const row: any = {};
      
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      
      // Skip empty rows
      if (Object.values(row).some(v => v !== '')) {
        data.push(row);
      }
    }

    return data;
  }

  async loadAllData(): Promise<void> {
    try {
      console.log('Loading CSV data files...');
      
      // Load player stats
      const playerCsv = await this.loadCsvFile('TARKOV.GG - PLAYER STATS.csv');
      this.playerData = this.parseCsv(playerCsv);
      
      // Load team stats
      const teamCsv = await this.loadCsvFile('TARKOV.GG - TEAM STATS.csv');
      this.teamData = this.parseCsv(teamCsv);
      
      // Load matchups
      const matchupCsv = await this.loadCsvFile('TARKOV.GG - MATCHUPS.csv');
      this.matchupData = this.parseCsv(matchupCsv);
      
      // Load map stats
      const mapCsv = await this.loadCsvFile('TARKOV.GG - MAP STATS.csv');
      this.mapData = this.parseCsv(mapCsv);
      
      console.log('All CSV data loaded successfully');
      console.log('Players:', this.playerData.length);
      console.log('Teams:', this.teamData.length);
      console.log('Matchups:', this.matchupData.length);
      console.log('Maps:', this.mapData.length);
    } catch (error) {
      console.error('Error loading CSV data:', error);
      throw error;
    }
  }

  getPlayers(): Player[] {
    return this.playerData.map((row, index) => {
      const stats: PlayerStats = {
        rating: parseFloat(row.KD) || 0,
        kdRatio: parseFloat(row.KD) || 0,
        entryRatio: `${row.K}-${row.D}`,
        kost: parseFloat(row['A%']) / 100 || 0,
        kpr: parseFloat(row.KPR) || 0,
        srv: parseFloat(row['D%']) / 100 || 0,
        plants: 0, // Not available in CSV
        headshots: 0, // Not available in CSV
        attack: parseFloat(row['A%']) || 0,
        defense: parseFloat(row['D%']) || 0
      };

      return {
        id: `player_${index + 1}`,
        nickname: row.Player,
        realName: row.Player, // Using nickname as real name since not provided
        nationality: 'Unknown', // Not provided in CSV
        teamId: this.generateTeamId(row.Team),
        role: 'Player', // Generic role since not specified
        image: '/Players/fulllpmc2.png', // Default image
        stats
      };
    });
  }

  getTeams(): Team[] {
    return this.teamData.map((row, index) => {
      const stats: TeamStats = {
        wins: parseInt(row.GW) || 0,
        losses: parseInt(row.GL) || 0,
        winRate: parseFloat(row['GWR%'].replace('%', '')) / 100 || 0,
        roundsWon: parseInt(row.RW) || 0,
        roundsPlayed: (parseInt(row.RW) || 0) + (parseInt(row.RL) || 0),
        tournamentPlacements: [],
        mapStats: this.getTeamMapStats(row.TEAM)
      };

      return {
        id: this.generateTeamId(row.TEAM),
        name: row.TEAM,
        tag: this.generateTeamTag(row.TEAM),
        logo: '/TEAMs/cov logo.png', // Default logo
        region: 'Unknown', // Not provided in CSV
        players: this.getTeamPlayers(row.TEAM),
        stats
      };
    });
  }

  private getTeamMapStats(teamName: string): any {
    const mapStats: any = {};
    
    // Get matchup data for this team
    const teamMatchups = this.matchupData.filter(m => m.Team === teamName);
    
    teamMatchups.forEach(matchup => {
      const mapName = matchup.Map.toLowerCase().replace(' ', '_');
      const gameWinRate = parseFloat(matchup['Game Win%'].replace('%', '')) / 100;
      
      if (!mapStats[mapName]) {
        mapStats[mapName] = {
          wins: 0,
          losses: 0,
          winRate: 0,
          plays: 0
        };
      }
      
      mapStats[mapName].plays++;
      if (gameWinRate > 0.5) {
        mapStats[mapName].wins++;
      } else {
        mapStats[mapName].losses++;
      }
      mapStats[mapName].winRate = mapStats[mapName].wins / mapStats[mapName].plays;
    });
    
    return mapStats;
  }

  private getTeamPlayers(teamName: string): string[] {
    return this.playerData
      .filter(player => player.Team === teamName)
      .map((_, index) => `player_${this.playerData.indexOf(_) + 1}`);
  }

  private generateTeamId(teamName: string): string {
    return `team_${teamName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
  }

  private generateTeamTag(teamName: string): string {
    // Generate a short tag from team name
    const words = teamName.split(' ');
    if (words.length === 1) {
      return words[0].substring(0, 4).toUpperCase();
    }
    return words.map(w => w.charAt(0)).join('').toUpperCase().substring(0, 4);
  }

  getMatchups(): CsvMatchupData[] {
    return this.matchupData;
  }

  getMapStats(): CsvMapData[] {
    return this.mapData;
  }

  // Get top players by KD ratio
  getTopPlayers(limit: number = 10): Player[] {
    const players = this.getPlayers();
    return players
      .sort((a, b) => b.stats.kdRatio - a.stats.kdRatio)
      .slice(0, limit);
  }

  // Get top teams by win rate
  getTopTeams(limit: number = 10): Team[] {
    const teams = this.getTeams();
    return teams
      .sort((a, b) => b.stats.winRate - a.stats.winRate)
      .slice(0, limit);
  }

  // Generate matches based on CSV matchup data
  getMatches(): Match[] {
    const teams = this.getTeams();
    const matches: Match[] = [];
    
    // Group matchups by team pairs
    const matchupMap = new Map<string, CsvMatchupData[]>();
    
    this.matchupData.forEach(matchup => {
      const key = [matchup.Team, matchup.Opponent].sort().join('|');
      if (!matchupMap.has(key)) {
        matchupMap.set(key, []);
      }
      matchupMap.get(key)!.push(matchup);
    });

    let matchIndex = 1;
    matchupMap.forEach((matchups, teamPairKey) => {
      const [teamOneName, teamTwoName] = teamPairKey.split('|');
      const teamOne = teams.find(t => t.name === teamOneName);
      const teamTwo = teams.find(t => t.name === teamTwoName);
      
      if (teamOne && teamTwo) {
        // Create completed matches based on CSV data
        matchups.forEach((matchup, index) => {
          const gameWinRate = parseFloat(matchup['Game Win%'].replace('%', '')) / 100;
          const isTeamOneWin = matchup.Team === teamOneName ? gameWinRate > 0.5 : gameWinRate <= 0.5;
          
          matches.push({
            id: `csv_match_${matchIndex++}`,
            teamOneId: teamOne.id,
            teamTwoId: teamTwo.id,
            teamOneScore: isTeamOneWin ? 2 : 1,
            teamTwoScore: isTeamOneWin ? 1 : 2,
            status: MatchStatus.COMPLETED,
            date: this.generateRecentDate(index),
            tournamentId: 'csv_tournament_1',
            maps: [{
              name: matchup.Map,
              teamOneScore: isTeamOneWin ? 13 : 8,
              teamTwoScore: isTeamOneWin ? 8 : 13
            }]
          });
        });
      }
    });

    // Add some upcoming matches
    const topTeams = this.getTopTeams(6);
    for (let i = 0; i < topTeams.length - 1; i += 2) {
      matches.push({
        id: `upcoming_match_${i + 1}`,
        teamOneId: topTeams[i].id,
        teamTwoId: topTeams[i + 1].id,
        teamOneScore: 0,
        teamTwoScore: 0,
        status: MatchStatus.UPCOMING,
        date: this.generateFutureDate(i),
        tournamentId: 'csv_tournament_1',
        maps: []
      });
    }

    // Add some live matches
    if (topTeams.length >= 4) {
      matches.push({
        id: 'live_match_1',
        teamOneId: topTeams[0].id,
        teamTwoId: topTeams[2].id,
        teamOneScore: 1,
        teamTwoScore: 1,
        status: MatchStatus.LIVE,
        date: new Date().toISOString(),
        tournamentId: 'csv_tournament_1',
        maps: [{
          name: 'ICEBERG',
          teamOneScore: 11,
          teamTwoScore: 9
        }]
      });
    }

    return matches.sort((a, b) => {
      // Sort by status priority (live, upcoming, completed) then by date
      const statusPriority = { live: 0, upcoming: 1, completed: 2 };
      const aPriority = statusPriority[a.status];
      const bPriority = statusPriority[b.status];
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
      
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  private generateRecentDate(offset: number): string {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 14) + offset; // Random date within last 2 weeks
    const date = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
    return date.toISOString();
  }

  private generateFutureDate(offset: number): string {
    const now = new Date();
    const daysFromNow = offset + 1; // 1-3 days from now
    const date = new Date(now.getTime() + (daysFromNow * 24 * 60 * 60 * 1000));
    return date.toISOString();
  }
} 