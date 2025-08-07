import React from 'react';

const SearchBar = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        className="border border-gray-300 rounded p-2"
      />
    </div>
  );
};

export default SearchBar;