'use client';

import PageTitle from '@/components/ui/PageTitle';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { clearLeaderboard, loadLeaderboardFromStorage } from '@/lib/redux/features/game/gameSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface PlayerStats {
  name: string;
  totalScore: number;
  gamesPlayed: number;
  wins: number;
  roundWins: number;
}

const LeaderboardPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { leaderboard } = useAppSelector((state) => state.game);
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);

  useEffect(() => {
    // Load leaderboard from sessionStorage on component mount
    const savedLeaderboard = sessionStorage.getItem('leaderboard');
    if (savedLeaderboard) {
      dispatch(loadLeaderboardFromStorage(JSON.parse(savedLeaderboard)));
    }
  }, [dispatch]);

  useEffect(() => {
    // Calculate player statistics
    const stats: { [key: string]: PlayerStats } = {};

    leaderboard.forEach((game) => {
      // Player 1 stats
      if (!stats[game.players.player1]) {
        stats[game.players.player1] = {
          name: game.players.player1,
          totalScore: 0,
          gamesPlayed: 0,
          wins: 0,
          roundWins: 0,
        };
      }
      stats[game.players.player1].totalScore += game.scores.player1;
      stats[game.players.player1].gamesPlayed += 1;
      stats[game.players.player1].roundWins += game.roundWins.player1;
      if (game.winner === game.players.player1) {
        stats[game.players.player1].wins += 1;
      }

      // Player 2 stats
      if (!stats[game.players.player2]) {
        stats[game.players.player2] = {
          name: game.players.player2,
          totalScore: 0,
          gamesPlayed: 0,
          wins: 0,
          roundWins: 0,
        };
      }
      stats[game.players.player2].totalScore += game.scores.player2;
      stats[game.players.player2].gamesPlayed += 1;
      stats[game.players.player2].roundWins += game.roundWins.player2;
      if (game.winner === game.players.player2) {
        stats[game.players.player2].wins += 1;
      }
    });

    // Convert to array and sort by total score
    const sortedStats = Object.values(stats).sort((a, b) => b.totalScore - a.totalScore);
    setPlayerStats(sortedStats);
  }, [leaderboard]);

  const handleClearLeaderboard = () => {
    if (window.confirm('Are you sure you want to clear the leaderboard? This action cannot be undone.')) {
      dispatch(clearLeaderboard());
      sessionStorage.removeItem('leaderboard');
      setPlayerStats([]);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-[80vh] bg-white text-black'>
      <div className='bg-slate-100 rounded-md p-10 max-w-6xl w-full'>
        <PageTitle>Leaderboard</PageTitle>

        <div className='mt-8'>
          {playerStats.length === 0 ? (
            <div className='text-center py-8'>
              <p className='text-xl text-gray-600 mb-4'>No games played yet!</p>
              <button
                onClick={() => router.push('/assignment-1/player-setup')}
                className='bg-blue-500 text-white px-6 py-3 rounded-lg text-lg'
              >
                Start Your First Game
              </button>
            </div>
          ) : (
            <>
              {/* Player Statistics Table */}
              <div className='overflow-x-auto mb-6'>
                <table className='w-full bg-white rounded-lg shadow-md'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Rank
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Player Name
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Total Score
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Games Won
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Games Played
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Round Wins
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Win Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {playerStats.map((player, index) => (
                      <tr key={player.name} className={index === 0 ? 'bg-yellow-50' : ''}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {player.name}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          <span className='font-bold text-green-600'>{player.totalScore}</span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {player.wins}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {player.gamesPlayed}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {player.roundWins}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {player.gamesPlayed > 0 ? `${Math.round((player.wins / player.gamesPlayed) * 100)}%` : '0%'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Recent Games */}
              <div className='mt-8'>
                <h3 className='text-xl font-semibold mb-4'>Recent Games</h3>
                <div className='space-y-3 max-h-64 overflow-y-auto'>
                  {leaderboard.slice(-10).reverse().map((game, index) => (
                    <div key={index} className='bg-white p-4 rounded-lg shadow-sm border'>
                      <div className='flex justify-between items-center'>
                        <div>
                          <p className='font-medium'>
                            {game.players.player1} vs {game.players.player2}
                          </p>
                          <p className='text-sm text-gray-600'>
                            Winner: {game.winner === 'Tie' ? 'Tie Game' : game.winner}
                          </p>
                        </div>
                        <div className='text-right'>
                          <p className='text-sm'>
                            Scores: {game.scores.player1} - {game.scores.player2}
                          </p>
                          <p className='text-sm text-gray-600'>
                            Round Wins: {game.roundWins.player1} - {game.roundWins.player2}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className='flex justify-center gap-4 mt-8'>
            <button
              onClick={() => router.push('/assignment-1/player-setup')}
              className='bg-blue-500 text-white px-6 py-3 rounded-lg text-lg'
            >
              New Game
            </button>
            {playerStats.length > 0 && (
              <button
                onClick={handleClearLeaderboard}
                className='bg-red-500 text-white px-6 py-3 rounded-lg text-lg'
              >
                Clear Leaderboard
              </button>
            )}
            <button
              onClick={() => router.push('/assignment-1')}
              className='bg-gray-500 text-white px-6 py-3 rounded-lg text-lg'
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
