import React, { FC } from 'react';

interface GameBoardProps {
  board: (string | null)[];
  handleClick: (index: number) => void;
  calculateWinner: (squares: (string | null)[]) => string | null;
}

const GameBoard: FC<GameBoardProps> = ({
  board,
  handleClick,
  calculateWinner,
}) => {
  return (
    <div className='max-w-fit mx-auto grid grid-cols-3 gap-2 mb-4'>
      {board.map((cell, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className={`w-16 lg:w-20 h-16 lg:h-20 text-2xl font-bold border-2 border-gray-400 
                    ${cell ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'} 
                    ${
                      calculateWinner(board)
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    }`}
          disabled={!!calculateWinner(board)}
        >
          {cell}
        </button>
      ))}
    </div>
  );
};

export default GameBoard;
