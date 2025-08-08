'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { ProductProps } from '@/types/types';

const ProductDetails: React.FC<{ product: ProductProps }> = ({ product }) => {
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});

  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
      <div className='border-b border-gray-200 p-6'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>
            {product.title}
          </h1>
          <div className='flex items-center gap-4 text-sm text-gray-500'>
            <span>Product ID: #{product.id}</span>
          </div>
        </div>
      </div>

      <div className='p-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div>
            {/* Cover Image */}
            <div className='mb-4'>
              <div className='relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden'>
                {product.images.length > 0 &&
                !imageError[selectedImageIndex] ? (
                  <Image
                    src={product.images[selectedImageIndex]}
                    alt={`${product.title} - Image ${selectedImageIndex + 1}`}
                    fill
                    className='object-cover'
                    onError={() => handleImageError(selectedImageIndex)}
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center text-gray-400'>
                    <div className='text-center'>
                      <svg
                        className='w-16 h-16 mx-auto mb-2'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <p>No image available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className='grid grid-cols-4 gap-2'>
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-full h-20 bg-gray-100 rounded border-2 overflow-hidden transition-all ${
                      selectedImageIndex === index
                        ? 'border-blue-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {!imageError[index] ? (
                      <Image
                        src={image}
                        alt={`${product.title} - Thumbnail ${index + 1}`}
                        fill
                        className='object-cover'
                        onError={() => handleImageError(index)}
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center text-gray-400'>
                        <svg
                          className='w-6 h-6'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path
                            fillRule='evenodd'
                            d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className='space-y-6'>
            {/* Price */}
            <div className='text-3xl font-bold text-green-600'>
              ${product.price.toFixed(2)}
            </div>

            {/* Category */}
            <div>
              <Link
                href={`/assignment-2?categoryId=${product.category.id}`}
                className='inline-flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors'
              >
                <div className='relative w-8 h-8 rounded overflow-hidden'>
                  <Image
                    src={product.category.image}
                    alt={product.category.name}
                    fill
                    className='object-cover'
                  />
                </div>
                <span className='text-sm font-medium text-gray-900'>
                  {product.category.name}
                </span>
              </Link>
            </div>

            {/* Product Creation Info */}
            <div className='bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-2'>
              <div className='flex justify-between'>
                <span className='text-sm text-gray-600'>Product ID:</span>
                <span className='text-sm font-medium text-gray-900'>
                  #{product.id}
                </span>
              </div>
              {/* <div className='flex justify-between'>
                    <span className='text-sm text-gray-600'>Slug:</span>
                    <span className="text-sm font-medium text-gray-900">{product.}</span>
                  </div> */}
              {product.creationAt && (
                <div className='flex justify-between'>
                  <span className='text-sm text-gray-600'>Created:</span>
                  <span className='text-sm font-medium text-gray-900'>
                    {formatDate(product.creationAt)}
                  </span>
                </div>
              )}
              {product.updatedAt && (
                <div className='flex justify-between'>
                  <span className='text-sm text-gray-600'>Last Updated:</span>
                  <span className='text-sm font-medium text-gray-900'>
                    {formatDate(product.updatedAt)}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className='pt-4 border-t border-gray-200'>
              <div className='flex flex-col sm:flex-row gap-3'>
                <Button
                  onClick={() =>
                    router.push(`/assignment-2/edit?id=${product.id}`)
                  }
                  className='flex-1 bg-blue-600 text-white hover:bg-blue-700'
                  name='Edit Product'
                />
                <Button
                  onClick={() => router.push('/assignment-2')}
                  className='flex-1 text-gray-700 bg-gray-100 hover:bg-gray-200'
                  name='Back to Products'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className='border-t border-gray-200 p-6'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Description
        </label>
        <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
          <p className='text-gray-700 leading-relaxed'>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
