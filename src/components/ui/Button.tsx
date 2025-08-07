import { ButtonProps } from '@/types/types';
import React, { FC } from 'react';

const Button: FC<ButtonProps> = ({
  type = 'button',
  name,
  onClick,
  children,
  className,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-medium text-base transition-colors hover:cursor-pointer disabled:cursor-not-allowed ${className}`}
    >
      {name}
      {children}
    </button>
  );
};

export default Button;
