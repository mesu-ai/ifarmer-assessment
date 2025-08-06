'use client';

import PageTitle from '@/components/ui/PageTitle';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setPlayers, resetGame } from '@/lib/redux/features/game/gameSlice';
import { useRouter } from 'next/navigation';
import React, { FocusEvent, FormEvent, useState } from 'react';

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

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newPlayer = { ...players };
    newPlayer[name as keyof typeof players] = value;
    setPlayersLocal(newPlayer);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate both names are provided
    if (!players.player1.trim() || !players.player2.trim()) {
      alert('Both player names are required!');
      return;
    }

    // Reset game state and set new players
    dispatch(resetGame());
    dispatch(setPlayers(players));
    
    // Also save to sessionStorage for backup
    sessionStorage.setItem('players', JSON.stringify(players));
    router.push('/assignment-1/game');
  };

  const isFormValid = players.player1.trim() && players.player2.trim();

  console.log({isFormValid});

  return (
    <div className='flex items-center justify-center min-h-[80vh]'>
      <div className='bg-slate-100 rounded-md py-20 px-10 max-w-4xl w-full'>
        <PageTitle className='text-center'>Tic-Tac-Toe: Player Setup</PageTitle>
        
        <div className='text-center mb-6 text-gray-600'>
          <p>Enter both players&apos; names to start the game</p>
          <p className='text-sm'>First to win 3 rounds or complete 5 rounds wins!</p>
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
            </label>
            <input
              type='text'
              name='player1'
              id='player1'
              className='w-full outline-none border border-gray-400 rounded-md px-2 py-1 focus:border-blue-400'
              placeholder='Enter Player 1 Name'
              onBlur={handleBlur}
              required
            />
          </div>
          <div className='space-y-1'>
            <label
              htmlFor='player2'
              className='block font-medium'
            >
              Player 2 (O)
            </label>
            <input
              type='text'
              name='player2'
              id='player2'
              className='w-full outline-none border border-gray-400 rounded-md px-2 py-1 focus:border-blue-400'
              placeholder='Enter Player 2 Name'
              onBlur={handleBlur}
              required
            />
          </div>

          <button
            type='submit'
            disabled={!isFormValid}
            className={`md:col-span-2 mt-2 md:mt-6 mx-auto text-white text-sm px-4 py-2 rounded-md ${
              isFormValid 
                ? 'bg-blue-500 hover:bg-blue-600' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerSetupPage;
