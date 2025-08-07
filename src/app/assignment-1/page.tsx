'use client';

import LinkButton from '@/components/ui/LinkButton';
import PageTitle from '@/components/ui/PageTitle';
import { resetGame } from '@/lib/redux/features/game/gameSlice';
import { useAppDispatch } from '@/lib/redux/hooks';
import React from 'react';

const TicTacToe = () => {

  const dispatch = useAppDispatch();

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
              <li>Session-based leaderboard tracks all your games!</li>
              <li>
                To start the game, you&apos;ll need to{' '}
                <strong>set up your players first</strong>
              </li>
            </ul>
          </div>

          {/* Navigation Buttons */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-8'>
            <LinkButton
              href='/assignment-1/player-setup'
              name='Set Up Players'
              className='bg-blue-500 hover:bg-blue-600 text-white'
            />

            <LinkButton
              href='/assignment-1/game'
              name='Start Game'
              className='bg-green-500 hover:bg-green-600 text-white'
              onClick={() => dispatch(resetGame())}
            />

            <LinkButton
              href='/assignment-1/leaderboard'
              name='Leaderboard'
              className='bg-yellow-500 hover:bg-yellow-600 text-white'
            />

            <LinkButton
              href='/'
              name='Back to Home'
              className='bg-gray-500 hover:bg-gray-600 text-white'
            />
          </div>

          {/* Quick Start Guide */}
          <div className='mt-8 text-sm text-gray-600'>
            <p>
              <strong>Quick Start:</strong> Set up players → Start game → Play
              5rounds → View results → Check leaderboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
