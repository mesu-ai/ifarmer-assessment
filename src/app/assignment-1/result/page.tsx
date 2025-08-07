'use client';

import PageTitle from '@/components/ui/PageTitle';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { addToLeaderboard, resetGame } from '@/lib/redux/features/game/gameSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const ResultPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { players, scores, roundWins, finalWinner, gameOver } = useAppSelector((state) => state.game);

  console.log({players, scores, roundWins, finalWinner, gameOver})

  useEffect(() => {
    // If no game data or game not over, redirect
    if (!gameOver || !players.player1 || !players.player2) {
      const savedResults = sessionStorage.getItem('gameResults');
      if (!savedResults) {
        router.push('/assignment-1');
      }
    }
  }, [gameOver, players, router]);

  const saveToLeaderboard = () => {
    // Add to Redux leaderboard
    dispatch(addToLeaderboard());
    
    // Also save to sessionStorage for persistence
    const existingLeaderboard = JSON.parse(sessionStorage.getItem('leaderboard') || '[]');
    const gameEntry = {
      timestamp: new Date().toISOString(),
      players,
      winner: finalWinner,
      scores,
      roundWins,
    };
    existingLeaderboard.push(gameEntry);
    sessionStorage.setItem('leaderboard', JSON.stringify(existingLeaderboard));
    
    // Navigate to leaderboard
    router.push('/assignment-1/leaderboard');
  };

  const playAgain = () => {
    dispatch(resetGame());
    router.push('/assignment-1/game');
  };

  if (!players.player1 || !players.player2) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex items-center justify-center min-h-[80vh] bg-white text-black'>
      <div className='bg-slate-50 rounded-md p-10 max-w-4xl w-full'>
        <h1 className='text-xl font-bold'>Tic-Tac-Toe - Your Result: </h1>
        <div className='mt-8 text-center'>
          {/* Final Winner */}
          <div className='mb-8'>
            <h2 className='text-3xl font-bold mb-4 text-green-600'>
              {finalWinner === 'Tie' ? "It's a Tie!" : `${finalWinner} Wins!`}
            </h2>
          </div>

          {/* Round Wins Summary */}
          <div className='mb-8'>
            <h3 className='text-xl font-semibold mb-4'>Round Wins</h3>
            <div className='flex justify-center gap-8 text-lg'>
              <div className='text-center'>
                <p className='font-bold'>{players.player1}</p>
                <p className='text-2xl text-blue-600'>{roundWins.player1}</p>
              </div>
              <div className='text-center'>
                <p className='text-xl'>vs</p>
              </div>
              <div className='text-center'>
                <p className='font-bold'>{players.player2}</p>
                <p className='text-2xl text-blue-600'>{roundWins.player2}</p>
              </div>
            </div>
          </div>

          {/* Final Scores */}
          <div className='mb-8'>
            <h3 className='text-xl font-semibold mb-4'>Final Scores</h3>
            <div className='flex justify-center gap-8 text-lg'>
              <div className='text-center'>
                <p className='font-bold'>{players.player1}</p>
                <p className='text-2xl text-green-600'>{scores.player1} points</p>
              </div>
              <div className='text-center'>
                <p className='text-xl'>vs</p>
              </div>
              <div className='text-center'>
                <p className='font-bold'>{players.player2}</p>
                <p className='text-2xl text-green-600'>{scores.player2} points</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='grid md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto'>
            <button
              type='button'
              onClick={playAgain}
              className='bg-blue-500 text-white px-6 py-3 rounded-lg md:text-lg'
            >
              Play Again
            </button>
            <button
              type='button'
              onClick={saveToLeaderboard}
              className='bg-green-500 text-white px-6 py-3 rounded-lg md:text-lg'
            >
              Save to Leaderboard
            </button>
            <button
              type='button'
              onClick={() => router.push('/assignment-1')}
              className='bg-gray-500 text-white px-6 py-3 rounded-lg md:text-lg'
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;