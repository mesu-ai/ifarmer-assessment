import { GameOverScreenProps } from '@/types/types';
import React, { FC } from 'react';

const GameOverScreen: FC<GameOverScreenProps> = ({
  finalWinner,
  players,
  roundWins,
  goToResults,
}) => {
  return (
    <div className='text-center mb-6'>
      <h2 className='text-2xl font-bold mb-2 text-red-600'>Game Over!</h2>
      <p className='text-xl mb-4'>
        {finalWinner === 'Tie'
          ? "It's a tie!"
          : `${finalWinner} is the final winner!`}
      </p>
      <div className='mb-4'>
        <p className='text-lg'>Final Round Wins:</p>
        <p>
          {players.player1}: {roundWins.player1} | {players.player2}:{' '}
          {roundWins.player2}
        </p>
      </div>
      <button
        onClick={goToResults}
        className='bg-green-500 text-white px-6 py-3 rounded-lg text-lg cursor-pointer'
      >
        View Results
      </button>
    </div>
  );
};

export default GameOverScreen;
