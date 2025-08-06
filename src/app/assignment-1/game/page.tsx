'use client';

import PageTitle from '@/components/ui/PageTitle';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { 
  makeMove, 
  setWinner, 
  setDraw, 
  resetBoard, 
  nextRound, 
  setPlayers as setPlayersAction 
} from '@/lib/redux/features/game/gameSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

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
    message 
  } = useAppSelector((state) => state.game);

  useEffect(() => {
    // Check if players are set, if not redirect to player setup
    if (!players.player1 || !players.player2) {
      const savedPlayers = sessionStorage.getItem('players');
      if (savedPlayers) {
        dispatch(setPlayersAction(JSON.parse(savedPlayers)));
      } else {
        router.push('/assignment-1');
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
      finalWinner
    };
    sessionStorage.setItem('gameResults', JSON.stringify(results));
    router.push('/assignment-1/result');
  };

  if (!players.player1 || !players.player2) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex items-center justify-center min-h-[80vh] bg-white text-black'>
      <main className='flex flex-col items-center justify-center min-h-screen p-4'>
        <PageTitle>Tic-Tac-Toe</PageTitle>
        
        {gameOver ? (
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-bold mb-2 text-green-600'>
              Game Over! 🎉
            </h2>
            <p className='text-xl mb-4'>
              {finalWinner === 'Tie' ? "It's a tie!" : `${finalWinner} is the final winner!`}
            </p>
            <div className='mb-4'>
              <p className='text-lg'>Final Round Wins:</p>
              <p>{players.player1}: {roundWins.player1} | {players.player2}: {roundWins.player2}</p>
            </div>
            <button
              onClick={goToResults}
              className='bg-green-500 text-white px-6 py-3 rounded-lg text-lg'
            >
              View Results
            </button>
          </div>
        ) : (
          <>
            <h1 className='text-xl font-bold mb-4'>Round {round} of 5</h1>
            
            {/* Players and Round Wins */}
            <div className='mb-4 text-center'>
              <p className='text-lg'>
                {players.player1} (X) vs {players.player2} (O)
              </p>
              <p className='text-sm text-gray-600'>
                Round Wins: {players.player1} {roundWins.player1} - {roundWins.player2} {players.player2}
              </p>
            </div>

            {/* Current Turn Indicator */}
            <div className='mb-4 text-lg font-medium text-blue-600'>
              Current Turn: {xIsNext ? players.player1 : players.player2} ({xIsNext ? 'X' : 'O'})
            </div>

            {/* Game Board */}
            <div className='grid grid-cols-3 gap-2 mb-4'>
              {board.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  className={`w-16 h-16 text-2xl font-bold border-2 border-gray-400 
                    ${cell ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'} 
                    ${calculateWinner(board) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  disabled={!!calculateWinner(board)}
                >
                  {cell}
                </button>
              ))}
            </div>

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
                {players.player1}: {scores.player1} points | {players.player2}: {scores.player2} points
              </p>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-4'>
              <button
                onClick={handleResetBoard}
                className='bg-gray-500 text-white px-4 py-2 rounded'
                disabled={!calculateWinner(board) && board.includes(null)}
              >
                Reset Board
              </button>
              
              {(calculateWinner(board) || !board.includes(null)) && (
                <button
                  onClick={handleNextRound}
                  className='bg-blue-500 text-white px-4 py-2 rounded'
                >
                  Next Round
                </button>
              )}
            </div>

            {/* Game Progress */}
            <div className='mt-4 text-sm text-gray-600'>
              <p>First to 3 round wins or complete 5 rounds wins the game!</p>
              <p>Scoring: Win = 2 points, Loss = 1 point, Draw = 0 points</p>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default GamePage;
