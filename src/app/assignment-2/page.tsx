import { getProducts } from '@/apis/services/products';
import SearchBar from '@/components/features/products/molecules/SearchBar';
import ProductList from '@/components/features/products/organisms/ProductList';
import React from 'react';

const page = async () => {
  const products= await getProducts();
  // console.log({products})
  return (
    <div>
      <SearchBar />
      {/* products list */}
      {/* <ProductList products={products} /> */}


      
      
      {/* Add more components or features as needed */}

      
    </div>
  );
};

export default page;