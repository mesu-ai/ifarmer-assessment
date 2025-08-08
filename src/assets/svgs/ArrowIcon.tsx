import React, { FC } from 'react';

interface ArrowIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const ArrowIcon: FC<ArrowIconProps> = ({ className = '', width = 24, height = 24 }) => {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  );
};

export default ArrowIcon;
