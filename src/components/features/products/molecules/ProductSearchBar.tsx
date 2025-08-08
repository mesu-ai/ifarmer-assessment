'use client';

import SearchIcon from '@/assets/svgs/SearchIcon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const ProductSearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  // Debounce Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        router.push(`?search=${encodeURIComponent(searchTerm.trim())}`);
      } else {
        router.push(pathname);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchTerm, router, pathname]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search products..."
        className="w-full outline-none border border-gray-300 focus:border-blue-500 rounded-lg px-4 py-2 pr-10"
      />
      <SearchIcon className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
    </div>
  );
};

export default ProductSearchBar;