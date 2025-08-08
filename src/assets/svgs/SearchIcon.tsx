import React, { FC } from 'react';

interface SearchIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const SearchIcon: FC<SearchIconProps> = ({ className = '', width = 24, height = 24 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="none"
      strokeWidth={2}
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
    </svg>
  );
};

export default SearchIcon;
