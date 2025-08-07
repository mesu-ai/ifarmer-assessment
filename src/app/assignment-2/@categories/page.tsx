import { getCategories } from '@/apis/services/categories';
import CategoryList from '@/components/features/products/organisms/CategoryList';
import React from 'react';


const page = async () => {
  const categories = await getCategories();
  console.log({ categories });
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Categories</h1>
      <CategoryList categories={categories} />
    </div>
  );
};

export default page;