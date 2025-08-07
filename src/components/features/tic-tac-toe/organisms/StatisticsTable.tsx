import { PlayerStatisticsProps } from '@/types/types';
import React, { FC } from 'react';

const tableHeads = [
  'Rank',
  'Player Name',
  'Total Score',
  'Games Won',
  'Games Played',
  'Round Wins',
  'Win Rate',
];

const TableHeader = () => {
  return (
    <tr>
      {tableHeads.map((item) => (
        <th
          key={item}
          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
        >
          {item}
        </th>
      ))}
    </tr>
  );
};

const StatisticsTable: FC<{ playerStats: PlayerStatisticsProps[] }> = ({
  playerStats,
}) => {
  return (
    <table className='w-full bg-white rounded-lg shadow-md'>
      <TableHeader />
      <tbody className='bg-white divide-y divide-gray-200'>
        {playerStats.map((player, index) => (
          <tr
            key={player.name}
            className={index === 0 ? 'bg-yellow-50' : ''}
          >
            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
              {index === 0
                ? '🥇'
                : index === 1
                ? '🥈'
                : index === 2
                ? '🥉'
                : index + 1}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
              {player.name}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
              <span className='font-bold text-green-600'>
                {player.totalScore}
              </span>
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
              {player.gamesPlayed > 0
                ? `${Math.round((player.wins / player.gamesPlayed) * 100)}%`
                : '0%'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StatisticsTable;
