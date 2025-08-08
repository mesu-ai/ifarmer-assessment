'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const urlSearchParams = new URLSearchParams(searchParams.toString());
    const query = event.target.value.trim();
    if (query) {
      router.push(`?search=${query}`);
    } else {
      router.push(pathname);
    }
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Search products..."
        className="outline-none border border-gray-300 focus:border-blue-500 rounded p-2"
      />
    </div>
  );
};

export default SearchBar;


// 'use client';

// import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// // import SearchIcon from '@/assets/svgs/SearchIcon';

// interface SearchBarProps {
//   placeholder?: string;
//   setIsSearch?: (value: boolean) => void;
// }

// const SearchBar: FC<SearchBarProps> = ({
//   placeholder = 'Search...',
//   setIsSearch,
// }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const formRef = useRef<HTMLFormElement>(null);

//   const [keyword, setKeyword] = useState<string>('');
//   const [error, setError] = useState<boolean>(false);
//   const searchParams= useSearchParams();
//   const search = searchParams.get('search') || '';

//   // const debounce = (func: Function, delay: number) => {
//   //   let timeOutId: NodeJS.Timeout;
//   //   return (...args: any[]) => {
//   //     if (timeOutId) {
//   //       clearTimeout(timeOutId);
//   //     }
//   //     timeOutId = setTimeout(() => {
//   //       func(...args);
//   //     }, delay);
//   //   };
//   // };

//   const debounceSearch = useCallback((value: string) => {
//     const trimmed = value.trim();
//     if (trimmed) {
//       // setIsSearch?.(false);
//       setError(false);
//       router.push(`?search=${encodeURIComponent(trimmed)}`);
//     } else {
//       setError(true);
//       setKeyword('');
//       router.push(pathname);
//     }

//   }, [pathname, router]);


//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setKeyword(value);
//     setError(false);
//     debounceSearch(value);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const trimmed = keyword.trim();
//     if (trimmed) {
//       setIsSearch?.(false);
//       setError(false);
//       router.push(`?search=${encodeURIComponent(trimmed)}`);
//     } else {
//       setError(true);
//       setKeyword('');
//       router.push(pathname);
//     }
//   };

//   useEffect(() => {
//     if (search) {
//       setKeyword(search);
//       if (formRef.current) {
//         formRef.current.querySelector('input')?.focus();
//       }
//     }
//   }, [search]);


//   return (
//     <form
//       ref={formRef}
//       onSubmit={handleSubmit}
//       autoComplete="off"
//       className={`w-fit text-sm md:text-base group border ${
//         error ? 'border-red-500' : 'border-gray-500'
//       } bg-white focus-within:border-blue-500 flex items-center rounded-lg text-gray-800 p-1`}
//     >
//       <input
//         className="w-full outline-none shrink rounded-s-lg md:px-4"
//         placeholder={placeholder}
//         type="search"
//         name="search"
//         value={keyword}
//         onChange={handleInputChange}
//       />
//       <button
//         type="submit"
//         title="search"
//         className="py-1 px-2 bg-blue-500 hover:bg-sky-600 rounded-lg text-white"
//       >
//         {/* <SearchIcon className="fill-white stroke-white" /> */}
//         search
//       </button>
//     </form>
//   );
// };

// export default SearchBar