import { getCategories } from '@/apis/services/categories';
import CategoryList from '@/components/features/products/organisms/CategoryList';
import React from 'react';


const page = async () => {
  const categories = await getCategories();
  return (
    <div className=' bg-slate-100 p-4 rounded-md shadow-sm'>
      <div className='mb-4 border-b pb-2'>
        <h1 className='text-xl font-semibold'>Category</h1>
      </div>
      <CategoryList categories={categories} />
    </div>
  );
};

export default page;