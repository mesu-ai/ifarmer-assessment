import React, { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  categories?: ReactNode;
  products?: ReactNode;
}
const layout:FC<LayoutProps> = ({ children, categories, products }) => {
  return (
    <div className='flex '>
      <div className='flex-1'>
        {children}
        {products}
      </div>
      <div>{categories}</div>
    </div>
  );
};

export default layout;