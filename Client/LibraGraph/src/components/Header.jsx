import React from 'react';

const Header = () => {
  return (
    <header className="flex flex-col items-center px-16 pt-4 pb-7 w-full bg-slate-950 text-slate-100 max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between items-start w-full max-w-[1420px] max-md:max-w-full">
        <nav className="flex gap-10 self-stretch my-auto text-2xl">
          <a href="#contact">Contact Us</a>
          <a href="#help">Help</a>
          <a href="#about">About</a>
        </nav>
        <div className="flex gap-4 text-xl">
          <form className="flex gap-3 items-start px-3 py-2.5 rounded-2xl bg-zinc-300 bg-opacity-60">
            <label htmlFor="search" className="sr-only">Type to Search</label>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f579068de68dc81a9a72ec1b8d5f82883c40a6298184b90250ac4f2ebd396f2?placeholderIfAbsent=true&apiKey=b4ed591bb3324416897d3c9c8b1b99c2" alt="" className="object-contain shrink-0 self-start aspect-[1.03] w-[39px]" />
            <input
              type="search"
              id="search"
              placeholder="Type to Search"
              className="my-auto basis-auto bg-transparent border-none"
            />
          </form>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/de60c8eef20a7dc398eecdf2a91aa4b245a026c922d047fe5f0d7bd5f5fa2d4c?placeholderIfAbsent=true&apiKey=b4ed591bb3324416897d3c9c8b1b99c2" alt="User profile" className="object-contain shrink-0 my-auto aspect-[1.03] rounded-[360px] w-[39px]" />
        </div>
      </div>
    </header>
  );
};

export default Header;