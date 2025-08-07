export interface GameState {
  players: {
    player1: string;
    player2: string;
  };
  board: (string | null)[];
  xIsNext: boolean;
  round: number;
  scores: {
    player1: number;
    player2: number;
  };
  roundWins: {
    player1: number;
    player2: number;
  };
  gameOver: boolean;
  finalWinner: string;
  message: string;
  leaderboard: Array<{
    timestamp: string;
    players: {
      player1: string;
      player2: string;
    };
    winner: string;
    scores: {
      player1: number;
      player2: number;
    };
    roundWins: {
      player1: number;
      player2: number;
    };
  }>;
}