import React from 'react';
import { notFound } from 'next/navigation';
import { getProductById } from '@/apis/services/products';
import ProductDetails from '@/components/features/products/organisms/ProductDetails';

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  try {
    const product = await getProductById(id);
    
    if (!product) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <ProductDetails product={product} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-red-800 font-semibold mb-2">Error</h2>
            <p className="text-red-600">Failed to load product details. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductDetailsPage;