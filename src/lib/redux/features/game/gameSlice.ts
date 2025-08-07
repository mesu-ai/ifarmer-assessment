import { GameState } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState: GameState = {
  players: {
    player1: '',
    player2: '',
  },
  board: Array(9).fill(null),
  xIsNext: true,
  round: 1,
  scores: {
    player1: 0,
    player2: 0,
  },
  roundWins: {
    player1: 0,
    player2: 0,
  },
  gameOver: false,
  finalWinner: '',
  message: '',
  leaderboard: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<{ player1: string; player2: string }>) => {
      state.players = action.payload;
    },
    makeMove: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (state.board[index] || state.gameOver) return;
      
      state.board[index] = state.xIsNext ? 'X' : 'O';
      state.xIsNext = !state.xIsNext;
    },
    setWinner: (state, action: PayloadAction<string | null>) => {
      const winner = action.payload;
      if (winner) {
        const currentPlayer = winner === 'X' ? 'player1' : 'player2';
        const losingPlayer = winner === 'X' ? 'player2' : 'player1';
        
        // Update scores: Winner gets 2 points, Loser gets 1 point
        state.scores[currentPlayer] += 2;
        state.scores[losingPlayer] += 1;
        
        // Update round wins
        state.roundWins[currentPlayer] += 1;
        
        state.message = `${state.players[currentPlayer]} wins this round!`;
        
        // Check if game should end
        if (state.roundWins[currentPlayer] >= 3 || state.round >= 5) {
          state.gameOver = true;
          if (state.roundWins.player1 > state.roundWins.player2) {
            state.finalWinner = state.players.player1;
          } else if (state.roundWins.player2 > state.roundWins.player1) {
            state.finalWinner = state.players.player2;
          } else {
            state.finalWinner = 'Tie';
          }
        }
      }
    },
    setDraw: (state) => {
      state.message = "It's a draw! No points awarded.";
    },
    resetBoard: (state) => {
      state.board = Array(9).fill(null);
      state.xIsNext = true;
      state.message = '';
    },
    nextRound: (state) => {
      if (state.gameOver) return;
      state.board = Array(9).fill(null);
      state.xIsNext = true;
      state.round += 1;
      state.message = '';
    },
    resetGame: (state) => {
      state.board = Array(9).fill(null);
      state.xIsNext = true;
      state.round = 1;
      state.scores = { player1: 0, player2: 0 };
      state.roundWins = { player1: 0, player2: 0 };
      state.gameOver = false;
      state.finalWinner = '';
      state.message = '';
    },
    addToLeaderboard: (state) => {
      const gameEntry = {
        timestamp: new Date().toISOString(),
        players: state.players,
        winner: state.finalWinner,
        scores: state.scores,
        roundWins: state.roundWins,
      };
      state.leaderboard.push(gameEntry);
    },
    clearLeaderboard: (state) => {
      state.leaderboard = [];
    },
    loadLeaderboardFromStorage: (state, action: PayloadAction<GameState['leaderboard']>) => {
      state.leaderboard = action.payload;
    },
  },
});

export const {
  setPlayers,
  makeMove,
  setWinner,
  setDraw,
  resetBoard,
  nextRound,
  resetGame,
  addToLeaderboard,
  clearLeaderboard,
  loadLeaderboardFromStorage,
} = gameSlice.actions;

export default gameSlice.reducer;
