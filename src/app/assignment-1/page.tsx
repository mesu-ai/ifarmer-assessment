import PageTitle from '@/components/ui/PageTitle';
import Link from 'next/link';
import React from 'react';

const TicTacToe = () => {


  return (
    <div className='flex items-center justify-center min-h-[80vh]'>
      <div className='bg-slate-100 rounded-md py-20 px-10 max-w-4xl w-full'>
        <PageTitle className='text-center'>Welcome to the Tic-Tac-Toe Game!</PageTitle>
        <div className='text-center'>
          <p className='mt-2'>Please set up players before starting the game.</p>
          <div className='space-x-5 mt-5'>
            <Link
            href='/assignment-1/player-setup'
            className='mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded'
          >
            Set Up Players
          </Link>
          <Link
            href='/assignment-1/game'
            className='mt-6 inline-block bg-green-500 text-white px-4 py-2 rounded'
          >
            Start Game
          </Link>
          <Link
            href='/assignment-1/leaderboard'
            className='mt-6 inline-block bg-yellow-500 text-white px-4 py-2 rounded'
          >
            View Leaderboard
          </Link>
          <Link
            href='/'
            className='mt-6 inline-block bg-red-500 text-white px-4 py-2 rounded'
          >
            Back to Home
          </Link>

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
