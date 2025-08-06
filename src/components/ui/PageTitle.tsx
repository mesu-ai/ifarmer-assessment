import React, { FC } from 'react';

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

const PageTitle: FC<PageTitleProps> = ({ children, className = '' }) => {
  return (
    <h1 className={`text-black font-semibold text-lg sm:text-xl xl:text-2xl ${className}`}>
      {children}
    </h1>
  );
};

export default PageTitle;
