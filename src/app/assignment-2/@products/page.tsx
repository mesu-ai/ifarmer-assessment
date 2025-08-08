import { getProducts } from '@/apis/services/products';
import ProductList from '@/components/features/products/organisms/ProductList';
import Pagination from '@/components/ui/Pagenation';
import React from 'react';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const { categoryId, page: currentPage = 1, search } = params;
  const queryParams = {
    title: search ? search.toString() : undefined,
    categoryId: categoryId ? Number(categoryId) : undefined,
    offset: currentPage ? (Number(currentPage) - 1) * 10 : 0,
    limit: 10,
  };

  const products = await getProducts(queryParams);

  return (
    <div>
      <div className='bg-slate-100 p-4 rounded-md shadow-sm'>
        <div className='flex justify-between items-center mb-4 border-b pb-2'>
          <h1 className='text-xl font-semibold'>Products</h1>
          <span className='text-sm text-gray-600'>
            {products.length} product{products.length !== 1 ? 's' : ''}
          </span>
        </div>
        <ProductList products={products} />
      </div>

      <div className='mt-8 col-span-full content-center'>
        <Pagination currentPage={Number(currentPage)} />
      </div>
    </div>
  );
};

export default page;
