import React from 'react';

const Navbar = ({ searchTerm, handleSearch }) => {
  return (
    <div className='flex justify-between items-center'>
      <h1 className="text-white text-[5rem]">Country Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Enter country name..."
        className="p-6 border rounded h-10 w-[20rem]"
      />
    </div>
  );
};

export default Navbar;
