'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/apis/services/products';
import { getCategories } from '@/apis/services/categories';
import { CategoryProps, CreateProductProps } from '@/types/types';
import ProductForm from '@/components/features/products/organisms/ProductForm';
import Alert from '@/components/ui/Alert';

const AddProductPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    type: 'success' as 'success' | 'error',
    message: ''
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (data: CreateProductProps) => {
    setIsSubmitting(true);
    try {
      const res = await createProduct(data);
      if(res.status !== 201) {
        throw new Error('Failed to create product');
      }
      setAlertConfig({
        type: 'success',
        message: 'Product created successfully!'
      });
      setShowAlert(true);
      
      // Navigate after a delay to allow user to see the success message
      setTimeout(() => {
        router.push('/assignment-2');
      }, 2000);
    } catch (error) {
      console.error('Error creating product:', error);
      setAlertConfig({
        type: 'error',
        message: 'Failed to create product. Please try again.'
      });
      setShowAlert(true);
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

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <ProductForm
          categories={categories}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* Alert Dialog */}
      <Alert
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        message={alertConfig.message}
        type={alertConfig.type}
        autoClose={alertConfig.type === 'success'}
        autoCloseDelay={2000}
      />
    </>
  );
};

export default AddProductPage;