'use client';

import Image from 'next/image';
import React, { FC } from 'react';

interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
}

const productHeaders = ['SN', 'Image', 'Title', 'Category', 'Price', 'Actions'];

const ProductList: FC<{ products: ProductProps[] }> = ({ products }) => {
  const handleEdit = (productId: number) => {
    // TODO: Implement edit functionality
    console.log('Edit product:', productId);
  };

  const handleDelete = (productId: number) => {
    // TODO: Implement delete functionality
    console.log('Delete product:', productId);
  };

  return (
    <div className='h-[70vh] overflow-auto'>
      {products.length === 0 ? (
        <div className='text-center text-gray-500 py-8'>No products found</div>
      ) : (
        <div className='min-w-full'>
          <table className='w-full bg-white rounded-lg overflow-hidden shadow-sm'>
            <thead className='bg-gray-50 sticky top-0'>
              <tr>
                {productHeaders.map((header) => (
                  <th
                    key={header}
                    className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b'
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {products.map((product, index) => (
                <tr
                  key={product.id}
                  className='hover:bg-gray-50 transition-colors duration-150'
                >
                  <td className='py-4 px-4 text-sm text-gray-900'>
                    {index + 1}
                  </td>
                  <td className='py-4 px-4'>
                    <div className='relative w-16 h-16 rounded-lg overflow-hidden'>
                      <Image
                        src={product?.images[0] || '/placeholder-image.jpg'}
                        alt={product.title}
                        fill
                        className='object-cover'
                      />
                    </div>
                  </td>
                  <td className='py-4 px-4'>
                    <div className='max-w-xs'>
                      <p className='text-sm font-medium text-gray-900 truncate'>
                        {product.title}
                      </p>
                      <p className='text-sm text-gray-500 line-clamp-2 mt-1'>
                        {product.description}
                      </p>
                    </div>
                  </td>
                  <td className='py-4 px-4'>
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                      {product.category.name}
                    </span>
                  </td>
                  <td className='py-4 px-4 text-sm font-semibold text-green-600'>
                    ${product.price.toFixed(2)}
                  </td>
                  <td className='py-4 px-4'>
                    <div className='flex space-x-2'>
                      <button
                        onClick={() => handleEdit(product.id)}
                        type='button'
                        className='inline-flex items-center px-3 py-1.5 text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 hover:cursor-pointer'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        type='button'
                        className='inline-flex items-center px-3 py-1.5 text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 hover:cursor-pointer'
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
