import React, { FC } from 'react';

interface CheckCircleIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const CheckCircleIcon: FC<CheckCircleIconProps> = ({ className = '', width = 20, height = 20 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        fillRule="evenodd" 
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
        clipRule="evenodd" 
      />
    </svg>
  );
};

export default CheckCircleIcon;
