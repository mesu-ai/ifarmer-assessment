import { getCategories } from '@/apis/services/categories';
import { getProducts } from '@/apis/services/products';
import ProductSearchBar from '@/components/features/products/molecules/ProductSearchBar';
import CategoryList from '@/components/features/products/organisms/CategoryList';
import ProductList from '@/components/features/products/organisms/ProductList';
import Pagination from '@/components/ui/Pagenation';
import Link from 'next/link';
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
  const categories = await getCategories();

  return (
    <div className='flex flex-col lg:flex-row gap-6'>
      <div className='flex-1 space-y-6 overflow-x-auto'>
        <div className='flex justify-between items-center'>
          <ProductSearchBar />

          <Link
            href='/assignment-2/add'
            className='text-white bg-emerald-500 hover:bg-emerald-600 text-sm py-1.5 px-2 rounded-md'
          >
            Add Product
          </Link>
        </div>

          <div className='bg-slate-100 p-4 rounded-md shadow-sm'>
            <div className='flex justify-between items-center mb-4 border-b pb-2'>
              <h1 className='text-xl font-semibold'>Products</h1>
              <span className='text-sm text-gray-600'>
                {products.length} product{products.length !== 1 ? 's' : ''}
              </span>
            </div>
            <ProductList products={products} />
          </div>

          <div className='col-span-full content-center'>
            <Pagination currentPage={Number(currentPage)} />
          </div>
      </div>

      {/* sidebar */}
      <div className='w-full lg:w-60 flex-none'>
        <div className='sticky top-6 bg-slate-100 p-4 rounded-md shadow-sm'>
          <div className='mb-4 border-b pb-2'>
            <h1 className='text-xl font-semibold'>Category</h1>
          </div>
          <CategoryList categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default page;
