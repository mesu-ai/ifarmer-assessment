'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { updateProduct, getProductById } from '@/apis/services/products';
import { getCategories } from '@/apis/services/categories';
import ProductForm from '@/components/features/products/organisms/ProductForm';
import { Category, CreateProductProps, ProductProps } from '@/types/types';

const EditProductPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!productId) {
        setError('Product ID is required');
        setIsLoading(false);
        return;
      }

      try {
        const [categoriesData, productData] = await Promise.all([
          getCategories(),
          getProductById(productId)
        ]);
        
        setCategories(categoriesData || []);
        setProduct(productData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load product data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleSubmit = async (data: CreateProductProps) => {
    if (!productId) return;
    
    setIsSubmitting(true);
    try {
      const updatedProduct = await updateProduct(productId, data);
      console.log('Product updated successfully:', updatedProduct);
      
      // Show success message (you can replace this with a toast notification)
      alert('Product updated successfully!');
      
      // Redirect to products list
      router.push('/assignment-2');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-red-50 border border-red-200 rounded-md p-6 max-w-md'>
          <h2 className='text-red-800 font-semibold mb-2'>Error</h2>
          <p className='text-red-600 mb-4'>{error || 'Product not found'}</p>
          <div className='space-x-2'>
            <button
              onClick={() => router.push('/assignment-2')}
              className='px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors'
            >
              Back to Products
            </button>
            <button
              onClick={() => window.location.reload()}
              className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
       <ProductForm
        initialData={product}
        categories={categories}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditProductPage;