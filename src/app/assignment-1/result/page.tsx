'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import {
  addToLeaderboard,
  resetGame,
} from '@/lib/redux/features/game/gameSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GameData } from '@/types/types';

const ResultPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const gameState = useAppSelector((state) => state.game);
  const [gameData, setGameData] = useState<GameData | null>(null);

  useEffect(() => {
    // Try Redux state first, then sessionStorage, then redirect
    if (gameState.gameOver && gameState.players.player1) {
      setGameData(gameState);
    } else {
      const savedResults = sessionStorage.getItem('gameResults');
      if (savedResults) {
        try {
          setGameData(JSON.parse(savedResults));
        } catch {
          router.push('/assignment-1');
        }
      } else {
        router.push('/assignment-1');
      }
    }
  }, [gameState, router]);

  const saveToLeaderboard = () => {
    dispatch(addToLeaderboard());

    // Also save to sessionStorage for persistence
    const existingLeaderboard = JSON.parse(
      sessionStorage.getItem('leaderboard') || '[]'
    );
    const gameEntry = {
      timestamp: new Date().toISOString(),
      players: gameData?.players,
      winner: gameData?.finalWinner,
      scores: gameData?.scores,
      roundWins: gameData?.roundWins,
    };
    existingLeaderboard.push(gameEntry);
    sessionStorage.setItem('leaderboard', JSON.stringify(existingLeaderboard));

    router.push('/assignment-1/leaderboard');
  };

  const playAgain = () => {
    dispatch(resetGame());
    router.push('/assignment-1/game');
  };

  if (!gameData) {
    return (
      <div className='flex items-center justify-center min-h-[80vh]'>
        Loading...
      </div>
    );
  }

  

  return (
    <div className='flex items-center justify-center min-h-[80vh] bg-white text-black'>
      <div className='bg-slate-50 rounded-md p-10 max-w-4xl w-full'>
        <h1 className='sr-only'>Tic-Tac-Toe - Your Result</h1>

        <div className='mt-8 text-center'>
          {/* Final Winner */}
          <div className='mb-8'>
            <h2 className='text-3xl font-bold mb-4 text-green-600'>
              {gameData.finalWinner === 'Tie'
                ? "It's a Tie!"
                : `${gameData.finalWinner} Wins!`}
            </h2>
          </div>

          <div className='mb-8 grid grid-cols-5 gap-4 border border-gray-300 p-4 rounded-lg shadow-sm'>
            {/* Players */}
            <h2 className='col-span-5 mb-1 font-semibold'>Players</h2>
            <div className='col-span-2'>
              <h3 className='text-lg md:text-xl font-semibold mb-2'>
                {gameData.players.player1} (
                <span className='text-blue-600'>X</span>)
              </h3>
            </div>
            <div className='col-span-1 text-center'>
              <p className='text-xl'>vs</p>
            </div>
            <div className='col-span-2'>
              <h3 className='text-lg md:text-xl font-semibold mb-2'>
                {gameData.players.player2} (
                <span className='text-blue-600'>O</span>)
              </h3>
            </div>

            {/* Round Wins */}
            <h2 className='col-span-5 mb-1 font-semibold'>Round Wins</h2>
            <div className='col-span-2'>
              <p className='text-lg font-medium'>
                {gameData.roundWins.player1} rounds
              </p>
            </div>
            <div className='col-span-1 text-center'>-</div>
            <div className='col-span-2'>
              <p className='text-lg font-medium'>
                {gameData.roundWins.player2} rounds
              </p>
            </div>

            {/* Final Scores */}
            <h2 className='col-span-5 mb-1 font-semibold'>Final Scores</h2>
            <div className='col-span-2'>
              <p className='text-lg font-medium'>
                {gameData.scores.player1} points
              </p>
            </div>
            <div className='col-span-1 text-center'>-</div>
            <div className='col-span-2'>
              <p className='text-lg font-medium'>
                {gameData.scores.player2} points
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='grid md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto'>
            <button
              type='button'
              onClick={playAgain}
              className='bg-blue-500 text-white px-6 py-3 rounded-lg md:text-lg hover:bg-blue-600 cursor-pointer'
            >
              Play Again
            </button>
            <button
              type='button'
              onClick={saveToLeaderboard}
              className='bg-green-500 text-white px-6 py-3 rounded-lg md:text-lg hover:bg-green-600 cursor-pointer'
            >
              Save to Leaderboard
            </button>
            <button
              type='button'
              onClick={() => router.push('/assignment-1')}
              className='bg-gray-500 text-white px-6 py-3 rounded-lg md:text-lg hover:bg-gray-600 cursor-pointer'
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
