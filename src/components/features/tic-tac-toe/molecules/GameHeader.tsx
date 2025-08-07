import { GameHeaderProps } from '@/types/types';
import React from 'react';

const GameHeader: React.FC<GameHeaderProps> = ({
  round,
  players,
  roundWins,
  xIsNext,
}) => {
  return (
    <div>
      {/* Players and Round Wins */}
      <h2 className='text-lg md:text-xl font-bold mb-3 text-green-600'>
        Round {round} of 5
      </h2>
      <div className='bg-white mb-4 border border-gray-400 rounded-lg px-5 py-1 max-w-sm mx-auto'>
        <p className='text-lg'>
          <span className='font-semibold'>{players.player1}</span> (X) vs{' '}
          <span className='font-semibold'>{players.player2}</span> (O)
        </p>
        <p className='text-sm text-gray-600'>
          Round Wins: {players.player1} {roundWins.player1} -{' '}
          {roundWins.player2} {players.player2}
        </p>
      </div>

      {/* Current Turn Indicator */}
      <div className='mb-4 text-base font-medium text-blue-600'>
        Current Turn: {xIsNext ? players.player1 : players.player2} (
        {xIsNext ? 'X' : 'O'})
      </div>
    </div>
  );
};

export default GameHeader;
