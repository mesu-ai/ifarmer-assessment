import React, { FC } from 'react';

interface CategoryProps {
  id: number;
  name: string;
  slug: string;
  image: string;

}

const CategoryList:FC<{categories:CategoryProps[]}> = ({categories}) => {

  return (
    <ul className='list-disc pl-5 bg-amber-400'>
        {categories.map((category) => (
          <li key={category.id} className='mb-2'>
            {category.name}
          </li>
        ))}
      </ul>
  );
};

export default CategoryList;