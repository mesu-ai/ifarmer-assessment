import PageTitle from '@/components/ui/PageTitle';
import Link from 'next/link';
import React from 'react';

const TicTacToe = () => {
  return (
    <div className='flex items-center justify-center min-h-[80vh]'>
      <div className='bg-slate-50 rounded-md py-20 px-10 max-w-4xl w-full'>
        <PageTitle className='text-center'>Tic-Tac-Toe Game</PageTitle>

        <div className='text-center'>
          <p className='mt-4 text-sm sm:text-base lg:text-lg text-gray-700'>
            Experience the ultimate Tic-Tac-Toe battle with our enhanced scoring
            system!
          </p>

          {/* Game Rules */}
          <div className='mt-8 bg-white p-6 rounded-lg shadow-sm text-left'>
            <h3 className='text-lg sm:text-xl font-semibold mb-4 text-center'>
              🕹️ Game Rules
            </h3>
            <ul className='space-y-2 text-gray-700 list-disc list-inside'>
              <li>
                <strong>Best of 5 rounds</strong> - First to win 3 rounds is the
                champion!
              </li>
              <li>
                <strong>Scoring System:</strong>
              </li>
              <li className='ml-6 list-none'>
                - Win a round:{' '}
                <span className='text-green-600 font-bold'>+2 points</span>
              </li>
              <li className='ml-6 list-none'>
                - Lose a round:{' '}
                <span className='text-blue-600 font-bold'>+1 point</span>
              </li>
              <li className='ml-6 list-none'>
                - Draw:{' '}
                <span className='text-gray-600 font-bold'>0 points</span>
              </li>
              <li>
                Game ends after 5 rounds or when a player gets an unbeatable
                lead
              </li>
              <li>Session-based leaderboard tracks all your games!</li>
              <li>To start the game, you&apos;ll need to <strong>set up your players first</strong></li>
            </ul>
          </div>

          {/* Navigation Buttons */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-8'>
            <Link
              href='/assignment-1/player-setup'
              className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-lg transition-colors text-center block'
            >
              <div className='text-2xl mb-2'>👥</div>
              <div className='text-sm font-medium'>Set Up Players</div>
            </Link>
            <Link
              href='/assignment-1/game'
              className='bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg transition-colors text-center block'
            >
              <div className='text-2xl mb-2'>🎮</div>
              <div className='text-sm font-medium'>Start Game</div>
            </Link>
            <Link
              href='/assignment-1/leaderboard'
              className='bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-4 rounded-lg transition-colors text-center block'
            >
              <div className='text-2xl mb-2'>🏆</div>
              <div className='text-sm font-medium'>Leaderboard</div>
            </Link>
            <Link
              href='/'
              className='bg-gray-500 hover:bg-gray-600 text-white px-6 py-4 rounded-lg transition-colors text-center block'
            >
              <div className='text-2xl mb-2'>🏠</div>
              <div className='text-sm font-medium'>Back to Home</div>
            </Link>
          </div>

          {/* Quick Start Guide */}
          <div className='mt-8 text-sm text-gray-600'>
            <p>
              <strong>Quick Start:</strong> Set up players → Start game → Play 5rounds → View results → Check leaderboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
