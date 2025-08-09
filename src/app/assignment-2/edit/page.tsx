'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { updateProduct, getProductById } from '@/apis/services/products';
import { getCategories } from '@/apis/services/categories';
import ProductForm from '@/components/features/products/organisms/ProductForm';
import { CategoryProps, CreateProductProps, ProductProps } from '@/types/types';
import ErrorDisplay from '@/components/features/products/atoms/ErrorDisplay';

const EditProductPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  
  const [categories, setCategories] = useState<CategoryProps[]>([]);
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
      const res = await updateProduct(productId, data);
      if(res.status !== 200) {
        throw new Error('Failed to update product');
      }
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
      <ErrorDisplay
        error={error || 'Product not found'}
        onBack={() => router.push('/assignment-2')}
        onRetry={() => window.location.reload()}
      />
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