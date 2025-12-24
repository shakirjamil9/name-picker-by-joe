export enum AppState {
  INPUT = 'INPUT',
  SHUFFLING = 'SHUFFLING',
  RESULT = 'RESULT'
}

export interface DrawConfig {
  names: string;
  winnerCount: number;
}