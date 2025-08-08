'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormErrors, ProductFormData, ProductFormProps } from '@/types/types';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import InputSelect from '@/components/ui/InputSelect';
import InputTextarea from '@/components/ui/InputTextarea';
import InputImage from '@/components/ui/InputImage';

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  onSubmit,
  isSubmitting
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>({
    title: initialData?.title || '',
    price: initialData?.price?.toString() || '',
    description: initialData?.description || '',
    categoryId: initialData?.category?.id?.toString() || '',
    images: initialData?.images || ['']
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [imageInput, setImageInput] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must not exceed 100 characters';
    }

    // Price validation
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else {
      const price = parseFloat(formData.price);
      if (isNaN(price)) {
        newErrors.price = 'Price must be a valid number';
      } else if (price <= 0) {
        newErrors.price = 'Price must be greater than 0';
      } else if (price > 1000000) {
        newErrors.price = 'Price cannot exceed $1,000,000';
      }
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData.description.length > 1000) {
      newErrors.description = 'Description must not exceed 1000 characters';
    }

    // Category validation
    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }

    // Images validation
    const validImages = formData.images.filter(img => img.trim() !== '');
    if (validImages.length === 0) {
      newErrors.images = 'At least one image URL is required';
    } else {
      // Validate each image URL
      const urlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i;
      const invalidUrls = validImages.filter(img => !urlRegex.test(img));
      if (invalidUrls.length > 0) {
        newErrors.images = 'All image URLs must be valid (jpg, jpeg, png, gif, webp)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const submitData = {
        title: formData.title.trim(),
        price: parseFloat(formData.price),
        description: formData.description.trim(),
        categoryId: parseInt(formData.categoryId),
        images: formData.images.filter(img => img.trim() !== '')
      };

      await onSubmit(submitData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const isEditMode = !!initialData;

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-3xl mx-auto px-4'>
        <div className='mb-8'>
          <h1 className='text-xl font-bold text-gray-900'>
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
        
        <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
          <form
            onSubmit={handleSubmit}
            className='p-6 space-y-6'
          >
            <div className='border-b border-gray-200 pb-6'>
              <h2 className='text-lg font-semibold text-gray-900 mb-4'>
                Basic Information
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <InputField
                  name='title'
                  label='Title'
                  value={formData.title}
                  onChange={(value) => handleInputChange('title', value)}
                  error={errors.title}
                  placeholder='Enter product title'
                  maxLength={100}
                  charCount={`${formData.title.length}/100 characters`}
                  disabled={isSubmitting}
                  className='md:col-span-2'
                  required
                />

                <InputField
                  name='price'
                  label='Price'
                  value={formData.price}
                  error={errors.price}
                  placeholder='0.00'
                  onChange={(value) => handleInputChange('price', value)}
                  disabled={isSubmitting}
                  type='number'
                />

                <InputSelect
                  name='categoryId'
                  label='Category'
                  value={formData.categoryId}
                  options={categories.map(category => ({
                    value: category.id,
                    label: category.name
                  }))}
                  onChange={(value) => handleInputChange('categoryId', value)}
                  error={errors.categoryId}
                  placeholder='Select category'
                  disabled={isSubmitting}
                  required
                />

                <InputTextarea
                  name='description'
                  label='Description'
                  value={formData.description}
                  onChange={(value) => handleInputChange('description', value)}
                  error={errors.description}
                  placeholder='Describe your product...'
                  maxLength={1000}
                  charCount={`${formData.description.length}/1000 characters`}
                  disabled={isSubmitting}
                  className='md:col-span-2'
                  required
                />
              </div>
            </div>

            <InputImage
              label='Product Images'
              images={formData.images}
              onImageChange={handleImageChange}
              onImageRemove={handleRemoveImage}
              onImageAdd={(url) => {
                setFormData(prev => ({
                  ...prev,
                  images: [...prev.images.filter(img => img !== ''), url, '']
                }));
                setImageInput('');
              }}
              imageInput={imageInput}
              onImageInputChange={setImageInput}
              error={errors.images}
              maxImages={5}
              disabled={isSubmitting}
              required
            />
            
            <div className='flex justify-end gap-3 pt-6 border-t border-gray-200'>
              <Button
                onClick={() => router.back()}
                name='Cancel'
                disabled={isSubmitting}
                className='text-gray-700 bg-slate-200 hover:bg-slate-300'
              />
              <Button
                type='submit'
                disabled={isSubmitting}
                className='bg-blue-600 text-white hover:bg-blue-700'
                name={
                  isSubmitting
                    ? 'Loading...'
                    : isEditMode
                    ? 'Update Product'
                    : 'Create Product'
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
