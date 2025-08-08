import React, { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  categories?: ReactNode;
  products?: ReactNode;
}
const layout:FC<LayoutProps> = ({ children, categories, products }) => {
  return (
    <div className='flex flex-col lg:flex-row gap-6'>
      
      {/* main content area */}
      <div className='flex-1 space-y-6 overflow-x-auto'>
        {children}
        {products}
      </div>

      {/* sidebar */}
      <div className='w-60 flex-none'>{categories}</div>
    </div>
  );
};

export default layout;