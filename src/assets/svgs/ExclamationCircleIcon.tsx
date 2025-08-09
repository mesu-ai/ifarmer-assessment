import React, { FC } from 'react';

interface ExclamationCircleIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const ExclamationCircleIcon: FC<ExclamationCircleIconProps> = ({ className = '', width = 24, height = 24 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
      />
    </svg>
  );
};

export default ExclamationCircleIcon;
