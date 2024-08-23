import React from 'react';
import LibrarySection from './LibrarySection';
import ProfileButton from './ProfileButton';

const MainContent = () => {
  return (
    <main className="flex flex-wrap gap-5 justify-between self-end mt-24 w-full max-w-[1918px] max-md:mt-10 max-md:max-w-full">
      <section className="flex flex-col items-center self-start mt-9 max-md:max-w-full">
        <h1 className="ml-4 text-6xl font-extrabold text-center text-slate-100 max-md:max-w-full max-md:text-4xl">
          Meet our AI librarian for instant help...
        </h1>
        <div className="self-stretch mt-24 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <LibrarySection title="Borrowed Books" />
            <LibrarySection title="Issue Books" />
          </div>
        </div>
        <ProfileButton />
      </section>
    </main>
  );
};

export default MainContent;