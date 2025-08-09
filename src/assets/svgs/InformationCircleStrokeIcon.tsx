import React, { FC } from 'react';

interface InformationCircleStrokeIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const InformationCircleStrokeIcon: FC<InformationCircleStrokeIconProps> = ({ className = '', width = 24, height = 24 }) => {
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
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
      />
    </svg>
  );
};

export default InformationCircleStrokeIcon;
