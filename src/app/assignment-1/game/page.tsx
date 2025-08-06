'use client';

import PageTitle from '@/components/ui/PageTitle';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const GamePage = () => {
  const [players, setPlayers] = useState({ player1: '', player2: '' });
  const [round, setRound] = useState(1);

  const router = useRouter();

  useEffect(() => {
    const currPlayer = sessionStorage.getItem('players');
    if (currPlayer) {
      setPlayers(JSON.parse(currPlayer));
    } else {
      router.push('/assignment-1');
    }
  }, [router]);

  return (
    <div className='flex items-center justify-center min-h-[80vh] bg-white text-black'>
      <div className='bg-slate-100 rounded-md p-10 max-w-4xl w-full'>
        <PageTitle>Tic-Tac-Toe</PageTitle>

        <div className='mt-5 text-center'>
          <p className='text-xl'>Round {round}</p>
          <p>
            {players.player1} (X) vs {players.player2} (O)
          </p>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
