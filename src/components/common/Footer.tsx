import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-4 mt-8'>
      <div className='container mx-auto px-4 lg:px-10 text-center'>
        <p>&copy; {new Date().getFullYear()} iFarmer Assessment. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;