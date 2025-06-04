import * as XLSX from 'xlsx';
import { Player, PlayerStats } from '../types';

interface ExcelPlayerData {
  [key: string]: any;
}

export class ExcelService {
  private static instance: ExcelService;
  private workbook: XLSX.WorkBook | null = null;

  static getInstance(): ExcelService {
    if (!ExcelService.instance) {
      ExcelService.instance = new ExcelService();
    }
    return ExcelService.instance;
  }

  async loadExcelFile(): Promise<void> {
    try {
      console.log('Attempting to load Excel file...');
      // Fetch the Excel file from the public directory
      const response = await fetch('/tarkov.xlsx');
      console.log('Fetch response status:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Excel file: ${response.status} ${response.statusText}`);
      }
      
      console.log('File fetched successfully, reading as array buffer...');
      const arrayBuffer = await response.arrayBuffer();
      console.log('Array buffer size:', arrayBuffer.byteLength);
      
      this.workbook = XLSX.read(arrayBuffer, { type: 'array' });
      console.log('Workbook loaded successfully');
      console.log('Available sheets:', this.workbook.SheetNames);
    } catch (error) {
      console.error('Error loading Excel file:', error);
      throw error;
    }
  }

  getSheetNames(): string[] {
    if (!this.workbook) {
      throw new Error('Workbook not loaded. Call loadExcelFile() first.');
    }
    return this.workbook.SheetNames;
  }

  getSheetData(sheetName: string): ExcelPlayerData[] {
    if (!this.workbook) {
      throw new Error('Workbook not loaded. Call loadExcelFile() first.');
    }

    const worksheet = this.workbook.Sheets[sheetName];
    if (!worksheet) {
      throw new Error(`Sheet "${sheetName}" not found`);
    }

    // Convert sheet to JSON with headers
    return XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      .filter((row: any) => row.length > 0) // Remove empty rows
      .slice(1) // Remove header row
      .map((row: any, index: number) => {
        // Convert array row to object with meaningful keys
        // This mapping will need to be adjusted based on your actual Excel structure
        return this.mapRowToPlayerData(row, index);
      });
  }

  private mapRowToPlayerData(row: any[], index: number): ExcelPlayerData {
    // Based on the actual Excel structure:
    // A: Team, B: Player, C: K, D: D, E: A, F: BP, G: BD, H: KD, I: KPR, J: RW%, K: RATING, L: RATING BAR
    
    // Debug logging
    console.log(`Row ${index}:`, row);
    console.log(`Length: ${row.length}`);
    console.log(`Team: ${row[0]}, Player: ${row[1]}, Kills: ${row[2]}, Deaths: ${row[3]}, KD: ${row[7]}, Rating: ${row[10]}`);
    
    return {
      id: `player-${index + 1}`,
      team: row[0] || '', // Column A: Team
      nickname: row[1] || `Player ${index + 1}`, // Column B: Player name
      realName: row[1] || `Player ${index + 1}`, // Using same as nickname since real name not in sheet
      kills: parseInt(row[2]) || 0, // Column C: K (Kills)
      deaths: parseInt(row[3]) || 0, // Column D: D (Deaths)
      assists: parseInt(row[4]) || 0, // Column E: A (Assists)
      bp: parseInt(row[5]) || 0, // Column F: BP
      bd: parseInt(row[6]) || 0, // Column G: BD
      kdRatio: parseFloat(row[7]) || 0, // Column H: KD
      kpr: parseFloat(row[8]) || 0, // Column I: KPR
      rwPercent: row[9] || '0%', // Column J: RW% (Round Win percentage)
      rating: parseFloat(row[10]) || 0, // Column K: RATING
      // Set defaults for fields not in Excel
      nationality: 'Unknown',
      role: 'Player',
      entryRatio: '0%',
      kost: 0,
      srv: 0,
      plants: 0,
      headshots: 0,
      attack: 0,
      defense: 0,
    };
  }

  async getPlayersFromStatisticsSheet(): Promise<Player[]> {
    if (!this.workbook) {
      await this.loadExcelFile();
    }

    try {
      const sheetData = this.getSheetData('STATISTICS (FINAL)');
      console.log('Raw sheet data:', sheetData);
      console.log('Number of rows:', sheetData.length);
      
      const players = sheetData.map((data, index): Player => {
        console.log(`Processing player ${index}:`, data);
        
        return {
          id: data.id || `excel-player-${index}`,
          nickname: data.nickname || `Player ${index + 1}`,
          realName: data.realName || data.nickname || `Player ${index + 1}`,
          nationality: data.nationality || 'Unknown',
          teamId: this.generateTeamId(data.team),
          role: data.role || 'Player',
          image: '/default-player.jpg', // Default image
          stats: {
            rating: data.rating || 0,
            kdRatio: data.kdRatio || 0,
            entryRatio: data.rwPercent || '0%', // Using RW% as entry ratio
            kost: data.kost || 0,
            kpr: data.kpr || 0,
            srv: data.srv || 0,
            plants: data.plants || 0,
            headshots: data.headshots || 0,
            attack: data.attack || 0,
            defense: data.defense || 0,
            // Additional Excel stats
            kills: data.kills || 0,
            deaths: data.deaths || 0,
            assists: data.assists || 0,
            rwPercent: data.rwPercent || '0%',
          } as PlayerStats,
        };
      });
      
      console.log('Final players array:', players);
      return players;
    } catch (error) {
      console.error('Error parsing statistics sheet:', error);
      throw new Error('Failed to parse player statistics from Excel file');
    }
  }

  private generateTeamId(teamName: string): string {
    if (!teamName) return 'team-unknown';
    return `team-${teamName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  }

  // Helper method to inspect the actual Excel structure
  async inspectSheet(sheetName: string): Promise<any> {
    if (!this.workbook) {
      await this.loadExcelFile();
    }

    if (!this.workbook) {
      throw new Error('Failed to load workbook');
    }

    const worksheet = this.workbook.Sheets[sheetName];
    if (!worksheet) {
      throw new Error(`Sheet "${sheetName}" not found`);
    }

    // Get first few rows to understand structure
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const firstRow = jsonData.length > 0 && Array.isArray(jsonData[0]) ? jsonData[0] : [];
    
    return {
      headers: firstRow,
      sampleRows: jsonData.slice(1, 6), // First 5 data rows
      totalRows: Math.max(0, jsonData.length - 1),
    };
  }
}

export default ExcelService.getInstance(); 