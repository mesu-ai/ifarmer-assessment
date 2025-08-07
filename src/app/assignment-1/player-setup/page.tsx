'use client';

import PageTitle from '@/components/ui/PageTitle';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setPlayers, resetGame } from '@/lib/redux/features/game/gameSlice';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';

interface PlayerProps {
  player1: string;
  player2: string;
}

const PlayerSetupPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [players, setPlayersLocal] = useState<PlayerProps>({
    player1: '',
    player2: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPlayersLocal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate both names are provided
    if (!players.player1.trim() || !players.player2.trim()) {
      alert('Both player names are required!');
      return;
    }

    // Validate names are different
    if (players.player1.toLowerCase() === players.player2.toLowerCase()) {
      alert('Player names must be different!');
      return;
    }

    const trimmedPlayers = {
      player1: players.player1.trim(),
      player2: players.player2.trim(),
    };

    // Reset game state and set new players
    dispatch(resetGame());
    dispatch(setPlayers(trimmedPlayers));

    // Also save to sessionStorage for backup
    sessionStorage.setItem('players', JSON.stringify(trimmedPlayers));
    router.push('/assignment-1/game');
  };

  const isFormValid = players.player1.trim() && players.player2.trim();

  return (
    <div className='flex items-center justify-center min-h-[80vh]'>
      <div className='bg-slate-50 py-20 px-10 max-w-4xl w-full rounded-lg shadow-sm'>
        <PageTitle className='text-center'>Tic-Tac-Toe: Player Setup</PageTitle>

        <div className='text-center mb-6 text-gray-600'>
          <p className='text-sm'>
            First to win 3 rounds or complete 5 rounds wins!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className=' text-black grid md:grid-cols-2 gap-5 mt-6 lg:mt-10'
        >
          <div className='space-y-1'>
            <label
              htmlFor='player1'
              className='block font-medium'
            >
              Player 1 (X)
              <span
                className='text-red-500'
                aria-label='required'
              >
                *
              </span>
            </label>
            <input
              type='text'
              name='player1'
              id='player1'
              value={players?.player1}
              className='w-full outline-none border border-gray-400 rounded-md px-2 py-1 focus:border-blue-400'
              placeholder='Enter Player 1 Name'
              onChange={handleInputChange}
              aria-required='true'
              aria-describedby='player1-helper'
              maxLength={20}
              required
            />
            <div
              id='player1-helper'
              className='text-xs text-gray-500'
            >
              Enter name for Player 1 (plays as X)
            </div>
          </div>
          <div className='space-y-1'>
            <label
              htmlFor='player2'
              className='block font-medium'
            >
              Player 2 (O)
              <span
                className='text-red-500'
                aria-label='required'
              >
                *
              </span>
            </label>
            <input
              type='text'
              name='player2'
              id='player2'
              value={players?.player2}
              className='w-full outline-none border border-gray-400 rounded-md px-2 py-1 focus:border-blue-400'
              placeholder='Enter Player 2 Name'
              onChange={handleInputChange}
              aria-required='true'
              aria-describedby='player2-helper'
              maxLength={20}
              required
            />
            <div
              id='player2-helper'
              className='text-xs text-gray-500'
            >
              Enter name for Player 1 (plays as X)
            </div>
          </div>

          <button
            type='submit'
            disabled={!isFormValid}
            className={`md:col-span-2 mt-2 md:mt-6 mx-auto text-white text-sm px-4 py-2 rounded-md ${
              isFormValid
                ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            aria-describedby='button-help'
          >
            Start Game Now →
          </button>

          <div
            id='button-help'
            className='md:col-span-2 text-center text-sm text-gray-500 mt-1'
          >
            Note: Both player names are required to start the game
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerSetupPage;
