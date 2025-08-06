import PageTitle from '@/components/ui/PageTitle';
import Link from 'next/link';
import React from 'react';
export default function Home() {
  return (
    <div className='min-h-[80vh] bg-gray-100 flex flex-col items-center justify-center'>
      <div className='bg-white rounded-lg shadow-lg p-8 xl:p-20'>
        <PageTitle>Welcome to iFarmer Assessment</PageTitle>
        <p className='mt-5 text-center text-gray-600 mb-4'>Choose an assignment to get started:</p>
        <ul className='flex justify-center gap-1.5 md:gap-5 text-sm lg:text-base'>
          <li>
            <Link className='hover:bg-blue-500 hover:text-white text-blue-500 p-2 rounded-md' href='/assignment-1'>Assignment-1</Link>
          </li>
          <li>
            <Link className='hover:bg-blue-500 hover:text-white text-blue-500 p-2 rounded-md' href='/assignment-2'>Assignment-2</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
