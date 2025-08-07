import { LinkButtonProps } from '@/types/types';
import Link from 'next/link';
import React, { FC } from 'react';

const LinkButton: FC<LinkButtonProps> = ({
  href = '',
  className = '',
  name = '',
}) => {
  return (
    <Link
      href={href}
      className={`px-6 py-4 rounded-md transition-colors text-center block ${className}`}
    >
      {name}
    </Link>
  );
};

export default LinkButton;
