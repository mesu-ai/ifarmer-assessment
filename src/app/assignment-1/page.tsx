'use client';

import PageTitle from '@/components/ui/PageTitle';
import { useRouter } from 'next/navigation';
import React, { FocusEvent, FormEvent, useState } from 'react';

interface PlayerProps {
  player1: string;
  player2: string;
}

const PlayerSetupPage = () => {
  const router = useRouter();
  const [players, setPlayers] = useState<PlayerProps>({
    player1: '',
    player2: '',
  });


  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newPlayer = { ...players };
    newPlayer[name as keyof typeof players] = value;
    setPlayers(newPlayer);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sessionStorage.setItem('players', JSON.stringify(players));
    router.push('/assignment-1/game');
  };

  return (
    <div className='flex items-center justify-center min-h-[80vh]'>
      <div className='bg-slate-100 rounded-md py-20 px-10 max-w-4xl w-full'>
        <PageTitle>Tic-Tac-Toe: Player Setup</PageTitle>
        <form
          onSubmit={handleSubmit}
          className=' text-black grid md:grid-cols-2 gap-5 mt-6 lg:mt-10'
        >
          <input
            type='text'
            name='player1'
            id='player1'
            className='outline-none border border-gray-400 rounded-md px-2 py-1 focus:border-blue-400'
            placeholder='Player 1'
            onBlur={handleBlur}
            required
          />
          <input
            type='text'
            name='player2'
            id='player2'
            className='outline-none border border-gray-400 rounded-md px-2 py-1 focus:border-blue-400'
            placeholder='Player 1'
            onBlur={handleBlur}
            required
          />

          <button
            type='submit'
            className='md:col-span-2 mt-2 md:mt-6 mx-auto bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md'
          >
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerSetupPage;
