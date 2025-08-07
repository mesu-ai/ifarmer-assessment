'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import {
  makeMove,
  setWinner,
  setDraw,
  resetBoard,
  nextRound,
  setPlayers as setPlayersAction,
} from '@/lib/redux/features/game/gameSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import GameOverScreen from '@/components/features/tic-tac-toe/molecules/GameOverScreen';
import GameHeader from '@/components/features/tic-tac-toe/molecules/GameHeader';
import GameBoard from '@/components/features/tic-tac-toe/molecules/GameBoard';
import Button from '@/components/ui/Button';

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const GamePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    players,
    board,
    xIsNext,
    round,
    scores,
    roundWins,
    gameOver,
    finalWinner,
    message,
  } = useAppSelector((state) => state.game);

  useEffect(() => {
    // Check if players are set, if not redirect to player setup
    if (!players.player1 || !players.player2) {
      const savedPlayers = sessionStorage.getItem('players');
      if (savedPlayers) {
        dispatch(setPlayersAction(JSON.parse(savedPlayers)));
      } else {
        router.push('/assignment-1/player-setup');
      }
    }
  }, [router, players, dispatch]);

  const handleClick = (index: number) => {
    if (board[index] || gameOver) return;
    dispatch(makeMove(index));
  };

  const calculateWinner = (squares: (string | null)[]) => {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      dispatch(setWinner(winner));
    } else if (!board.includes(null)) {
      dispatch(setDraw());
    }
  }, [board, dispatch]);

  const handleResetBoard = () => {
    dispatch(resetBoard());
  };

  const handleNextRound = () => {
    dispatch(nextRound());
  };

  const goToResults = () => {
    // Save final results to sessionStorage for backup
    const results = {
      players,
      scores,
      roundWins,
      finalWinner,
    };
    sessionStorage.setItem('gameResults', JSON.stringify(results));
    router.push('/assignment-1/result');
  };

  if (!players.player1 || !players.player2) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex items-center justify-center min-h-[80vh]'>
      <h1 className='sr-only'>Tic Tac Toe Game</h1>

      <div className='bg-slate-50 p-10 max-w-4xl w-full rounded-lg shadow-sm'>
        {gameOver ? (
          <GameOverScreen
            finalWinner={finalWinner}
            players={players}
            roundWins={roundWins}
            goToResults={goToResults}
          />
        ) : (
          <div className='text-center'>
            <GameHeader
              round={round}
              players={players}
              roundWins={roundWins}
              xIsNext={xIsNext}
            />
            <GameBoard
              board={board}
              handleClick={handleClick}
              calculateWinner={calculateWinner}
            />

            {/* Message */}
            {message && (
              <div className='mb-4 text-lg font-medium text-green-600'>
                {message}
              </div>
            )}

            {/* Score Display */}
            <div className='mb-4 text-center'>
              <p className='text-lg font-semibold'>Current Scores:</p>
              <p className='text-md'>
                {players.player1}: {scores.player1} points | {players.player2}:{' '}
                {scores.player2} points
              </p>
            </div>

            {/* Action Buttons */}
            <div className='mx-auto space-x-4'>
              {!calculateWinner(board) && board.includes(null) && (
                <Button
                  name='Reset Board'
                  onClick={handleResetBoard}
                  className='bg-gray-500 hover:bg-gray-600 text-white'
                />
              )}
              {(calculateWinner(board) || !board.includes(null)) && (
                <Button
                  name='Next Round'
                  onClick={handleNextRound}
                  className='bg-blue-500 hover:bg-blue-600 text-white'
                />
              )}
            </div>

            {/* Game Progress */}
            <div className='mt-4 text-sm text-gray-600'>
              <p>First to 3 round wins or complete 5 rounds wins the game!</p>
              <p>Scoring: Win = 2 points, Loss = 1 point, Draw = 0 points</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
