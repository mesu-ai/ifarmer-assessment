import { getProducts } from '@/apis/services/products';
import ProductList from '@/components/features/products/organisms/ProductList';
import React from 'react';

const page = async () => {
  const products = await getProducts();
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default page;
