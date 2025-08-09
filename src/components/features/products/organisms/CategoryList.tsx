'use client';

import { CategoryProps } from '@/types/types';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

const CategoryList: FC<{ categories: CategoryProps[] }> = ({ categories }) => {
  const router = useRouter();

  const handleCategory = (categoryId: number) => {
    router.push(`/assignment-2?categoryId=${categoryId}`);
  };

  return (
    <ul className='list-none capitalize h-[30vh] lg:h-[70vh] overflow-y-auto'>
      {categories.map((category) => (
        <li
          key={category.id}
          className='text-base py-1 font-medium'
        >
          <button
            type='button'
            onClick={() => handleCategory(category.id)}
            className='hover:cursor-pointer hover:text-blue-500'
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
