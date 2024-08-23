import React from 'react';

const LibrarySection = ({ title }) => {
  return (
    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div className="grow px-7 py-12 w-full text-4xl text-center bg-neutral-900 text-slate-100 max-md:px-5 max-md:mt-10">
        {title}
      </div>
    </div>
  );
};

export default LibrarySection;