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

const productHeaders = [
  'SN',
  'Image',
  'Price',
  'Title',
  'Category',
  'Actions',
];

const ProductList:FC<{products: ProductProps[]}> = ({products}) => {
  return (
    <div>
      <table>
        <thead>
          <tr className='bg-yellow-200'>
            {productHeaders.map((header) => (
              <th
                key={header}
                className='py-2 px-4 mx-1 text-left'
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className='border-b border-gray-300 my-2 hover:bg-cyan-50 text-sm'
            >
              <td className='py-2 px-4 mx-1'>{product.id}</td>
              <td className='py-2 px-4 mx-1'>
                <Image
                  src={product?.images[0]}
                  alt={product.title}
                  width={100}
                  height={100}
                />
              </td>
              <td className='py-2 px-4 mx-1'>$ {product.price}</td>
              <td className='py-2 px-4 mx-1 max-w-xs truncate'>{product.title}</td>
              <td className='py-2 px-4 mx-1'>{product.category.name}</td>
              <td className='py-2 px-4 mx-1 space-x-2'>
                <button className='bg-blue-500 text-white px-4 py-1 rounded'>
                  Edit
                </button>
                <button className='bg-red-500 text-white px-4 py-1 rounded'>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;