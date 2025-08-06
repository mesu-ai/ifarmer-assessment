import React from 'react';

const PageTitle = ({ children }: { children: React.ReactNode } )=> {
  return (
    <h1 className='text-center text-black font-semibold text-lg xl:text-2xl'>{children}</h1>
  );
};

export default PageTitle;
