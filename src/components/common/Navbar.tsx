import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className='bg-gray-800 text-white py-4'>
      <div className='container mx-auto px-4 lg:px-10 flex justify-between items-center'>
        <p className='text-lg'>iFarmer Assessment</p>
        <ul className='flex space-x-4 lg:space-x-5 xl:space-x-10 text-sm lg:text-base'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/assignment-1'>Assignment-1</Link>
          </li>
          <li>
            <Link href='/assignment-2'>Assignment-2</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
